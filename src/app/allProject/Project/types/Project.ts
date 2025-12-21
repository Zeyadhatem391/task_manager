// types/Project.ts
export type ProjectStatus = "active" | "completed" | "archived";

export interface Project {
    id: string;
    name: string;
    description?: string;
    status: ProjectStatus;
    startDate?: string;
    endDate?: string;
    createdAt: string;
}
