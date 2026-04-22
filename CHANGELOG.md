# Changelog

All notable changes to SAP Superpowers will be documented in this file.

## [3.1.0] - 2026-04-22

### Added
- **Delivery Factory** — `/sap-deliver <phase>` produces all deliverables for an SAP Activate phase
- **Solution Accelerators** — `/sap-accelerate <process>` generates pre-built solution packages (O2C, P2P, R2R, P2P-Mfg, H2R)
- **Quality Scoring** — L1-L5 maturity model for every deliverable
- **7 new skills:** autopilot, self-correcting-loop, team-execution, program-to-spec, deep-interview, sap-doctor, transport-release
- **15 module consultant agents:** SD, MM, FI, CO, PP, PS, PM, QM, HCM, WM, TM, TR, BW, Ariba, Basis
- **6 enforcement hooks:** PreToolUse (data protection + transport validation), PostToolUse (syntax/ATC verification), UserPromptSubmit (auto-routing), PreCompact (context preservation)
- **8 data protection blocklist categories** with hard/soft block levels
- **14 industry reference files** (retail, automotive, pharma, F&B, chemical, electronics, construction, utilities, banking, public sector, fashion, steel, cosmetics, tire)
- **16 country localization files** (US, DE, UK, IN, JP, KR, FR, IT, ES, NL, BR, MX, AU, SG, CN, EU-wide)
- **13 coding standard files** (naming, clean code, OOP, ALV, constants, text elements, ABAP release, SAP version, error handling, testing, Dynpro)
- **15 SPRO configuration guides** (one per major module)
- **MCP bridge layer** with 3-tier config resolution and preflight checks
- **2 new commands:** `/sap-deliver`, `/sap-accelerate`
- **Order-to-Cash accelerator** with process flow, fit/gap matrix, and 30 test scenarios

### Changed
- Plugin file count: 75 → 180+
- Agent count: 10 → 25
- Skill count: 46 → 55
- Command count: 6 → 8
- Session-start hook now detects platform, loads config, shows capabilities summary
- CLAUDE.md updated for v3.1 capabilities

## [3.0.0] - 2026-04-12

### Added
- Behavior-shaping skill methodology (Iron Laws, Rationalization Tables, Red Flags, Hard Gates)
- Progressive workflow chains aligned to SAP Activate phases
- RAG-ready knowledge layer (SAP Notes index, tcodes, released APIs, patterns)
- Deliverable-first design for all process skills
- 20 new skills (46 total, up from 26)
- 4 new agents (10 total, up from 6)
- 2 new commands (6 total, up from 4)
- Multi-platform support (Claude Code, Cursor, Copilot CLI)

## [2.0.0] - 2026-04-02

### Added
- 26 skills (10 process, 16 reference)
- 6 agents
- 4 commands
- Session-start hook
- CI/CD smoke test pipeline

## [1.0.0] - 2026-03-18

### Added
- Initial release
- 3 process skills
- Plugin scaffold
- Basic hooks
