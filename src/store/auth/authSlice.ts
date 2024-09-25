import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading } from "@types";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

interface IAuthSttate {
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  loading: TLoading;
  error: string | null;
}
const initialState: IAuthSttate = {
  accessToken: null,
  user: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetErrorHnadler: (state) => {
      state.error = null;
      state.loading = "idle";
    },

    authLogout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    //login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});
export const { resetErrorHnadler, authLogout } = authSlice.actions;
export { actAuthRegister, actAuthLogin };
export default authSlice.reducer;
