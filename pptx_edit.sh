#!/bin/bash
# PPTX 实时编辑 + PDF 预览脚本
#
# 使用: source pptx_edit.sh
# 然后运行: edit "你的命令"

PPTX_FILE="NexusAI_Product_Launch.pptx"

# 编辑函数
edit() {
    python3 << PYEOF
from pptx import Presentation
import sys

prs = Presentation("$PPTX_FILE")
cmd = """$*"""

# 解析命令
parts = cmd.split(maxsplit=2)
action = parts[0].lower()

try:
    if action == "list":
        print(f"📊 共 {len(prs.slides)} 页:")
        for i, slide in enumerate(prs.slides):
            title = ""
            for shape in slide.shapes:
                if shape.has_text_frame and shape.text_frame.text.strip():
                    title = shape.text_frame.text.strip()[:30]
                    break
            print(f"  [{i}] {title}...")

    elif action == "delete" or action == "del":
        idx = int(parts[1])
        if 0 <= idx < len(prs.slides):
            rId = prs.slides._sldIdLst[idx].rId
            prs.part.drop_rel(rId)
            del prs.slides._sldIdLst[idx]
            prs.save("$PPTX_FILE")
            print(f"✅ 删除第 {idx} 页")

    elif action == "add":
        count = int(parts[1]) if len(parts) > 1 else 1
        layout = prs.slide_layouts[0]
        for _ in range(count):
            prs.slides.add_slide(layout)
        prs.save("$PPTX_FILE")
        print(f"✅ 添加 {count} 页")

    elif action == "title":
        idx = int(parts[1])
        new_title = parts[2] if len(parts) > 2 else ""
        if 0 <= idx < len(prs.slides):
            for shape in prs.slides[idx].shapes:
                if shape.has_text_frame:
                    shape.text_frame.paragraphs[0].runs[0].text = new_title
                    break
            prs.save("$PPTX_FILE")
            print(f"✅ 第 {idx} 页标题改为: {new_title}")

    else:
        print(f"❌ 未知命令: {action}")
        print("可用: list, delete <idx>, add [count], title <idx> <text>")

except Exception as e:
    print(f"❌ 错误: {e}")
PYEOF

    # 转换 PDF
    libreoffice --headless --convert-to pdf "$PPTX_FILE" 2>/dev/null
    echo "📄 PDF 已更新 - 按 F5 刷新"
}

echo "✅ 已加载编辑函数"
echo "用法: edit 'list'          # 列出幻灯片"
echo "      edit 'delete 5'       # 删除第5页"
echo "      edit 'add 2'          # 添加2页"
echo "      edit 'title 0 新名字' # 修改标题"
