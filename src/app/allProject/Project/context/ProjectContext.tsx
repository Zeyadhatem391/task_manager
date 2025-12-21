"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Project } from "../types/Project";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("projects");
    if (stored) setProjects(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Project) =>
    setProjects((prev) => [...prev, project]);
  const deleteProject = (id: string) =>
    setProjects((prev) => prev.filter((p) => p.id !== id));
  const updateProject = (updated: Project) =>
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, deleteProject, updateProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used inside ProjectProvider");
  return ctx;
};
