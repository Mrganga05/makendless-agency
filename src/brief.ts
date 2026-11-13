import type { Project } from "./project";
import { services } from "./data.ts";

export function generateBrief(project: Project): string {
  const names = project.services
    .map((id) => services.find((service) => service.id === id))
    .filter(Boolean);
  return [
    "MAKENDLESS — Project brief",
    `Business type: ${project.business || "Not specified"}`,
    `Chosen solutions: ${names.length ? names.map((service) => `${service!.name}${service!.world === "grow" ? " (Beta / Coming Soon — expression of interest)" : ""}`).join("; ") : "To be discussed"}`,
    `Main project goal: ${project.goal || "To be discussed"}`,
    `Preferred timeline: ${project.timeline || "Flexible / to be discussed"}`,
    `Budget range: ${project.budget || "To be discussed"}`,
    `Additional notes: ${project.notes || "None yet"}`,
    "",
    "This brief is a starting point for a conversation, not a quote or booking.",
  ].join("\n");
}
export function recommendServices(
  goal: string,
  interests: string[],
): { id: string; reason: string }[] {
  const matched = new Map<string, string>();
  if (goal === "Establish my online presence")
    matched.set("T1", "Give your business a clear, welcoming digital home.");
  if (goal === "Tell my story through content") {
    matched.set(
      "V1",
      "Turn your story into focused, shareable short-form content.",
    );
    matched.set("V4", "Make more useful content from every recording.");
  }
  if (goal === "Simplify everyday work") {
    matched.set("T3", "Make bookings and business tasks easier to manage.");
    matched.set(
      "T4",
      "Connect repetitive tasks with a considered automation workflow.",
    );
  }
  if (goal === "Sell products online")
    matched.set(
      "T2",
      "Bring your products together in an easy-to-browse storefront.",
    );
  for (const id of interests)
    if (services.some((service) => service.id === id) && !matched.has(id))
      matched.set(
        id,
        "Included because you expressed interest in this service.",
      );
  if (!matched.size)
    matched.set(
      "T1",
      "A website is a useful starting point for exploring your digital presence.",
    );
  return Array.from(matched, ([id, reason]) => ({ id, reason }));
}
export function getPairings(ids: string[]): { id: string; reason: string }[] {
  const pairs: { id: string; reason: string }[] = [];
  if (ids.includes("T1")) {
    pairs.push({
      id: "T3",
      reason: "Let visitors book directly from your website.",
    });
    pairs.push({
      id: "T5",
      reason: "Keep your new website current as your business evolves.",
    });
  }
  if (ids.includes("V3"))
    pairs.push({
      id: "V4",
      reason: "Turn your promotional film into several social formats.",
    });
  if (ids.includes("T4"))
    pairs.push({
      id: "T1",
      reason: "Give your assistant a useful home on your business website.",
    });
  return pairs.filter(
    (pair, index) =>
      !ids.includes(pair.id) &&
      pairs.findIndex((p) => p.id === pair.id) === index,
  );
}
