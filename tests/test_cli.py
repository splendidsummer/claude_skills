import os
import subprocess
import sys
from pathlib import Path


def test_cli_add():
    root = Path(__file__).resolve().parents[1]
    src = root / "src"
    env = os.environ.copy()
    current_pythonpath = env.get("PYTHONPATH", "")
    env["PYTHONPATH"] = (
        f"{src}{os.pathsep}{current_pythonpath}" if current_pythonpath else str(src)
    )

    result = subprocess.run(
        [sys.executable, "-m", "demo_app.cli", "add", "3", "4"],
        capture_output=True,
        text=True,
        check=True,
        env=env,
    )
    assert result.stdout.strip() == "7.0"
