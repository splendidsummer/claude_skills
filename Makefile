# 安装项目：创建虚拟环境，激活它，安装依赖（包含开发依赖）
install:
	python3 -m venv .venv && . .venv/bin/activate && pip install -e ".[dev]"

# 运行测试：激活虚拟环境，执行 pytest 静默模式
test:
	. .venv/bin/activate && pytest -q

# 运行演示程序：激活虚拟环境，执行 CLI 加法示例
run:
	. .venv/bin/activate && python -m demo_app.cli add 3 4

# 代码检查：激活虚拟环境，用 ruff 检查代码问题
lint:
	. .venv/bin/activate && ruff check .

# 代码格式化：激活虚拟环境，用 ruff 自动修复问题，再用 black 格式化
format:
	. .venv/bin/activate && ruff check . --fix && black .

# 安装 pre-commit 钩子：激活虚拟环境，安装 git 提交前的自动检查
precommit-install:
	. .venv/bin/activate && pre-commit install

# 运行 pre-commit：激活虚拟环境，对所有文件执行提交前检查
precommit-run:
	. .venv/bin/activate && pre-commit run --all-files
