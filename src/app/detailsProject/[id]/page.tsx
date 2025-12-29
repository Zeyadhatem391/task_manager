"use client";

import PageLayout from "@/app/components/PageLayout";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import { useProjects } from "@/app/allProject/Project/context/ProjectContext";
import type { Project } from "@/app/allProject/Project/types/Project";

export default function Home() {
  const { updateProject } = useProjects();
  const handleEdit = (project: Project) => {
    updateProject({
      ...project,
    });
  };
  return (
    <PageLayout>
      {({ viewMode }) => <ProjectDetailsPage onEdit={handleEdit} />}
    </PageLayout>
  );
}
