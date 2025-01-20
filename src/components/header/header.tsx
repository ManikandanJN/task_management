import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { PadIcon } from "../../icons";
import TabSection from "../tab-section";
import Logout from "../logout";
import Profile from "../profile";
import FilterSection from "../filter-section";
import TaskBtn from "../task-btn";
import SearchFilter from "../common/search-filter";
import CustomModal from "../common/custom-modal";
import TaskCreation from "../task-creation";
import { FormValuesProps } from "../../types/task";
import { AppDispatch, RootState } from "../../store/store";
import { addTask, fetchTasks, setSearchQuery } from "../../store/task-slice";
import "./styles.css";
import MobileView from "./mobile-view";

interface HeaderProps {
  onTabChange: (selectedTab: number) => void;
}

const Header: React.FC<HeaderProps> = ({ onTabChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userInfo?.sub);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch, userId]);

  const createTask = (formData: FormValuesProps) => {
    const payload = {
      userId: userId,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      category: formData.category,
      image: formData.image,
      date: formData.date,
    };
    dispatch(addTask({ userId, task: payload }))
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
      {/* Tab View */}
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
          onClose={() => setIsOpen(!isOpen)}
          customStyleForContent="w-[700px]"
        >
          <TaskCreation onClose={() => setIsOpen(false)} onSave={createTask} />
        </CustomModal>
      </div>

      {/* Mobile View */}
      <MobileView />
    </>
  );
};

export default Header;
