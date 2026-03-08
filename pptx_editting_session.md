# PPTX 交互式编辑 Session 总结

## 创建的工具

| 文件 | 功能 |
|------|------|
| `pptx_live_editor.py` | 交互式命令行编辑器 |
| `pptx_web_viewer.py` | Web 实时预览器 |
| `pptx_simple_preview.py` | 简单 HTML 预览生成器 |
| `pptx_hot_reload.py` | LibreOffice 热重载桥接 |
| `pptx_edit.sh` | Bash 编辑 + PDF 更新脚本 |
| `pptx_live_preview.sh` | PDF + 浏览器预览脚本 |

---

## 推荐工作流

### 方案 1: PDF 预览 (最可靠)

```bash
# 1. 打开 PDF 预览
libreoffice --headless --convert-to pdf NexusAI_Product_Launch.pptx
xdg-open NexusAI_Product_Launch.pdf

# 2. 编辑后更新
libreoffice --headless --convert-to pdf NexusAI_Product_Launch.pptx
# 然后在 PDF 阅读器按 Ctrl+R 刷新
```

### 方案 2: python-pptx 直接编辑

```python
from pptx import Presentation

prs = Presentation("NexusAI_Product_Launch.pptx")

# 修改标题
slide = prs.slides[0]
for shape in slide.shapes:
    if shape.has_text_frame and "NexusAI" in shape.text_frame.text:
        for para in shape.text_frame.paragraphs:
            for run in para.runs:
                run.text = run.text.replace("NexusAI", "MyProduct")

# 添加幻灯片
layout = prs.slide_layouts[0]
prs.slides.add_slide(layout)

# 删除幻灯片
rId = prs.slides._sldIdLst[idx].rId
prs.part.drop_rel(rId)
del prs.slides._sldIdLst[idx]

# 保存
prs.save("NexusAI_Product_Launch.pptx")
```

---

## 常用编辑命令

| 操作 | 代码 |
|------|------|
| 列出幻灯片 | `print([(i, s.shapes[0].text[:20]) for i,s in enumerate(prs.slides)])` |
| 修改文本 | `run.text = "新文本"` |
| 添加幻灯片 | `prs.slides.add_slide(prs.slide_layouts[0])` |
| 删除幻灯片 | `del prs.slides._sldIdLst[idx]` |

---

## 延迟对比

| 方案 | 修改延迟 | 刷新方式 |
|------|---------|---------|
| pptxgenjs | 3-5秒 | 手动重开 |
| python-pptx + PDF | <1秒 | F5 刷新 |
| Web 预览器 | <0.5秒 | 自动/手动 |

---

## 当前文件

- **PPTX**: `NexusAI_Product_Launch.pptx` (13页)
- **PDF**: `NexusAI_Product_Launch.pdf`
- **标题已改为**: MyProduct

---

## 注意事项

1. **LibreOffice 不会自动刷新** - 必须关闭重开或使用 PDF 方案
2. **PDF 方案最可靠** - 保留所有格式、形状、颜色
3. **python-pptx 格式有限** - 主要用于文本编辑，复杂形状需要 XML 编辑

---

## Skill 更新记录

更新了 `.claude/skills/pptx/SKILL.md`:
- 添加了 Quick Reference 表格
- 添加了 Interactive Editing Workflow 部分
- 添加了 Opening Files 部分 (xdg-open)
- 添加了 Theme Integration 部分

更新了 `.claude/skills/pptx/editing.md`:
- 添加了 Content Operations 部分
- 添加了 Adding Shapes, Images, Tables, Charts, Formulas

---

*Session saved: 2026-03-08*
