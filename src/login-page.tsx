import React from "react";
import { BottomCircle, GoogleIcon, PadIcon } from "./icons";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAccessToken, setUserInfo } from "./store/user-slice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetchUserInfo(tokenResponse.access_token);
    },
    onError: () => {
      toast.success("Login Failed");
    },
  });

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userInfo = await response.json();
      localStorage.setItem("authToken", accessToken);
      dispatch(setAccessToken(accessToken));
      dispatch(setUserInfo(userInfo));
      navigate("/home");
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <div className="h-screen bg-app-login overflow-hidden">
      <TabView login={login} />
      <MobileView login={login} />
    </div>
  );
}

const TabView = ({ login }) => {
  return (
    <div className="flex-row w-full justify-between gap-16 lg:gap-24 items-center h-screen sm:flex hidden">
      <div className="flex flex-col md:pl-7 lg:pl-20 w-[40%]">
        <div className="flex items-center space-x-2">
          <PadIcon className="w-6 h-6 lg:w-9 lg:h-9 text-app-color" />
          <h1 className="text-xl lg:text-4xl font-bold text-app-color">
            TaskBuddy
          </h1>
        </div>

        <p className="mt-4 text-[12px] lg:text-lg text-black w-full lg:w-11/12">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>

        <button
          className="mt-8 flex items-center justify-center gap-2 text-sm lg:text-xl px-6 py-2 lg:py-3 bg-black text-white font-semibold rounded-2xl shadow hover:bg-gray-800 transition duration-300"
          onClick={() => login()}
        >
          <GoogleIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          Continue with Google
        </button>
      </div>

      <div className="h-screen w-[60%] overflow-hidden">
        <img src="/loginImg.svg" alt="Task UI" className="w-full h-full" />
      </div>
    </div>
  );
};

const MobileView = ({ login }) => {
  return (
    <div className="relative flex sm:hidden w-full justify-center items-center h-screen">
      <div className="flex flex-col items-center px-6">
        <div className="flex items-center space-x-2">
          <PadIcon className="w-6 h-6 lg:w-9 lg:h-9 text-app-color" />
          <h1 className="text-xl lg:text-4xl font-bold text-app-color">
            TaskBuddy
          </h1>
        </div>

        <p className="mt-4 text-[12px] lg:text-lg text-black w-full lg:w-11/12">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>

        <button
          className="mt-8 flex w-full items-center justify-center gap-2 text-sm lg:text-xl px-6 py-2 lg:py-3 bg-black text-white font-semibold rounded-2xl shadow hover:bg-gray-800 transition duration-300"
          onClick={() => login()}
        >
          <GoogleIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          Continue with Google
        </button>
      </div>

      <BottomCircle className="absolute bottom-8 w-28 h-28" />
      <BottomCircle className="absolute left-0 transform -translate-y-3/4 -translate-x-1/2 w-28 h-28" />
      <BottomCircle className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-2/4 w-28 h-28" />
    </div>
  );
};

export default LoginPage;
