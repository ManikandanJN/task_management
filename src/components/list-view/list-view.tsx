import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "../../utils/helpers";
import { Task, Column as ColumnType } from "../../types/task";
import { COLUMNS } from "../../utils/common";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchTasks,
  selectFilteredTasks,
  setSortOrder,
  updateTask,
} from "../../store/task-slice";
import DroppableColumn from "./list-column";
import { DownArrow, SortIcon, UpArrow } from "../../icons";
import AddTask from "./add-task";

interface ListViewProps {
  selectedTaskIds: string[]; // Array of selected task IDs
  setSelectedTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
  columns: ColumnType[];
  tasks: Task[];
  onDragEnd: (e: any) => void;
}

const ListView: React.FC<ListViewProps> = ({
  selectedTaskIds,
  setSelectedTaskIds,
  tasks,
  columns,
  onDragEnd,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [sortingOrder, setSortingOrder] = useState<boolean>(true);
  const [showListColumn, setShowListColumn] = useState<boolean>(true);

  useEffect(() => {
    dispatch(setSortOrder(sortingOrder ? "asc" : "desc"));
  }, [sortingOrder]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <hr className="mt-6" />
      <table
        className="table-auto w-full px-4 sm:px-0 rounded-lg border-separate"
        style={{ borderSpacing: "0 0px" }}
      >
        <thead className="text-sm text-opacity-gray">
          <tr>
            <th className="px-4 py-2 text-left hidden sm:table-cell">
              Task Name
            </th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">
              <div className="flex gap-1 items-center">
                Due on
                <span
                  className="cursor-pointer"
                  onClick={() => setSortingOrder(!sortingOrder)}
                >
                  <SortIcon className="h-2.5 w-2.5" />
                </span>
              </div>
            </th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">
              Task Status
            </th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">
              Task Category
            </th>
            <th className="px-4 py-2 text-left hidden sm:table-cell"></th>
          </tr>
        </thead>
        {columns.map((column: ColumnType) => (
          <>
            <tbody>
              <tr>
                <td
                  colSpan="5"
                  className={`py-1 sm:py-2 px-4 ${getColor(
                    column.id
                  )} font-semibold rounded-tl-md sm:text-base text-xs rounded-tr-md w-full mt-2`}
                >
                  <div className="flex justify-between items-center">
                    <p>
                      {column.title} (
                      {
                        tasks.filter((task: Task) => task.status === column.id)
                          .length
                      }
                      )
                    </p>
                    <span onClick={() => setShowListColumn(!showListColumn)}>
                      {showListColumn ? (
                        <DownArrow className="h-6 w-6 sm:h-7 sm:w-7" />
                      ) : (
                        <UpArrow className="h-6 w-6" />
                      )}
                    </span>
                  </div>
                </td>
              </tr>
              {column.title === "To Do" && <AddTask />}
            </tbody>
            <DroppableColumn
              selectedTaskIds={selectedTaskIds}
              setSelectedTaskIds={setSelectedTaskIds}
              showColumn={showListColumn}
              column={column}
              tasks={tasks.filter((task: Task) => task.status === column.id)}
            />
            <div className="p-3 sm:p-5"></div>
          </>
        ))}
      </table>
    </DndContext>
  );
};

const ListViewComp: React.FC = ({
  selectedTaskIds,
  setSelectedTaskIds,
}: {
  selectedTaskIds: string[]; // Array of selected task IDs
  setSelectedTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userInfo?.sub);
  const tasks = useSelector((state: RootState) =>
    selectFilteredTasks(state.tasksList, userId)
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch, userId]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;
    const newStatus = over.id;
    const task = tasks.find((task) => task.id === active.id);
    const updatedData = { ...task, status: newStatus };
    dispatch(updateTask({ userId, task: updatedData }));
  };

  return (
    <ListView
      selectedTaskIds={selectedTaskIds}
      setSelectedTaskIds={setSelectedTaskIds}
      tasks={tasks}
      columns={COLUMNS}
      onDragEnd={handleDragEnd}
    />
  );
};

export default ListViewComp;
