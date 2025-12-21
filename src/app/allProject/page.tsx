"use client";

import { useProjects } from "./Project/context/ProjectContext";
import { useTasks } from "../allTasks/Task/context/TaskContext";
import PageLayout from "../components/PageLayout";
import MainContent from "./components/MainContent";
import type { Project } from "./Project/types/Project";

export default function Home() {
  const { projects, deleteProject, updateProject } = useProjects();
  const { tasks } = useTasks();

  const tasksCountMap: Record<string, number> = {};
  tasks.forEach((task) => {
    if (!task.projectId) return;
    const pid = task.projectId;
    tasksCountMap[pid] = (tasksCountMap[pid] || 0) + 1;
  });

  const handleEdit = (project: Project) => {
    updateProject({
      ...project,
    });
  };

  const handleDelete = (projectId: string) => {
    deleteProject(projectId);
  };

  return (
    <PageLayout>
      {({ viewMode }) => (
        <MainContent
          viewMode={viewMode}
          projects={projects}
          tasksCountMap={tasksCountMap}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </PageLayout>
  );
}
