import React, { useState, ChangeEvent } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Label } from "./common/label";
import Button from "./common/button";
import DropDown from "./common/drop-down";
import UploadImage from "./common/upload-image";
import {
  DropDownMenuItem,
  FormValuesProps,
  Task,
  TaskCategory,
} from "../types/task";
import { taskCategory } from "../utils/common";
import CustomDatePicker from "./common/custom-date-picker";
import moment from "moment";

interface TaskCreationProps {
  initialItem?: Task;
  onClose: () => void;
  onSave: (formValues: FormValuesProps) => void;
  primaryText?: string;
  secondaryText?: string;
}

const TaskCreation: React.FC<TaskCreationProps> = ({
  initialItem,
  onClose,
  onSave,
  secondaryText = "CANCEL",
  primaryText = "CREATE",
}) => {
  const [formValues, setFormValues] = useState<FormValuesProps>({
    title: initialItem ? initialItem?.title : "",
    description: initialItem ? initialItem?.description : "",
    image: initialItem ? initialItem?.image : "",
    date: initialItem ? initialItem?.date : "",
    category: initialItem ? initialItem?.category : "",
    status: initialItem ? initialItem?.status : "",
  });

  const formats = ["bold", "italic", "underline", "list", "bullet"];

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const styles = {
    container: {
      width: "100%",
      height: "130px",
    },
  };

  const maxChars = 300;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValues((prevData: FormValuesProps) => ({
      ...prevData,
      title: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    const plainText = value.replace(/<[^>]+>/g, "");
    if (plainText.length <= maxChars) {
      setFormValues((prevData: FormValuesProps) => ({
        ...prevData,
        description: value,
      }));
    }
  };

  const charCount = formValues?.description?.replace(/<[^>]+>/g, "").length;

  const handleImageChange = (fileName: string) => {
    setFormValues((prevData: FormValuesProps) => ({
      ...prevData,
      image: fileName,
    }));
  };

  const menuItem: DropDownMenuItem[] = [
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

  const handleDateChange = (date: string) => {
    setFormValues((prevData: FormValuesProps) => ({
      ...prevData,
      date: date,
    }));
  };

  const isFormValid = Object.values(formValues).every(
    (value) => typeof value === "string" && value.trim() !== ""
  );

  return (
    <>
      <div className="flex flex-col gap-3 p-6">
        {/* Task Title */}
        <input
          type="text"
          id="task-title"
          placeholder="Task title"
          value={formValues.title}
          onChange={handleTitleChange}
          className="w-full py-1 px-3 text-sm sm:text-base border border-gray-400 bg-light-gray rounded-lg focus:outline-none focus:ring-0 hover:border-app-color"
        />

        {/* Description */}
        <div className="relative">
          <ReactQuill
            className="ql-container-custom"
            style={styles.container}
            placeholder="Description"
            value={formValues.description}
            onChange={(value) => handleDescriptionChange(value)}
            modules={modules}
            formats={formats}
          />
          <div className="absolute bottom-0 right-4 hidden sm:block text-sm">
            <span
              className={
                charCount > maxChars ? "text-red-500" : "text-gray-500"
              }
            >
              {charCount}/{maxChars} characters
            </span>
          </div>
        </div>

        {/* Task Category */}
        <div className="flex justify-between flex-wrap mt-6">
          <div className="py-1 sm:py-4">
            <Label title="Task Category*" />
            <div className="flex gap-5">
              {taskCategory.map((item: TaskCategory) => {
                const isActive = formValues.category === item.name;
                return (
                  <Button
                    children={item?.name}
                    type={isActive ? "primary" : "secondary"}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      setFormValues((prevData: FormValuesProps) => ({
                        ...prevData,
                        category: item.name,
                      }));
                    }}
                    customStyle="w-[100px]"
                  />
                );
              })}
            </div>
          </div>
          {/* Due Date */}
          <div className="py-1 sm:py-4">
            <Label title="Due on*" />

            <CustomDatePicker
              selectedDate={moment(formValues?.date).format("DD/MMM/YYYY")}
              type={"Date"}
              onChange={handleDateChange}
            />
          </div>

          {/* Task Status */}
          <div className="py-1 sm:py-4">
            <Label title="Task Status*" />
            <div className="inline-block">
              <DropDown
                initialValue={formValues.status}
                name={"Choose"}
                customStyle="w-[180px]"
                menuItem={menuItem}
                onChange={(selectedItem) =>
                  setFormValues((prevData: FormValuesProps) => ({
                    ...prevData,
                    status: selectedItem,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Attachment */}
        <UploadImage
          initialImage={formValues?.image}
          onChange={handleImageChange}
        />
      </div>
      <div className="sticky bottom-0 z-50 flex justify-end gap-3 p-2 sm:p-4 bg-light-gray border border-t-2">
        <Button
          children={secondaryText}
          type="secondary"
          onClick={() => {
            setFormValues({
              title: "",
              description: "",
              image: "",
              date: "",
              category: "",
              status: "",
            });
            onClose();
          }}
        />
        <Button
          disabled={!isFormValid}
          children={primaryText}
          type="primary"
          onClick={() => onSave(formValues)}
        />
      </div>
    </>
  );
};

export default TaskCreation;
