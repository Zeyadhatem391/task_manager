"use client";

import { useState, useEffect, ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddTaskModal from "../allTasks/components/AddTaskModal";
import AddProjectModal from "../allProject/components/AddProjectModal";
import { useTasks } from "../allTasks/Task/context/TaskContext";
import { useProjects } from "../allProject/Project/context/ProjectContext";

type PageLayoutProps = {
  children: (props: { viewMode: "list" | "tiles" }) => ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openAddProject, setOpenAddProject] = useState(false);

  const { tasks, addTask } = useTasks();
  const { addProject } = useProjects();

  const handleAddTask = (task: any) => {
    addTask(task);
    setOpenAddTask(false);
  };

  const handleAddProject = (project: any) => {
    addProject(project);
    setOpenAddProject(false);
  };

  const [viewMode, setViewMode] = useState<"list" | "tiles">("list");

  useEffect(() => {
    const storedView = localStorage.getItem("viewMode") as "list" | "tiles";
    if (storedView) setViewMode(storedView);
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        openMenuMobile={openMenuMobile}
        setOpenMenuMobile={setOpenMenuMobile}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          openMenuMobile={openMenuMobile}
          setOpenMenuMobile={setOpenMenuMobile}
          onOpenAddTask={() => setOpenAddTask(true)}
          onOpenAddProject={() => setOpenAddProject(true)}
        />
        {children({ viewMode })}
      </div>

      <AddTaskModal
        open={openAddTask}
        onClose={() => setOpenAddTask(false)}
        onAddTask={handleAddTask}
      />
      <AddProjectModal
        open={openAddProject}
        onClose={() => setOpenAddProject(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
