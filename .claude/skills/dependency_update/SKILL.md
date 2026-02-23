# Skill: Dependency Update

Update and manage project dependencies safely.

## Steps
1. List current dependencies and their versions.
2. Check for available updates (major, minor, patch).
3. Identify deprecated or unmaintained packages.
4. For each update candidate:
   - Check changelog for breaking changes
   - Assess risk level (patch vs minor vs major)
   - Check compatibility with other dependencies
5. Apply updates incrementally (patch first, then minor, then major).
6. Run tests after each update to catch regressions.
7. Do NOT apply major version updates without user approval.

## Output format
- Current dependency versions
- Available updates (grouped by risk level)
- Updates applied
- Tests passed confirmation
- Breaking changes noted (if any)
