import React from "react";
import { useDroppable } from "@dnd-kit/core";
import DraggableTask from "./list-item";
import { Task, Column as ColumnType } from "../../types/task";

interface DroppableColumnProps {
  selectedTaskIds: string[];
  setSelectedTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
  showColumn: boolean;
  columns: ColumnType;
  tasks: Task;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  selectedTaskIds,
  setSelectedTaskIds,
  showColumn,
  column,
  tasks,
}) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <tbody ref={setNodeRef} className="bg-light-gray">
      {tasks.length > 0 ? (
        tasks.map((task: Task) => (
          <DraggableTask
            showColumn={showColumn}
            task={task}
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
          />
        ))
      ) : (
        <tr>
          <td
            colSpan={5}
            className="text-center rounded-br-md rounded-bl-md text-gray-500 py-4"
          >
            No tasks in {column.title}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default DroppableColumn;
