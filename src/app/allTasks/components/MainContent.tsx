"use client";

import { useState } from "react";
import {
  X,
  MoreVertical,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Folder,
  Pencil,
  Trash2,
  Calendar,
  Flag,
  Info,
} from "lucide-react";

import type {
  Task,
  TaskStatus,
  TaskPriority,
} from "@/app/allTasks/Task/types/Task";

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

  // ===== Show Details =====
  const [detailsTask, setDetailsTask] = useState<Task | null>(null);

  // ===== Edit Modal =====
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState<string | undefined>();
  const [editStatus, setEditStatus] = useState<TaskStatus>("todo");
  const [editPriority, setEditPriority] = useState<TaskPriority>("low");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  // ===== Delete =====
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const getProjectName = (projectId?: string) =>
    projects.find((p) => p.id === projectId)?.name;

  const priorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case "low":
        return <ArrowDown size={16} className="text-green-600" />;
      case "medium":
        return <ArrowRight size={16} className="text-yellow-500" />;
      case "high":
        return <ArrowUp size={16} className="text-red-600" />;
    }
  };

  const priorityBg = (priority: TaskPriority) => {
    switch (priority) {
      case "low":
        return "bg-green-100";
      case "medium":
        return "bg-yellow-100";
      case "high":
        return "bg-red-100";
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditProjectId(task.projectId);
    setEditStatus(task.status);
    setEditPriority(task.priority);
    setEditStartDate(task.startDate || "");
    setEditEndDate(task.endDate || "");
  };

  return (
    <div className="flex-1 h-full bg-gray-100 p-4 sm:p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tasks</h2>

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
              onClick={() => setDetailsTask(task)}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all relative cursor-pointer"
            >
              {projectName && (
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                  <Folder size={18} />
                  <span className="font-medium">{projectName}</span>
                </div>
              )}

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${priorityBg(
                      task.priority
                    )}`}
                  >
                    {priorityIcon(task.priority)}
                  </div>

                  <h3 className="font-semibold text-lg text-gray-800">
                    {task.title}
                  </h3>
                </div>

               
              </div>

              {task.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {detailsTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-md rounded-xl p-5 relative">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setDetailsTask(null)}
            />

            <h2 className="text-xl font-bold mb-2">{detailsTask.title}</h2>

            {/* Project Info */}
            <div className="text-sm text-gray-500 mb-3">
              {detailsTask.projectId ? (
                <span>
                  Project:{" "}
                  <span className="font-medium text-blue-600">
                    {getProjectName(detailsTask.projectId)}
                  </span>
                </span>
              ) : (
                <span className="italic">Not linked to any project</span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {detailsTask.description || "No description"}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Info size={14} /> {detailsTask.status}
              </div>

              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Flag size={14} /> {detailsTask.priority}
              </div>

              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Calendar size={14} /> {detailsTask.startDate || "N/A"}
              </div>

              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Calendar size={14} /> {detailsTask.endDate || "N/A"}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  openEditModal(detailsTask);
                  setDetailsTask(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
              >
                <Pencil size={16} /> Edit
              </button>

              <button
                onClick={() => {
                  setDeleteTaskId(detailsTask.id);
                  setDetailsTask(null);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded flex gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-md rounded-xl p-5">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />

            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as TaskStatus)}
              className="w-full mb-2 p-2 border rounded"
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
              <option value="on_hold">On Hold</option>
              <option value="canceled">Canceled</option>
            </select>

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
              className="w-full mb-2 p-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="date"
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onEdit({
                    ...editingTask,
                    title: editTitle,
                    description: editDescription,
                    status: editStatus,
                    priority: editPriority,
                    projectId: editProjectId,
                    startDate: editStartDate,
                    endDate: editEndDate,
                  });
                  setEditingTask(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE ================= */}
      {deleteTaskId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
