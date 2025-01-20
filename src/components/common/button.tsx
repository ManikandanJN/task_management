import React, { ReactNode, FC } from "react";
import { clsx } from "clsx";

interface ButtonProps {
  onClick?: (event: React.MouseEvent) => void;
  type: string;
  disabled?: boolean;
  idName?: string;
  children: ReactNode;
  customStyle?: string;
}

const Button: FC<ButtonProps> = ({
  onClick = () => {},
  type = "secondary",
  disabled = false,
  idName = "",
  children,
  customStyle = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        type === "primary" &&
          `${customStyle} rounded-full py-1 lg:py-2 px-3 lg:px-5 text-[12px] lg:text-sm font-semibold bg-app-color border text-white`,
        type === "logout" &&
          `${customStyle} rounded-xl  py-1.5 lg:py-2 pl-2 pr-3 lg:pr-5 text-[12px] lg:text-sm font-semibold bg-[#FFF9F9] border border-light-purple`,
        type === "secondary" &&
          `${customStyle} rounded-full py-1 lg:py-2 px-3 lg:px-5 text-[12px] lg:text-sm font-semibold hover:text-app-color bg-white border border-gray-400 text-black`,
        type === "danger" &&
          `${customStyle} rounded-full py-1 px-3 lg:px-5 text-[12px] lg:text-sm font-semibold bg-[#FF353524] border border-red-600 text-red-600`,
        disabled && "cursor-not-allowed opacity-50"
      )}
      disabled={disabled}
      id={idName}
    >
      {children}
    </button>
  );
};

export default Button;
