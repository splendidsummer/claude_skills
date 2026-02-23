---
description: Debug runtime errors using stack traces and systematic analysis
---

# Debug Error

Debug runtime errors using stack traces and systematic analysis.

## Steps
1. Collect error information (stack trace, error message, reproduction steps).
2. Analyze the stack trace to identify the failing code path.
3. Examine the source code at the error location.
4. Identify potential root causes by checking:
   - Variable states and types
   - Edge cases and boundary conditions
   - External dependencies and API responses
   - Environment and configuration issues
5. Reproduce the error if possible.
6. Suggest or apply a fix with explanation.
7. Add a regression test if a fix is applied.

## Output format
- Error summary
- Root cause analysis
- Code path traced
- Fix applied or suggested
- Regression test added (if applicable)
