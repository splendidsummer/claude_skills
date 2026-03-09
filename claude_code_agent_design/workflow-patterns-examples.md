# Agent Workflow Patterns - 实现示例

本文档提供 Claude Code 多代理工作流模式的具体实现示例。

## 模式概览

```
┌─────────────────────────────────────────────────────────────────┐
│                    Workflow Pattern Types                        │
├─────────────────────────────────────────────────────────────────┤
│  1. Sequential    - 顺序执行，前一个输出作为后一个输入           │
│  2. Hierarchical  - 主代理分解任务，子代理执行                   │
│  3. Concurrent    - 多代理并行执行独立任务                       │
│  4. Handoff       - 代理间交接上下文                             │
│  5. Group Chat    - 多代理协作讨论                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Sequential Pattern（顺序模式）

### 适用场景
- 管道式数据处理
- 依赖链任务（编译 → 测试 → 部署）
- 需要按顺序执行的步骤

### 实现示例

```python
# 场景：ML 训练流水线

async def training_pipeline(dataset_path: str):
    """顺序执行的训练流水线"""

    # Step 1: 数据准备
    data_result = await Task(
        subagent_type="data-pipeline-specialist",
        prompt=f"""
        准备训练数据：
        - 数据集路径: {dataset_path}
        - 计算归一化统计量
        - 验证数据格式
        """,
        description="准备训练数据"
    )

    # Step 2: 配置训练（依赖 Step 1 结果）
    train_result = await Task(
        subagent_type="training-specialist",
        prompt=f"""
        配置并启动训练：
        - 使用数据: {data_result}
        - 配置分布式训练
        - 设置检查点
        """,
        description="配置训练"
    )

    # Step 3: 模型转换（依赖 Step 2 结果）
    convert_result = await Task(
        subagent_type="model-conversion-specialist",
        prompt=f"""
        转换模型格式：
        - 训练结果: {train_result}
        - JAX → PyTorch
        - 验证输出一致性
        """,
        description="转换模型"
    )

    return convert_result
```

### 数据流图

```
[data-pipeline-specialist]
         │
         ▼ {dataset_path, norm_stats}
   [training-specialist]
         │
         ▼ {checkpoint_path, metrics}
[model-conversion-specialist]
         │
         ▼ {pytorch_model_path}
```

---

## 2. Hierarchical Pattern（层次模式）

### 适用场景
- 复杂项目分解
- 多专家协作
- 需要"经理"角色协调

### 实现示例

```python
# 场景：功能开发项目

async def feature_development_project(requirement: str):
    """层次化的功能开发流程"""

    # 创建团队
    TeamCreate(
        team_name="feature-dev-team",
        description="功能开发团队"
    )

    # Phase 1: 架构设计（Supervisor 视角）
    architecture_review = await Task(
        subagent_type="code-architecture-reviewer",
        prompt=f"""
        审查功能需求并设计架构：
        - 需求: {requirement}
        - 设计模块结构
        - 定义接口
        - 识别风险点
        """,
        description="架构设计"
    )

    # Phase 2: 并行实现多个模块
    implementation_tasks = [
        Task(
            subagent_type="code-refactor-master",
            prompt=f"实现核心模块: {architecture_review.core_module_spec}",
            description="实现核心模块",
            run_in_background=True
        ),
        Task(
            subagent_type="code-refactor-master",
            prompt=f"实现数据层: {architecture_review.data_layer_spec}",
            description="实现数据层",
            run_in_background=True
        ),
        Task(
            subagent_type="documentation-architect",
            prompt=f"编写 API 文档: {architecture_review.api_spec}",
            description="编写文档",
            run_in_background=True
        )
    ]

    # 等待所有实现完成
    results = await asyncio.gather(*implementation_tasks)

    # Phase 3: 集成测试
    integration_result = await Task(
        subagent_type="auto-error-resolver",
        prompt=f"""
        集成测试和错误修复：
        - 实现结果: {results}
        - 运行测试
        - 修复发现的问题
        """,
        description="集成测试"
    )

    return integration_result
```

### 组织结构图

```
                    ┌──────────────────┐
                    │  Main Agent      │
                    │  (Supervisor)    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │ code-arch-      │ │ code-refactor-  │ │ documentation-  │
    │ reviewer        │ │ master          │ │ architect       │
    └─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## 3. Concurrent Pattern（并行模式）

### 适用场景
- 独立任务同时执行
- 多源数据收集
- 时间敏感场景

### 实现示例

```python
# 场景：代码质量检查

async def code_quality_check(codebase_path: str):
    """并行执行多项代码质量检查"""

    # 定义并行任务
    tasks = {
        "code_review": Task(
            subagent_type="code-architecture-reviewer",
            prompt=f"审查代码架构和质量: {codebase_path}",
            description="代码审查",
            run_in_background=True
        ),
        "security_audit": Task(
            subagent_type="web-research-specialist",
            prompt=f"检查安全漏洞和最佳实践: {codebase_path}",
            description="安全审计",
            run_in_background=True
        ),
        "test_coverage": Task(
            subagent_type="auto-error-resolver",
            prompt=f"运行测试并分析覆盖率: {codebase_path}",
            description="测试覆盖率",
            run_in_background=True
        ),
        "docs_check": Task(
            subagent_type="documentation-architect",
            prompt=f"检查文档完整性: {codebase_path}",
            description="文档检查",
            run_in_background=True
        )
    }

    # 并行执行并收集结果
    results = {}
    for name, task in tasks.items():
        results[name] = await task

    # 汇总报告
    return generate_quality_report(results)
```

### 并行执行图

