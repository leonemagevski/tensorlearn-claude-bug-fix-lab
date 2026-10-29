import test from 'node:test';
import assert from 'node:assert/strict';
import { getClaim } from '../../src/claims.mjs';

// Incident (docs/contract.md): viewer user-4 received claim-B, owned by user-42.
// Owner IDs can overlap textually, so a prefix match on ownerId leaks claims.
test('viewer user-4 does not receive claim-B owned by user-42', () => {
  const claims = [
    { id: 'claim-A', ownerId: 'user-4', status: 'open' },
    { id: 'claim-B', ownerId: 'user-42', status: 'pending' },
  ];
  assert.equal(getClaim(claims, 'user-4', 'claim-B'), null);
  assert.equal(getClaim(claims, 'user-42', 'claim-B'), claims[1]);
});
