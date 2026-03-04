---
description: 分析 OpenPI 机器人学习数据集的分布，包括状态、动作、质量检查等
---

# OpenPI 机器人数据集分布分析

你是一个机器人学习数据专家。请对用户指定的 VLA (Vision-Language-Action) 数据集进行全面的分布分析。

## 输入参数

用户会提供：
- **数据路径**: 包含 episode 数据的目录路径
- **数据格式**: 可选，默认自动检测。支持：
  - `pickle`: episode_data.pkl 文件格式
  - `parquet`: LeRobot parquet 格式
  - `lerobot`: LeRobot 数据集格式

## 分析任务

请执行以下分析步骤，并在 Jupyter Notebook 中生成可视化结果：

### 1. 数据加载与概览

- 扫描数据目录，统计 episode 数量
- 按类别（如 success/failure）分组统计
- 加载所有数据到内存，转换为 numpy 数组

### 2. Episode 长度分析

- 计算 episode 长度统计：均值、标准差、最小值、最大值、中位数
- 绘制 episode 长度分布直方图
- 如果有 duration 信息，绘制时间分布图
- 对比 success vs failure episode 的长度差异（如适用）

### 3. 状态分布分析

- 计算每个状态维度的统计值（mean, std, min, max）
- 绘制每个维度的直方图分布
- 绘制箱线图对比各维度
- 识别零方差维度（可能是常量或传感器问题）

### 4. 动作分布分析

- 计算每个动作维度的统计值
- 绘制动作分布直方图和箱线图
- 计算动作幅度（L2 norm）分布
- 分析每个维度的方差

### 5. 数据质量检查

- 检查 NaN 和 Inf 值
- 识别零方差维度
- 检测异常值（超出 3σ 范围）
- 报告数据质量摘要

### 6. 动作平滑度分析

- 计算连续动作变化幅度
- 绘制动作变化分布
- 分析动作轨迹的平滑程度

### 7. 状态-动作相关性（可选）

- 计算状态与动作维度之间的 Pearson 相关系数
- 绘制相关性热力图
- 报告强相关（|r| > 0.5）的状态-动作对

## 输出要求

### 控制台输出
- 每个分析步骤的统计摘要
- 数据质量检查结果
- 发现的问题和警告

### 可视化输出
- 使用 matplotlib/seaborn 生成图表
- 图表应包含清晰的标题、标签和图例
- 使用子图组织相关分析

### 保存结果
- 将统计摘要保存为 JSON 文件到数据目录下
- 文件名：`dataset_statistics.json`

## 代码模板

