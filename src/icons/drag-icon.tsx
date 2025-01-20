import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const DragIcon: React.FC<SVGProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 21 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.5 4.375C14.19 4.375 14.75 3.815 14.75 3.125C14.75 2.435 14.19 1.875 13.5 1.875C12.81 1.875 12.25 2.435 12.25 3.125C12.25 3.815 12.81 4.375 13.5 4.375ZM13.5 6.25C12.81 6.25 12.25 6.81 12.25 7.5C12.25 8.19 12.81 8.75 13.5 8.75C14.19 8.75 14.75 8.19 14.75 7.5C14.75 6.81 14.19 6.25 13.5 6.25ZM12.25 11.875C12.25 11.185 12.81 10.625 13.5 10.625C14.19 10.625 14.75 11.185 14.75 11.875C14.75 12.565 14.19 13.125 13.5 13.125C12.81 13.125 12.25 12.565 12.25 11.875Z"
        fill="black"
        fill-opacity="0.6"
      />
      <mask
        id="mask0_2027_2950"
        maskUnits="userSpaceOnUse"
        x="12"
        y="1"
        width="3"
        height="13"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.5 4.375C14.19 4.375 14.75 3.815 14.75 3.125C14.75 2.435 14.19 1.875 13.5 1.875C12.81 1.875 12.25 2.435 12.25 3.125C12.25 3.815 12.81 4.375 13.5 4.375ZM13.5 6.25C12.81 6.25 12.25 6.81 12.25 7.5C12.25 8.19 12.81 8.75 13.5 8.75C14.19 8.75 14.75 8.19 14.75 7.5C14.75 6.81 14.19 6.25 13.5 6.25ZM12.25 11.875C12.25 11.185 12.81 10.625 13.5 10.625C14.19 10.625 14.75 11.185 14.75 11.875C14.75 12.565 14.19 13.125 13.5 13.125C12.81 13.125 12.25 12.565 12.25 11.875Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2027_2950)"></g>
    </g>
    <g opacity="0.6">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 4.375C8.19 4.375 8.75 3.815 8.75 3.125C8.75 2.435 8.19 1.875 7.5 1.875C6.81 1.875 6.25 2.435 6.25 3.125C6.25 3.815 6.81 4.375 7.5 4.375ZM7.5 6.25C6.81 6.25 6.25 6.81 6.25 7.5C6.25 8.19 6.81 8.75 7.5 8.75C8.19 8.75 8.75 8.19 8.75 7.5C8.75 6.81 8.19 6.25 7.5 6.25ZM6.25 11.875C6.25 11.185 6.81 10.625 7.5 10.625C8.19 10.625 8.75 11.185 8.75 11.875C8.75 12.565 8.19 13.125 7.5 13.125C6.81 13.125 6.25 12.565 6.25 11.875Z"
        fill="black"
        fill-opacity="0.6"
      />
      <mask
        id="mask1_2027_2950"
        maskUnits="userSpaceOnUse"
        x="6"
        y="1"
        width="3"
        height="13"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.5 4.375C8.19 4.375 8.75 3.815 8.75 3.125C8.75 2.435 8.19 1.875 7.5 1.875C6.81 1.875 6.25 2.435 6.25 3.125C6.25 3.815 6.81 4.375 7.5 4.375ZM7.5 6.25C6.81 6.25 6.25 6.81 6.25 7.5C6.25 8.19 6.81 8.75 7.5 8.75C8.19 8.75 8.75 8.19 8.75 7.5C8.75 6.81 8.19 6.25 7.5 6.25ZM6.25 11.875C6.25 11.185 6.81 10.625 7.5 10.625C8.19 10.625 8.75 11.185 8.75 11.875C8.75 12.565 8.19 13.125 7.5 13.125C6.81 13.125 6.25 12.565 6.25 11.875Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_2027_2950)"></g>
    </g>
  </svg>
);

export default DragIcon;
