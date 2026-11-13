export const BRAND = { name: "MAKENDLESS", tagline: "CREATE • BUILD • GROW" };
export type World = "create" | "build" | "grow";
export type Service = {
  id: string;
  world: World;
  name: string;
  short: string;
  description: string;
  deliverables: string[];
};
export const services: Service[] = [
  {
    id: "V1",
    world: "create",
    name: "Short-Form Video Editing",
    short: "Short-form videos",
    description:
      "Turn a moment into a story worth stopping for. Platform-ready edits with considered pacing, captions and framing.",
    deliverables: [
      "Vertical edits",
      "Caption styling",
      "Platform-ready exports",
    ],
  },
  {
    id: "V2",
    world: "create",
    name: "Long-Form & Podcast Editing",
    short: "Long-form & podcasts",
    description:
      "Give every conversation a clear rhythm. Thoughtful cuts, balanced audio and highlights that keep your story moving.",
    deliverables: ["Edited episodes", "Audio cleanup", "Highlight selections"],
  },
  {
    id: "V3",
    world: "create",
    name: "Promotional & Ad Video Editing",
    short: "Promotional & ad videos",
    description:
      "Bring your offering into focus with purposeful visual stories built around your message.",
    deliverables: [
      "Promotional edit",
      "Creative treatments",
      "Multiple aspect ratios",
    ],
  },
  {
    id: "V4",
    world: "create",
    name: "Content Repurposing & Creator Packages",
    short: "Content repurposing",
    description:
      "Make one recording work in more places. Shape your source into a cohesive set of shareable formats.",
    deliverables: ["Reels and shorts", "Teaser cuts", "Content packages"],
  },
  {
    id: "V5",
    world: "create",
    name: "Motion Graphics & AI-Assisted Editing",
    short: "Motion & AI-assisted edits",
    description:
      "Add character with purposeful typography, graphic motion and carefully reviewed AI-assisted workflows.",
    deliverables: ["Motion titles", "Graphic overlays", "Human-reviewed edits"],
  },
  {
    id: "T1",
    world: "build",
    name: "Business Website Design & Development",
    short: "Business websites",
    description:
      "A digital home that makes your business clear, distinctive and easy to connect with.",
    deliverables: [
      "Responsive website",
      "Accessible interface",
      "Launch preparation",
    ],
  },
  {
    id: "T2",
    world: "build",
    name: "E-commerce Website Development",
    short: "E-commerce stores",
    description:
      "A considered shopping experience that helps people explore your products and purchase with confidence.",
    deliverables: [
      "Product catalog",
      "Cart experience",
      "Checkout integration planning",
    ],
  },
  {
    id: "T3",
    world: "build",
    name: "Booking Systems & Custom Web Applications",
    short: "Booking & web apps",
    description:
      "Turn complex business tasks into simple digital experiences, from scheduling to custom workflows.",
    deliverables: [
      "Booking interface",
      "Custom workflows",
      "Application development",
    ],
  },
  {
    id: "T4",
    world: "build",
    name: "Business Automation & AI Assistants",
    short: "Automation & AI assistants",
    description:
      "Connect repetitive tasks and build useful assistants with clear boundaries and human oversight.",
    deliverables: [
      "Workflow mapping",
      "Automation integrations",
      "Assistant configuration",
    ],
  },
  {
    id: "T5",
    world: "build",
    name: "Website Maintenance & Optimization",
    short: "Maintenance & optimization",
    description:
      "Keep your website considered, current and usable as your business evolves.",
    deliverables: [
      "Website updates",
      "Responsive improvements",
      "Performance review",
    ],
  },
  {
    id: "M1",
    world: "grow",
    name: "Meta & Google Ads Management",
    short: "Meta & Google ads",
    description:
      "Planned campaign strategy and management. This service is in development and not yet available.",
    deliverables: [
      "Campaign planning",
      "Creative direction",
      "Reporting approach",
    ],
  },
  {
    id: "M2",
    world: "grow",
    name: "Social Media Content Management",
    short: "Social media content",
    description:
      "A planned approach to a consistent social presence. Join the conversation while we shape this service.",
    deliverables: [
      "Content planning",
      "Publishing approach",
      "Creative coordination",
    ],
  },
  {
    id: "M3",
    world: "grow",
    name: "Local Digital Presence & Analytics",
    short: "Local presence & analytics",
    description:
      "A clearer local presence and a practical view of your digital activity. Coming soon.",
    deliverables: [
      "Local profile review",
      "Presence planning",
      "Analytics approach",
    ],
  },
];
export const worldInfo = {
  create: {
    label: "CREATE",
    title: "Video editing with feeling.",
    subtitle: "Video Editing & Creative Production",
    intro: "A little rhythm. A fresh perspective. A story they feel.",
  },
  build: {
    label: "BUILD",
    title: "Websites & AI that work.",
    subtitle: "Websites, IT & AI Solutions",
    intro: "Beautiful on the surface. Thoughtful in every interaction.",
  },
  grow: {
    label: "GROW",
    title: "Digital marketing. Coming soon.",
    subtitle: "Digital Marketing — Beta / Coming Soon",
    intro: "The next chapter is taking shape. Explore what’s on the horizon.",
  },
};
export const businesses = [
  "Salon",
  "Café / Restaurant",
  "Gym / Fitness",
  "General Small Business",
];
