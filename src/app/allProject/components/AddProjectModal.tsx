"use client";

import { X } from "lucide-react";
import { useState } from "react";
import type { Project, ProjectStatus } from "@/app/allProject/Project/types/Project";

/* ================= COLORS SYSTEM ================= */
const COLORS = {
  bg: "bg-rose-950",
  text: "text-rose-50",
  border: "border-rose-800",
  hover: "hover:bg-rose-800",
};
/* ================================================= */

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

export default function AddProjectModal({
  open,
  onClose,
  onAddProject,
}: AddProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      status,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      createdAt: new Date().toISOString(),
    };

    onAddProject(newProject);
    onClose();

    setName("");
    setDescription("");
    setStatus("active");
    setStartDate("");
    setEndDate("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div
        className={` w-90 md:w-105 rounded-xl shadow-xl p-6 relative ${COLORS.bg} ${COLORS.text}`}
      >
        <X
          className="absolute top-4 right-4 cursor-pointer opacity-70 hover:opacity-100"
          onClick={onClose}
        />

        <h2 className="text-2xl font-bold mb-6">New Project</h2>

        <div className="md:space-y-4 space-y-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Project Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`px-3 py-2 rounded-md border ${COLORS.border} ${COLORS.bg}`}
              placeholder="Enter project name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`px-3 py-2 rounded-md border ${COLORS.border} ${COLORS.bg}`}
              placeholder="Enter project description"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className={`px-3 py-2 rounded-md border ${COLORS.border} ${COLORS.bg}`}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`px-3 py-2 rounded-md border ${COLORS.border} ${COLORS.bg}`}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`px-3 py-2 rounded-md border ${COLORS.border} ${COLORS.bg}`}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md"
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
}
