# Multi-Agent Programming Architecture

> 综合文档：基于 Claude Code 官方文档 + GitHub 高星项目（LangGraph, AutoGen, CrewAI）最佳实践

## 目录

1. [架构概述](#1-架构概述)
2. [核心概念](#2-核心概念)
3. [工作流模式](#3-工作流模式)
4. [Claude Code Agent 规范](#4-claude-code-agent-规范)
5. [目录结构标准](#5-目录结构标准)
6. [Agent 文件格式规范](#6-agent-文件格式规范)
7. [项目实现映射](#7-项目实现映射)
8. [参考资料](#8-参考资料)

---

## 1. 架构概述

### 1.1 什么是 Agentic Programming

Agentic Programming（代理式编程）是一种软件开发范式，其中：

- **主代理（Main Agent）** 负责理解用户意图、分解任务、协调执行
- **子代理（Sub-agents）** 是专门化的自治代理，处理特定类型的子任务
- **工作流（Workflow）** 定义代理之间的协作模式和任务流转

### 1.2 架构分层

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                      │
│                    (用户交互层)                               │
├─────────────────────────────────────────────────────────────┤
│                    Orchestration Layer                       │
│                    (编排层 - 主代理)                          │
│    ┌─────────────┬─────────────┬─────────────┐             │
│    │  Task Queue │  Scheduler  │  Router     │             │
│    └─────────────┴─────────────┴─────────────┘             │
├─────────────────────────────────────────────────────────────┤
│                    Agent Pool Layer                          │
│                    (代理池层)                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │Researcher│ │  Coder   │ │ Reviewer │ │ Deployer │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
├─────────────────────────────────────────────────────────────┤
│                    Tool & Resource Layer                     │
│                    (工具与资源层)                             │
│    ┌───────────┬───────────┬───────────┬───────────┐      │
│    │File System│   Shell   │   MCP     │  Memory   │      │
│    └───────────┴───────────┴───────────┴───────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 核心概念

### 2.1 代理类型

| 类型 | 描述 | 适用场景 |
|------|------|----------|
| **General-purpose** | 通用代理，可使用所有工具 | 复杂多步骤任务 |
| **Specialist** | 专门化代理，限制工具集 | 特定领域任务 |
| **Supervisor** | 监督代理，协调其他代理 | 多代理协作场景 |
| **Worker** | 工作代理，执行具体任务 | 单一明确任务 |

### 2.2 上下文隔离

Claude Code 的子代理运行在独立的上下文窗口中：

- **主会话上下文**：完整的对话历史和项目状态
- **子代理上下文**：隔离的执行环境，只接收必要的任务描述
- **结果回传**：子代理完成后，结果摘要返回主会话

### 2.3 工具权限模型

```
┌─────────────────────────────────────────────────┐
│              Tool Permission Levels              │
├─────────────────────────────────────────────────┤
│  Read-only:  Glob, Grep, Read, WebFetch         │
│  Edit:       + Edit, NotebookEdit               │
│  Write:      + Write                             │
│  Execute:    + Bash                              │
│  Full:       All tools including Task           │
└─────────────────────────────────────────────────┘
```

---

## 3. 工作流模式

基于 Azure Architecture Center、LangGraph、AutoGen、CrewAI 的最佳实践：

### 3.1 顺序模式 (Sequential Pattern)

```
┌───────┐    ┌───────┐    ┌───────┐
│Agent A│───▶│Agent B│───▶│Agent C│
└───────┘    └───────┘    └───────┘
```

**适用场景**：
- 管道式处理（数据处理 → 分析 → 报告）
- 依赖链任务（编译 → 测试 → 部署）

**Claude Code 实现**：
```python
# 主代理依次调用子代理
result_a = Task(subagent_type="data-loader", prompt="加载数据")
result_b = Task(subagent_type="analyzer", prompt=f"分析: {result_a}")
result_c = Task(subagent_type="reporter", prompt=f"生成报告: {result_b}")
```

### 3.2 层次模式 (Hierarchical Pattern)

```
                    ┌──────────────┐
                    │  Supervisor  │
                    │    Agent     │
                    └──────┬───────┘
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Worker 1 │ │ Worker 2 │ │ Worker 3 │
        └──────────┘ └──────────┘ └──────────┘
```

**适用场景**：
- 复杂项目分解（需求分析 → 任务分配 → 结果汇总）
- 多专家协作（架构师 → 前端/后端/测试）

**Claude Code 实现**：
```python
# 主代理作为 Supervisor，动态分配任务
def orchestrate_project(requirement):
    tasks = decompose(requirement)  # 分解任务

    # 创建 Team 协调
    TeamCreate(team_name="project-team", description="项目开发团队")

    # 分配任务给专门化代理
    for task in tasks:
        Task(subagent_type=task.agent_type, prompt=task.description)
```

### 3.3 并行模式 (Concurrent Pattern)

```
              ┌──────────┐
              │  Router  │
              └────┬─────┘
         ┌─────────┼─────────┐
         ▼         ▼         ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │Agent A │ │Agent B │ │Agent C │
    └────┬───┘ └────┬───┘ └────┬───┘
         │         │         │
         └─────────┼─────────┘
                   ▼
             ┌──────────┐
             │ Aggregator│
             └──────────┘
```

**适用场景**：
- 独立任务并行执行（代码审查 + 测试运行 + 文档生成）
- 多源数据收集（多个 API 调用）

**Claude Code 实现**：
```python
# 并行调用多个子代理
results = await asyncio.gather(
    Task(subagent_type="code-reviewer", prompt="审查代码"),
    Task(subagent_type="test-runner", prompt="运行测试"),
    Task(subagent_type="doc-generator", prompt="生成文档")
)
```

### 3.4 交接模式 (Handoff Pattern)

```
┌─────────┐                    ┌─────────┐
│ Agent A │───handoff(context)──▶│ Agent B │
└─────────┘                    └─────────┘
     │                              │
     │         context              │
     │    ┌─────────────┐           │
     └───▶│   State     │◀──────────┘
          │   Store    │
          └─────────────┘
```

**适用场景**：
- 专业领域切换（研究 → 编码 → 部署）
- 人机协作（AI → 人工审核 → AI 继续执行）

### 3.5 群聊模式 (Group Chat Pattern)

```
            ┌─────────────────────┐
            │   Group Chat Room   │
            └──────────┬──────────┘
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
  ┌─────────┐    ┌─────────┐    ┌─────────┐
  │ Agent A │◀──▶│ Agent B │◀──▶│ Agent C │
  └─────────┘    └─────────┘    └─────────┘
```

**适用场景**：
- 头脑风暴
- 多视角问题解决
- 代码评审讨论

---

## 4. Claude Code Agent 规范

### 4.1 官方文档要点

根据 [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/agents)：

1. **Agent 定义位置**：
   - 用户级：`~/.claude/agents/` - 跨项目使用
   - 项目级：`.claude/agents/` - 项目特定

2. **Agent 文件格式**：Markdown 文件 + YAML frontmatter

3. **调用机制**：通过 `Task` 工具，指定 `subagent_type`

### 4.2 核心属性

| 属性 | 必需 | 说明 |
|------|------|------|
| `name` | ✅ | 代理标识符，调用时使用 |
| `description` | ✅ | 描述何时使用此代理 |
| `tools` | ❌ | 限制可用工具（默认继承主会话） |
| `model` | ❌ | 指定模型（sonnet/opus/haiku） |
| `color` | ❌ | UI 显示颜色 |

### 4.3 工具限制策略

```yaml
# 只读代理 - 适合研究、分析
tools: Glob, Grep, Read, WebFetch, WebSearch

# 编辑代理 - 适合代码修改
tools: Glob, Grep, Read, Edit, Write

# 完整代理 - 适合复杂任务
tools: Glob, Grep, Read, Edit, Write, Bash, Task

# 无执行权限 - 安全限制
tools: Glob, Grep, Read, Edit, Write  # 不含 Bash
```

---

## 5. 目录结构标准

### 5.1 推荐的项目结构

```
project-root/
├── .claude/
│   ├── settings.json              # Claude Code 项目设置
│   ├── agents/                    # 项目级代理定义
│   │   ├── README.md              # 代理目录说明
│   │   ├── specialist-1.md        # 专门化代理
│   │   └── specialist-2.md
│   ├── skills/                    # 项目级技能
│   │   └── custom-skill/
│   │       └── SKILL.md
│   └── commands/                  # 自定义命令
│       └── custom-cmd.md
│
├── CLAUDE.md                      # 项目指令文件（路由表）
├── docs/
│   ├── plans/                     # 设计文档
│   │   └── YYYY-MM-DD-topic-design.md
│   └── architecture/              # 架构文档
│
└── src/                           # 源代码
```

### 5.2 用户级全局结构

```
~/.claude/
├── settings.json                  # 全局设置
├── CLAUDE.md                      # 全局指令
├── agents/                        # 全局代理
│   ├── README.md
│   ├── researcher.md
│   ├── coder.md
│   ├── reviewer.md
│   └── ...
├── skills/                        # 全局技能
│   └── ...
├── teams/                         # 团队配置
│   └── team-name/
│       └── config.json
└── tasks/                         # 任务列表
    └── team-name/
```

### 5.3 代理分类组织

建议按职责域组织代理：

```
.claude/agents/
├── development/                   # 开发相关
│   ├── frontend-developer.md
│   ├── backend-developer.md
│   └── devops-engineer.md
│
├── quality/                       # 质量保证
│   ├── code-reviewer.md
│   ├── test-engineer.md
│   └── security-auditor.md
│
├── research/                      # 研究分析
│   ├── web-researcher.md
│   ├── data-analyst.md
│   └── documentation-writer.md
│
└── coordination/                  # 协调管理
    ├── project-manager.md
    └── architect.md
```

---

## 6. Agent 文件格式规范

### 6.1 完整模板

```markdown
---
name: agent-name
description: |
  简短描述何时使用此代理（1-3 句话）。
  包含触发示例：
  - User: "示例触发场景 1"
  - User: "示例触发场景 2"
tools: Glob, Grep, Read, Edit, Write, Bash
model: sonnet
color: blue
---

# Agent Name

一句话描述代理的核心职责。

## 专业知识

列出此代理具备的专业领域知识：
- 领域 1
- 领域 2
- 领域 3

## 工作流程

### 1. 步骤一
描述第一个步骤的具体操作。

### 2. 步骤二
描述第二个步骤的具体操作。

### 3. 步骤三
描述第三个步骤的具体操作。

## 输出格式

描述此代理产出的标准格式。

## 注意事项

- 重要规则 1
- 重要规则 2

## 常见问题处理

| 问题 | 解决方案 |
|------|----------|
| 问题 1 | 解决方案 1 |
| 问题 2 | 解决方案 2 |
```

### 6.2 最佳实践

#### Description 编写

```yaml
# 好的 description
description: |
  自动诊断和修复 Python/JAX/PyTorch 错误。
  当遇到运行时错误、类型错误、形状不匹配或训练失败时使用。

  示例：
  - User: "训练时出现形状不匹配错误"
  - User: "遇到 CUDA 内存不足错误"

# 不好的 description
description: "修复错误"  # 太模糊
```

#### 工具选择原则

| 任务类型 | 推荐工具集 | 原因 |
|----------|------------|------|
| 研究/分析 | Glob, Grep, Read, WebFetch | 只读，安全 |
| 代码修改 | + Edit, Write | 需要编辑能力 |
| 系统操作 | + Bash | 需要执行命令 |
| 完整功能 | All tools | 复杂任务 |

#### 模型选择指南

| 模型 | 适用场景 | 成本 |
|------|----------|------|
| `opus` | 复杂架构设计、重构、关键决策 | 高 |
| `sonnet` | 日常开发任务、调试、数据处理 | 中 |
| `haiku` | 简单快速任务、格式转换 | 低 |

---

## 7. 项目实现映射

### 7.1 当前项目代理分析

| 代理 | 类型 | 职责域 | 工具权限 |
|------|------|--------|----------|
| `auto-error-resolver` | Worker | 错误修复 | Edit, Write, Bash |
| `code-architecture-reviewer` | Specialist | 代码审查 | Read-only |
| `training-specialist` | Specialist | 模型训练 | Full |
| `data-pipeline-specialist` | Specialist | 数据处理 | Full |
| `code-refactor-master` | Specialist | 代码重构 | Full |
| `model-conversion-specialist` | Specialist | 模型转换 | Full |
| `web-research-specialist` | Worker | 网络研究 | Read + WebFetch |
| `documentation-architect` | Specialist | 文档编写 | Edit, Write |
| `chinese-language-configurator` | Utility | 语言配置 | Edit, Write |

### 7.2 推荐的目录重组

```
.claude/agents/
├── README.md                      # 代理目录索引
│
├── core/                          # 核心开发代理
│   ├── code-architecture-reviewer.md
│   ├── code-refactor-master.md
│   └── auto-error-resolver.md
│
├── ml-training/                   # 机器学习相关
│   ├── training-specialist.md
│   ├── data-pipeline-specialist.md
│   └── model-conversion-specialist.md
│
├── research/                      # 研究分析
│   ├── web-research-specialist.md
│   └── documentation-architect.md
│
└── utilities/                     # 工具类
    └── chinese-language-configurator.md
```

### 7.3 添加代理索引文件

创建 `.claude/agents/README.md`：

````markdown
# Claude Code Agents 目录

本目录包含项目专用的子代理定义。

## 快速索引

| 代理 | 触发场景 | 模型 |
|------|----------|------|
| [auto-error-resolver](./core/auto-error-resolver.md) | 运行时错误、CUDA 错误 | sonnet |
| [training-specialist](./ml-training/training-specialist.md) | 训练配置、分布式训练 | opus |
| ... | ... | ... |

## 调用方式

通过 Task 工具调用：

```python
Task(
    subagent_type="training-specialist",
    prompt="配置 4 卡分布式训练"
)
```

## 添加新代理

1. 复制模板文件
2. 修改 frontmatter 和内容
3. 在此索引中注册
````

### 7.4 CLAUDE.md 路由配置

```markdown
# CLAUDE.md

## Agent 使用指南

### 错误处理
- 运行时错误 → 使用 `auto-error-resolver`
- 形状不匹配 → 使用 `auto-error-resolver`

### 训练配置
- 分布式训练 → 使用 `training-specialist`
- 数据处理 → 使用 `data-pipeline-specialist`

### 代码质量
- 架构审查 → 使用 `code-architecture-reviewer`
- 代码重构 → 使用 `code-refactor-master`

## 详细代理文档
参见 `.claude/agents/README.md`
```

---

## 8. 参考资料

### 官方文档

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Agent SDK - Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents)
- [Azure AI Agent Orchestration Patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/ai-agent-orchestration-patterns/)

### GitHub 高星项目

| 项目 | Stars | 特点 |
|------|-------|------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 40k+ | 图结构工作流 |
| [microsoft/autogen](https://github.com/microsoft/autogen) | 35k+ | 多代理对话框架 |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | 30k+ | 角色扮演代理 |
| [rshah515/claude-code-subagents](https://github.com/rshah515/claude-code-subagents) | 1k+ | Claude Code 代理集合 |

### 深度阅读

- [10 Claude Code Subagents Every Developer Needs](https://dev.to/necatiozmen/10-claude-code-subagents-every-developer-needs-in-2025-2ho)
- [CrewAI Hierarchical Process](https://docs.crewai.com/en/learn/hierarchical-process)
- [AutoGen Best Practices](https://microsoft.github.io/autogen/)
- [20 Agentic AI Workflow Patterns](https://skywork.ai/posts/agentic-workflow-patterns)

---

*文档版本: 1.0*
*最后更新: 2025-03-09*
*基于: Claude Code 官方文档 + LangGraph/AutoGen/CrewAI 最佳实践*
