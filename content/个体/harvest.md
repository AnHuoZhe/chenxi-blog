---
title: Harvest 知识收割
description: 从Hermes对话检测项目活动，自动提取设计文档写入Obsidian。V23重构：只做项目检测提取，砍掉对话碎片采集。
date: 2026-07-17
status: 已完成
layout: layouts/article.njk
permalink: /个体/harvest/
---

从Hermes对话中检测项目活动，自动提取项目设计文档写入Obsidian笔记。

## V23架构：从碎片到文档

旧版从memory和session碎片里提取知识片段（354条消息→39篇笔记），颗粒度细但容易产出混合垃圾。

V23完全重构——不再收集对话碎片。改为：扫描最近30天session→检测是否提及已知项目→读项目设计文档→提取核心内容→写入Obsidian。

11个已知项目白名单：Forge、Death Replay Agent、Pareto Learner、Harvest、晨汐博客、Weather Agent等。

## 采集逻辑

按关键词匹配检测项目（"forge"→锻造，"death-replay"→死亡复盘）。检测到后从项目docs目录取最重要的1-2个设计文档（按design/architecture/summary/README优先级），截取前3000字。摘要去重防重复采集。

## 处理流水线

采集→筛选→精炼→分类→写入Obsidian。增量扫描通过last_run.json时间戳断点。

## 关键决策

来源从"对话碎片"变成了"项目设计文档本身"。好处是笔记质量大幅提升——不再有混合垃圾。代价是只能覆盖白名单项目，对话中产生的洞察抓不到——除非写进了设计文档。
