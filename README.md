# Claude Code CLI + MCP Template (Ubuntu + GitHub)

This is a runnable starter template for using Claude Code CLI with MCP servers
(filesystem + GitHub), plus reusable skills.

## Features
- MCP filesystem server
- MCP GitHub server
- Skills for repo audit, bugfix, writing tests, opening PR
- A small runnable Python demo project
- pytest included

## Setup

### Create venv
```bash
python3 -m venv .venv
source .venv/bin/activate
```


### Install dependencies
```bash
pip install -e ".[dev]"
```

### Configure environment variables

Copy .env.example to .env:
```bash
cp .env.example .env
``` 

Edit .env and set your GitHub token:

Create token: https://github.com/settings/tokens

Required scopes: repo

### Run demo app
```bash
python -m demo_app.cli add 3 4
```

### Run tests
```
pytest -q
```

## Code Quality Tools

This project uses [ruff](https://docs.astral.sh/ruff/) for linting and [black](https://black.readthedocs.io/) for code formatting, integrated via [pre-commit](https://pre-commit.com/) hooks.

### Install pre-commit hooks
```bash
make precommit-install
```

This will automatically run linting and formatting checks before each commit.

### Manual commands
```bash
make lint          # 检查代码问题
make format        # 自动修复并格式化代码
make precommit-run # 对所有文件运行 pre-commit 检查
```

### Skills Usage

List all available skills by typing `/skills` in the conversation.

#### Core Development Skills
- `/run_tests` - Run the test suite and report results
- `/code_review` - Review code changes for quality, bugs, and best practices
- `/git_commit` - Create a git commit with proper changes
- `/lint_code` - Run linting tools to check code quality
- `/repo_audit` - Analyze repository structure and provide an overview
- `/implement_feature` - Implement a new feature with proper structure and tests
- `/fix_bug` - Fix a bug with minimal, targeted changes and add a regression test
- `/run_cli` - Run the project's CLI application

#### Advanced Power Skills
- `/refactor_code` - Refactor code for better design, readability, and maintainability
- `/generate_docs` - Auto-generate documentation from code
- `/security_audit` - Scan code for security vulnerabilities and suggest fixes
- `/debug_error` - Debug runtime errors using stack traces and systematic analysis
- `/generate_tests` - Auto-generate comprehensive test suites for existing code
- `/explain_code` - Provide deep code explanation and architecture walkthrough
- `/dependency_update` - Update and manage project dependencies safely
- `/performance_profile` - Profile code and suggest performance optimizations

## Contributing
- Fork the repository and create a new branch for your feature or bugfix.
- Make your changes and ensure all tests pass.
- Open a pull request with a clear description of your changes and the problem it solves.
- Follow the code style and best practices used in the project.
- Add unit tests for any new features or bug fixes.
- Update documentation if necessary.
- Be responsive to feedback and make necessary changes to your pull request.
## License
This project is licensed under the MIT License. See the LICENSE file for details.
