export type ShowcaseMode = "create" | "build" | "ai";
export type ShowcaseState = {
  mode: ShowcaseMode;
  edited: boolean;
  progress: number;
  playing: boolean;
  finished: boolean;
  mobile: boolean;
  step: number;
  sitePanel: "home" | "menu";
};
export const initialShowcaseState: ShowcaseState = {
  mode: "create",
  edited: true,
  progress: 0,
  playing: false,
  finished: true,
  mobile: false,
  step: 0,
  sitePanel: "home",
};
export const workflowSteps = [
  "Customer inquiry",
  "Classification",
  "Routing",
  "Draft response",
  "Human review",
];
export const workflowMessages = [
  "“Hello, I’d like a website with appointment booking.”",
  "Website + booking request. A clear intent, ready to organize.",
  "Routed to BUILD. The right request reaches the right studio.",
  "“Thanks for reaching out. Let’s explore your website and booking goals.”",
  "A person checks the draft and decides what happens next. Nothing is sent.",
];
