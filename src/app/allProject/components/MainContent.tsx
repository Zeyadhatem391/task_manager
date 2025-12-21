"use client";

import { useState } from "react";
import {
  MoreVertical,
  Folder,
  Check,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import type { Project, ProjectStatus } from "@/app/allProject/Project/types/Project";

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
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all relative"
            >
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
                    {project.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {project.description}
                      </p>
                    )}
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

                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === project.id ? null : project.id
                      )
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === project.id && (
                    <div className="absolute right-3 top-12 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setEditingProject(project);
                          setEditName(project.name);
                          setEditDescription(project.description || "");
                          setEditStatus(project.status);
                          setEditStartDate(project.startDate || "");
                          setEditEndDate(project.endDate || "");
                          setOpenMenuId(null);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                        onClick={() => {
                          setDeleteProjectId(project.id);
                          setOpenMenuId(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl space-y-3">
            <h3 className="text-xl font-bold mb-2">Edit Project</h3>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Project name"
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Project description"
            />

            <div className="flex flex-wrap gap-2">
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
                className="flex-1 p-2 rounded border border-gray-300"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>

              <input
                type="date"
                value={editStartDate}
                onChange={(e) => setEditStartDate(e.target.value)}
                className="flex-1 p-2 rounded border border-gray-300"
                placeholder="Start Date"
              />

              <input
                type="date"
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
                className="flex-1 p-2 rounded border border-gray-300"
                placeholder="End Date"
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onEdit({
                    ...editingProject,
                    name: editName,
                    description: editDescription,
                    status: editStatus,
                    startDate: editStartDate || undefined,
                    endDate: editEndDate || undefined,
                  });
                  setEditingProject(null);
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteProjectId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-bold text-red-600 mb-2">
              Delete Project
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this project?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteProjectId(null)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(deleteProjectId);
                  setDeleteProjectId(null);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
