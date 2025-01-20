import React, { useState, useEffect } from "react";
import Profile from "../profile";
import TaskBtn from "../task-btn";
import FilterSection from "../filter-section";
import SearchFilter from "../common/search-filter";
import CustomModal from "../common/custom-modal";
import TaskCreation from "../task-creation";
import { addTask, fetchTasks, setSearchQuery } from "../../store/task-slice";
import Logout from "../logout";
import { FormValuesProps } from "../../types/task";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import toast from "react-hot-toast";

const MobileView = () => {
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
  );
};

export default MobileView;
