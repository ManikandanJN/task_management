import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const UpArrow: React.FC<SVGProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.9999 12.7496C17.6159 12.7496 17.2319 12.8966 16.9394 13.1891L10.9394 19.1891C10.3529 19.7756 10.3529 20.7236 10.9394 21.3101C11.5259 21.8966 12.4739 21.8966 13.0604 21.3101L18.0179 16.3526L22.9574 21.1226C23.5559 21.6971 24.5024 21.6806 25.0784 21.0851C25.6544 20.4896 25.6379 19.5386 25.0424 18.9641L19.0424 13.1711C18.7499 12.8891 18.3749 12.7496 17.9999 12.7496Z"
      fill="black"
    />
    <mask
      id="mask0_2048_3473"
      maskUnits="userSpaceOnUse"
      x="10"
      y="12"
      width="16"
      height="10"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.9999 12.7496C17.6159 12.7496 17.2319 12.8966 16.9394 13.1891L10.9394 19.1891C10.3529 19.7756 10.3529 20.7236 10.9394 21.3101C11.5259 21.8966 12.4739 21.8966 13.0604 21.3101L18.0179 16.3526L22.9574 21.1226C23.5559 21.6971 24.5024 21.6806 25.0784 21.0851C25.6544 20.4896 25.6379 19.5386 25.0424 18.9641L19.0424 13.1711C18.7499 12.8891 18.3749 12.7496 17.9999 12.7496Z"
        fill="white"
      />
    </mask>
  </svg>
);

export default UpArrow;
