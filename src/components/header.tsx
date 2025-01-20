import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { PadIcon } from "../icons";
import TabSection from "./tab-section";
import Logout from "./logout";
import Profile from "./profile";
import FilterSection from "./filter-section";
import TaskBtn from "./task-btn";
import SearchFilter from "./common/search-filter";
import CustomModal from "./common/custom-modal";
import TaskCreation from "./task-creation";
import { FormValuesProps } from "../types/task";
import { AppDispatch } from "../store/store";
import { addTask, fetchTasks, setSearchQuery } from "../store/task-slice";
import "./styles.css";

interface HeaderProps {
  onTabChange: (selectedTab: number) => void;
}

function Header({ onTabChange }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const createTask = (formData: FormValuesProps) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      category: formData.category,
      image: formData.image,
      date: formData.date,
    };
    dispatch(addTask(payload))
      .unwrap()
      .then(() => {
        toast.success("Task created successfully");
        setIsOpen(!isOpen);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Task creation failed");
      });
  };

  return (
    <>
      <div className="sm:block hidden flex-col gap-1 sticky top-0 sm-px-0 pt-8 z-20 bg-white">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <PadIcon className="w-4 h-4 lg:w-7 lg:h-7" />
            <h1 className="text-md lg:text-2xl font-semibold text-medium-black">
              TaskBuddy
            </h1>
          </div>
          <Profile />
        </div>

        <div className="flex justify-between">
          <TabSection onTabChange={onTabChange} />
          <Logout />
        </div>
        <div className="flex justify-between mt-2">
          <FilterSection />
          <div className="flex gap-3 items-center justify-center">
            <SearchFilter
              handleSearch={(searchValue: string) => {
                dispatch(setSearchQuery(searchValue));
              }}
              placeholder={"Search"}
            />
            <TaskBtn
              type="primary"
              name="ADD TASK"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
        <CustomModal
          title={"Create Task"}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          customStyleForContent="w-[700px]"
        >
          <TaskCreation onClose={() => setIsOpen(false)} onSave={createTask} />
        </CustomModal>
      </div>
      <div className="sm:hidden block flex-col gap-1 sticky top-0 z-20 bg-white">
        <div className="flex justify-between bg-header py-2 px-5">
          <div className="flex items-center">
            <h1 className="text-md lg:text-2xl font-semibold text-medium-black">
              TaskBuddy
            </h1>
          </div>
          <div className="flex gap-1">
            <Profile />
            <Logout />
          </div>
        </div>

        <div className="flex justify-end py-1 px-5">
          <TaskBtn
            type="primary"
            name="ADD TASK"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <div className="py-1 px-5">
          <FilterSection />
        </div>
        <div className="pt-1 px-5">
          <SearchFilter
            handleSearch={(searchValue: string) => {
              dispatch(setSearchQuery(searchValue));
            }}
            placeholder={"Search"}
          />
        </div>
        <CustomModal
          title={"Create Task"}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          customStyleForContent="w-[700px]"
        >
          <TaskCreation onClose={() => setIsOpen(false)} onSave={createTask} />
        </CustomModal>
      </div>
    </>
  );
}

export default Header;
