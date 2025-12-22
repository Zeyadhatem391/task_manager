"use client";

import { useState } from "react";
import {
  MoreVertical,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Folder,
} from "lucide-react";
import type { Task } from "@/app/allTasks/Task/types/Task";
import { useProjects } from "@/app/allProject/Project/context/ProjectContext";

interface MainContentProps {
  tasks: Task[];
  viewMode: "list" | "tiles";
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function MainContent({
  tasks,
  viewMode,
  onEdit,
  onDelete,
}: MainContentProps) {
  const { projects } = useProjects();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // ===== Edit Modal =====
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState<string | undefined>(
    undefined
  );

  // ===== Delete Modal =====
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const getProjectName = (projectId?: string) => {
    if (!projectId) return null;
    return projects.find((p) => p.id === projectId)?.name;
  };

  const priorityCycle = {
    low: "medium",
    medium: "high",
    high: "low",
  } as const;

  const priorityIcon = (priority: string) => {
    switch (priority) {
      case "low":
        return <ArrowDown size={16} className="text-green-600" />;
      case "medium":
        return <ArrowRight size={16} className="text-yellow-500" />;
      case "high":
        return <ArrowUp size={16} className="text-red-600" />;
    }
  };

  const priorityBg = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100";
      case "medium":
        return "bg-yellow-100";
      case "high":
        return "bg-red-100";
    }
  };

  return (
    <div className="flex-1 h-full bg-gray-100 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet 👀</p>
      ) : (
        <div
          className={
            viewMode === "list"
              ? "space-y-4"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          }
        >
          {tasks.map((task) => {
            const projectName = getProjectName(task.projectId);

            return (
              <div
                key={task.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all relative"
              >
                {/* Project */}
                {projectName && (
                  <div className="flex items-center w-fit gap-2 text-xs text-blue-600 mb-2 cursor-pointer">
                    <Folder size={20} />
                    <span className="text-xl">{projectName}</span>
                  </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onEdit({
                          ...task,
                          priority:
                            priorityCycle[
                              task.priority as "low" | "medium" | "high"
                            ],
                        })
                      }
                      className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${priorityBg(
                        task.priority
                      )}`}
                    >
                      {priorityIcon(task.priority)}
                    </button>

                    <h3 className="font-semibold text-lg text-gray-800">
                      {task.title}
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === task.id ? null : task.id)
                    }
                    className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === task.id && (
                    <div className="absolute right-9 top-10 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setEditingTask(task);
                          setEditTitle(task.title);
                          setEditDescription(task.description || "");
                          setEditProjectId(task.projectId);
                          setOpenMenuId(null);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDeleteTaskId(task.id);
                          setOpenMenuId(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {task.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {task.description}
                  </p>
                )}

                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                  <span>Status: {task.status}</span>
                  <span>
                    {task.startDate || "N/A"} → {task.endDate || "N/A"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===== Edit Modal ===== */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-3 p-2 rounded border"
              placeholder="Task title"
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full mb-3 p-2 rounded border"
              placeholder="Task description"
            />

            {/* Project Select */}
            <select
              value={editProjectId || ""}
              onChange={(e) => setEditProjectId(e.target.value || undefined)}
              className="w-full mb-4 p-2 rounded border"
            >
              <option value="">No Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onEdit({
                    ...editingTask,
                    title: editTitle,
                    description: editDescription,
                    projectId: editProjectId,
                  });
                  setEditingTask(null);
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Delete Modal ===== */}
      {deleteTaskId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-bold text-red-600 mb-2">Delete Task</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTaskId(null)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete(deleteTaskId);
                  setDeleteTaskId(null);
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
