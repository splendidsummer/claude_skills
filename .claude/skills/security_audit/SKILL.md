# Skill: Security Audit

Scan code for security vulnerabilities and suggest fixes.

## Steps
1. Scan project dependencies for known vulnerabilities.
2. Review code for common security issues:
   - SQL injection
   - Cross-site scripting (XSS)
   - Hardcoded secrets or credentials
   - Insecure deserialization
   - Path traversal
   - Improper input validation
3. Check configuration files for insecure settings.
4. Run available security tools (e.g., `pip-audit`, `bandit`, `safety`).
5. Provide remediation guidance for each finding.
6. Do NOT auto-fix without user approval.

## Output format
- Vulnerability summary (critical/high/medium/low)
- Detailed findings with file locations
- Remediation recommendations
- Dependencies with known CVEs
