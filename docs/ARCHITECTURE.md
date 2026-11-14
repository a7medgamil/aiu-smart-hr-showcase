# Concept Architecture

~~~mermaid
flowchart TB
  HR[HR Reviewer] --> PORTAL[HR Portal Concept]
  PORTAL --> SET[Small CV Review Set<br/>Fewer than 10]
  SET --> SUMMARY[Structured CV Summary]
  SUMMARY --> DIM[Seven Evaluation Dimensions]
  DIM --> RANK[Comparative Ranking]
  RANK --> REVIEW[Human Review and Decision]
~~~

## Interpretation

- The diagram describes the intended academic concept.
- The review set is bounded to fewer than 10 CVs at a time.
- Summaries and ranking are organised around the seven dimensions in [Project Scope](PROJECT-SCOPE.md).
- The reviewer remains responsible for the final decision.

This is a concept map, not a deployed system architecture, data-flow specification or proof of a running NLP model.
