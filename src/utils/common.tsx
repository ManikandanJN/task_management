import { BoardView, ListView } from "../icons";
import { TabItem, TaskCategory, Column as ColumnType } from "../types/task";

export const taskCategory: TaskCategory[] = [
  { id: 1, name: "Work" },
  { id: 2, name: "Personal" },
];

export const tabItem: TabItem[] = [
  { id: 1, name: "List", icon: ListView },
  { id: 2, name: "Board", icon: BoardView },
];

export const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN-PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Completed" },
];
