import React, { useState } from "react";
import { AddIcon, DownArrow } from "../../icons";
import { DropDownMenuItem } from "../../types/task";

interface DropDownProps {
  initialValue: string;
  name?: string;
  customStyle?: string;
  menuItem: DropDownMenuItem[];
  onChange?: (selectedItem: string) => void;
  listView?: boolean;
}

const DropDown: React.FC<DropDownProps> = ({
  initialValue,
  name = "",
  customStyle,
  menuItem,
  onChange,
  listView = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(initialValue);

  const handleMenuClick = (
    event: React.MouseEvent,
    selectedItem: DropDownMenuItem
  ) => {
    event.preventDefault();
    setSelectedItem(selectedItem?.label);
    onChange(selectedItem?.label);
    setOpen(false);
    if (selectedItem?.action) {
      selectedItem.action(selectedItem?.label);
    }
  };

  return (
    <div className="relative">
      <div>
        <div
          onClick={() => setOpen(!open)}
          className={`${customStyle} px-1 py-0.5 lg:px-3 lg:py-1.5 flex text-opacity-gray font-semibold items-center justify-between text-[12px] lg:text-sm border border-gray-400 rounded-full bg-white cursor-pointer`}
        >
          {selectedItem ? selectedItem : name}
          {listView ? (
            <> {selectedItem === "" && <AddIcon className="h-5 w-5" />}</>
          ) : (
            <DownArrow className="lg:w-6 lg:h-6 w-4 h-4" />
          )}
        </div>

        {open && (
          <div
            className={
              "shadow-dropdown-menu absolute z-10 left-0 top-11 flex flex-col rounded-xl rounded-s-xl bg-[#FFF9F9] border border-light-purple"
            }
          >
            {menuItem.map((item: DropDownMenuItem) => (
              <button
                key={item.id}
                className={`${
                  item.label === selectedItem && "text-app-color font-extrabold"
                } pl-4 pr-4 lg:pr-8 py-1 text-[10px] lg:text-sm font-semibold hover:text-app-color`}
                onClick={(e: React.MouseEvent) => handleMenuClick(e, item)}
                id={item.id}
              >
                <div className="flex items-start gap-3 py-0 lg:py-0.5">
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
