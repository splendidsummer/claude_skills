#!/bin/bash
# PPTX 实时预览脚本
#
# 功能:
# 1. 将 PPTX 转换为 PDF
# 2. 在浏览器中打开，# 3. 监听文件变化，自动刷新浏览器
#
# 使用:
#   ./pptx_live_preview.sh <file.pptx>

set -e

PPTX_FILE="$1"
if [ -z "$PPTX_FILE" ]; then
    echo "用法: $0 <file.pptx>"
    exit 1
fi

PPTX_PATH="$(realpath "$PPTX_FILE")"
PDF_PATH="${PPTX_PATH%.pptx}.pdf"
DIR="$(dirname "$PPTX_PATH")"
BASENAME="$(basename "$PPTX_PATH")"

echo "📂 文件: $PPTX_PATH"

# 检查依赖
if ! command -v xdg-open &>/dev/null; then
    echo "❌ 需要 xdg-open"
    exit 1
fi

# 转换函数
convert_to_pdf() {
    echo "🔄 转换为 PDF..."
    libreoffice --headless --convert-to pdf --outdir "$DIR" "$PPTX_PATH" 2>/dev/null

    # 检查是否成功
    if [ -f "$PDF_PATH" ]; then
        echo "✅ PDF 已生成: $PDF_PATH"
        return 0
    else
        echo "❌ 转换失败"
        return 1
    fi
}

# 初始转换
convert_to_pdf || exit 1

# 打开 PDF
echo "🌐 打开浏览器..."
xdg-open "$PDF_PATH" &

echo ""
echo "✅ 预览已启动!"
echo "📌 浏览器会显示 PDF 版本"
echo ""
echo "💡 编辑 $PPTX_FILE 后，运行:"
echo "   ./refresh_preview.sh $PPTX_FILE"
echo ""
echo "   或者直接运行:"
echo "   libreoffice --headless --convert-to pdf --outdir '$DIR' '$PPTX_PATH'"
echo "   然后在浏览器中按 F5 刷新"
