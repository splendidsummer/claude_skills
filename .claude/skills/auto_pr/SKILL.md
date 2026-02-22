# Skill: auto_pr

## Goal
Create a clean GitHub PR for the current changes using MCP GitHub.

## Rules
- Keep PR small and focused.
- Ensure all tests pass.
- Ensure formatting (ruff/black) passes.
- PR must contain a clear title and bullet-point summary.

## Steps
1. Run `ruff check .` and fix issues.
2. Run `black .`.
3. Run `pytest -q` and ensure green.
4. Create a branch: `feature/<short-name>` or `fix/<short-name>`.
5. Commit with message:
   - feat: ...
   - fix: ...
   - test: ...
   - docs: ...
6. Push branch.
7. Use MCP GitHub to open PR.
8. Fill PR template:
   - What changed
   - Why
   - How tested

## Output format
- Branch name
- Commit hash
- PR title
- PR URL 