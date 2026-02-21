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
pip install -r requirements.txt
3) Configure environment variables

Copy .env.example to .env:

cp .env.example .env

Edit .env and set your GitHub token:

Create token: https://github.com/settings/tokens

Required scopes: repo

### Run demo app
python -m demo_app.cli add 3 4

### Run tests
pytest -q

### Skills Usage

List all available skills by typing `/skills` or `/repo_audit` in the conversation.

Available skills:
- `/run_tests` - Run the test suite and report results
- `/code_review` - Review code changes for quality, bugs, and best practices
- `/git_commit` - Create a git commit with proper changes
- `/lint_code` - Run linting tools to check code quality
- `/repo_audit` - Analyze repository structure and provide an overview
- `/implement_feature` - Implement a new feature with proper structure and tests
- `/fix_bug` - Fix a bug with minimal, targeted changes and add a regression test
- `/run_cli` - Run the project's CLI application

You can also invoke skills with "Use skill":

- `Use skill repo_audit to analyze this project.`
- `Use skill write_tests to generate tests for github_utils.py`
- Use MCP GitHub to create an issue called "Improve CLI error handling"
