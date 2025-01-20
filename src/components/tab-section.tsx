import React, { useCallback, useState } from "react";
import { tabItem } from "../utils/common";
import { TabItem } from "../types/task";

interface TabSectionProps {
  onTabChange: (selectedTab: number) => void;
}

const TabSection: React.FC<TabSectionProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabChange = useCallback((item: TabItem) => {
    setActiveTab(item.id);
    onTabChange(item.id);
  }, []);

  return (
    <div className="flex gap-5">
      {tabItem.map((item: TabItem) => {
        const isActive = activeTab === item.id;
        return (
          <div
            key={item.id}
            className={`flex items-center justify-center gap-1 cursor-pointer ${
              isActive
                ? "text-black border-b-2 border-black"
                : "text-opacity-gray"
            }`}
            onClick={() => handleTabChange(item)}
          >
            <item.icon
              className={`lg:w-4 lg:h-4 w-3 h-3 ${
                isActive ? "text-black" : "text-opacity-gray"
              }`}
            />
            <p className="text-[12px] lg:text-base">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TabSection;
