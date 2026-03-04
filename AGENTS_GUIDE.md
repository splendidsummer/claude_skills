# Claude Code Agents/Skills/Plugins 完全指南

本文档全面介绍 Claude Code 的热门开源项目、自定义 Agents、Skills、Plugins、Commands 以及最佳实践。

---

## 目录

1. [热门 Agent 项目](#热门-agent-项目)
2. [热门 Skills/Plugins/Commands 项目](#热门-skillspluginscommands-项目)
3. [已配置的自定义 Agents](#已配置的自定义-agents)
4. [官方推荐 Skills](#官方推荐-skills)
5. [最佳实践](#最佳实践)
6. [快速参考](#快速参考)

---

## 热门 Agent 项目

### 1. system-prompts-and-models-of-ai-tools
- **Stars**: 127,326 ⭐
- **GitHub**: https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools
- **描述**: 包含 Augment Code、Claude Code、Cursor、Devin AI、Windsurf 等多个 AI 工具的系统提示词。适合学习 prompt engineering。

### 2. claude-code (官方)
- **Stars**: 72,869 ⭐
- **GitHub**: https://github.com/anthropics/claude-code
- **描述**: Anthropic 官方仓库，包含 CLI 工具源码和文档。**强烈推荐关注**。

### 3. everything-claude-code
- **Stars**: 57,448 ⭐
- **GitHub**: https://github.com/affaan-m/everything-claude-code
- **描述**: 黑客松冠军的完整配置，包含 Skills、Hooks、Subagents、MCP 配置。**新手必看**。

### 4. agents (wshobson)
- **Stars**: 29,999 ⭐
- **GitHub**: https://github.com/wshobson/agents
- **包含内容**:
  - 112 个专业 agents
  - 146 个 agent skills
  - 16 个 workflow orchestrators
  - 79 个开发工具
  - 72 个 focused plugins

### 5. awesome-claude-code
- **Stars**: 25,920 ⭐
- **GitHub**: https://github.com/hesreallyhim/awesome-claude-code
- **描述**: 精选资源列表，包含 skills、hooks、slash-commands、plugins。

### 6. opcode
- **Stars**: 20,751 ⭐
- **GitHub**: https://github.com/winfunc/opcode
- **描述**: Claude Code 的 GUI 工具包，支持创建自定义 agents、管理会话。

### 7. claude-code-infrastructure-showcase
- **Stars**: 9,117 ⭐
- **GitHub**: https://github.com/diet103/claude-code-infrastructure-showcase
- **描述**: Hooks/Skills/Agents 完整配置示例。**本项目的参考来源**。

### 8. claude-code-sub-agents
- **Stars**: 1,436 ⭐
- **GitHub**: https://github.com/lst97/claude-code-sub-agents
- **描述**: 全栈开发专用 sub-agents 集合。

---

## 热门 Skills/Plugins/Commands 项目

### 1. skills (Anthropic 官方)
- **Stars**: 81,662 ⭐
- **GitHub**: https://github.com/anthropics/skills
- **包含内容**:
  - `skill-creator` - 用自然语言创建 Skills
  - `document-skills` - 文档处理
  - `example-skills` - 示例技能
- **安装**: `/plugin marketplace add anthropics/skills`

### 2. awesome-claude-code-toolkit
- **Stars**: 621 ⭐
- **GitHub**: https://github.com/rohitg00/awesome-claude-code-toolkit
- **包含内容**:
  - 135 个 agents
  - 35 个精选 skills (+15,000 via SkillKit)
  - 42 个 commands
  - 120 个 plugins
  - 19 个 hooks
  - 15 个 rules

### 3. claude-forge
- **Stars**: 358 ⭐
- **GitHub**: https://github.com/sangrokjung/claude-forge
- **包含内容**:
  - 11 个 AI agents
  - 36 个 commands
  - 15 个 skills
  - 6 层安全 hooks
  - 5 分钟安装
- **安装**: `/plugin marketplace add sangrokjung/claude-forge`

### 4. .claude (travisjneuman)
- **Stars**: 16 ⭐
- **GitHub**: https://github.com/travisjneuman/.claude
- **包含内容**:
  - 119 个 skills
  - 59 个 agents
  - 84 个 marketplace repos (5,400+ 社区 skills)
  - 30 个 commands
  - 10 个 hooks
- **特点**: 零配置，自动激活合适资源

### 5. claude-code-toolkit-legacy
- **GitHub**: https://github.com/redpop/claude-code-toolkit-legacy
- **包含内容**:
  - 70+ slash commands
  - 专业 AI agents
  - 自动化 workflows
  - 安全审计、性能优化管道

### 6. plugin-dev (sjnims)
- **GitHub**: https://github.com/sjnims/plugin-dev
- **包含内容**: 8 个专家 skills，涵盖 hooks、MCP、commands、agents

---

## 已配置的自定义 Agents

所有 agents 位于全局目录 `~/.claude/agents/`，对所有项目可用。

### Agent 1: code-architecture-reviewer (代码架构审查员)

**文件**: `~/.claude/agents/code-architecture-reviewer.md`

**参考来源**: [claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) (9,117 ⭐)

**用途**: 审查代码的最佳实践、架构一致性、系统集成。

**调用方式**:
```bash
"使用 code-architecture-reviewer 审查我刚写的训练代码"
"检查我的模型代码是否符合项目规范"
```

**审查内容**:
- 代码质量（类型提示、错误处理、命名规范）
- 架构评估（模块归属、关注点分离）
- ML/机器人专项（tensor shapes、梯度处理）
- 集成验证（配置兼容性、transform pipeline）

---

### Agent 2: auto-error-resolver (自动错误解决器)

**文件**: `~/.claude/agents/auto-error-resolver.md`

**参考来源**: [claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) (9,117 ⭐)

**用途**: 自动诊断和修复 Python/JAX/PyTorch 错误。

**调用方式**:
```bash
"使用 auto-error-resolver 解决这个 CUDA 错误"
"Training is failing with shape mismatch error"
```

**处理错误类型**:
| 类别 | 错误类型 |
|------|---------|
| JAX | shape mismatch、sharding、checkpoint |
| PyTorch | CUDA OOM、DDP、safetensors |
| 数据 | LeRobot 加载、transform 失败 |
| 训练 | loss divergence、NaN/Inf |

---

### Agent 3: web-research-specialist (网络研究专家)

**文件**: `~/.claude/agents/web-research-specialist.md`

**参考来源**: [claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) (9,117 ⭐)

**用途**: 在互联网上搜索技术信息、调试方案、最佳实践。

**调用方式**:
```bash
"使用 web-research-specialist 研究 JAX 内存优化"
"查找这个错误的解决方案"
```

**信息来源**: GitHub Issues、ArXiv、Stack Overflow、官方文档、Reddit

---

### Agent 4: code-refactor-master (代码重构大师)

**文件**: `~/.claude/agents/code-refactor-master.md`

**参考来源**: [claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) (9,117 ⭐)

**用途**: 代码重构、架构改进、文件重组。

**调用方式**:
```bash
"使用 code-refactor-master 重构训练脚本"
"这个文件太大了，帮我拆分"
```

**流程**: 发现 → 规划 → 执行 → 验证

---

### Agent 5: documentation-architect (文档架构师)

**文件**: `~/.claude/agents/documentation-architect.md`

**参考来源**: [claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) (9,117 ⭐)

**用途**: 创建、更新项目文档。

**调用方式**:
```bash
"使用 documentation-architect 为新功能写文档"
"更新 README"
```

---

### Agent 6: training-specialist (训练专家)

**文件**: `~/.claude/agents/training-specialist.md`

**参考来源**: 针对深度学习项目定制

**用途**: VLA 模型训练配置、分布式训练、超参数调优。

**调用方式**:
```bash
"使用 training-specialist 配置 4 GPU 分布式训练"
"训练 loss 发散怎么办"
```

**专业领域**:
- JAX: XLA、FSDP、Orbax、Mesh
- PyTorch: DDP、gradient checkpointing
- 配置: LR schedules、batch size、EMA、LoRA

**GPU 内存参考**:
| 模式 | 内存需求 |
|------|---------|
| 推理 | >8GB |
| LoRA 微调 | >22.5GB |
| 全参数微调 | >70GB |

---

### Agent 7: data-pipeline-specialist (数据管道专家)

**文件**: `~/.claude/agents/data-pipeline-specialist.md`

**参考来源**: 针对机器人学习项目定制

**用途**: 数据加载、预处理、LeRobot 格式转换、归一化统计。

**调用方式**:
```bash
"使用 data-pipeline-specialist 转换机器人数据"
"计算归一化统计数据"
```

**支持平台**: DROID、ALOHA、LIBERO、UR5、自定义

---

### Agent 8: model-conversion-specialist (模型转换专家)

**文件**: `~/.claude/agents/model-conversion-specialist.md`

**参考来源**: 针对 JAX/PyTorch 互操作定制

**用途**: JAX ↔ PyTorch 模型格式转换。

**调用方式**:
```bash
"使用 model-conversion-specialist 将 JAX checkpoint 转为 PyTorch"
"加载预训练模型进行推理"
```

**Checkpoint 位置**:
| 模型 | 路径 |
|------|------|
| π₀ base | `gs://openpi-assets/checkpoints/pi0_base` |
| π₀-FAST | `gs://openpi-assets/checkpoints/pi0_fast_base` |
| π₀.₅ | `gs://openpi-assets/checkpoints/pi05_base` |

---

### Agent 9: chinese-language-configurator (中文语言配置器)

**文件**: `~/.claude/agents/chinese-language-configurator.md`

**用途**: 配置 Claude Code 使用中文。

**调用方式**:
```bash
"把语言设置成中文"
"配置中文语言偏好"
```

---

## 官方推荐 Skills

**来源**: [anthropics/skills](https://github.com/anthropics/skills) (81,662 ⭐)

**本地位置**: `.claude/skills/`

**安装方法**:
```bash
# 注册插件市场
/plugin marketplace add anthropics/skills

# 安装特定 skill
/plugin install document-skills@anthropics/skills
/plugin install example-skills@anthropics/skills
```

---

## 官方 Skills 详解

以下 Skills 已复制到本项目的 `.claude/skills/` 目录，可直接使用。

### 1. skill-creator (Skill 创建器)

**用途**: 用自然语言创建新 Skills、修改和改进现有 Skills、测试 Skill 性能。

**触发场景**:
- 想要用自然语言创建一个新 Skill
- 需要更新或优化现有的 Skill
- 运行评估测试 Skill 效果
- 优化 Skill 描述以提高触发准确性

**核心功能**:
- 捕获用户意图并转换为 Skill
- 编写 SKILL.md 文件（包含 YAML frontmatter 和 Markdown 指令）
- 创建测试用例和断言
- 运行基准测试和评估
- 迭代改进直到满意

**调用方式**:
```
"我想创建一个用于 X 的 skill"
"帮我优化这个 skill 的描述"
```

---

### 2. frontend-design (前端设计)

**用途**: 创建高质量、独特的前端界面，避免通用 AI 美学。

**触发场景**:
- 构建网页组件、页面、应用程序
- 设计 landing pages、dashboards
- React 组件、HTML/CSS 布局
- 美化任何 Web UI

**设计原则**:
- **排版**: 使用独特、有趣的字体组合，避免 Arial、Inter 等通用字体
- **配色**: 大胆的主导色配以锐利的强调色
- **动效**: 使用 CSS 动画和微交互
- **空间**: 非对称、重叠、对角线流动、大量留白
- **细节**: 渐变网格、噪点纹理、装饰边框

**调用方式**:
```
"帮我设计一个登录页面"
"创建一个数据可视化 dashboard"
```

---

### 3. pptx (PowerPoint 演示文稿)

**用途**: 创建、读取、编辑 PowerPoint 文件。

**触发场景**:
- 任何涉及 .pptx 文件的操作（输入或输出）
- 创建幻灯片、演示文稿、pitch deck
- 读取、解析、提取 .pptx 文件内容
- 编辑、修改现有演示文稿

**主要功能**:
```bash
# 读取/分析内容
python -m markitdown presentation.pptx

# 编辑模板
# 阅读 editing.md 获取详细指南

# 从头创建
# 阅读 pptxgenjs.md 获取指南
```

**设计建议**:
- 选择大胆、与内容相关的配色方案
- 每张幻灯片必须有视觉元素（图片、图表、图标）
- 标题使用 36-44pt，正文使用 14-16pt
- 避免纯文本幻灯片

**调用方式**:
```
"创建一个关于 X 的演示文稿"
"帮我编辑这个 PPT 文件"
```

---

### 4. pdf (PDF 处理)

**用途**: 处理所有 PDF 相关操作。

**触发场景**:
- 读取或提取 PDF 中的文本/表格
- 合并或拆分多个 PDF
- 旋转页面、添加水印
- 创建新 PDF、填充表单
- 加密/解密 PDF
- 对扫描 PDF 进行 OCR

**Python 库**:
```python
# pypdf - 基础操作
from pypdf import PdfReader, PdfWriter

# pdfplumber - 文本和表格提取
import pdfplumber

# reportlab - 创建 PDF
from reportlab.pdfgen import canvas
```

**命令行工具**:
```bash
# 提取文本
pdftotext input.pdf output.txt

# 合并 PDF
qpdf --empty --pages file1.pdf file2.pdf -- merged.pdf

# 提取图片
pdfimages -j input.pdf output_prefix
```

**调用方式**:
```
"提取这个 PDF 中的文字"
"合并这些 PDF 文件"
"把扫描的 PDF 转成可搜索的"
```

---

### 5. docx (Word 文档)

**用途**: 创建、读取、编辑 Word 文档。

**触发场景**:
- 任何涉及 .docx 文件的操作
- 创建报告、备忘录、信函、模板
- 提取或重组 .docx 文件内容
- 处理修订和批注

**创建文档** (使用 docx-js):
```javascript
const { Document, Packer, Paragraph, TextRun } = require('docx');
const doc = new Document({
  sections: [{ children: [new Paragraph({ children: [new TextRun("Hello")] })] }]
});
Packer.toBuffer(doc).then(buffer => fs.writeFileSync("doc.docx", buffer));
```

**编辑现有文档**:
```bash
# 1. 解包
python scripts/office/unpack.py document.docx unpacked/

# 2. 编辑 XML

# 3. 打包
python scripts/office/pack.py unpacked/ output.docx
```

**调用方式**:
```
"创建一个 Word 文档"
"编辑这个 .docx 文件"
```

---

### 6. xlsx (Excel 电子表格)

**用途**: 创建、读取、编辑电子表格文件。

**触发场景**:
- 任何涉及 .xlsx、.xlsm、.csv、.tsv 文件的操作
- 添加列、计算公式、格式化、图表
- 清理杂乱的表格数据
- 转换表格文件格式

**使用 pandas 进行数据分析**:
```python
import pandas as pd

# 读取
df = pd.read_excel('file.xlsx')

# 分析
df.head()
df.describe()

# 写入
df.to_excel('output.xlsx', index=False)
```

**使用 openpyxl 进行格式化和公式**:
```python
from openpyxl import Workbook, load_workbook

wb = Workbook()
sheet = wb.active
sheet['A1'] = 'Hello'
sheet['B2'] = '=SUM(A1:A10)'
wb.save('output.xlsx')
```

**重要规则**:
- 使用 Excel 公式而非硬编码值
- 蓝色文本 = 硬编码输入
- 黑色文本 = 公式和计算
- 完成后必须使用 `scripts/recalc.py` 重新计算公式

**调用方式**:
```
"创建一个包含这些数据的 Excel 文件"
"编辑这个电子表格"
```

---

### 7. mcp-builder (MCP 服务器构建)

**用途**: 创建高质量的 MCP (Model Context Protocol) 服务器。

**触发场景**:
- 构建 MCP 服务器集成外部 API 或服务
- 使用 Python (FastMCP) 或 Node/TypeScript (MCP SDK)

**开发流程**:
1. **Phase 1**: 深度研究和规划
   - 学习现代 MCP 设计
   - 研究 MCP 协议文档
   - 学习框架文档

2. **Phase 2**: 实现
   - 设置项目结构
   - 实现核心基础设施
   - 实现工具

3. **Phase 3**: 审查和测试
   - 代码质量审查
   - 构建和测试

4. **Phase 4**: 创建评估

**推荐技术栈**:
- 语言: TypeScript
- 传输: Streamable HTTP（远程）或 stdio（本地）

**调用方式**:
```
"帮我创建一个 MCP 服务器"
"构建一个集成 X API 的 MCP"
```

---

### 8. webapp-testing (Web 应用测试)

**用途**: 使用 Playwright 测试本地 Web 应用。

**触发场景**:
- 验证前端功能
- 调试 UI 行为
- 捕获浏览器截图
- 查看浏览器日志

**核心模式**:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')
    # ... 自动化逻辑
    browser.close()
```

**辅助脚本**:
```bash
# 单服务器
python scripts/with_server.py --server "npm run dev" --port 5173 -- python test.py

# 多服务器（前后端）
python scripts/with_server.py \
  --server "cd backend && python server.py" --port 3000 \
  --server "cd frontend && npm run dev" --port 5173 \
  -- python test.py
```

**调用方式**:
```
"测试这个 Web 应用"
"帮我截取页面截图"
```

---

### 9. algorithmic-art (算法艺术)

**用途**: 使用 p5.js 创建算法艺术，支持种子随机性和参数探索。

**触发场景**:
- 创建艺术代码
- 生成艺术
- 算法艺术
- 流场、粒子系统

**工作流程**:
1. **创建算法哲学** (.md 文件)
   - 命名运动（如 "Organic Turbulence"）
   - 阐述 4-6 段哲学描述

2. **p5.js 实现** (.html + .js 文件)
   - 使用模板 `templates/viewer.html`
   - 支持种子随机性
   - 参数可调

**技术要求**:
```javascript
let seed = 12345;
randomSeed(seed);
noiseSeed(seed);

let params = {
  seed: 12345,
  // 数量、比例、概率、角度、阈值等
};
```

**调用方式**:
```
"创建一个算法艺术"
"生成一个流场可视化"
```

---

### 10. canvas-design (画布设计)

**用途**: 创建精美的视觉艺术作品（PNG/PDF）。

**触发场景**:
- 创建海报
- 艺术作品
- 设计
- 其他静态视觉作品

**工作流程**:
1. **创建设计哲学** (.md 文件)
   - 命名运动（如 "Brutalist Joy"）
   - 阐述 4-6 段视觉哲学

2. **画布创作** (.pdf 或 .png 文件)
   - 高度视觉化
   - 设计驱动
   - 极少文字

**设计原则**:
- 形式、空间、色彩、构图
- 图像、图形、形状、图案
- 文字作为视觉点缀（非主要）

**调用方式**:
```
"创建一个海报"
"设计一个艺术作品"
```

---

### 11. doc-coauthoring (文档协作)

**用途**: 引导用户完成结构化的文档创作工作流。

**触发场景**:
- 编写文档
- 创建提案
- 技术规范
- 决策文档
- RFC

**三阶段工作流**:

1. **Stage 1: 上下文收集**
   - 文档类型？受众？期望影响？
   - 是否有模板？
   - 信息倾倒

2. **Stage 2: 完善和结构化**
   - 逐节构建
   - 头脑风暴 → 筛选 → 起草 → 完善
   - 迭代直到满意

3. **Stage 3: 读者测试**
   - 使用新的 Claude 实例测试
   - 预测读者可能的问题
   - 修复发现的盲点

**调用方式**:
```
"帮我写一个技术规范"
"创建一个决策文档"
```

---

### 12. theme-factory (主题工厂)

**用途**: 为幻灯片、文档、HTML 页面等工件应用主题样式。

**可用主题** (10 个预设):
1. **Ocean Depths** - 专业冷静的海洋主题
2. **Sunset Boulevard** - 温暖活力的日落色彩
3. **Forest Canopy** - 自然接地的大地色调
4. **Modern Minimalist** - 干净现代的灰度
5. **Golden Hour** - 丰富温暖的秋季色调
6. **Arctic Frost** - 清凉爽脆的冬季灵感
7. **Desert Rose** - 柔和精致的尘土色调
8. **Tech Innovation** - 大胆现代的科技美学
9. **Botanical Garden** - 新鲜有机的花园色彩
10. **Midnight Galaxy** - 戏剧性的宇宙深色调

**使用方式**:
```
"为这个演示文稿应用主题"
"看看可用的主题"
```

---

### 13. slack-gif-creator (Slack GIF 创建器)

**用途**: 创建优化的 Slack 动画 GIF。

**Slack 要求**:
- Emoji GIF: 128x128（推荐）
- 消息 GIF: 480x480
- FPS: 10-30
- 颜色: 48-128
- 时长: < 3 秒（emoji）

**核心工作流**:
```python
from core.gif_builder import GIFBuilder
from PIL import Image, ImageDraw

builder = GIFBuilder(width=128, height=128, fps=10)
for i in range(12):
    frame = Image.new('RGB', (128, 128), (240, 248, 255))
    draw = ImageDraw.Draw(frame)
    # 绘制动画
    builder.add_frame(frame)

builder.save('output.gif', num_colors=48, optimize_for_emoji=True)
```

**动画概念**: 摇晃、脉冲、弹跳、旋转、淡入淡出、滑动、缩放、爆炸

**调用方式**:
```
"创建一个 Slack GIF"
"为 Slack 做一个动画表情"
```

---

### 14. web-artifacts-builder (Web 组件构建器)

**用途**: 构建 Web 组件和工件。

---

### 15. brand-guidelines (品牌指南)

**用途**: 创建和遵循品牌指南。

---

### 16. internal-comms (内部沟通)

**用途**: 创建内部沟通内容，如 FAQ、公司通讯、团队更新等。

**示例场景**:
- FAQ 回答
- 公司通讯
- 第三方更新
- 通用沟通

---

## Skills 快速参考表

| Skill | 用途 | 触发关键词 |
|-------|------|-----------|
| `skill-creator` | 创建新 Skills | "创建 skill"、"优化 skill" |
| `frontend-design` | 前端 UI 设计 | "设计页面"、"dashboard" |
| `pptx` | PowerPoint 文件 | ".pptx"、"演示文稿"、"幻灯片" |
| `pdf` | PDF 处理 | ".pdf"、"合并 PDF"、"提取文本" |
| `docx` | Word 文档 | ".docx"、"Word 文档"、"报告" |
| `xlsx` | Excel 电子表格 | ".xlsx"、".csv"、"电子表格" |
| `mcp-builder` | MCP 服务器 | "MCP 服务器"、"集成 API" |
| `webapp-testing` | Web 应用测试 | "测试 Web"、"Playwright" |
| `algorithmic-art` | 算法艺术 | "算法艺术"、"生成艺术" |
| `canvas-design` | 视觉设计 | "海报"、"艺术作品" |
| `doc-coauthoring` | 文档协作 | "写文档"、"技术规范" |
| `theme-factory` | 主题样式 | "应用主题"、"配色方案" |
| `slack-gif-creator` | Slack GIF | "GIF"、"动画表情" |

---

## 最佳实践

### 目录结构

```bash
~/.claude/
├── agents/                    # 自定义 Agents
│   ├── code-architecture-reviewer.md
│   ├── auto-error-resolver.md
│   └── ...
├── skills/                    # Skills
│   ├── coding-standards.md
│   ├── tdd-workflow/
│   └── security-review/
├── commands/                  # Slash Commands
│   └── my-command.md
├── hooks/                     # Hooks 配置
│   └── hooks.json
├── rules/                     # 规则文件
│   ├── security.md
│   ├── coding-style.md
│   └── testing.md
└── CLAUDE.md                  # 全局配置
```

### Hooks 配置示例

**长任务提醒** (PreToolUse):
```json
{
  "PreToolUse": [{
    "matcher": "tool == \"Bash\" && tool_input.command matches \"(npm|pnpm|yarn|uv)\"",
    "hooks": [{
      "type": "command",
      "command": "if [ -z \"$TMUX\" ]; then echo '[Hook] 建议使用 tmux' >&2; fi"
    }]
  }]
}
```

**自动格式化** (PostToolUse):
```json
{
  "PostToolUse": [{
    "matcher": "Edit && .ts/.tsx",
    "hooks": ["prettier --write", "tsc --noEmit"]
  }]
}
```

### MCP 配置原则

1. **全局配置**: 20-30 个 MCP
2. **项目启用**: 每个项目 < 10 个
3. **工具总数**: < 80 个
4. **不用的全部禁用**

**常用 MCP**:
```json
{
  "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] },
  "memory": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-memory"] }
}
```

### 键盘快捷键

| 快捷键 | 功能 |
|-------|------|
| `Ctrl + U` | 删除整行 |
| `!` | 执行 bash 命令 |
| `@` | 文件搜索 |
| `/` | 触发斜杠命令 |
| `Shift + Enter` | 多行输入 |
| `Tab` | 显示/隐藏 Thinking |
| `Esc Esc` | 中断/恢复 |

### Rules 规则示例

```markdown
# 项目规则

## 编码风格
- 代码库中禁止 emoji
- 前端避免紫色系
- 优先模块化，不写巨型文件

## 测试
- 部署前必须跑测试
- 测试覆盖率 > 80%

## Git
- 禁止提交 console.log
- 使用 Conventional Commits
```

---

## 快速参考

### 安装命令

```bash
# 安装 Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# 添加插件市场
/plugin marketplace add anthropics/skills
/plugin marketplace add wshobson/agents

# 安装插件
/plugin install document-skills@anthropics/skills
```

### 管理命令

```bash
/plugins          # 查看已安装插件
/mcp               # 管理 MCP
/skills            # 查看可用 skills
/agents            # 查看可用 agents
```

### 调用 Agents 三种方式

```bash
# 方式一：直接名称
"使用 training-specialist 配置训练"

# 方式二：自然语言
"训练 loss 发散怎么办"

# 方式三：Task 工具
"启动 training-specialist agent"
```

---

## 相关资源

### 官方文档
- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Plugins Guide](https://docs.claude.com/en/docs/claude-code/plugins)
- [Claude Code Subagents Guide](https://docs.claude.com/en/docs/claude-code/sub-agents)
- [Agent Skills Guide](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)

### GitHub 仓库汇总

| 项目 | Stars | 链接 |
|------|-------|------|
| system-prompts-and-models | 127,326 | [GitHub](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) |
| claude-code (官方) | 72,869 | [GitHub](https://github.com/anthropics/claude-code) |
| everything-claude-code | 57,448 | [GitHub](https://github.com/affaan-m/everything-claude-code) |
| skills (官方) | 81,662 | [GitHub](https://github.com/anthropics/skills) |
| agents (wshobson) | 29,999 | [GitHub](https://github.com/wshobson/agents) |
| awesome-claude-code | 25,920 | [GitHub](https://github.com/hesreallyhim/awesome-claude-code) |
| opcode | 20,751 | [GitHub](https://github.com/winfunc/opcode) |
| infrastructure-showcase | 9,117 | [GitHub](https://github.com/diet103/claude-code-infrastructure-showcase) |

---

*最后更新: 2026-03-03*

---

## OpenPI 专用 Skills

### vla-openpi-dataset-analysis

**用途**: 分析 VLA (Vision-Language-Action) 数据集的分布和质量。

**触发场景**:
- 分析机器人学习数据集
- 检查预训练数据质量
- 统计 state/action 分布
- 数据探索和可视化

**分析模块**:
1. Episode 长度分析
2. 状态分布分析 (16维)
3. 动作分布分析 (16维)
4. 数据质量检查 (NaN/Inf/异常值)
5. 动作平滑度分析
6. 状态-动作相关性

**调用方式**:
```
/vla-openpi-dataset-analysis /path/to/dataset
```

---

### openpi-multi-agent

**用途**: OpenPI 多智能体协作架构，用于训练、评估和部署 VLA 模型。

**触发场景**:
- 训练 OpenPI 模型
- 评估 checkpoint
- 部署推理服务
- 配置分布式训练
- 调试训练错误

**Agent 定义**:
| Agent | 职责 |
|-------|------|
| `training_runner` | 执行训练任务 |
| `evaluation_agent` | 模型评估 |
| `inference_deployer` | 部署推理服务 |
| `safety_validator` | 验证安全约束 (Phase 2) |
| `debug_agent` | 错误诊断和修复 |
| `integration_tester` | 测试完整流水线 |

**调用方式**:
```
/openpi-multi-agent 训练 pi05_libero 配置
/openpi-multi-agent 评估 checkpoint
/openpi-multi-agent 部署推理服务
```

---

## 本地 Skills 位置

所有官方 Skills 已复制到本项目的 `.claude/skills/` 目录：

```
.claude/skills/
├── algorithmic-art/          # 算法艺术
├── brand-guidelines/         # 品牌指南
├── canvas-design/            # 画布设计
├── doc-coauthoring/          # 文档协作
├── docx/                     # Word 文档
├── frontend-design/          # 前端设计
├── internal-comms/           # 内部沟通
├── mcp-builder/              # MCP 构建
├── openpi-multi-agent/       # OpenPI 多智能体架构 ⭐ 新增
├── pdf/                      # PDF 处理
├── pptx/                     # PowerPoint
├── skill-creator/            # Skill 创建器
├── slack-gif-creator/        # Slack GIF
├── theme-factory/            # 主题工厂
├── vla-openpi-dataset-analysis/  # VLA 数据集分析 ⭐ 新增
├── webapp-testing/           # Web 测试
├── web-artifacts-builder/    # Web 组件构建
└── xlsx/                     # Excel 电子表格
```
