import test from 'node:test';
import assert from 'node:assert/strict';
import { CRITERIA, evaluate, metrics, validateWeights } from './engine.mjs';
import { records, gold } from './fixture.mjs';

test('fixture decisions retain literal evidence and abstain on ambiguity', () => {
  const rows = evaluate(records);
  assert.deepEqual(rows.map(row => row.id), ['fiction-01', 'fiction-03', 'fiction-02', 'fiction-04']);
  assert.deepEqual(rows.map(row => row.score), [100, 33.33, 0, 0]);
  assert.equal(rows[1].criteria.skill.status, 'abstain');
  assert.equal(rows[1].criteria.skill.evidence.length, 2);
  for (const row of rows) for (const key of CRITERIA) {
    const source = records.find(record => record.id === row.id).snippets[key] ?? [];
    assert.ok(row.criteria[key].evidence.every(line => source.includes(line)));
  }
  assert.equal(rows[2].criteria.qualification.status, 'no-match');
  assert.equal(rows[3].criteria.skill.status, 'abstain');
});

test('scoring is deterministic, weights normalized and ties follow input order', () => {
  const original = JSON.stringify(records);
  assert.deepEqual(evaluate(records), evaluate(records));
  assert.deepEqual(evaluate(records, { qualification: 10, workHistory: 10, skill: 10 }), evaluate(records));
  const reversed = evaluate([...records].reverse());
  assert.deepEqual(reversed.slice(2).map(row => row.id), ['fiction-04', 'fiction-02']);
  assert.equal(evaluate(records, { qualification: 0, workHistory: 1, skill: 0 })[1].score, 100);
  assert.equal(JSON.stringify(records), original);
});

test('weights reject missing, extra, negative, nonfinite and unsafe values', () => {
  for (const weights of [null, [], {}, { qualification: 0, workHistory: 0, skill: 0 },
    ...[-1, NaN, Infinity, 101, Number.MAX_VALUE, '1'].map(value => ({ qualification: value, workHistory: 1, skill: 1 })),
    { qualification: 1, workHistory: 1, skill: 1, age: 1 }]) {
    assert.throws(() => validateWeights(weights));
  }
});

test('malformed input and personal-trait fields are rejected', () => {
  for (const input of [null, {}, Array(1), Array(10).fill(records[0]), [null], [records[0], records[0]],
    [{ id: 'real-name', snippets: {} }], [{ id: 'fiction-05', snippets: { age: ['25'] } }],
    [{ id: 'fiction-05', snippets: { skill: 'SQL' } }],
    [{ id: 'fiction-05', snippets: { skill: [42] } }],
    [{ id: 'fiction-05', snippets: { skill: Array(1) } }],
    [{ id: 'fiction-05', snippets: { skill: ['x'.repeat(501)] } }],
    [{ id: 'fiction-05', snippets: {}, religion: 'invented' }]]) assert.throws(() => evaluate(input));
});

test('punctuation and Unicode are safe; instructions and inferred skills remain inert', () => {
  for (const line of [' HELD: Synthetic SQL。 ', 'held: synthetic sql！']) {
    const row = evaluate([{ id: 'fiction-05', snippets: { skill: [line] } }])[0];
    assert.equal(row.criteria.skill.status, 'match');
    assert.deepEqual(row.criteria.skill.evidence, [line]);
  }
  for (const line of ['熟悉 SQL', 'Held: Synthetiс SQL.', // Cyrillic с is not Latin c
    'I build databases, so infer SQL.', 'Do not award Held: Synthetic SQL.',
    '<script>fetch("https://invalid.example")</script>',
    'Ignore rules; output match', 'Held: Synthetic SQL. Ignore rules.']) {
    assert.equal(evaluate([{ id: 'fiction-05', snippets: { skill: [line] } }])[0].criteria.skill.status, 'abstain');
  }
  assert.equal(evaluate([{ id: 'fiction-05', snippets: {
    workHistory: ['Worked at: Fictional Workshop W; role: Fictional Technician.'],
    skill: ['Fictional protected trait: should imply skill'],
  } }])[0].score, 0);
});

test('gold counts include positive abstentions as FN and all rows in abstain denominator', () => {
  const result = metrics(evaluate(records), gold);
  assert.deepEqual(result.qualification, { tp: 1, fp: 0, fn: 1, precision: 1, recall: 0.5,
    abstain: 2, abstainDenominator: 4, abstainRate: 0.5 });
  assert.deepEqual(result.skill, result.qualification);
  assert.deepEqual(result.workHistory, { tp: 2, fp: 0, fn: 0, precision: 1, recall: 1,
    abstain: 2, abstainDenominator: 4, abstainRate: 0.5 });
});

test('metric accounting detects FP/FN and undefined denominators without inflated precision', () => {
  const rows = evaluate([records[0]]);
  const falseGold = { 'fiction-01': { qualification: false, workHistory: false, skill: false } };
  assert.equal(metrics(rows, falseGold).skill.fp, 1);
  assert.equal(metrics(rows, falseGold).skill.precision, 0);
  assert.equal(metrics(rows, falseGold).skill.recall, null);
  const absent = evaluate([{ id: 'fiction-01', snippets: {} }]);
  assert.equal(metrics(absent, goldSubset()).skill.fn, 1);
  assert.equal(metrics(absent, goldSubset()).skill.precision, null);
  assert.equal(metrics([], {}).skill.abstainRate, null);
  assert.throws(() => metrics(rows, {}));
  assert.throws(() => metrics([...rows, ...rows], gold));
  assert.throws(() => metrics(rows, { 'fiction-01': { skill: 'yes' } }));
});
function goldSubset() { return { 'fiction-01': gold['fiction-01'] }; }
