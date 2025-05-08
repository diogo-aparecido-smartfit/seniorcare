import { RootState } from "@/store";

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserName = (state: RootState) => state.user.name;
