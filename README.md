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

<<<<<<< HEAD
=======

### Skills Usage

在 Claude Code 里你可以直接这样用

比如你输入：

Use skill repo_audit to analyze this project.

或者：

Use skill write_tests to generate tests for github_utils.py

或者：

Use MCP GitHub to create an issue called "Improve CLI error handling"




>>>>>>> be98f12 (chore: initial commit)
