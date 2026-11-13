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
  if (goal === "Make booking easier") {
    matched.set("T3", "Give visitors a clear way to request an appointment.");
  }
  if (goal === "Launch a focused campaign page")
    matched.set("T6", "Give a single offering a focused website destination.");
  if (goal === "Explore digital marketing beta")
    matched.set(
      "M1",
      "Explore a campaign concept while Digital Marketing is Beta / Coming Soon.",
    );
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
  if (ids.includes("T6"))
    pairs.push({
      id: "V3",
      reason: "Give your landing page a concise promotional video.",
    });
  if (ids.includes("M1"))
    pairs.push({
      id: "M4",
      reason:
        "Explore a reporting approach alongside a campaign concept (Beta / Coming Soon).",
    });
  return pairs.filter(
    (pair, index) =>
      !ids.includes(pair.id) &&
      pairs.findIndex((p) => p.id === pair.id) === index,
  );
}
