import { apiHandle } from "../../utils/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await apiHandle.post("api/login", data);
    console.log("Login response:", response);
    return response.data;
  } catch (error) {
    console.log("Login error:", error);
    const message = error.response?.data?.message || error.message || "Login failed";
    return rejectWithValue(message);
  }
});

export const signUpAsync = createAsyncThunk("auth/signUp", async (data, { rejectWithValue }) => {
  try {
    const response = await apiHandle.post("api/signup", data);
    console.log("Sign up response:", response);
    return response.data;
  } catch (error) {
    console.log("Sign up error:", error);
    const message = error.response?.data?.message || error.message || "Sign up failed";
    return rejectWithValue(message);
  }
});
