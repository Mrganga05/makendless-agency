export type ShowcaseMode = "create" | "build" | "grow";
export type CampaignState = {
  objective: "awareness" | "visits" | "inquiries";
  creative: "product" | "story";
  placement: "feed" | "story";
};
export const initialCampaignState: CampaignState = {
  objective: "awareness",
  creative: "product",
  placement: "feed",
};
export const campaignObjectives = {
  awareness: {
    label: "Brand awareness",
    headline: "A little pause. A better day.",
    action: "Discover the café",
    body: "Introduce a neighborhood café through a considered visual story.",
  },
  visits: {
    label: "Website visits",
    headline: "Make room for a daily ritual.",
    action: "Explore the sample menu",
    body: "Connect a useful message to a welcoming website destination.",
  },
  inquiries: {
    label: "Customer inquiries",
    headline: "Good things start with a hello.",
    action: "See the visit idea",
    body: "Give people a clear invitation to learn about the business.",
  },
} as const;
export type ShowcaseState = {
  mode: ShowcaseMode;
  edited: boolean;
  progress: number;
  playing: boolean;
  finished: boolean;
  mobile: boolean;
  sitePanel: "home" | "menu";
  comparison?: number;
  captions?: "editorial" | "bold" | "none";
  crop?: "wide" | "tight";
  campaign: CampaignState;
};
export const initialShowcaseState: ShowcaseState = {
  mode: "create",
  edited: true,
  progress: 0,
  playing: false,
  finished: true,
  mobile: false,
  sitePanel: "home",
  comparison: 100,
  captions: "editorial",
  crop: "wide",
  campaign: initialCampaignState,
};
