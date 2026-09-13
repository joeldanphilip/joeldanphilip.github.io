---
title: "When a small RTL change stops BRAM inference"
date: 2026-08-29
lastmod: 2026-08-29
draft: false
description: "A reminder to check synthesis structure when changing RAM write behavior."
tags: ["fpga", "rtl", "vivado"]
---

A functionally harmless-looking change to write enables, byte lanes, or read/write ordering can change the memory primitive Vivado infers. When timing or area moves unexpectedly after a RAM edit, check the synthesized memory structure before debugging the datapath around it.

The practical lesson is simple: **simulation equivalence does not imply identical inference**.
