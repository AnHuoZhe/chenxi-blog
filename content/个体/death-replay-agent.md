---
title: Death Replay Agent
description: CS2死亡复盘桌面工具——demo解析+规则引擎+LLM双引擎诊断。Electron+React深色侧栏工作台。
date: 2026-07-16
status: 已存档
layout: layouts/article.njk
permalink: /个体/death-replay-agent/
---

从CS2 demo文件中提取死亡事件，通过14个硬阈值规则标签和LLM多agent对撞自动诊断问题类型（枪法/身位/timing）。

## 技术架构

后端：Python 3.13 + FastAPI。demoparser2解析二进制demo文件→坐标、血量、武器、事件时间线。aiosqlite持久化。

前端：React 19 + Vite 6 + TailwindCSS 4。Electron打包桌面应用。Leetify风格深色侧栏布局——左侧折叠面板（Demo库/平台目录/分析配置），右侧主区域（统计卡片+诊断列表+可展开详情）。

## 组件架构

App.jsx管理折叠面板、筛选、展开项、排队Demo集合。LibraryPanel触发单Demo分析，queuedDemoIds阻止重复提交。PlatformDirectoryPanel支持Steam/FACEIT/完美世界目录扫描和自动监听。

## 数据流

用户点击诊断→App调用analyzeLibraryDemo→返回queued后ID入队→后端完成时WebSocket触发刷新→App根据done/failed清理排队标记。失败路径：API或WebSocket错误写入error状态由ErrorBanner显示。

## 诊断引擎

双层——规则引擎（14个硬阈值标签：跑打、人体描边、多角度暴露、切道具被杀等）+ LLM多agent对撞。诊断师出初稿，审查师独立审阅，驳回则修正，最多三轮。

## 前端设计教训

三次翻车。根因：后端先定义本质需求再拆模块；前端只说"让它好看点"——感觉不是需求，感觉没法验证。这个教训直接催生了锻造设计阶段的四个强制问题。

## 当前状态

已归档。v2.0.0发布GitHub：AnHuoZhe/CS2-death-replay-agent。PolyForm Noncommercial许可。
