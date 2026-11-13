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
  comparison?: number;
  captions?: "editorial" | "bold" | "none";
  crop?: "wide" | "tight";
  inquiry?: string;
  workflowCategory?: string;
  draft?: string;
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
  comparison: 100,
  captions: "editorial",
  crop: "wide",
  inquiry: "Hello, I’d like a website with appointment booking.",
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

/** Local, disclosed keyword routing. This is a demonstration, not an AI API. */
export function classifyInquiry(inquiry: string) {
  const value = inquiry.toLowerCase();
  if (/shop|store|e-commerce|ecommerce/.test(value))
    return { category: "E-commerce website", studio: "BUILD", service: "T2" };
  if (/video|reel|podcast|editing/.test(value))
    return {
      category: "Video & creative production",
      studio: "CREATE",
      service: "V1",
    };
  if (/book|appointment|website|web site/.test(value))
    return { category: "Website + booking", studio: "BUILD", service: "T1" };
  if (/automation|automate|assistant|workflow/.test(value))
    return { category: "AI & automation", studio: "BUILD", service: "T4" };
  return {
    category: "Needs a conversation",
    studio: "Studio review",
    service: "T4",
  };
}
