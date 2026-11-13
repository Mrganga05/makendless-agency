import test from "node:test";
import assert from "node:assert/strict";
import { generateBrief, recommendServices, getPairings } from "../src/brief.ts";
const project = {
  business: "Salon",
  services: ["T1", "M1"],
  goal: "Create an online home",
  timeline: "1–3 months",
  budget: "₹50,000",
  notes: "Include booking",
  brief: "",
};
test("brief preserves chosen services, business context and beta availability", () => {
  const brief = generateBrief(project);
  assert.match(brief, /Business Website Design & Development/);
  assert.match(brief, /Meta & Google Ads Management \(Beta \/ Coming Soon/);
  assert.match(brief, /Sal[o]n/);
  assert.match(brief, /1–3 months/);
  assert.match(brief, /Include booking/);
  assert.match(brief, /not a quote or booking/);
});
test("recommendations combine goal and interests without duplicates", () => {
  const result = recommendServices("Sell products online", [
    "T2",
    "V1",
    "missing",
  ]);
  assert.deepEqual(
    result.map((r) => r.id),
    ["T2", "V1"],
  );
  assert.ok(result.every((r) => r.reason));
});
test("automation goal selects the relevant capabilities", () =>
  assert.deepEqual(
    recommendServices("Simplify everyday work", []).map((r) => r.id),
    ["T3", "T4"],
  ));
test("pairings stay optional and exclude selected capabilities", () => {
  const selections = ["T1", "T3", "T4"];
  const before = [...selections];
  assert.deepEqual(
    getPairings(selections).map((r) => r.id),
    ["T5"],
  );
  assert.deepEqual(selections, before);
});
test("empty brief has honest placeholders", () => {
  const brief = generateBrief({
    ...project,
    services: [],
    goal: "",
    timeline: "",
    budget: "",
    notes: "",
  });
  assert.match(brief, /Chosen solutions: To be discussed/);
  assert.match(brief, /Budget range: To be discussed/);
});
