---
description: 分析 OpenPI 机器人学习数据集的分布，包括状态、动作、质量检查等
---

# VLA OpenPI Dataset Analysis

分析 VLA (Vision-Language-Action) 数据集的分布和质量。

## 使用方式

```
/vla-openpi-dataset-analysis <数据路径>
```

## 分析内容

1. **数据加载与概览** - 扫描 episode、统计类别
2. **Episode 长度分析** - 均值、分布、success/failure 对比
3. **状态分布分析** - 16维状态统计和可视化
4. **动作分布分析** - 16维动作统计和可视化
5. **数据质量检查** - NaN/Inf、零方差、异常值
6. **动作平滑度分析** - 连续动作变化
7. **状态-动作相关性** - Pearson 相关系数热力图

## 输出

- 控制台统计摘要
- matplotlib 可视化图表
- `dataset_statistics.json` 统计文件
