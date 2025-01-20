import { useDroppable } from "@dnd-kit/core";
import React from "react";
import DraggableTask from "./list-item";
import { Task, Column as ColumnType } from "../../types/task";

interface DroppableColumnProps {
  showColumn: boolean;
  columns: ColumnType;
  tasks: Task;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
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
          <DraggableTask showColumn={showColumn} task={task} />
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