```
                    ┌──────────────────┐
                    │   Main Agent     │
                    │   (Coordinator)  │
                    └────────┬─────────┘
                             │ spawn
         ┌───────────┬───────┴───────┬───────────┐
         ▼           ▼               ▼           ▼
    ┌─────────┐ ┌─────────┐    ┌─────────┐ ┌─────────┐
    │ Reviewer│ │ Security│    │  Test   │ │  Docs   │
    └────┬────┘ └────┬────┘    └────┬────┘ └────┬────┘
         │           │               │           │
         └───────────┴───────┬───────┴───────────┘
                             │ aggregate
                             ▼
                    ┌──────────────────┐
                    │  Quality Report  │
                    └──────────────────┘
```

---

## 4. Handoff Pattern（交接模式）

### 适用场景
- 专业领域切换
- 人机协作
- 状态保持的任务链

### 实现示例

```python
# 场景：从研究到实现的交接

class AgentHandoff:
    """代理交接管理器"""

    def __init__(self):
        self.context = {}

    def save_context(self, key: str, value: any):
        """保存上下文"""
        self.context[key] = value

    def get_context(self, key: str) -> any:
        """获取上下文"""
        return self.context.get(key)

    async def research_to_implementation(self, topic: str):
        """研究 → 实现交接流程"""

        handoff = AgentHandoff()

        # Phase 1: 研究阶段
        research_result = await Task(
            subagent_type="web-research-specialist",
            prompt=f"研究最佳实践和解决方案: {topic}"
        )
        handoff.save_context("research", research_result)

        # Phase 2: 设计交接
        design_result = await Task(
            subagent_type="code-architecture-reviewer",
            prompt=f"""
            基于研究结果设计实现方案：
            - 研究发现: {handoff.get_context("research")}
            - 设计架构
            - 定义接口
            """
        )
        handoff.save_context("design", design_result)

        # Phase 3: 实现交接
        impl_result = await Task(
            subagent_type="code-refactor-master",
            prompt=f"""
            实现设计方案：
            - 设计方案: {handoff.get_context("design")}
            - 编写代码
            - 添加测试
            """
        )

        return impl_result
```

### 上下文流转图

```
[Research Agent] ──context──▶ [Design Agent] ──context──▶ [Implementation Agent]
       │                              │                              │
       │   {findings,                 │   {architecture,             │   {code,
       │    references,               │    interfaces,               │    tests,
       │    recommendations}          │    risks}                    │    docs}
       ▼                              ▼                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          Shared Context Store                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Group Chat Pattern（群聊模式）

### 适用场景
- 头脑风暴
- 多视角问题解决
- 代码评审讨论

### 实现示例

```python
# 场景：技术方案评审讨论

async def technical_review_discussion(proposal: str):
    """多代理技术讨论"""

    # 创建团队（群聊环境）
    TeamCreate(
        team_name="tech-review-discussion",
        description="技术方案评审讨论组"
    )

    # 创建任务列表
    TaskCreate(
        subject="评审技术方案",
        description=f"评审方案: {proposal}"
    )

    # 各专家发表意见
    experts = [
        ("code-architecture-reviewer", "架构视角"),
        ("training-specialist", "训练视角"),
        ("data-pipeline-specialist", "数据视角"),
        ("auto-error-resolver", "风险视角")
    ]

    discussions = []
    for agent, perspective in experts:
        result = await Task(
            subagent_type=agent,
            prompt=f"""
            从{perspective}评审以下技术方案：
            - 方案: {proposal}
            - 给出专业意见
            - 指出潜在问题
            - 提出改进建议
            """
        )
        discussions.append((agent, result))

    # 汇总讨论结果
    summary = await Task(
        subagent_type="documentation-architect",
        prompt=f"""
        汇总专家讨论结果：
        {discussions}
        - 列出共识点
        - 列出分歧点
        - 提出综合建议
        """
    )

    return summary
```

### 群聊交互图

```
                    ┌──────────────────┐
                    │   Discussion     │
                    │     Room         │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   ┌─────────┐         ┌─────────┐         ┌─────────┐
   │Architect│◀───────▶│ Trainer │◀───────▶│  Data   │
   └─────────┘         └─────────┘         └─────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Consensus     │
                    │    Summary       │
                    └──────────────────┘
```

---

## 最佳实践总结

### 1. 选择正确的模式

| 场景 | 推荐模式 | 原因 |
|------|----------|------|
| 数据处理流水线 | Sequential | 步骤有依赖关系 |
| 功能开发项目 | Hierarchical | 需要协调多个专家 |
| 代码质量检查 | Concurrent | 检查项独立可并行 |
| 研究到实现 | Handoff | 需要保持上下文 |
| 方案评审 | Group Chat | 需要多视角讨论 |

### 2. 性能优化

```python
# 使用 run_in_background 进行真正的并行
Task(..., run_in_background=True)

# 使用 asyncio.gather 等待多个任务
results = await asyncio.gather(*tasks)

# 合理使用缓存
if cached_result:
    return cached_result
```

### 3. 错误处理

```python
async def robust_task_execution():
    try:
        result = await Task(subagent_type="agent", prompt="task")
    except Exception as e:
        # 记录错误
        log_error(e)
        # 尝试恢复或使用备用代理
        result = await Task(subagent_type="fallback-agent", prompt="task")
    return result
```

### 4. 上下文管理

```python
# 保持上下文精简
context = {
    "essential_info": "...",
    "output_format": "..."
}

# 避免传递大量数据
# 错误：传递整个文件内容
# 正确：传递文件路径和关键摘要
```

---

## 参考资料

- [Multi-Agent Programming Architecture](./multi-agent-programming-architecture.md)
- [Claude Code Agent Documentation](https://docs.anthropic.com/en/docs/claude-code/agents)
- [LangGraph Workflow Patterns](https://langchain-ai.github.io/langgraph/)
- [Azure AI Agent Orchestration](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/ai-agent-orchestration-patterns/)
