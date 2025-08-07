import { createSlice } from "@reduxjs/toolkit";
import type { SubscriptionPlan } from "@/models/business.model";

interface BusinessState {
  userPackage: SubscriptionPlan | null;
}

const initialState: BusinessState = {
  userPackage: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setUserPackage(state, action) {
      state.userPackage = action.payload;
    },
    clearUserPackage(state) {
      state.userPackage = null;
    },
  },
});

export const { setUserPackage, clearUserPackage } = businessSlice.actions;
export default businessSlice.reducer;
