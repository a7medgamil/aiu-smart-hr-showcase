# Status & Evidence

**Recorded status:** Academic FYP with approved ERD and a separately documented **local UI-only Milestone 1 preview plus SQL schema checks**. Not deployed; no functioning NLP/AI service, connected database, CV parser, or production authentication.

## Confirmed in the portfolio record

- The project is an AIU Computer Science final-year project supervised by Dr. Bashir.
- The design targets fewer than 10 CVs at a time.
- Seven evaluation dimensions are defined.
- The ERD was approved for university submission.
- Cloudflare Pages and Workers were considered as hosting options.

## Separately documented local engineering milestone

The private `aiu-smart-hr` README describes a fake-data local preview with HR and Candidate screens, weight-adjustable **DEMO** arithmetic, static Node.js server, an unconnected nine-table SQLite/D1 schema and locally designed checks (including 42 schema assertions). These details describe a non-production prototype; this public case-study repository does **not** include its source or independently re-run its tests. Real CV extraction, persistence, account sign-in and PDF/DOCX export are not implemented in that preview. [Evaluation boundaries and future test plan](ENGINEERING-AND-EVALUATION-PLAN.md).

## November 21 private QA milestone

An isolated private implementation branch was independently retested, merged into the **private** main branch and passed a read-only Node 22/24 CI workflow. Local checks recorded **12/12 Node tests**, **42 schema assertions**, **44 desktop/mobile route checks** and **11 browser interactions**. Changes address deterministic weight normalization, invalid scores, candidate/application linking and narrow-screen/keyboard behavior. The [public synthetic preview and limitations](MILESTONE1-SYNTHETIC-QA-EVIDENCE.md) shows only original fictional-data screenshots and a test-scope summary. This **does not** mean the public documentation repository includes executable source or public verification of private CI.

## Not claimed

- A deployed application or production service
- A completed NLP model or measured model accuracy
- A validated CV dataset or evaluation benchmark
- Hiring outcomes, decision quality or measured time savings
- Live integrations or operational adoption

## Evidence boundary

This repository documents the academic scope and intended workflow only. It deliberately excludes CVs, applicant data, credentials, private university records and unapproved screenshots.

The implementation and evaluation status beyond the design milestone is not established by this public case study.
