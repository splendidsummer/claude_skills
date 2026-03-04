---
description: OpenPI 多智能体协作架构 - 训练、评估、部署流水线
---

# OpenPI 多智能体协作架构

当执行 OpenPI 训练、评估或部署任务时，遵循以下多智能体协作架构。

## 核心原则

保持多智能体架构，专注于以下 6 个关键领域：

## 1. 配置管理 (Config Management)

- **方法**: 使用 `get_config()` 选择正确的预定义配置
- **位置**: `src/openpi/training/config.py`
- **规则**: 不要创建新配置，优先选择现有预定义配置

## 2. 监控训练进度 (Monitoring)

- **工具**: TaskList 追踪任务依赖
- **agents**:
  - `integration_tester`: 测试完整流水线
- **输出**: 实时进度更新和状态报告

## 3. 运行训练/评估 (Execution)

| Agent | 用途 | 必需性 |
|-------|------|--------|
| `training_runner` | 执行训练任务 | 必需 |
| `evaluation_agent` | 模型评估 | 可选 |
| `inference_deployer` | 部署推理服务 | 可选 |

## 4. 资源管理 (Resource Management)

执行顺序和限制：

```
1. 区分 GPU/CPU agents → GPU agents 优先运行
2. 限制并发 GPU agents 数量 (根据可用 GPU 数量调整)
3. 使用 use_quantile_norm (PI05 默认配置)
4. 添加资源调度逻辑
```

**GPU 内存参考**:
- Inference: > 8 GB
- Fine-Tuning (LoRA): > 22.5 GB
- Fine-Tuning (Full): > 70 GB

## 5. 安全验证增强 (Safety Validation)

**阶段**: Phase 2

| Agent | 任务 |
|-------|------|
| `safety_validator` | 验证安全约束 |
| `safety_validator` | 实机测试 |

⚠️ **需要人工确认**: 安全验证步骤必须人工批准后才能继续

## 6. 反馈循环 (Feedback Loop)

**Agent**: `debug_agent`

**工作流**:
```
错误发生 → debug_agent 分析错误日志 → 识别问题根源 → 分配给相关 agent 修复 → 人工确认
```

**关键特性**:
- 定义失败处理流程
- 实现自动化回退机制
- 保留人工干预入口
- 人机协作模式

## 执行流程图

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenPI 多智能体工作流                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 配置选择 (get_config)                                    │
│         ↓                                                    │
│  2. 资源检查 (GPU/CPU 分配)                                  │
│         ↓                                                    │
│  3. 训练执行 (training_runner)                               │
│         ↓                                                    │
│  4. 测试验证 (integration_tester)                            │
│         ↓                                                    │
│  5. [Phase 2] 安全验证 (safety_validator) [需人工确认]       │
│         ↓                                                    │
│  6. 部署/评估 (inference_deployer / evaluation_agent)        │
│                                                              │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                              │
│  错误处理: debug_agent → 识别根因 → 分配修复 → 人工确认       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 使用方式

```
/openpi-multi-agent
```

然后描述你的任务，例如：
- "训练 pi05_libero 配置"
- "评估最近的 checkpoint"
- "部署推理服务"
