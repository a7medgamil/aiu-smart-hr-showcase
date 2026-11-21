# HR & NLP CV Summarizer — Academic Case Study

An Albukhary International University (AIU) Computer Science final-year project exploring a structured HR portal for summarising and ranking a small, bounded set of CVs.

> **Project status: academic design project — not deployed.** This repository is public documentation only. It contains no application source, CV files, applicant records, credentials or private university materials.

## Project context

The project is supervised by Dr. Bashir. Its design explores how an HR reviewer could assess fewer than 10 CVs at a time against the same seven dimensions, using a consistent summary and ranking structure.

**My role:** Computer Science student, FYP contributor and designer.

## Seven evaluation dimensions

1. Qualifications
2. Experience
3. Location & Relocation
4. Soft and Hard Skills
5. References
6. Personal Information
7. Rewards

## Design decisions

- **Bounded review set:** intended for fewer than 10 CVs at a time.
- **Consistent criteria:** each CV is considered against the same seven dimensions.
- **Human review:** the system is intended to support a reviewer; the final decision remains with the human reviewer.
- **Data model first:** the ERD was approved for university submission.
- **Hosting considered, not deployed:** Cloudflare Pages and Workers were considered as possible hosting options.

## Intended workflow

The concept is organised around a short HR review path:

1. HR reviewer opens the portal.
2. A small CV set is considered.
3. Each CV is summarised against the seven dimensions.
4. Candidates are ranked for reviewer comparison.
5. The HR reviewer makes the final decision.

This describes the intended design, not a verified running workflow.

## Evidence and limitations

- The approved ERD is recorded as an academic milestone.
- No deployment is claimed.
- No model accuracy, dataset size, hiring outcome, time-saving figure or production integration is claimed.
- No applicant or CV data is published.
- The project is not presented as a completed HR product.

See [Project Scope](docs/PROJECT-SCOPE.md), [Concept Architecture](docs/ARCHITECTURE.md) and [Status & Evidence](docs/STATUS.md).

**Engineering milestone clarification:** The private project record also describes a local, non-deployed Milestone 1 **UI preview plus SQLite schema checks** using only fictional data. It does not implement an AI model, production authentication, database integration or CV processing. See [Engineering Evidence & Responsible Evaluation Plan](docs/ENGINEERING-AND-EVALUATION-PLAN.md) for the exact distinction and proposed next acceptance gates.

## Portfolio record

[Open the full portfolio case study](https://ahmed-gamil-portfolio.ahmedabdulbarim.workers.dev/case-studies/hr-nlp-cv-summarizer)

© 2026 Ahmed Gamil. Academic project documentation.