```python
import pickle
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from tqdm import tqdm
import json

# 设置样式
sns.set_style('whitegrid')
plt.rcParams['figure.figsize'] = (12, 6)

# 用户需要提供数据路径
base_dir = Path("{{用户提供的路径}}")

# 以下是参考实现，根据实际数据格式调整

# ============ 1. 数据加载 ============
# 检测数据格式并加载
episode_folders = sorted(list(base_dir.rglob("episode_*")))
episode_folders = [f for f in episode_folders if f.is_dir() and (f / "episode_data.pkl").exists()]

all_states = []
all_actions = []
all_qvels = []
all_eef_pos = []
episode_lengths = []
episode_durations = []
episode_categories = []

for ep_folder in tqdm(episode_folders):
    pkl_file = ep_folder / "episode_data.pkl"
    with open(pkl_file, 'rb') as f:
        data = pickle.load(f)
    frames = data['frames']
    for frame in frames:
        all_states.append(frame['observation']['state'])
        all_actions.append(frame['action'])
        if 'qvel' in frame['observation']:
            all_qvels.append(frame['observation']['qvel'])
        if 'eef_pos' in frame['observation']:
            all_eef_pos.append(frame['observation']['eef_pos'])
    episode_lengths.append(len(frames))
    episode_durations.append(data.get('duration', len(frames) / 20.0))  # 默认 20Hz

# 转换为 numpy 数组
all_states = np.array(all_states)
all_actions = np.array(all_actions)

# ============ 2. Episode 长度分析 ============
print("Episode Length Statistics:")
print(f"  Mean: {np.mean(episode_lengths):.1f} frames")
print(f"  Std: {np.std(episode_lengths):.1f} frames")
print(f"  Min: {np.min(episode_lengths)} frames")
print(f"  Max: {np.max(episode_lengths)} frames")

fig, ax = plt.subplots(figsize=(10, 6))
ax.hist(episode_lengths, bins=30, edgecolor='black', alpha=0.7)
ax.axvline(np.mean(episode_lengths), color='red', linestyle='--', label=f'Mean: {np.mean(episode_lengths):.1f}')
ax.set_xlabel('Number of Frames')
ax.set_ylabel('Frequency')
ax.set_title('Episode Length Distribution')
ax.legend()
plt.show()

# ============ 3. 状态分布分析 ============
print("\nState Statistics:")
for i in range(all_states.shape[1]):
    print(f"  Dim {i}: mean={all_states[:, i].mean():.4f}, std={all_states[:, i].std():.4f}")

fig, axes = plt.subplots(4, 4, figsize=(16, 12))
for i in range(min(16, all_states.shape[1])):
    ax = axes.flatten()[i]
    ax.hist(all_states[:, i], bins=50, edgecolor='black', alpha=0.7)
    ax.set_title(f'State Dim {i}')
plt.tight_layout()
plt.show()

# ============ 4. 动作分布分析 ============
# 类似状态的分析...

# ============ 5. 数据质量检查 ============
print("\nData Quality Checks:")
print(f"  NaN in states: {np.isnan(all_states).sum()}")
print(f"  NaN in actions: {np.isnan(all_actions).sum()}")
print(f"  Inf in states: {np.isinf(all_states).sum()}")
print(f"  Inf in actions: {np.isinf(all_actions).sum()}")

# 零方差检测
state_variances = np.var(all_states, axis=0)
zero_var_dims = np.where(state_variances < 1e-10)[0]
if len(zero_var_dims) > 0:
    print(f"  Zero variance state dimensions: {zero_var_dims}")

# ============ 6. 动作平滑度分析 ============
action_deltas = np.diff(all_actions, axis=0)
action_delta_magnitudes = np.linalg.norm(action_deltas, axis=1)
print(f"\nAction Smoothness:")
print(f"  Mean change: {action_delta_magnitudes.mean():.6f}")
print(f"  Max change: {action_delta_magnitudes.max():.6f}")

# ============ 7. 保存统计结果 ============
stats_summary = {
    "dataset_info": {
        "total_episodes": len(episode_lengths),
        "total_frames": len(all_states),
    },
    "episode_stats": {
        "length_mean": float(np.mean(episode_lengths)),
        "length_std": float(np.std(episode_lengths)),
        "length_min": int(np.min(episode_lengths)),
        "length_max": int(np.max(episode_lengths)),
    },
    "state_stats": {
        "dimensions": int(all_states.shape[1]),
        "mean_per_dim": all_states.mean(axis=0).tolist(),
        "std_per_dim": all_states.std(axis=0).tolist(),
    },
    "action_stats": {
        "dimensions": int(all_actions.shape[1]),
        "mean_per_dim": all_actions.mean(axis=0).tolist(),
        "std_per_dim": all_actions.std(axis=0).tolist(),
    }
}

with open(base_dir / "dataset_statistics.json", 'w') as f:
    json.dump(stats_summary, f, indent=2)
print(f"\nStatistics saved to: {base_dir / 'dataset_statistics.json'}")
```

## 注意事项

1. 自动检测数据格式：
   - 检查是否存在 `episode_data.pkl` 文件 → pickle 格式
   - 检查是否存在 `*.parquet` 文件 → parquet 格式
   - 检查是否存在 `meta/info.json` → LeRobot 格式

2. 处理大数据集时使用采样策略，避免内存溢出

3. 根据实际数据维度调整可视化布局

4. 如果数据中包含额外的字段（如 qvel, eef_pos, images），也要进行分析

5. 对于图像数据，分析其分辨率、通道数、亮度分布等
