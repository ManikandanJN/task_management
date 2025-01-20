import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface UserState {
  accessToken: string | null;
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  accessToken: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.accessToken = null;
      state.userInfo = null;
    },
  },
});

export const { setAccessToken, setUserInfo, clearUser } = userSlice.actions;

export default userSlice.reducer;
