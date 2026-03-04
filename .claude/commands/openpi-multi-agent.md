---
description: OpenPI 多智能体协作架构 - 训练、评估、部署流水线
---

# OpenPI Multi-Agent Architecture

执行 OpenPI 训练、评估或部署任务时使用的多智能体协作架构。

## 使用方式

```
/openpi-multi-agent <任务描述>
```

## 核心架构

| 层级 | Agent/组件 | 职责 |
|-----|-----------|------|
| 配置管理 | `get_config()` | 选择预定义配置 |
| 监控 | TaskList | 追踪任务依赖 |
| 测试 | `integration_tester` | 测试完整流水线 |
| 执行 | `training_runner` | 执行训练任务 |
| 执行 | `evaluation_agent` | 模型评估 (可选) |
| 执行 | `inference_deployer` | 部署推理服务 (可选) |
| 资源 | GPU/CPU 调度 | 限制并发 GPU agents |
| 安全 | `safety_validator` | 验证安全约束 (Phase 2) |
| 反馈 | `debug_agent` | 错误处理和修复 |

## 执行流程

```
配置选择 → 资源检查 → 训练执行 → 测试验证 → [安全验证] → 部署/评估
                                           ↓
                            错误 → debug_agent → 修复 → 人工确认
```

## 资源管理规则

1. GPU agents 优先运行
2. 限制并发 GPU agents (根据 GPU 数量)
3. 使用 `use_quantile_norm` (PI05 默认)

## GPU 内存参考

| 模式 | 内存需求 |
|-----|---------|
| 推理 | > 8 GB |
| LoRA 微调 | > 22.5 GB |
| 全参数微调 | > 70 GB |

## 人工确认点

- Phase 2 安全验证
- 实机测试
- debug_agent 修复后
