# Skill: VLA OpenPI Dataset Analysis

分析 OpenPI 机器人学习数据集的分布和质量。

## 触发场景

- 分析机器人学习数据集
- 检查 VLA 数据质量
- 统计 state/action 分布
- 数据探索和可视化

## 输入参数

| 参数 | 说明 |
|-----|------|
| 数据路径 | 包含 episode 数据的目录 |
| 数据格式 | pickle / parquet / lerobot (自动检测) |

## 分析模块

### 1. 数据加载与概览

```python
# 自动检测格式
episode_folders = sorted(list(base_dir.rglob("episode_*")))
# 统计类别
categories = {}
for ep in episode_folders:
    parent = ep.parent.name
    categories[parent] = categories.get(parent, 0) + 1
```

### 2. Episode 长度分析

- 统计: mean, std, min, max, median
- 直方图分布
- success vs failure 对比箱线图

### 3. 状态分布分析

- 16维状态统计 (joint positions, gripper, etc.)
- 直方图 (4x4 grid)
- 箱线图对比
- 零方差维度检测

### 4. 动作分布分析

- 16维动作统计
- L2 norm 幅度分布
- 每维方差分析

### 5. 数据质量检查

```python
# NaN/Inf 检查
nan_states = np.isnan(all_states).sum()
inf_states = np.isinf(all_states).sum()

# 零方差检测
state_variances = np.var(all_states, axis=0)
zero_var_dims = np.where(state_variances < 1e-10)[0]

# 异常值 (>3σ)
outliers = np.sum(np.abs(data - mean) > 3 * std)
```

### 6. 动作平滑度分析

```python
action_deltas = np.diff(all_actions, axis=0)
action_delta_magnitudes = np.linalg.norm(action_deltas, axis=1)
```

### 7. 状态-动作相关性

- Pearson 相关系数矩阵
- 热力图可视化
- 报告 |r| > 0.5 的强相关对

## 输出文件

**dataset_statistics.json**:
```json
{
  "dataset_info": {
    "total_episodes": 100,
    "total_frames": 33865,
    "success_episodes": 70,
    "failure_episodes": 30
  },
  "episode_stats": {
    "length_mean": 338.6,
    "length_std": 45.2,
    "duration_mean": 15.93
  },
  "state_stats": {
    "dimensions": 16,
    "mean_per_dim": [...],
    "std_per_dim": [...]
  },
  "action_stats": {
    "dimensions": 16,
    "magnitude_mean": 2.15
  }
}
```

## 代码模板

完整代码见: `~/.claude/commands/vla-openpi-dataset-analysis.md`

## 注意事项

1. 大数据集使用采样策略避免 OOM
2. 根据实际维度调整可视化布局
3. 额外字段 (qvel, eef_pos, images) 也应分析
