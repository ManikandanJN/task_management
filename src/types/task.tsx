import React, { ReactNode } from "react";

export interface TaskCategory {
  id: number;
  name: string;
}

export interface TabItem {
  id: number;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface DropDownMenuItem {
  id: string;
  label: string;
  action?: (item: Task | string) => void;
  icon?: ReactNode;
}

export type TaskStatus = "TODO" | "IN-PROGRESS" | "COMPLETED";

export interface Task {
  id: string;
  status: TaskStatus;
  title: string;
  date?: string;
  image?: string;
  description: string;
  category: string;
}

export type Column = {
  id: TaskStatus;
  title: string;
};

export interface FormValuesProps {
  title: string | null;
  description: string | null;
  image: string | null;
  date: string;
  category: string;
  status: string;
}
