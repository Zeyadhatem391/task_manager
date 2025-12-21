export type TaskStatus =
    | "todo"
    | "in_progress"
    | "done"
    | "on_hold"
    | "canceled";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    projectId?: string;
    startDate?: string;
    endDate?: string;
    createdAt: string;
}
