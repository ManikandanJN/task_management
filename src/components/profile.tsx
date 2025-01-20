import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.user.userInfo);
  return (
    <div className="flex items-center space-x-2">
      <img
        src={userDetails?.picture}
        alt="img"
        className="rounded-full w-6 h-6 lg:w-8 lg:h-8"
      />
      <p className="sm:block hidden text-[12px] font-semibold text-opacity-gray">
        {userDetails?.name}
      </p>
    </div>
  );
};

export default Profile;
