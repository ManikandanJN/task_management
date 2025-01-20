import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const SortIcon: React.FC<SVGProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 0L7.4641 3H0.535898L4 0Z" fill="black" fill-opacity="0.4" />
    <path d="M4 8L0.535898 5L7.4641 5L4 8Z" fill="black" fill-opacity="0.4" />
  </svg>
);

export default SortIcon;
