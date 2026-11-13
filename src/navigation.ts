/** Navigation is intentionally small; studio availability must remain explicit. */
export const PRIMARY_LINKS = [
  { to: "/work", label: "Work" },
  { to: "/project-lab", label: "Project Lab" },
  { to: "/about", label: "About" },
] as const;

export const STUDIO_LINKS = [
  { to: "/studios/create", name: "CREATE", description: "Video Editing" },
  { to: "/studios/build", name: "BUILD", description: "Websites & AI" },
  {
    to: "/studios/grow",
    name: "GROW",
    description: "Marketing",
    availability: "Beta / Coming Soon",
  },
] as const;

export const PROJECT_LINK = {
  to: "/contact",
  label: "Start a Project",
} as const;
