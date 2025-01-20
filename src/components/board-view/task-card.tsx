import React, { useState, useEffect, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import moment from "moment";
import { DropDownMenuItem, FormValuesProps, Task } from "../../types/task";
import MoreItems from "../common/drop-down-item";
import { DeleteIcon, EditIcon, MoreIcon } from "../../icons";
import CustomModal from "../common/custom-modal";
import TaskCreation from "../task-creation";
import { deleteTask, fetchTasks, updateTask } from "../../store/task-slice";
import { AppDispatch } from "../../store/store";

type TaskCardProps = {
  task: Task;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Task>();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = useMemo(
    () =>
      transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined,
    [transform]
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const getMoreItems: DropDownMenuItem[] = [
    {
      icon: <EditIcon className="h-4 w-4" />,
      label: "Edit",
      action: (data: Task) => {
        setIsOpen(true);
        setSelectedRow(data);
      },
      id: "edit",
    },
    {
      icon: <DeleteIcon className="h-4 w-4 text-red-600" />,
      label: "Delete",
      action: (data: Task) => {
        dispatch(deleteTask(data?.id))
          .unwrap()
          .then(() => {
            toast.success("Task deleted successfully");
            setIsOpen(!isOpen);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Task deletion failed");
          });
      },
      id: "delete",
    },
  ];

  const handleTaskUpdate = (formData: FormValuesProps) => {
    const payload = {
      title: formData.title ?? "",
      description: formData.description ?? "",
      status: formData.status ?? "",
      category: formData.category ?? "",
      image: formData.image ?? "",
      date: formData.date ?? "",
    };
    dispatch(updateTask({ id: selectedRow.id, ...payload }))
      .unwrap()
      .then(() => {
        toast.success("Task updated successfully");
        setIsOpen(!isOpen);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Task updation failed");
      });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="cursor-grab rounded-lg gap-6 bg-white py-2 px-4 flex flex-col justify-between shadow-sm hover:shadow-md"
        style={style}
      >
        <div className="flex justify-between items-center">
          <h3
            className={`${
              task.status === "COMPLETED" && "line-through"
            } font-bold pt-2`}
          >
            {task.title}
          </h3>
          <MoreItems task={task} actions={getMoreItems}>
            <MoreIcon className="w-4 h-4" />
          </MoreItems>
        </div>
        <div className="flex justify-between text-opacity-gray">
          <p className="mt-2 text-[12px]">{task.category}</p>
          <p className="mt-2 text-[12px]">
            {moment(task.date).format("DD MMM, YYYY")}
          </p>
        </div>
      </div>
      <CustomModal
        title={"Update Task"}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        customStyleForContent="w-[700px]"
      >
        <TaskCreation
          primaryText="UPDATE"
          initialItem={selectedRow}
          onClose={() => setIsOpen(false)}
          onSave={handleTaskUpdate}
        />
      </CustomModal>
    </>
  );
};
