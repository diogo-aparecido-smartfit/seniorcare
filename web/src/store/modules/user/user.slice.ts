import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  name: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginRequest: (_state, _action: PayloadAction<{ name: string }>) => {},
    loginSuccess: (state, action: PayloadAction<{ name: string }>) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = null;
    },
  },
});

export const { loginRequest, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
