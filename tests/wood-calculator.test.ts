import test from "node:test";
import assert from "node:assert/strict";
import { calculateWood } from "../src/lib/wood-calculator.ts";
import type { Answers } from "../src/data/calculator.ts";
import { normalizeQuantity, orderPrice } from "../src/data/plans.ts";
const base: Answers = { fireplace: 0, occupancy: 0, frequency: 1, duration: 1, purpose: 0, season: 0 };
test("mängd avrundas uppåt och håller minimum samt max", () => {
  assert.equal(normalizeQuantity(20), 60);
  assert.equal(normalizeQuantity(81), 90);
  assert.equal(normalizeQuantity(9000), 2000);
  assert.equal(normalizeQuantity(NaN), 60);
});
test("totalen inkluderar vald mängd och exakt de valda tjänsterna", () => {
  assert.deepEqual(orderPrice(60, false, false), {wood:897, total:897});
  assert.deepEqual(orderPrice(80, true, true), {wood:1077, total:2157});
  assert.equal(orderPrice(80, true, false).total, 1767);
});
test("kända indata ger kg-spann och exempelsäckar", () => {
  const result = calculateWood(base)!;
  assert.deepEqual(result, { minKg: 40, maxKg: 80, minBags: 4, maxBags: 8, weeks: 13, hours: 39 });
  assert.equal("planId" in result, false);
});
test("färre veckor i fritidshuset minskar vedbehovet", () => {
  assert.ok(calculateWood({...base, occupancy: 2})!.maxKg < calculateWood(base)!.maxKg);
});
test("fler och längre brasor ökar mängden", () => {
  assert.ok(calculateWood({...base, frequency: 3})!.minKg > calculateWood(base)!.minKg);
  assert.ok(calculateWood({...base, duration: 2})!.maxKg > calculateWood(base)!.maxKg);
});
test("vedpanna och okänd eldstad ger manuell avstämning", () => {
  assert.equal(calculateWood({...base, fireplace: 3}), null);
  assert.equal(calculateWood({...base, fireplace: 4}), null);
});
test("ofullständiga eller felaktiga svar avvisas", () => {
  assert.throws(() => calculateWood({...base, duration: -1}));
  assert.throws(() => calculateWood({...base, frequency: 9}));
  assert.throws(() => calculateWood({...base, occupancy: 0.5}));
});
test("period och syfte dubbelräknar inte angivna eldningsvanor", () => {
  assert.deepEqual(calculateWood({...base, season: 2, purpose: 2}), calculateWood(base));
});
