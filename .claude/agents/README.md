# Claude Code Agents 目录

本目录包含项目专用的子代理定义，遵循 [Multi-Agent Programming Architecture](../../docs/multi-agent-programming-architecture.md) 规范。

## 快速索引

### 核心开发代理 (Core Development)

| 代理 | 触发场景 | 模型 | 工具权限 |
|------|----------|------|----------|
| `code-architecture-reviewer` | 代码审查、架构一致性检查 | sonnet | Read-only |
| `code-refactor-master` | 代码重构、架构优化 | opus | Full |
| `auto-error-resolver` | 运行时错误、CUDA 错误、形状不匹配 | sonnet | Full |

### 机器学习代理 (ML Training)

| 代理 | 触发场景 | 模型 | 工具权限 |
|------|----------|------|----------|
| `training-specialist` | 训练配置、分布式训练、超参数调优 | opus | Full |
| `data-pipeline-specialist` | 数据加载、预处理、LeRobot 格式转换 | sonnet | Full |
| `model-conversion-specialist` | JAX ↔ PyTorch 模型转换 | sonnet | Full |

### 研究分析代理 (Research & Analysis)

| 代理 | 触发场景 | 模型 | 工具权限 |
|------|----------|------|----------|
| `web-research-specialist` | 网络研究、问题诊断 | sonnet | Read + WebFetch |
| `documentation-architect` | 文档创建和维护 | sonnet | Edit + Write |

### 工具代理 (Utilities)

| 代理 | 触发场景 | 模型 | 工具权限 |
|------|----------|------|----------|
| `chinese-language-configurator` | 中文语言配置 | sonnet | Edit + Write |

## 调用方式

### 通过 Task 工具调用

```python
# 基本调用
Task(
    subagent_type="training-specialist",
    prompt="配置 4 卡分布式训练"
)

# 带描述的调用
Task(
    subagent_type="auto-error-resolver",
    description="诊断 CUDA 错误",
    prompt="训练时遇到 CUDA out of memory 错误，batch_size=64"
)
```

### 在 Team 中使用

```python
# 创建团队
TeamCreate(team_name="ml-training-team", description="ML 训练团队")

# 分配任务
Task(subagent_type="data-pipeline-specialist", prompt="预处理 DROID 数据集")
Task(subagent_type="training-specialist", prompt="配置训练参数")
```

## 工作流模式示例

### 顺序模式：数据处理 → 训练 → 评估

```python
# Step 1: 数据准备
data_result = Task(
    subagent_type="data-pipeline-specialist",
    prompt="转换数据集并计算归一化统计量"
)

# Step 2: 训练配置
train_result = Task(
    subagent_type="training-specialist",
    prompt=f"配置训练: {data_result}"
)

# Step 3: 模型转换（如需要）
convert_result = Task(
    subagent_type="model-conversion-specialist",
    prompt="将 JAX 检查点转换为 PyTorch 格式"
)
```

### 层次模式：项目管理

```python
# 主代理分解任务，分配给专门化代理
requirements = "实现一个新的数据加载器"

# 架构审查
Task(subagent_type="code-architecture-reviewer", prompt=f"审查设计: {requirements}")

# 实现
Task(subagent_type="code-refactor-master", prompt=f"实现: {requirements}")

# 测试
Task(subagent_type="auto-error-resolver", prompt="运行测试并修复错误")
```

### 并行模式：多任务同时执行

```python
# 同时执行多个独立任务（使用 run_in_background）
Task(
    subagent_type="code-architecture-reviewer",
    prompt="审查核心模块代码",
    run_in_background=True
)

Task(
    subagent_type="documentation-architect",
    prompt="更新 API 文档",
    run_in_background=True
)

Task(
    subagent_type="web-research-specialist",
    prompt="研究最新的数据增强技术",
    run_in_background=True
)
```

## 添加新代理

### 步骤 1: 创建代理文件

```bash
# 复制模板
cp .claude/agents/_template.md .claude/agents/new-agent.md
```

### 步骤 2: 编辑代理定义

```markdown
---
name: new-agent
description: |
  描述何时使用此代理。
  示例：
  - User: "触发场景 1"
  - User: "触发场景 2"
tools: Glob, Grep, Read, Edit
model: sonnet
color: blue
---

# New Agent

核心职责描述...

## 专业知识
- 领域 1
- 领域 2

## 工作流程
1. 步骤 1
2. 步骤 2
```

### 步骤 3: 更新索引

在本 README.md 中添加新代理的条目。

## 代理设计原则

### 1. 单一职责
每个代理应专注于一个明确的职责域。

### 2. 最小权限
只授予完成任务所需的最小工具权限。

### 3. 清晰触发
description 应明确说明何时使用此代理。

### 4. 标准输出
定义清晰的输出格式，便于下游代理处理。

## 相关文档

- [Multi-Agent Programming Architecture](../../docs/multi-agent-programming-architecture.md)
- [CLAUDE.md 项目指令](../../CLAUDE.md)
- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
