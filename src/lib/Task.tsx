export const TaskStatus = {
    NotStarted: 0,
    Waiting: 1,
    InProgress: 2,
    Done: 3,
    Outdated: 4
} as const;

export const Priority = {
    Low: 0,
    Medium: 1,
    High: 2,
    Urgent: 3
} as const;

// TaskStatus as a type is a value of the TaskStatus "enum" above
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export type Priority = (typeof Priority)[keyof typeof Priority];

export type Task = {
    status: TaskStatus,
    subteam: number,
    priority: Priority,
    part: number,
    qty: number,
    due: Date
};