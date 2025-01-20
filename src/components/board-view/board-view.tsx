import React, { useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task } from "../../types/task";
import { Column } from "./column";
import { COLUMNS } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchTasks,
  selectFilteredTasks,
  updateTask,
} from "../../store/task-slice";

interface BoardViewProps {
  animate: boolean;
  setAnimate: (animate: boolean) => void;
}

const BoardView: React.FC<BoardViewProps> = ({ animate, setAnimate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) =>
    selectFilteredTasks(state.tasksList)
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id as Task["status"];
    const task = tasks.find((task) => task.id === active.id);
    dispatch(updateTask({ ...task, status: newStatus }));
  };

  return (
    <div
      className={`${animate ? "animate-slideRight" : ""} p-4`}
      onAnimationEnd={() => setAnimate(false)}
    >
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};

export default BoardView;
