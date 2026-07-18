---
title: 传统RAG替代趋势与LLM Wiki方案
category: 我的感悟
layout: layouts/article.njk
---

传统RAG（检索增强生成）在2026年正被替代，原因是LLM上下文窗口已扩展至1M token，切片检索不再必要。Karpathy推广LLM Wiki方案：将小规模知识库组织成Markdown维基结构，直接塞入prompt，避免切片误差和检索召回问题，且能利用prefix cache降成本。但RAG在企业数据隐私、超大规模知识库、多租户场景下仍为首选。此外，Memory系统侧重个性化记忆，Agentic Retrieval则让Agent自主决定检索策略，逐步取代传统被动管道。