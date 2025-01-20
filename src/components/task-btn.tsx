import React, { FC } from "react";
import Button from "./common/button";

interface TaskBtnProps {
  type: string;
  name: string;
  onClick?: () => void;
  disabled?: boolean;
}

const TaskBtn: FC<TaskBtnProps> = ({
  type = "primary",
  name = "ADD TASK",
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {name}
    </Button>
  );
};

export default TaskBtn;
