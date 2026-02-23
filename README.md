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

Each skill can be invoked in two ways:
- **Slash command**: Type `/skill_name` in the conversation
- **Skill syntax**: Type `Use skill skill_name` in the conversation

---

#### Core Development Skills

##### `/repo_audit` — Analyze Repository Structure
> Scans the project directory, identifies modules, configs, tests, and provides a full overview.

```
# Slash command
/repo_audit

# Skill syntax
Use skill repo_audit
```

**Example usage:**
```
/repo_audit
→ Returns: project structure, main modules, testing setup, config files found
```

---

##### `/run_tests` — Run Test Suite
> Runs pytest and reports passed, failed, and skipped tests with error details.

```
# Slash command
/run_tests

# Skill syntax
Use skill run_tests
```

**Example usage:**
```
/run_tests
→ Returns: test summary (passed/failed/skipped), failure messages, coverage report
```

---

##### `/code_review` — Review Code Changes
> Reviews changed files for logic errors, security issues, style, test coverage, and documentation.

```
# Slash command
/code_review

# Skill syntax
Use skill code_review
```

**Example usage:**
```
/code_review
→ Returns: summary of files reviewed, issues by severity, improvement suggestions
```

---

##### `/git_commit` — Create a Git Commit
> Reviews staged/unstaged changes, drafts a conventional commit message, and creates the commit.

```
# Slash command
/git_commit

# Skill syntax
Use skill git_commit
```

**Example usage:**
```
/git_commit
→ Returns: files staged, commit message, commit SHA
```

---

##### `/lint_code` — Run Linting Tools
> Detects linting configuration and runs appropriate linters (ruff, flake8, mypy, etc.).

```
# Slash command
/lint_code

# Skill syntax
Use skill lint_code
```

**Example usage:**
```
/lint_code
→ Returns: linting tools run, issues found, severity levels
```

---

##### `/implement_feature` — Implement a New Feature
> Implements a feature following existing code patterns, writes tests, and verifies everything passes.

```
# Slash command
/implement_feature Add a power function to math_utils

# Skill syntax
Use skill implement_feature Add a modulo operation to the CLI
```

**Example usage:**
```
/implement_feature Add an exponentiation function
→ Returns: files modified/created, implementation description, test coverage added
```

---

##### `/fix_bug` — Fix a Bug
> Reproduces the bug, identifies root cause, applies a minimal fix, and adds a regression test.

```
# Slash command
/fix_bug divide(10, 0) does not raise a clear error

# Skill syntax
Use skill fix_bug The CLI crashes when no arguments are provided
```

**Example usage:**
```
/fix_bug Division by zero returns infinity instead of raising an error
→ Returns: root cause, files modified, regression test added
```

---

##### `/run_cli` — Run the CLI Application
> Identifies the CLI entry point, runs it with the given arguments, and reports output.

```
# Slash command
/run_cli add 3 4

# Skill syntax
Use skill run_cli div 10 2
```

**Example usage:**
```
/run_cli mul 6 7
→ Returns: command executed, CLI output (42), any errors
```

---

##### `/auto_pr` — Create a GitHub Pull Request
> Lints, formats, tests, commits, pushes, and opens a PR via MCP GitHub — all in one step.

```
# Slash command
/auto_pr

# Skill syntax
Use skill auto_pr
```

**Example usage:**
```
/auto_pr
→ Returns: branch name, commit hash, PR title, PR URL
```

---

#### Advanced Power Skills

##### `/refactor_code` — Refactor Code
> Identifies code smells (duplication, long functions, tight coupling) and applies incremental refactoring while preserving behavior.

```
# Slash command
/refactor_code Simplify the math_utils module

# Skill syntax
Use skill refactor_code Extract common validation logic into a helper
```

**Example usage:**
```
/refactor_code The CLI argument parsing is too complex
→ Returns: code smells found, refactoring plan, files modified, tests passed
```

---

##### `/generate_docs` — Auto-Generate Documentation
> Scans source files, analyzes signatures and docstrings, and generates/updates documentation.

```
# Slash command
/generate_docs

# Skill syntax
Use skill generate_docs Add docstrings to math_utils.py
```

**Example usage:**
```
/generate_docs
→ Returns: files documented, style used, additions/updates summary, undocumented APIs flagged
```

---

##### `/security_audit` — Security Vulnerability Scan
> Checks dependencies for CVEs, reviews code for injection/XSS/hardcoded secrets, and runs security tools.

```
# Slash command
/security_audit

# Skill syntax
Use skill security_audit
```

**Example usage:**
```
/security_audit
→ Returns: vulnerability summary (critical/high/medium/low), findings with file locations, remediation steps
```

---

##### `/debug_error` — Debug Runtime Errors
> Analyzes stack traces, traces code paths, identifies root causes, and suggests or applies fixes.

```
# Slash command
/debug_error TypeError: unsupported operand type(s) for +: 'int' and 'str'

# Skill syntax
Use skill debug_error The app crashes when I run `python -m demo_app.cli add foo bar`
```

**Example usage:**
```
/debug_error ZeroDivisionError in math_utils.py line 15
→ Returns: error summary, root cause analysis, code path traced, fix suggested
```

---

##### `/generate_tests` — Auto-Generate Test Suites
> Analyzes code to generate comprehensive tests covering happy paths, edge cases, error handling, and boundary conditions.

```
# Slash command
/generate_tests Generate tests for math_utils.py

# Skill syntax
Use skill generate_tests Cover edge cases for the divide function
```

**Example usage:**
```
/generate_tests Add tests for cli.py
→ Returns: test files created, number of test cases, coverage areas, all tests passing
```

---

##### `/explain_code` — Deep Code Explanation
> Provides architecture overview, module breakdown, data flow analysis, and identifies design patterns.

```
# Slash command
/explain_code Explain the overall project architecture

# Skill syntax
Use skill explain_code Walk me through how the CLI processes commands
```

**Example usage:**
```
/explain_code How does github_utils.py work?
→ Returns: architecture overview, module breakdown, data flow, design patterns, complexity areas
```

---

##### `/dependency_update` — Update Dependencies
> Lists current versions, checks for updates, assesses risk, and applies updates incrementally with test verification.

```
# Slash command
/dependency_update

# Skill syntax
Use skill dependency_update Check for outdated packages
```

**Example usage:**
```
/dependency_update
→ Returns: current versions, available updates by risk level, updates applied, test results
```

---

##### `/performance_profile` — Profile & Optimize Performance
> Identifies performance bottlenecks, runs profiling tools, and suggests optimizations with benchmarks.

```
# Slash command
/performance_profile Profile the math_utils module

# Skill syntax
Use skill performance_profile Find slow operations in the codebase
```

**Example usage:**
```
/performance_profile The CLI feels slow to start
→ Returns: bottlenecks identified, profiling results, optimization suggestions, before/after benchmarks
```

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
