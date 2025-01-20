import React, { useState } from "react";
import { CloseIcon, MultiTickIcon } from "../icons";
import MoreItems from "./common/drop-down-item";
import Button from "./common/button";
import { DropDownMenuItem } from "../types/task";
import {
  deleteTask,
  selectFilteredTasks,
  updateTask,
} from "../store/task-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import toast from "react-hot-toast";

interface FooterProps {
  selectedTaskIds: string[];
  setSelectedTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const Footer: React.FC<FooterProps> = ({
  selectedTaskIds,
  setSelectedTaskIds,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userInfo?.sub);
  const [taskStatus, setTaskStatus] = useState<string>("");
  const menuItem: DropDownMenuItem[] = [
    {
      label: "TODO",
      action: () => {
        handleUpdateSelectedTasksStatus("TODO");
        setTaskStatus("TODO");
      },
      id: "todo",
    },
    {
      label: "IN-PROGRESS",
      action: () => {
        handleUpdateSelectedTasksStatus("IN-PROGRESS");
        setTaskStatus("IN-PROGRESS");
      },
      id: "inProgress",
    },
    {
      label: "COMPLETED",
      action: () => {
        handleUpdateSelectedTasksStatus("COMPLETED");
        setTaskStatus("COMPLETED");
      },
      id: "completed",
    },
  ];

  const tasks = useSelector((state: RootState) =>
    selectFilteredTasks(state.tasksList, userId)
  );

  const handleUpdateSelectedTasksStatus = (status: string) => {
    if (selectedTaskIds.length === 0) {
      toast.error("No tasks selected to update");
      return;
    }

    selectedTaskIds.forEach((taskId: string) => {
      const task = tasks.find((task) => task.id === taskId);
      dispatch(
        updateTask({
          userId,
          task: { ...task, status: status },
        })
      ).unwrap();
    });
    toast.success(`Task updated to ${status} successfully`);
    setSelectedTaskIds([]);
  };

  const handleDeleteSelectedTasks = () => {
    selectedTaskIds.forEach((taskId: string) => {
      dispatch(deleteTask({ userId, taskId })).unwrap();
    });
    toast.success("Task deleted successfully");
    setSelectedTaskIds([]);
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between gap-7 items-center rounded-xl w-max px-3 bg-black text-center py-4">
      <div className="flex gap-2 items-center">
        <div className="flex items-center space-x-2">
          <span className="text-white flex items-center gap-1 text-sm px-3 py-1 border border-white rounded-full">
            {selectedTaskIds?.length} Tasks Selected
            <CloseIcon className="w-5 h-5 text-white" />
          </span>
        </div>
        <MultiTickIcon className="w-5 h-5" />
      </div>
      <div className="flex gap-2 items-center">
        <MoreItems actions={menuItem}>
          <span className="rounded-full py-1 px-3 lg:px-5 text-[12px] lg:text-sm font-medium border border-white text-white">
            {taskStatus !== "" ? taskStatus : "Status"}
          </span>
        </MoreItems>
        <Button
          children={"Delete"}
          type="danger"
          onClick={handleDeleteSelectedTasks}
        />
      </div>
    </div>
  );
};

export default Footer;
