"use client";

import { X, ChevronDown, Check, Folder } from "lucide-react";
import { useState } from "react";
import type { Task, TaskStatus, TaskPriority } from "@/app/allTasks/Task/types/Task";
import { useProjects } from "@/app/allProject/Project/context/ProjectContext";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
}

/* ================= COLORS ================= */
const COLORS = {
  bg: "bg-rose-950",
  text: "text-rose-50",
  border: "border-rose-800",
  inputBg: "bg-rose-900",
  hover: "hover:bg-rose-800",
  btn: "bg-rose-600 hover:bg-rose-700",
};
/* ========================================== */

export default function AddTaskModal({
  open,
  onClose,
  onAddTask,
}: AddTaskModalProps) {
  const { projects } = useProjects(); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [projectId, setProjectId] = useState<string>(""); 
  const [openProject, setOpenProject] = useState(false); 
  const [openStatus, setOpenStatus] = useState(false);

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "on_hold", label: "On Hold" },
    { value: "canceled", label: "Canceled" },
  ];

  const handleSubmit = () => {
    if (!title.trim() || !startDate || !endDate) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      priority,
      startDate,
      endDate,
      projectId: projectId || undefined, 
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    onClose();

    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("todo");
    setStartDate("");
    setEndDate("");
    setProjectId("");
  };

  if (!open) return null;

  const selectedProject = projects.find((p) => p.id === projectId);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div
        className={` w-90 md:w-105 rounded-xl shadow-xl p-4 md:p-6 relative ${COLORS.bg} ${COLORS.text}`}
      >
        <X
          className="absolute top-4 right-4 cursor-pointer opacity-70 hover:opacity-100"
          onClick={onClose}
        />

        <h2 className="text-2xl font-bold mb-6">New Task</h2>

        <div className="md:space-y-4 space-y-2">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`px-3 py-2 rounded-md border ${COLORS.inputBg} ${COLORS.border}`}
              placeholder="Task title"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`px-3 py-2 rounded-md border ${COLORS.inputBg} ${COLORS.border}`}
              placeholder="Optional description"
            />
          </div>

          {/* Project */}
          <div className="relative">
            <label className="text-sm mb-1 block">Project</label>

            <button
              type="button"
              onClick={() => setOpenProject(!openProject)}
              className={`w-full flex justify-between items-center px-3 py-2 rounded-md border ${COLORS.inputBg} ${COLORS.border}`}
            >
              <span className="flex items-center gap-2">
                <Folder size={16} />
                {selectedProject ? selectedProject.name : "No Project"}
              </span>
              <ChevronDown size={16} />
            </button>

            {openProject && (
              <ul
                className={`absolute mt-1 w-full rounded-md border shadow-lg z-10 ${COLORS.bg} ${COLORS.border}`}
              >
                <li
                  onClick={() => {
                    setProjectId("");
                    setOpenProject(false);
                  }}
                  className={`px-3 py-2 cursor-pointer ${COLORS.hover}`}
                >
                  No Project
                </li>

                {projects.map((project) => (
                  <li
                    key={project.id}
                    onClick={() => {
                      setProjectId(project.id);
                      setOpenProject(false);
                    }}
                    className={`px-3 py-2 flex justify-between cursor-pointer ${COLORS.hover}`}
                  >
                    {project.name}
                    {projectId === project.id && <Check size={16} />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Priority */}
          <div>
            <p className="text-sm mb-2">Priority</p>
            <div className="flex gap-3">
              {(["low", "medium", "high"] as TaskPriority[]).map((p) => (
                <label
                  key={p}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer ${COLORS.hover}`}
                >
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === p}
                    onChange={() => setPriority(p)}
                  />
                  <span className="capitalize">{p}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="relative">
            <label className="text-sm mb-1 block">Status</label>

            <button
              type="button"
              onClick={() => setOpenStatus(!openStatus)}
              className={`w-full flex justify-between items-center px-3 py-2 rounded-md border ${COLORS.inputBg} ${COLORS.border}`}
            >
              {statusOptions.find((s) => s.value === status)?.label}
              <ChevronDown size={16} />
            </button>

            {openStatus && (
              <ul
                className={`absolute mt-1 w-full rounded-md border shadow-lg ${COLORS.bg} ${COLORS.border}`}
              >
                {statusOptions.map((s) => (
                  <li
                    key={s.value}
                    onClick={() => {
                      setStatus(s.value);
                      setOpenStatus(false);
                    }}
                    className={`px-3 py-2 flex justify-between cursor-pointer ${COLORS.hover}`}
                  >
                    {s.label}
                    {status === s.value && <Check size={16} />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`px-3 py-2 rounded-md border ${COLORS.inputBg} ${COLORS.border}`}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`px-3 py-2 rounded-md border ${COLORS.inputBg} ${COLORS.border}`}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-md text-white ${COLORS.btn}`}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
