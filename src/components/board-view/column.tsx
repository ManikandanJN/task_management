import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "../../types/task";
import { TaskCard } from "./task-card";
import { getColor } from "../../utils/helpers";

type ColumnProps = {
  key: string;
  column: ColumnType;
  tasks: Task[];
};

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-96 flex-col rounded-lg bg-light-gray p-4">
      <h2
        className={`${getColor(
          column.id
        )} mb-4 text-sm font-semibold w-full py-0.5 px-2 rounded-md max-w-fit text-black`}
      >
        {column.id}
      </h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => {
            return <TaskCard task={task} />;
          })
        ) : (
          <div className="flex justify-center items-center h-full">
            No Tasks in {column.title}
          </div>
        )}
      </div>
    </div>
  );
};
