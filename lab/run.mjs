import { evaluate, metrics } from './engine.mjs';
import { records, gold } from './fixture.mjs';

const results = evaluate(records);
console.log('FICTIONAL RULE EXERCISE ONLY — no NLP, real CVs or hiring recommendations.');
console.log('Scores show matched evidence weight; human reviewers remain final arbiters.');
console.log(JSON.stringify({ results, metrics: metrics(results, gold) }, null, 2));
