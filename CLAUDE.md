# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Claude Code CLI + MCP starter template with a Python demo application. It includes MCP filesystem and GitHub servers, reusable skills, and demonstrates a typical Python project structure.

## Common Commands

```bash
# Setup (already done)
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Run demo CLI
python -m demo_app.cli add 3 4
python -m demo_app.cli div 10 2

# Run all tests
pytest -q

# Run a single test
pytest tests/test_math_utils.py::test_add -v

# Environment setup (copy .env.example to .env and add GITHUB_TOKEN)
```

## Architecture

The project has a simple structure:

- `src/demo_app/` - Main package
  - `math_utils.py` - Pure functions for arithmetic (add, subtract, multiply, divide)
  - `github_utils.py` - GitHub API client (requires GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME env vars)
  - `cli.py` - Command-line interface wrapping math_utils

- `tests/` - pytest test suite with fixtures in conftest.py

## Available Commands

You can now use either:
- **Slash commands** (type `/`): `/repo_audit`, `/fix_bug`, `/run_tests`, etc.
- **Skills** (type "Use skill"): `Use skill repo_audit`, `Use skill fix_bug`, etc.
- **List all skills**: `/skills`

## Environment Variables

Required for github_utils.py:
- `GITHUB_TOKEN` - GitHub personal access token (repo scope)
- `GITHUB_REPO_OWNER` - Repository owner
- `GITHUB_REPO_NAME` - Repository name
