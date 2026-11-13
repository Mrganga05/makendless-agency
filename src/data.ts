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
    name: "Content Repurposing",
    short: "Content repurposing",
    description:
      "Make one recording work in more places. Shape your source into a cohesive set of shareable formats.",
    deliverables: ["Reels and shorts", "Teaser cuts", "Content packages"],
  },
  {
    id: "V5",
    world: "create",
    name: "Motion Graphics",
    short: "Motion graphics",
    description:
      "Add character with purposeful typography, graphic motion and considered visual storytelling.",
    deliverables: [
      "Motion titles",
      "Graphic overlays",
      "Animated compositions",
    ],
  },
  {
    id: "T1",
    world: "build",
    name: "Business Website Development",
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
    id: "T6",
    world: "build",
    name: "Landing Page Development",
    short: "Landing pages",
    description:
      "Give one offering a focused destination, with a clear message, responsive composition and useful next step.",
    deliverables: [
      "Focused page design",
      "Responsive development",
      "Form and CTA integration planning",
    ],
  },
  {
    id: "T3",
    world: "build",
    name: "Booking Websites & Web Applications",
    short: "Booking & web apps",
    description:
      "Turn complex business tasks into simple digital experiences, from appointment scheduling to useful web applications.",
    deliverables: [
      "Booking interface",
      "Application interface design",
      "Application development",
    ],
  },
  {
    id: "T5",
    world: "build",
    name: "Website Redesign & Maintenance",
    short: "Redesign & maintenance",
    description:
      "Keep your website considered, current and usable as your business evolves.",
    deliverables: [
      "Website redesign and updates",
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
    name: "Social Media Management",
    short: "Social media management",
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
    name: "Local Business Digital Marketing",
    short: "Local business marketing",
    description:
      "A clearer local presence through useful business information, considered content and consistent profiles. Beta / Coming Soon.",
    deliverables: [
      "Local profile review",
      "Presence planning",
      "Local content direction",
    ],
  },
  {
    id: "M4",
    world: "grow",
    name: "Marketing Analytics & Reporting",
    short: "Analytics & reporting",
    description:
      "A planned way to organize marketing activity into clear reports. Beta / Coming Soon; no live reporting service is connected.",
    deliverables: [
      "Measurement planning",
      "Reporting structure",
      "Marketing activity summaries",
    ],
  },
];
export const worldInfo = {
  create: {
    label: "CREATE",
    title: "Video editing with feeling.",
    subtitle: "Video Editing",
    intro: "A little rhythm. A fresh perspective. A story they feel.",
  },
  build: {
    label: "BUILD",
    title: "Websites made for your next chapter.",
    subtitle: "Website Development",
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
