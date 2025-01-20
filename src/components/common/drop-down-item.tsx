import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Task } from "../../types/task";

interface MoreItemsProps {
  task?: Task;
  actions: any;
  children: ReactNode;
  status?: boolean;
}

const MoreItems: React.FC<MoreItemsProps> = ({ task, actions, children }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [openPopoverId, setOpenPopoverId] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const handleTogglePopover = () => {
    setOpenPopoverId(!openPopoverId);
  };

  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const dropdownHeight = actions?.length * 40;

    if (rect.bottom + dropdownHeight > windowHeight) {
      setPosition({
        top: rect.top + window.scrollY - dropdownHeight,
        left: rect.left + window.scrollX - 90,
      });
    } else {
      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX - 90,
      });
    }

    handleTogglePopover();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        handleTogglePopover();
      }
    };

    if (openPopoverId) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [openPopoverId]);

  const dropdownMenu = (
    <div
      ref={dropdownMenuRef}
      className="absolute z-10 shadow-dropdown-menu flex flex-col rounded-xl rounded-s-xl bg-[#FFF9F9] border border-light-purple"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        maxHeight: "300px",
      }}
    >
      {actions?.map((action) => (
        <button
          key={action.id}
          onPointerDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.stopPropagation()
          }
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setOpenPopoverId(false);
            action.action(task);
          }}
          disabled={action.disabled}
          className="block pl-4 pr-4 lg:pr-8 py-1 text-[10px] lg:text-sm font-semibold hover:text-app-color"
        >
          <div
            className={`${
              action.id === "delete" && "text-red-600"
            } flex items-center gap-3 py-0 lg:py-0.5`}
          >
            {action.icon}
            <span>{action.label}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onPointerDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.stopPropagation()
        }
        onClick={(e: React.MouseEvent) => {
          handleDropdownClick(e);
        }}
      >
        {children}
      </button>
      {openPopoverId && ReactDOM.createPortal(dropdownMenu, document.body)}
    </div>
  );
};

export default MoreItems;
