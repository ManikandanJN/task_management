import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CustomDatePicker from "../common/custom-date-picker";
import DropDown from "../common/drop-down";
import Button from "../common/button";
import { EnterIcon } from "../../icons";
import { DropDownMenuItem, FormValuesProps } from "../../types/task";
import { addTask } from "../../store/task-slice";
import { AppDispatch, RootState } from "../../store/store";

const AddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userInfo?.sub);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValuesProps>({
    title: "",
    description: "",
    image: "",
    date: "",
    category: "",
    status: "",
  });

  const taskStatus: DropDownMenuItem[] = [
    {
      label: "TODO",
      id: "todo",
    },
    {
      label: "IN-PROGRESS",
      id: "inProgress",
    },
    {
      label: "COMPLETED",
      id: "completed",
    },
  ];

  const category: DropDownMenuItem[] = [
    {
      label: "Work",
      id: "work",
    },
    {
      label: "Personal",
      id: "personal",
    },
  ];

  const handleDateChange = (date: string) => {
    setFormValues((prevData: FormValuesProps) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValues((prevData: FormValuesProps) => ({
      ...prevData,
      title: value,
    }));
  };

  const createTask = () => {
    const payload = {
      userId: userId,
      title: formValues.title,
      description: "",
      status: formValues.status,
      category: formValues.category,
      image: "",
      date: formValues.date,
    };
    dispatch(addTask({ userId, task: payload }))
      .unwrap()
      .then(() => {
        toast.success("Task created successfully");
        setIsOpen(!isOpen);
        setFormValues({
          title: "",
          description: "",
          image: "",
          date: "",
          category: "",
          status: "",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Task creation failed");
      });
  };

  return (
    <>
      <tr>
        <td
          colSpan="5"
          className={`bg-light-gray text-sm font-semibold border-b-2 border-medium-gray w-full py-2 pl-10 hidden sm:table-cell`}
        >
          <button onClick={() => setIsOpen(true)}>+ ADD TASK</button>
        </td>
      </tr>
      {isOpen && (
        <>
          <tr>
            <td
              className={`bg-light-gray text-sm font-semibold border-b-2 border-medium-gray py-2 pl-10 hidden sm:table-cell`}
            >
              <input
                type="text"
                id="task-title"
                placeholder="Task title"
                value={formValues.title}
                onChange={handleTitleChange}
                className="py-1 px-3 bg-light-gray rounded-lg focus:outline-none focus:ring-0"
              />
            </td>
            <td
              className={`bg-light-gray text-sm font-semibold border-b-2 border-medium-gray py-2 pl-10 hidden sm:table-cell`}
            >
              <CustomDatePicker
                direction="down"
                type={"Date"}
                onChange={handleDateChange}
              />
            </td>
            <td
              className={`bg-light-gray text-sm font-semibold border-b-2 items-start border-medium-gray py-2 hidden sm:table-cell`}
            >
              <DropDown
                listView={true}
                initialValue={formValues.status}
                customStyle="!px-2 !justify-center !bg-light-gray w-max"
                menuItem={taskStatus}
                onChange={(selectedItem: string) =>
                  setFormValues((prevData: FormValuesProps) => ({
                    ...prevData,
                    status: selectedItem,
                  }))
                }
              />
            </td>
            <td
              colSpan="2"
              className={`bg-light-gray text-sm font-semibold border-b-2 items-start border-medium-gray py-2 hidden sm:table-cell`}
            >
              <DropDown
                listView={true}
                initialValue={formValues.category}
                customStyle="!px-2 !justify-center !bg-light-gray w-max"
                menuItem={category}
                onChange={(selectedItem: string) =>
                  setFormValues((prevData: FormValuesProps) => ({
                    ...prevData,
                    category: selectedItem,
                  }))
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan="5">
              <div className="flex justify-start gap-3 p-4 bg-light-gray border border-t-2">
                <Button
                  children={
                    <div className="flex gap-1 items-center justify-center">
                      ADD <EnterIcon className="h-5 w-5" />
                    </div>
                  }
                  type="primary"
                  onClick={createTask}
                  customStyle="!py-0"
                />
                <Button
                  children={"CANCEL"}
                  type="secondary"
                  customStyle={"!bg-light-gray !px-2 border-0"}
                  onClick={() => {
                    setFormValues({
                      title: "",
                      description: "",
                      image: "",
                      date: "",
                      category: "",
                      status: "",
                    });
                    setIsOpen(false);
                  }}
                />
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default AddTask;
