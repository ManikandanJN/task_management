import React, { useEffect } from "react";
import { DownArrow } from "../icons";
import DropDown from "./common/drop-down";
import { DropDownMenuItem } from "../types/task";
import { useDispatch } from "react-redux";
import { fetchTasks, setFilter } from "../store/task-slice";
import { AppDispatch } from "../store/store";

const FilterSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleFilterChange = (selectedItem: string) => {
    const convertedText =
      selectedItem.charAt(0).toUpperCase() +
      selectedItem.slice(1).toLowerCase();
    dispatch(setFilter(convertedText));
  };

  const menuItem: DropDownMenuItem[] = [
    {
      label: "ALL",
      action: () => {},
      id: "all",
    },
    {
      label: "WORK",
      action: () => {},
      id: "work",
    },
    {
      label: "PERSONAL",
      action: () => {},
      id: "personal",
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      <label className="text-opacity-gray text-[12px] lg:text-base font-semibold">
        Filter by:
      </label>
      <div className="inline-block">
        <DropDown
          name={"Category"}
          menuItem={menuItem}
          onChange={(selectedItem: string) => handleFilterChange(selectedItem)}
        />
      </div>
      <div className="inline-block">
        <div className="px-1 py-0.5 lg:px-3 lg:py-1.5 flex text-opacity-gray font-semibold items-center justify-center text-[12px] lg:text-sm border border-gray-400 rounded-full bg-white cursor-pointer">
          Due Date
          <DownArrow className="lg:w-6 lg:h-6 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
