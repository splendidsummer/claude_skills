#!/usr/bin/env python3
"""
PPTX 热重载服务 - 自动监听文件变化并刷新 LibreOffice

这个服务会:
1. 监听 .pptx 文件的变化
2. 自动通知 LibreOffice 刷新文档

使用方法:
  python pptx_hot_reload.py <file.pptx> &

然后在另一个终端使用 python-pptx 编辑文件， LibreOffice 会自动刷新
"""

import os
import sys
import subprocess
import time
from pathlib import Path

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler, FileModifiedEvent
except ImportError:
    print("安装 watchdog: pip install watchdog")
    sys.exit(1)


class PPTXReloadHandler(FileSystemEventHandler):
    def __init__(self, filepath):
        self.filepath = Path(filepath).resolve()
        self.last_modified = 0
        self.libreoffice_pids = self._find_libreoffice_pids()
        print(f"👀 监听: {self.filepath}")
        print(f"📑 LibreOffice PIDs: {self.libreoffice_pids}")

    def _find_libreoffice_pids(self):
        """查找 LibreOffice 进程"""
        try:
            result = subprocess.run(
                ["pgrep", "-f", "libreoffice.*impress"],
                capture_output=True,
                text=True
            )
            pids = [int(p) for p in result.stdout.strip().split() if p]
            return pids
        except:
            return []

    def on_modified(self, event):
        if isinstance(event, FileModifiedEvent):
                    if Path(event.src_path).resolve() == self.filepath:
                        # 防抖
                        current_time = time.time()
                        if current_time - self.last_modified < 1:
                            return
                        self.last_modified = current_time

                        print(f"\n🔄 检测到文件变化，刷新 LibreOffice...")
                        self._refresh_libreoffice()

    def _refresh_libreoffice(self):
        """刷新 LibreOffice"""
        # 方法1: 使用 dbus 发送刷新信号（如果 LibreOffice 支持）
        # 方法2: 发送 USR1 信号让 LibreOffice 重新加载
        self.libreoffice_pids = self._find_libreoffice_pids()

        for pid in self.libreoffice_pids:
            try:
                os.kill(pid, 10)  # SIGUSR1
                print(f"  ✅ 发送刷新信号到 PID {pid}")
            except ProcessLookupError:
                pass

        # 方法3: 作为备选，提示用户手动刷新
        print("  💡 如果未自动刷新，请按 F5 或关闭/重新打开")


def main():
    if len(sys.argv) < 2:
        print("用法: python pptx_hot_reload.py <file.pptx>")
        sys.exit(1)

    filepath = Path(sys.argv[1]).resolve()
    if not filepath.exists():
        print(f"❌ 文件不存在: {filepath}")
        sys.exit(1)

    # 打开文件
    print(f"📂 打开文件...")
    subprocess.Popen(
        ["libreoffice", str(filepath)],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    # 等待 LibreOffice 启动
    time.sleep(2)

    # 设置监听
    handler = PPTXReloadHandler(filepath)
    observer = Observer()
    observer.schedule(handler, str(filepath.parent), recursive=False)
    observer.start()

    print("\n✅ 热重载服务已启动")
    print("📝 现在可以在另一个终端编辑文件，LibreOffice 会自动刷新")
    print("🛑 按 Ctrl+C 停止\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\n👋 停止监听")

    observer.join()


if __name__ == "__main__":
    main()
