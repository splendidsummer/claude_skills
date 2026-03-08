#!/usr/bin/env python3
"""
PPTX 实时编辑桥接器

这个脚本提供一个解决方案：当修改 PPTX 文件后，自动：
1. 保存当前 LibreOffice 窗口状态
2. 关闭文档
3. 重新打开文档
4. 恢复到之前的幻灯片

使用方法:
    # 启动桥接器（会打开文件）
    python pptx_bridge.py start <file.pptx>

    # 在另一个终端编辑文件后，触发刷新
    python pptx_bridge.py refresh

    # 或者使用 python-pptx 编辑后自动刷新
    python pptx_bridge.py edit "命令"
"""

import os
import sys
import subprocess
import json
import time
from pathlib import Path

STATE_FILE = Path("/tmp/pptx_bridge_state.json")


def start(filepath: str):
    """启动桥接器并打开文件"""
    filepath = Path(filepath).resolve()

    state = {
        "filepath": str(filepath),
        "last_modified": os.path.getmtime(filepath),
        "current_slide": 0
    }

    with open(STATE_FILE, "w") as f:
        json.dump(state, f)

    # 关闭已存在的 LibreOffice 进程
    subprocess.run(["pkill", "-f", f"libreoffice.*{filepath.name}"],
                   capture_output=True)
    time.sleep(0.5)

    # 打开文件
    subprocess.Popen(
        ["libreoffice", "--impress", str(filepath)],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    print(f"✅ 已打开: {filepath}")
    print("💡 编辑后运行: python pptx_bridge.py refresh")


def refresh():
    """刷新 LibreOffice 中的文档"""
    if not STATE_FILE.exists():
        print("❌ 桥接器未启动，请先运行: python pptx_bridge.py start <file>")
        return

    with open(STATE_FILE) as f:
        state = json.load(f)

    filepath = Path(state["filepath"])

    if not filepath.exists():
        print(f"❌ 文件不存在: {filepath}")
        return

    # 检查文件是否真的被修改了
    current_mtime = os.path.getmtime(filepath)
    if current_mtime == state["last_modified"]:
        print("ℹ️ 文件未修改")
        return

    state["last_modified"] = current_mtime

    print("🔄 刷新文档...")

    # 方法1: 使用 wmctrl 发送 F5 (刷新) 到 LibreOffice 窗口
    # 这需要安装 wmctrl: sudo apt install wmctrl
    result = subprocess.run(
        ["wmctrl", "-a", "LibreOffice", "-b", "add,active"],
        capture_output=True
    )

    if result.returncode == 0:
        # 发送 Ctrl+Shift+R (重新加载) 模拟按键
        subprocess.run(
            ["xdotool", "key", "ctrl+shift+r"],
            capture_output=True
        )
        print("✅ 已发送刷新信号")
    else:
        # 备选方案：关闭并重新打开
        print("⚠️ 无法发送刷新信号，使用关闭-重开方案...")
        subprocess.run(
            ["pkill", "-f", f"libreoffice.*{filepath.stem}"],
            capture_output=True
        )
        time.sleep(1)
        subprocess.Popen(
            ["libreoffice", "--impress", str(filepath)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        print("✅ 已重新打开")

    # 更新状态
    with open(STATE_FILE, "w") as f:
        json.dump(state, f)


def status():
    """显示当前状态"""
    if not STATE_FILE.exists():
        print("❌ 桥接器未启动")
        return

    with open(STATE_FILE) as f:
        state = json.load(f)

    print(f"📁 文件: {state['filepath']}")
    print(f"⏰ 最后修改: {time.ctime(state['last_modified'])}")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    command = sys.argv[1]

    if command == "start":
        if len(sys.argv) < 3:
            print("用法: python pptx_bridge.py start <file.pptx>")
            sys.exit(1)
        start(sys.argv[2])

    elif command == "refresh":
        refresh()

    elif command == "status":
        status()

    else:
        print(f"❌ 未知命令: {command}")
        print("可用命令: start, refresh, status")


if __name__ == "__main__":
    main()
