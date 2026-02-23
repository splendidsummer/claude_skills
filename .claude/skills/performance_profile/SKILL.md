# Skill: Performance Profile

Profile code and suggest performance optimizations.

## Steps
1. Identify the target code or operation to profile.
2. Analyze the code for common performance issues:
   - Unnecessary loops or repeated computations
   - N+1 query patterns
   - Memory-intensive operations
   - Blocking I/O in hot paths
   - Inefficient data structures
3. Run profiling tools if available (e.g., `cProfile`, `timeit`).
4. Suggest optimizations with expected impact:
   - Algorithm improvements
   - Caching opportunities
   - Lazy evaluation
   - Batch processing
5. Implement optimizations if approved by user.
6. Benchmark before and after changes.

## Output format
- Performance bottlenecks identified
- Profiling results (if tools were run)
- Optimization suggestions with expected impact
- Before/after benchmarks (if optimizations applied)
