import React from "react";
import { LogOut } from "../icons";
import Button from "./common/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Succesfully logged out");
    navigate("/");
  };

  return (
    <Button type={"logout"} onClick={handleLogout}>
      <div className="flex gap-2 justify-center items-center">
        <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
        <p className="sm:block hidden"> Logout</p>
      </div>
    </Button>
  );
};

export default Logout;
