import { services } from "./data";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
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
const currentServiceIds = new Set(services.map((service) => service.id));
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, storeProject] = useState<Project>(empty);
  const setProject = useCallback(
    (update: Project | ((previous: Project) => Project)) => {
      storeProject((previous) => {
        const next = typeof update === "function" ? update(previous) : update;
        const selected = [
          ...new Set(next.services.filter((id) => currentServiceIds.has(id))),
        ];
        return {
          ...next,
          services: selected,
          brief: selected.length < next.services.length ? "" : next.brief,
        };
      });
    },
    [],
  );
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
