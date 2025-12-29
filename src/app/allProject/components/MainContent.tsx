"use client";

import { useState } from "react";
import {
  MoreVertical,
  Folder,
  Check,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type {
  Project,
  ProjectStatus,
} from "@/app/allProject/Project/types/Project";

interface MainContentProps {
  projects: Project[];
  tasksCountMap?: Record<string, number>;
  viewMode: "list" | "tiles";
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const statusCycle: Record<ProjectStatus, ProjectStatus> = {
  active: "completed",
  completed: "archived",
  archived: "active",
};

const statusColor = (status: ProjectStatus) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-600";
    case "completed":
      return "bg-blue-100 text-blue-600";
    case "archived":
      return "bg-gray-200 text-gray-600";
  }
};

const statusIcon = (status: ProjectStatus) => {
  switch (status) {
    case "active":
      return <ArrowRight size={16} />;
    case "completed":
      return <Check size={16} />;
    case "archived":
      return <ArrowDown size={16} />;
  }
};

export default function MainContent({
  projects,
  tasksCountMap = {},
  viewMode,
  onEdit,
  onDelete,
}: MainContentProps) {
  // Edit modal
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<ProjectStatus>("active");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  // Delete modal
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  return (
    <div className="flex-1 h-full bg-gray-100 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Projects</h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet 👀</p>
      ) : (
        <div
          className={
            viewMode === "list"
              ? "space-y-4"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          }
        >
          {projects.map((project) => (
            <Link key={project.id} href={`/detailsProject/${project.id}`}>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all relative">
                <div className="flex justify-between items-center">
                  {/* Left side: info + tasks count */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Folder className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {project.name}
                      </h3>
                    </div>

                    {/* Tasks count circle */}
                    <div className="ml-4 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-800">
                      {tasksCountMap[project.id] || 0}
                    </div>
                  </div>

                  {/* Right side: status button + menu */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onEdit({
                          ...project,
                          status: statusCycle[project.status],
                        })
                      }
                      className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${statusColor(
                        project.status
                      )}`}
                    >
                      {statusIcon(project.status)}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    
    </div>
  );
}
