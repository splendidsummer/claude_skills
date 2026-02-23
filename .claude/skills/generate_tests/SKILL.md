# Skill: Generate Tests

Auto-generate comprehensive test suites for existing code.

## Steps
1. Identify the target module or function to test.
2. Analyze the code to determine:
   - Input parameters and their types
   - Return values and side effects
   - Edge cases and boundary conditions
   - Error handling paths
   - Dependencies to mock
3. Generate tests covering:
   - Happy path scenarios
   - Edge cases (empty input, None, zero, negative, overflow)
   - Error cases (invalid input, exceptions)
   - Boundary conditions
4. Follow existing test patterns and conventions in the project.
5. Use appropriate fixtures and mocking as needed.
6. Run the generated tests to ensure they pass.

## Output format
- Test file(s) created or updated
- Number of test cases generated
- Coverage areas (happy path, edge cases, error handling)
- All tests passing confirmation
