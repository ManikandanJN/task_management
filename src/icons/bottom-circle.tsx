import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const BottomCircle: React.FC<SVGProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 177 177"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M160.636 86C160.636 127.223 127.442 160.636 86.5 160.636C45.558 160.636 12.3637 127.223 12.3637 86C12.3637 44.7772 45.558 11.3637 86.5 11.3637C127.442 11.3637 160.636 44.7772 160.636 86Z"
      stroke="#7B1984"
      stroke-width="0.727435"
    />
    <path
      d="M145.636 86C145.636 118.378 118.942 144.636 86 144.636C53.058 144.636 26.3637 118.378 26.3637 86C26.3637 53.6218 53.058 27.3637 86 27.3637C118.942 27.3637 145.636 53.6218 145.636 86Z"
      stroke="#7B1984"
      stroke-width="0.727435"
    />
    <circle
      opacity="0.5"
      cx="88.5"
      cy="88.5"
      r="88.1363"
      stroke="#7B1984"
      stroke-width="0.727435"
    />
  </svg>
);

export default BottomCircle;
