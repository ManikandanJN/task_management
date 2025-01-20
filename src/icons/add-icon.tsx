import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const AddIcon: React.FC<SVGProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.33325 9.54769H3.33325V8.21436H7.33325V4.21436H8.66659V8.21436H12.6666V9.54769H8.66659V13.5477H7.33325V9.54769Z"
      fill="black"
    />
  </svg>
);

export default AddIcon;
