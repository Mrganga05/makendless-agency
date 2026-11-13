import { createContext, useContext, useState, type ReactNode } from "react";
export type Project = {
  business: string;
  services: string[];
  goal: string;
  timeline: string;
  budget: string;
  notes: string;
  brief: string;
};
const empty: Project = {
  business: "Salon",
  services: [],
  goal: "",
  timeline: "",
  budget: "",
  notes: "",
  brief: "",
};
const ProjectContext = createContext<{
  project: Project;
  setProject: (next: Project | ((p: Project) => Project)) => void;
  toggleService: (id: string) => void;
  reset: () => void;
} | null>(null);
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project>(empty);
  const toggleService = (id: string) =>
    setProject((p) => ({
      ...p,
      brief: "",
      services: p.services.includes(id)
        ? p.services.filter((s) => s !== id)
        : [...p.services, id],
    }));
  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        toggleService,
        reset: () => setProject(empty),
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
export function useProject() {
  const c = useContext(ProjectContext);
  if (!c) throw new Error("ProjectProvider missing");
  return c;
}
