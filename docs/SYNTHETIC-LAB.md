# Independent synthetic evaluation lab

Created 22 November 2026, independently in this public repository with Codex assistance. This is an original deterministic rule example, not copied private academic code, trained NLP/AI, a CV parser, authentication, or a deployed product. It does not implement or validate the academic FYP. The academic evaluation in [the engineering plan](ENGINEERING-AND-EVALUATION-PLAN.md) remains a future proposal.

## Quickstart

From the repository root, with Node.js 24 (verified locally on v24.21.0):

```powershell
node --version
node --test
node --check lab/engine.mjs
node --check lab/fixture.mjs
node --check lab/run.mjs
node --check lab/engine.test.mjs
node lab/run.mjs
```

No npm, installation, server, browser, network, third-party API, email, database, file storage or deployment is used by the lab. The CLI prints only bundled invented records to the terminal; no input files or CV uploads are accepted. Do not substitute real applicant information. CI needs GitHub action downloads, separate from the offline lab itself.

## Requirements and evidence

The three fixed requirements are Fictional Certificate Q, work as Fictional Technician at Fictional Workshop W with a fictional record locator, and Synthetic SQL. These are invented job-related teaching criteria, not a real vacancy or job recommendation. Only `qualification`, `workHistory`, and `skill` fields are accepted. Personal-trait fields are rejected; personal-trait text inside a snippet is ignored. Protected traits, location, names, age, religion, health and proxies are never scoring features. This is not a fairness validation.

The format intentionally uses whole statements, not natural-language extraction:

```text
Held: Fictional Certificate Q.
Worked at: Fictional Workshop W; role: Fictional Technician; record: fictional-ledger-01.
Held: Synthetic SQL.
Not held: Synthetic SQL.
```

Case, whitespace, NFC Unicode normalization and trailing `. ! ? 。 ！` punctuation are tolerated. Other text, synonyms, confusable characters, partial matches and injected instructions remain inert and unsupported. Nothing executes snippet content. A match retains the exact source string. The work-history locator illustrates traceability for a human to check; it does not establish employment or contact a verifier. Missing locators abstain. There is no date, tenure or qualification-equivalence inference.

Each criterion returns `match`, `no-match` (only an explicit negative) or `abstain`. Missing, ambiguous and conflicting statements abstain; conflicting evidence is preserved. Humans must inspect original evidence, verify claims and remain final arbiters. Missing evidence is not a finding that someone lacks a qualification.

## Scoring and limits

Score = 100 × matched weights / total configured weights, rounded to two decimals. Abstentions stay in that fixed denominator. This is matched-evidence coverage, not suitability or a hiring recommendation. Sorting uses the displayed rounded score descending, then original input order for stable ties. Zero weights are permitted; all-zero weights, unknown keys, negative/nonfinite/non-numeric values and values above 100 are rejected. Inputs are limited to nine uniquely identified fictional records, ten snippets per criterion and 500 characters per snippet. Malformed or unsupported fields throw rather than being inferred.

This deliberately brittle grammar cannot understand arbitrary CV prose, validate truth, detect forged credentials or provide general prompt-injection protection for an AI system. Even a false claim in the exact accepted grammar matches. There is no model in which instructions could execute. No real-world accuracy, fairness, recruitment effectiveness or security claim follows from these tests.

## Gold fixture and metric definitions

[fixture.mjs](../lab/fixture.mjs) contains four wholly invented records and hand-authored boolean gold facts. All snippets, identifiers, certificate/workshop names and ledger references were created for this task without CVs, private code, personal data or university materials. These labels were designed alongside the rules; there is no independent or held-out dataset. The third record has an invented positive qualification with ambiguous evidence and an invented positive skill with contradictory statements, deliberately illustrating false negatives.

For each criterion, a predicted `match` with positive gold is TP and with negative gold is FP. Any other prediction with positive gold is FN, including abstentions. Precision = TP / (TP + FP); recall = TP / (TP + FN). Undefined ratios are `null`, not perfect scores. Abstain rate = abstentions / **all four records per criterion**, including positive and negative gold. Gold describes invented truth; abstention describes available evidence.

Expected bundled-fixture output (rule diagnostics only):

| Criterion | TP | FP | FN | Precision | Recall | Abstain / denominator |
|---|---:|---:|---:|---:|---:|---:|
| Qualification | 1 | 0 | 1 | 1 | 0.5 | 2 / 4 |
| Work history | 2 | 0 | 0 | 1 | 1 | 2 / 4 |
| Skill | 1 | 0 | 1 | 1 | 0.5 | 2 / 4 |

These fractions describe only this tiny constructed exercise and must not be advertised as real-model accuracy. Separate counterexample tests force false positives and undefined denominators to check the accounting itself. Local verification: `node --test` passed 7/7 synthetic tests on Node 24. The read-only [GitHub Actions run #44984807984](https://github.com/a7medgamil/aiu-smart-hr-showcase/actions/runs/44984807984) also succeeded on published main SHA `7da8bbcb85bfb796766af693027825a9432e18c0`; this is reproducible proof of this tiny fictional lab only.
