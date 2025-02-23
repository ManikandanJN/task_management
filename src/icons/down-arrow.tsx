import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const DownArrow: React.FC<SVGProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.00019 11.6249C8.80819 11.6249 8.61619 11.5514 8.46994 11.4052L5.46994 8.40519C5.17669 8.11194 5.17669 7.63794 5.46994 7.34469C5.76319 7.05144 6.23719 7.05144 6.53044 7.34469L9.00919 9.82344L11.4789 7.43844C11.7782 7.15119 12.2514 7.15944 12.5394 7.45719C12.8274 7.75494 12.8192 8.23044 12.5214 8.51769L9.52144 11.4142C9.37519 11.5552 9.18769 11.6249 9.00019 11.6249"
        fill="black"
      />
      <mask
        id="mask0_2038_7426"
        maskUnits="userSpaceOnUse"
        x="5"
        y="7"
        width="8"
        height="5"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.00019 11.6249C8.80819 11.6249 8.61619 11.5514 8.46994 11.4052L5.46994 8.40519C5.17669 8.11194 5.17669 7.63794 5.46994 7.34469C5.76319 7.05144 6.23719 7.05144 6.53044 7.34469L9.00919 9.82344L11.4789 7.43844C11.7782 7.15119 12.2514 7.15944 12.5394 7.45719C12.8274 7.75494 12.8192 8.23044 12.5214 8.51769L9.52144 11.4142C9.37519 11.5552 9.18769 11.6249 9.00019 11.6249"
          fill="white"
        />
      </mask>
    </g>
  </svg>
);

export default DownArrow;
