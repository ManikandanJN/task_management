import React, { useState } from "react";
import { CloseIcon, MultiTickIcon } from "../icons";
import MoreItems from "./common/drop-down-item";
import Button from "./common/button";
import { DropDownMenuItem } from "../types/task";

const Footer = () => {
  const [taskStatus, setTaskStatus] = useState<string>("");
  const menuItem: DropDownMenuItem[] = [
    {
      label: "TODO",
      action: () => setTaskStatus("TODO"),
      id: "todo",
    },
    {
      label: "IN-PROGRESS",
      action: () => setTaskStatus("IN-PROGRESS"),
      id: "inProgress",
    },
    {
      label: "COMPLETED",
      action: () => setTaskStatus("COMPLETED"),
      id: "completed",
    },
  ];
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between gap-7 items-center rounded-xl w-max px-3 bg-black text-center py-4">
      <div className="flex gap-2 items-center">
        <div className="flex items-center space-x-2">
          <span className="text-white flex items-center gap-1 text-sm px-3 py-1 border border-white rounded-full">
            2 Tasks Selected
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
        <Button children={"Delete"} type="danger" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Footer;
