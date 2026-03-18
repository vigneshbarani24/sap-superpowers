---
name: using-sap-superpowers
description: Use when starting any SAP-related conversation — routes to correct SAP skills, requiring Skill tool invocation before any SAP response
---

# Using SAP Superpowers

You have SAP Superpowers — a comprehensive set of AI skills for SAP consultants covering the entire SAP lifecycle.

## The Rule

**Check for relevant SAP skills BEFORE any response or action.** If there's even a 1% chance an SAP skill applies, invoke it.

## Available Skills

| Skill | Use When |
|-------|----------|
| `sap-troubleshooting` | Debugging SAP errors, dumps, performance issues, system issues |
| `sap-go-live-readiness` | Preparing for go-live, cutover planning, readiness checks |
| `sap-estimation` | Estimating effort, timelines, or complexity for SAP work |

## Coming Soon

More process skills (brainstorming, project kickoff, code review, testing strategy, change management) and 15 reference skills covering ABAP, FI/CO, MM/SD, Basis, BTP, migration, integration, security, and more. See the [GitHub repo](https://github.com/vigneshbarani24/sap-superpowers) for the roadmap.

## Routing Logic

When the user mentions SAP topics, match against the skill table above and invoke the most relevant skill.

## Slash Commands

| Command | Skill |
|---------|-------|
| `/sap-debug` | `sap-troubleshooting` |
| `/sap-estimate` | `sap-estimation` |
