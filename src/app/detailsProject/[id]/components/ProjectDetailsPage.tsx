"use client";

import {
  Folder,
  Calendar,
  Info,
  Flag,
  Plus,
  Pencil,
  Trash2,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  X,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import type {
  TaskPriority,
  Task,
  TaskStatus,
} from "@/app/allTasks/Task/types/Task";

import type {
  Project,
  ProjectStatus,
} from "@/app/allProject/Project/types/Project";

import { useProjects } from "@/app/allProject/Project/context/ProjectContext";
import { useTasks } from "@/app/allTasks/Task/context/TaskContext";

interface ProjectDetailsPageProps {
  onEdit: (project: Project) => void;
}

/* ================= PAGE ================= */
export default function ProjectDetailsPage({
  onEdit,
}: ProjectDetailsPageProps) {
  const params = useParams();
  const projectId = params?.id ?? "";
  const router = useRouter();

  const { projects, deleteProject } = useProjects();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  // Edit modal Project
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescriptionProject, setEditDescriptionProject] = useState("");
  const [editStatusProject, setEditStatusProject] =
    useState<ProjectStatus>("active");
  const [editStartDateProject, setEditStartDateProject] = useState("");
  const [editEndDateProject, setEditEndDateProject] = useState("");

  /* ================= TASK MODALS STATE ================= */
  const [detailsTask, setDetailsTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  /* ================= ADD / EDIT FIELDS ================= */
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<TaskStatus>("todo");
  const [editPriority, setEditPriority] = useState<TaskPriority>("low");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  const [showDeleteProject, setShowDeleteProject] = useState(false);

  /* ================= MODALS STATE ================= */
  const [showAddTask, setShowAddTask] = useState(false);

  /* ================= FORM STATE ================= */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("low");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!project) {
    return (
      <div className="p-6 text-center text-gray-500">Project not found 😢</div>
    );
  }

  /* ================= HELPERS ================= */

  const getProjectName = (id?: string) =>
    projects.find((p) => p.id === id)?.name || "Unknown";

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("low");
    setStartDate("");
    setEndDate("");
  };

  const openAddTaskModal = () => {
    resetForm();
    setShowAddTask(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(task.status);
    setEditPriority(task.priority);
    setEditStartDate(task.startDate || "");
    setEditEndDate(task.endDate || "");
  };

  const openEditModalProject = (project: Project) => {
    setEditingProject(project);
    setEditName(project.name);
    setEditDescriptionProject(project.description || "");
    setEditStatusProject(project.status);
    setEditStartDateProject(project.startDate || "");
    setEditEndDateProject(project.endDate || "");
  };

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

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* ================= PROJECT INFO ================= */}
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* ================= PROJECT INFO ================= */}
          <div className="flex-1">
            <div className="flex flex-row items-center gap-2 mb-2 text-blue-600 flex-wrap">
              <Folder size={25} />
              <h1 className="text-2xl font-bold text-gray-800">
                {project.name}
              </h1>
            </div>

            <p className="text-gray-600 mb-4 w-full">
              {project.description || "No description provided"}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Info size={14} /> {project.status}
              </div>
              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Calendar size={14} /> {project.startDate || "N/A"}
              </div>
              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Calendar size={14} /> {project.endDate || "N/A"}
              </div>
              <div className="bg-gray-100 p-2 rounded flex gap-2 items-center">
                <Flag size={14} /> {projectTasks.length} Tasks
              </div>
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            <button
              onClick={openAddTaskModal}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Task
            </button>

            <button
              onClick={() => openEditModalProject(project)}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Pencil size={18} /> Edit Project
            </button>

            <button
              onClick={() => setShowDeleteProject(true)}
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
            >
              <Trash2 size={18} /> Delete Project
            </button>
          </div>
        </div>
      </div>

      {/* ================= TASKS ================= */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Project Tasks ({projectTasks.length})
        </h2>

        {projectTasks.length === 0 ? (
          <p className="text-gray-500">No tasks in this project</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projectTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setDetailsTask(task)}
                className="cursor-pointer bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                {/* HEADER */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${priorityBg(
                      task.priority
                    )}`}
                  >
                    {priorityIcon(task.priority)}
                  </div>
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                </div>

                {/* DESCRIPTION */}
                {task.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {task.description}
                  </p>
                )}

                {/* DATES TIMELINE */}
                <div className="mt-4">
                  <div className="flex items-center justify-between relative">
                    {/* Line */}
                    <div className="absolute top-3 left-4 right-4 h-0.5 bg-linear-to-r from-blue-400 to-rose-400" />

                    {/* Start Date */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center justify-center">
                        S
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {task.startDate}
                      </span>
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-semibold flex items-center justify-center">
                        E
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {task.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= DELETE PROJECT MODAL ================= */}
      {showDeleteProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-bold text-red-600 mb-2">
              Delete Project
            </h3>

            <p className="text-gray-600 mb-3">
              Are you sure you want to delete this project?
            </p>

            <p className="text-sm text-red-500 mb-4">
              ⚠️ All tasks related to this project will be deleted permanently.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteProject(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  projectTasks.forEach((task) => deleteTask(task.id));
                  deleteProject(project.id);
                  router.push("/allProject");
                }}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
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
              value={editDescriptionProject}
              onChange={(e) => setEditDescriptionProject(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Project description"
            />

            <div className="flex flex-wrap gap-2">
              <select
                value={editStatusProject}
                onChange={(e) =>
                  setEditStatusProject(e.target.value as ProjectStatus)
                }
                className="flex-1 p-2 rounded border border-gray-300"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>

              <input
                type="date"
                value={editStartDateProject}
                onChange={(e) => setEditStartDateProject(e.target.value)}
                className="flex-1 p-2 rounded border border-gray-300"
                placeholder="Start Date"
              />

              <input
                type="date"
                value={editEndDateProject}
                onChange={(e) => setEditEndDateProject(e.target.value)}
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
                    description: editDescriptionProject,
                    status: editStatusProject,
                    startDate: editStartDateProject || undefined,
                    endDate: editEndDateProject || undefined,
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

      {/* ================= ADD TASK MODAL ================= */}
      {showAddTask && (
        <TaskModal
          title="Add Task"
          onClose={() => setShowAddTask(false)}
          onSave={() => {
            addTask({
              id: crypto.randomUUID(),
              title,
              description,
              status,
              priority,
              projectId: project.id,
              startDate,
              endDate,
              createdAt: new Date().toISOString(),
            });
            setShowAddTask(false);
          }}
          {...{
            titleValue: title,
            setTitle,
            description,
            setDescription,
            status,
            setStatus,
            priority,
            setPriority,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
          }}
        />
      )}

      {/* ================= DETAILS MODAL Task ================= */}
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
                <Pencil size={18} /> Edit
              </button>

              <button
                onClick={() => {
                  setDeleteTaskId(detailsTask.id);
                  setDetailsTask(null);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded flex gap-2"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT MODAL Task ================= */}
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
                  const taskData: Task = {
                    id: editingTask?.id || crypto.randomUUID(),
                    title: editTitle,
                    description: editDescription,
                    status: editStatus,
                    priority: editPriority,
                    projectId: project.id,
                    startDate: editStartDate,
                    endDate: editEndDate,
                    createdAt:
                      editingTask?.createdAt || new Date().toISOString(),
                  };

                  editingTask ? updateTask(taskData) : addTask(taskData);

                  setEditingTask(null);
                  setEditTitle("");
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL Task ================= */}
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
                  deleteTask(deleteTaskId);
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

/* ================= REUSABLE MODAL ================= */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl w-full max-w-md relative">
        <X
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

/* ================= TASK MODAL ================= */
function TaskModal(props: any) {
  const {
    title,
    onClose,
    onSave,
    titleValue,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;

  return (
    <Modal onClose={onClose}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>

      <input
        value={titleValue}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="flex justify-end gap-2">
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
        <button
          onClick={onSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
