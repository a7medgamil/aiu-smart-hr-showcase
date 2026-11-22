// Original, fictional statement-matching exercise. No CV parser or trained model.
export const CRITERIA = Object.freeze(['qualification', 'workHistory', 'skill']);
const TERMS = Object.freeze({
  qualification: 'fictional certificate q',
  workHistory: 'fictional workshop w',
  skill: 'synthetic sql',
});
const plain = value => value !== null && typeof value === 'object' &&
  !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
const normalize = value => value.normalize('NFC').toLowerCase().trim()
  .replace(/[.!?。！]+$/u, '').trim().replace(/\s+/gu, ' ');

export function validateWeights(weights) {
  if (!plain(weights) || Object.keys(weights).length !== CRITERIA.length ||
      !CRITERIA.every(key => Object.hasOwn(weights, key) &&
        Number.isFinite(weights[key]) && weights[key] >= 0 && weights[key] <= 100)) {
    throw new TypeError('Exactly three finite weights between 0 and 100 required');
  }
  const total = CRITERIA.reduce((sum, key) => sum + weights[key], 0);
  if (total === 0) throw new RangeError('At least one weight must be positive');
  return total;
}

function assess(lines, key) {
  // Only whole statements count. Instructions, substrings and inferred synonyms do not.
  const term = TERMS[key];
  const positive = key === 'workHistory'
    ? `worked at: ${term}; role: fictional technician; record: fictional-ledger-01`
    : `held: ${term}`;
  const negative = `not held: ${term}`;
  const evidence = lines.filter(line => [positive, negative].includes(normalize(line)));
  const yes = evidence.some(line => normalize(line) === positive);
  const no = evidence.some(line => normalize(line) === negative);
  return {
    status: yes === no ? 'abstain' : yes ? 'match' : 'no-match',
    evidence,
    reason: yes && no ? 'Conflicting explicit statements; human review required'
      : yes ? 'Exact fictional statement; source claim requires human verification'
      : no ? 'Explicit negative statement'
      : 'Missing, ambiguous or unsupported evidence; no inference made',
  };
}

export function evaluate(records, weights = { qualification: 1, workHistory: 1, skill: 1 }) {
  const total = validateWeights(weights);
  if (!Array.isArray(records) || records.length > 9 || [...records].some(row => !plain(row))) {
    throw new TypeError('Use at most nine fictional records');
  }
  const ids = new Set();
  return records.map((record, index) => {
    if (!plain(record) || Object.keys(record).some(key => !['id', 'snippets'].includes(key)) ||
        typeof record.id !== 'string' || !/^fiction-\d{2}$/.test(record.id) || ids.has(record.id) ||
        !plain(record.snippets) || Object.keys(record.snippets).some(key => !CRITERIA.includes(key)) ||
        !Object.values(record.snippets).every(lines => Array.isArray(lines) && lines.length <= 10 &&
          [...lines].every(line => typeof line === 'string' && line.length <= 500))) {
      throw new TypeError('Invalid fictional record, duplicate ID or unsupported criterion');
    }
    ids.add(record.id);
    const criteria = Object.fromEntries(CRITERIA.map(key => [key, assess(record.snippets[key] ?? [], key)]));
    // Fixed denominator includes abstentions; this is evidence coverage, not suitability.
    const earned = CRITERIA.reduce((sum, key) => sum + (criteria[key].status === 'match' ? weights[key] : 0), 0);
    return { id: record.id, inputIndex: index, score: Math.round(10000 * earned / total) / 100, criteria };
  }).sort((a, b) => b.score - a.score || a.inputIndex - b.inputIndex);
}

export function metrics(results, gold) {
  if (!Array.isArray(results) || !plain(gold) || results.length !== Object.keys(gold).length ||
      new Set(results.map(row => row.id)).size !== results.length ||
      !results.every(row => Object.hasOwn(gold, row.id) && plain(gold[row.id]) &&
        Object.keys(gold[row.id]).length === CRITERIA.length &&
        CRITERIA.every(key => typeof gold[row.id][key] === 'boolean' &&
          ['match', 'no-match', 'abstain'].includes(row.criteria?.[key]?.status)))) {
    throw new TypeError('Gold and predictions must align exactly with boolean labels');
  }
  return Object.fromEntries(CRITERIA.map(key => {
    let tp = 0, fp = 0, fn = 0, abstain = 0;
    for (const row of results) {
      const predicted = row.criteria[key].status;
      const actual = gold[row.id][key];
      if (predicted === 'abstain') abstain++;
      if (predicted === 'match') actual ? tp++ : fp++;
      else if (actual) fn++; // Positive abstentions remain in recall denominator.
    }
    return [key, { tp, fp, fn, precision: tp + fp ? tp / (tp + fp) : null,
      recall: tp + fn ? tp / (tp + fn) : null,
      abstain, abstainDenominator: results.length,
      abstainRate: results.length ? abstain / results.length : null }];
  }));
}
