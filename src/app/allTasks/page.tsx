"use client";

import { useTasks } from "./Task/context/TaskContext";
import PageLayout from "../components/PageLayout";
import MainContent from "./components/MainContent";
import type { Task } from "./Task/types/Task";

export default function Home() {
  const { tasks, deleteTask, updateTask } = useTasks();

  const handleEdit = (task: Task) => {
    updateTask({
      ...task,
    });
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <PageLayout>
      {({ viewMode }) => (
        <MainContent
          viewMode={viewMode}
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </PageLayout>
  );
}
