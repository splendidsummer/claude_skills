# Skill: OpenPI Multi-Agent Architecture

OpenPI 多智能体协作架构，用于训练、评估和部署 VLA 模型。

## 触发场景

- 训练 OpenPI 模型
- 评估 checkpoint
- 部署推理服务
- 配置分布式训练
- 调试训练错误

## 架构设计

### 6 大核心领域

```
┌─────────────────────────────────────────────────────────────┐
│                  OpenPI 多智能体架构                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 配置管理 (Config Management)                             │
│     └── get_config() → 选择预定义配置                        │
│                                                              │
│  2. 监控 (Monitoring)                                        │
│     └── TaskList → 追踪任务依赖                              │
│     └── integration_tester → 测试流水线                      │
│                                                              │
│  3. 执行 (Execution)                                         │
│     ├── training_runner (必需)                               │
│     ├── evaluation_agent (可选)                              │
│     └── inference_deployer (可选)                            │
│                                                              │
│  4. 资源管理 (Resource Management)                           │
│     ├── 区分 GPU/CPU agents                                  │
│     ├── 限制并发 GPU agents                                  │
│     └── use_quantile_norm (PI05 默认)                        │
│                                                              │
│  5. 安全验证 (Safety Validation) [Phase 2]                   │
│     ├── safety_validator → 验证安全约束                      │
│     ├── 实机测试                                             │
│     └── ⚠️ 需要人工确认                                      │
│                                                              │
│  6. 反馈循环 (Feedback Loop)                                 │
│     └── debug_agent → 分析错误 → 识别根因 → 分配修复         │
│     └── 人机协作模式                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Agent 定义

### training_runner
```markdown
职责: 执行 JAX/PyTorch 训练任务
工具: Bash, Read, Write, Edit
输入: config_name, exp_name, resume (可选)
输出: 训练日志, checkpoint
```

### evaluation_agent
```markdown
职责: 评估模型性能
工具: Bash, Read
输入: checkpoint_path, eval_config
输出: 评估指标, 性能报告
```

### inference_deployer
```markdown
职责: 部署推理服务
工具: Bash, Read, Write
输入: checkpoint_path, policy_config
输出: WebSocket policy server
```

### safety_validator
```markdown
职责: 验证安全约束
工具: Bash, Read, AskUserQuestion
触发: Phase 2 部署前
要求: 人工确认
```

### debug_agent
```markdown
职责: 错误诊断和修复
工具: Glob, Grep, Read, WebSearch
流程: 分析错误日志 → 识别根因 → 分配修复 → 人工确认
```

### integration_tester
```markdown
职责: 测试完整流水线
工具: Bash, Read, pytest
覆盖: 数据加载 → 训练 → 评估 → 部署
```

## 资源调度逻辑

```python
class ResourceManager:
    def __init__(self, num_gpus: int):
        self.num_gpus = num_gpus
        self.active_gpu_agents = 0

    def can_spawn_gpu_agent(self) -> bool:
        return self.active_gpu_agents < self.num_gpus

    def spawn_agent(self, agent_type: str):
        if agent_type in GPU_AGENTS:
            if not self.can_spawn_gpu_agent():
                raise ResourceError("No GPU available")
            self.active_gpu_agents += 1
        # ... spawn agent

GPU_AGENTS = ["training_runner", "evaluation_agent"]
CPU_AGENTS = ["debug_agent", "integration_tester", "safety_validator"]
```

## 执行工作流

### Phase 1: 训练

```
1. 配置选择
   $ config = get_config("pi05_libero")

2. 资源检查
   $ gpu_available = check_gpu_memory(required=22.5)  # GB

3. 训练执行
   $ XLA_PYTHON_CLIENT_MEM_FRACTION=0.9 \
     uv run scripts/train.py pi05_libero --exp-name=my_exp

4. 测试验证
   $ pytest tests/ -v
```

### Phase 2: 部署 (需人工确认)

```
1. 安全验证 [⚠️ 需人工确认]
   $ safety_validator.check_constraints()

2. 实机测试 [⚠️ 需人工确认]
   $ safety_validator.real_robot_test()

3. 部署推理服务
   $ uv run scripts/serve_policy.py policy:checkpoint \
     --policy.config=pi05_libero
```

## 错误处理工作流

```
错误发生
    ↓
debug_agent 分析错误日志
    ↓
识别问题根源
    ├── JAX/PyTorch 错误 → 查找解决方案
    ├── 数据错误 → data-pipeline-specialist
    ├── 配置错误 → 检查 config.py
    └── 资源错误 → 调整资源分配
    ↓
分配给相关 agent 修复
    ↓
人工确认修复结果
    ↓
继续执行
```

## 配置文件位置

| 文件 | 路径 |
|-----|------|
| 训练配置 | `src/openpi/training/config.py` |
| 训练脚本 | `scripts/train.py` |
| 评估脚本 | `scripts/evaluate.py` |
| 推理服务 | `scripts/serve_policy.py` |
| Checkpoints | `gs://openpi-assets/checkpoints/` |

## 使用示例

```
# 训练 pi05 模型
/openpi-multi-agent 训练 pi05_libero 配置，batch_size=32

# 评估 checkpoint
/openpi-multi-agent 评估 checkpoint 目录 /path/to/ckpt

# 部署推理服务
/openpi-multi-agent 部署推理服务到端口 8080

# 调试训练错误
/openpi-multi-agent 训练报错了，帮我分析
```
