# AIU Smart HR — Academic Engineering Evidence & Responsible Evaluation Plan

**Academic case study | 21 November 2026**  
**Institution:** Albukhary International University (AIU) · Computer Science final-year project  
**Project status:** *Milestone 1 local interface preview plus database-schema design; not deployed*

> This publication separates the **existing local demonstration** from the **planned NLP/CV-analysis system**. The UI preview is *not a functioning AI recruiter*, and its scores come from fictional hand-authored examples and a weighted-average formula. No candidate CV has been processed by an actual model. Nothing here claims employer adoption, independent academic validation of accuracy or a deployed service.

## 1. What has been built vs. what remains conceptual

The private engineering README for the AIU project records a local, dependency-free Node.js preview with a static HTML/CSS/JavaScript interface and a 9-table SQL schema. It includes **two interface areas**: HR/Admin and Candidate.

| Capability | Milestone 1 record | Meaning for a reviewer |
|---|---|---|
| HR dashboard, vacancy criteria and candidate ranking | UI preview with fake sample data | Visual/workflow prototype, not a deployed HR service |
| Adjustable vacancy weights | In-browser, ephemeral demo weighted-average ranking | A deterministic scoring demonstration, **not an NLP model** |
| Candidate portal | Preview screens and form-validation messages | Registration/authentication are not implemented |
| CV upload | Local filename/type/size validation only | No CV bytes read, transferred, processed or stored |
| Report export | Buttons visible but disabled | No PDF/DOCX generation implemented |
| Data model | SQL schema (9 tables) and ERD design | A design artifact; app is not connected to a database |
| Local automated checks | Private README lists syntax/render checks and 42 schema assertions | **Documented test design**; public repo does not independently rerun those checks |
| Cloudflare Pages/Workers hosting | Considered | No deployment claimed |
| Privacy | Fictional records and reserved `example.*` email domains | Does not establish compliance of a future real-data implementation |

**Important reconciliation:** the original public showcase previously described only the academic design/ERD milestone. This document also acknowledges the separately recorded **local Milestone 1 UI preview** while preserving its strict non-production, non-AI status. No private university material or CV data is copied.

## 2. Core problem and bounded user journey

**Problem hypothesis:** reviewing a small CV set individually may be inconsistent or time-consuming. The academic idea is to support a human reviewer through seven common dimensions: qualifications, experience, location/relocation, soft and hard skills, references, personal information and rewards.

**Bounded set:** fewer than ten CVs at a time. This is an academic constraint, not a benchmark of throughput or model performance.

**Intended journey, not a completed product:** HR sets a vacancy and its criteria → candidate information is summarized into the seven dimensions → criteria are compared → reviewer sees a traceable ranking → a human makes the final hiring decision. At Milestone 1 the middle steps are fictional preview data and arithmetic only.

## 3. Why the architecture matters

The separately documented schema keeps admin and candidate identities in distinct tables, provides vacancies and criteria, tracks applications and candidate profiles, and defines audit records. The private README describes a **9-table** SQLite/D1 design, with JSON profile sections and referential constraints. These are sensible planned boundaries but **the browser preview is not connected to D1**.

The engineering question is not simply whether a CV can be ranked. It is whether reviewers can inspect the evidence supporting a score, identify errors, reject unsupported inferences, and avoid inappropriate use of sensitive personal attributes.

## 4. Proposed acceptance criteria by milestone

| Stage | Requirement | Concrete test to run before claiming PASS |
|---|---|---|
| A — Interface prototype | Clearly distinguish demo data from real applicant records | Browser review of every HR and Candidate view; keyboard-only flow |
| A — Deterministic scoring | Same fictional inputs and weights produce the same sorted result | Pure function unit tests and boundary cases |
| B — Authorization | HR and candidates cannot access each other's protected resources | AuthN/AuthZ negative and session-expiry integration tests |
| B — CV handling | Files are treated as untrusted, handled privately and can be deleted under policy | MIME/content checks, malware scanning, retention/delete tests |
| C — NLP extraction | Every extracted field has provenance/evidence or an abstain state | Annotated synthetic gold set, precision/recall by field and error analysis |
| C — Explainability | Reviewer sees exactly why each criterion matched and can correct it | Traceability test from source snippet to decision explanation |
| C — Fairness and privacy | Non-job-relevant sensitive traits are excluded and proxy risks evaluated | Threat model, feature review, subgroup evaluation where lawful and ethical |
| D — Operations | Model version, consent/retention, audit and reviewer override are respected | End-to-end audit simulation, rollback and privacy impact review |

**Stages B–D are a roadmap**, not implemented/verified features. For real applicant CVs, additional legal, institutional and ethics approvals may be required; do not run them as a casual portfolio experiment.

## 5. Proposed model-evaluation protocol (not performed)

1. Establish a consent-cleared or wholly synthetic test dataset with a separate unseen evaluation split; document the sample-generation method and limits.
2. Define gold labels for each of the seven dimensions and for every source-evidence span.
3. Compare a deterministic rules baseline and a candidate extraction method using per-field precision, recall, and explicit abstention/error rates.
4. Test parsing failures, ambiguous documents, adversarially inserted instructions, unsupported formats and missing evidence.
5. Audit incorrect ranking explanations and calibrate reviewer trust; log overrides rather than claiming the model should decide hiring.
6. Report performance with confidence intervals and dataset limitations. Do not claim fairness, accuracy, time saving or recruitment success without that evidence.

No evaluation metrics, datasets, model checkpoints or accuracy percentages are currently published.

## 6. What recruiters can inspect now

- [Academic scope and seven-dimensional review model](PROJECT-SCOPE.md)
- [Conceptual architecture](ARCHITECTURE.md)
- [Status and evidence boundary](STATUS.md)
- [Original public case study](../README.md)

### Next evidence to add safely

- [ ] A dated screenshot set of the **fake-data** Milestone 1 local preview after asset/privacy review.
- [ ] A sanitized short GIF or video demonstrating criteria-weight changes and nonpersistent DEMO scores.
- [ ] A public original **synthetic** scoring function with reproducible tests (only if sharing rights permit).
- [ ] A versioned requirements document and decision record distinguishing the academic milestone from later ideas.
- [ ] A verified CI run on an actually public code artifact. A private README's local-check description is not a public CI badge.

## 7. Responsible authorship

The portfolio describes Ahmed Gamil as a **Computer Science student and FYP contributor/designer**, supervised by Dr. Bashir. Further attribution of individual coding, algorithm design or model training should be based on traceable commits and approved project records. If code was AI-assisted, explain the review and understanding demonstrated rather than pretending all work was handwritten.

**Bottom line:** this project can demonstrate careful requirements, interface design, schema modeling, evidence-driven evaluation planning and privacy-aware product thinking already. It should only be presented as a working AI/CV analyzer when extraction, storage, protection, evaluation and human oversight are actually implemented and tested.

© 2026 Ahmed Gamil. Academic portfolio documentation; no applicant data or private university assets included.
