import React, { useState, useEffect } from "react";
import CustomModal from "../common/custom-modal";
import TaskCreation from "../task-creation";
import MoreItems from "../common/drop-down-item";
import {
  CircleWithTick,
  DeleteIcon,
  DragIcon,
  EditIcon,
  MoreIcon,
} from "../../icons";
import moment from "moment";
import { deleteTask, fetchTasks, updateTask } from "../../store/task-slice";
import toast from "react-hot-toast";
import { DropDownMenuItem, FormValuesProps, Task } from "../../types/task";
import { useDraggable } from "@dnd-kit/core";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";

const DraggableTask: React.FC = ({
  showColumn,
  task,
}: {
  showColumn: boolean;
  task: Task;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Task>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const getCategory: DropDownMenuItem[] = [
    {
      label: "TODO",
      action: (data: Task) => {
        console.log("todo: ", data);
      },
      id: "todo",
    },
    {
      label: "IN-PROGRESS",
      action: (data: Task) => {
        console.log("progress: ", data);
      },
      id: "inProgress",
    },
    {
      label: "COMPLETED",
      action: (data: Task) => {
        console.log("completed: ", data);
      },
      id: "completed",
    },
  ];

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
      <tr
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className={`hover:bg-gray-100 cursor-grab ${
          showColumn ? "visible" : "hidden"
        }`}
      >
        <td className="px-4 py-2 font-medium text-xs md:text-sm border-b-2 border-medium-gray">
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <DragIcon className="h-4 w-4 sm:block hidden" />
            <CircleWithTick
              className={`h-4 w-4 ${
                task.status === "COMPLETED" ? "text-green-600" : "text-gray-400"
              }`}
            />
            <p className={`${task.status === "COMPLETED" && "line-through"}`}>
              {task.title}
            </p>
          </div>
        </td>
        <td className="px-4 py-2 text-xs md:text-sm hidden sm:table-cell border-b-2 border-medium-gray">
          {moment(task.date).format("DD MMM, YYYY")}
        </td>
        <td className="px-4 py-2 text-xs hidden sm:table-cell border-b-2 border-medium-gray">
          <MoreItems task={task} actions={getCategory}>
            <p className="bg-medium-gray max-w-fit rounded-md py-0.5 md:py-1 px-2">
              {task.status}
            </p>
          </MoreItems>
        </td>
        <td className="px-4 py-2 text-xs md:text-sm hidden sm:table-cell border-b-2 border-medium-gray">
          {task.category}
        </td>
        <td className="px-4 py-2 text-xs md:text-sm place-items-end hidden sm:table-cell border-b-2 border-medium-gray">
          <MoreItems task={task} actions={getMoreItems}>
            <MoreIcon className="w-4 h-4" />
          </MoreItems>
        </td>
      </tr>
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

export default DraggableTask;
