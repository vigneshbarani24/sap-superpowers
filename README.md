<p align="center">
  <h1 align="center">⭐ SAP Superpowers</h1>
  <p align="center">
    <strong>Claude, fluent in SAP.</strong><br>
    55 skills. 25 agents. 8 commands. Open source. Free forever.
  </p>
  <p align="center">
    <a href="https://github.com/vigneshbarani24/sap-superpowers/stargazers"><img src="https://img.shields.io/github/stars/vigneshbarani24/sap-superpowers?style=for-the-badge&color=D97757&label=%E2%98%85%20stars" alt="Stars"></a>
    <a href="https://github.com/vigneshbarani24/sap-superpowers/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-0070F2?style=for-the-badge" alt="License"></a>
    <img src="https://img.shields.io/badge/telemetry-zero-10A46B?style=for-the-badge" alt="No telemetry">
  </p>
</p>

---

> **Turn Claude into a senior SAP consultant in 30 seconds.**
> Works with **Claude Free, Pro, Max, and API**. No paid tier required.

## ⚡ Install in 30 seconds

Pick whichever Claude you already have:

### Option 1 — Claude Code (Pro / Max)

```bash
/plugin marketplace add vigneshbarani24/sap-superpowers
```

### Option 2 — Claude.ai (Free or Pro, in the browser)

1. Go to [github.com/vigneshbarani24/sap-superpowers](https://github.com/vigneshbarani24/sap-superpowers)
2. Download the repo as ZIP, or clone it
3. Drag the `skills/` folder into a Claude.ai conversation as a Project
4. Ask: *"Use these skills. Help me debug this SAP error."*

That's it. **Free tier works fine** — you just paste skills as project knowledge.

### Option 3 — Any other AI IDE

Cursor, Codex, Gemini CLI, Copilot CLI — they all read Markdown. Point them at `skills/` and go.

---

## 🍳 Usage — a day in 5 prompts

The exact thing to type when each scenario hits. Copy, adapt the specifics, paste.

### 1. A dump lands in production

```text
/sap-debug — MESSAGE_TYPE_X in VA01, plant 1000, customer 1234567,
triggered on save. ST22 dump ID 20260422-0931-USR03.
```

→ Layer classification · SAP Note search · root-cause report with the fix and transport. **Saves ~4 hours of Google + Notes spelunking.**

### 2. Steering committee wants a number by Friday

```text
/sap-estimate — 3 new Fiori apps on PO release workflow. S/4HANA 2023
on-prem. 2 mid ABAP + 1 Fiori + 1 functional. 6-week window.
```

→ WBS · 6 SAP complexity multipliers · three-point PERT range · documented assumptions. **Single-number estimates are blocked.**

### 3. Code review before release

```text
/sap-review — paste the ABAP. Target S/4HANA 2023, ABAP Cloud Tier 3.
Flag BSEG reads, non-CDS extracts, clean-core violations.
```

→ Four-dimension review (quality / performance / security / clean core) with CRITICAL findings surfaced first, CDS rewrites inline.

### 4. Functional spec due at 5pm

```text
/sap-doc FS — PO approval workflow. Dual approval above €50k
(mgr + finance). Tolerance 5% price, 10% quantity. ME59N release strategy.
```

→ Structured FS (objective → scope → as-is → to-be → config → auth) with BPMN-ready flow and real SPRO paths.

### 5. Going live in 3 weeks

```text
/sap-go-live-readiness — S/4HANA 2023, cutover 2026-05-13.
Scope FI + MM + SD, 3 company codes. UAT 87% complete.
```

→ 10 hard gates · evidence required per gate · cutover runbook with rollback triggers · Go/Conditional-Go/No-Go decision matrix.

**See all 8 scenarios in the [cookbook →](https://sap-superpowers.vercel.app/cookbook)**

---

## 🎯 What You Get

**55 skills** that force Claude to do SAP the right way:

```
/sap-debug       →  Systematic root-cause diagnosis (7 steps, evidence required)
/sap-estimate    →  Three-point WBS estimation with SAP complexity multipliers
/sap-review      →  Code review — clean core, performance, security, ATC
/sap-kickoff     →  Full SAP Activate project charter in one command
/sap-migrate     →  S/4HANA migration assessment with must-fix / nice-to-fix
/sap-doc         →  Functional spec, technical spec, user guide, training deck
/sap-deliver     →  Entire Activate phase — all deliverables, one command
/sap-accelerate  →  Pre-built O2C, P2P, R2R, H2R, P2Mfg accelerators
```

**25 agents** dispatched automatically — sap-reviewer, sap-estimator, sap-migration-analyzer, sap-security-auditor, plus 15 module consultants (SD, MM, FI, CO, PP, PM, QM, HCM, WM, TM, BW, Ariba, Basis, TR, PS).

**Zero telemetry. Zero API keys. Zero servers.** Pure Markdown + hooks. Your client data never leaves your laptop.

---

## 🔥 Why it goes viral in SAP teams

- **Iron Laws** — skills refuse shortcuts. The model literally can't say "done" without evidence.
- **Hard Gates** — 10 go-live gates that block advancement until proof is attached.
- **Data protection hooks** — 8 blocklist categories. Client names, tenant IDs, payroll data never leak.
- **Clean-core safe** — every generated line respects the extensibility model.
- **Joule-aware** — pairs with SAP Joule. See the [companion guide](https://github.com/vigneshbarani24/sap-superpowers/blob/main/docs/joule-companion.md).

## 📣 Help it reach every SAP consultant on Earth

1. **⭐ Star the repo** — it's the only growth signal we rely on.
2. **📢 Share it** — drop the link in your SAP Teams channel, LinkedIn, or SAP Community.
3. **🛠️ Contribute** — one skill per PR. See [CONTRIBUTING.md](CONTRIBUTING.md).

> *"Joule is how SAP teams run SAP from the inside. Superpowers is how they build
> on SAP from the outside. Both are necessary — and the teams that deploy them
> together finish the work faster."*

---

## 📦 What's inside

| | |
|---|---|
| **Skills** | 55 (meta, consulting, dev, delivery, module reference, strategic) |
| **Agents** | 25 (10 core + 15 module consultants) |
| **Commands** | 8 slash commands |
| **Hooks** | 6 (PreToolUse, PostToolUse, prompt router, pre-compact, session start) |
| **Industries** | 14 (retail, auto, pharma, F&B, chemical, electronics, construction, utilities, banking, public sector, fashion, steel, cosmetics, tire) |
| **Countries** | 16 localizations (US, DE, UK, IN, JP, KR, FR, IT, ES, NL, BR, MX, AU, SG, CN, EU) |
| **SAP versions** | ECC 6.0, S/4HANA on-prem, S/4HANA Cloud, BTP, RISE |

---

## 📝 License

**MIT.** Use it commercially. Fork it. Sell services around it. No restrictions.

## ❤️ Author

Built by **vigneshbarani24** at KaarTech UK — because the SAP consulting world deserved better tooling.

---

<p align="center">
  <strong>If this saves you an hour, give it a star. If it saves you a week, tell your team.</strong><br><br>
  <a href="https://github.com/vigneshbarani24/sap-superpowers">
    <img src="https://img.shields.io/badge/%E2%98%85%20Star%20on%20GitHub-D97757?style=for-the-badge&logoColor=white" alt="Star on GitHub">
  </a>
</p>
