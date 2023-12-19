import { configureStore } from "@reduxjs/toolkit";
import cardsDataSlice from "./cardsDataSlice";

export default configureStore({
  reducer: {
    cardsSlice: cardsDataSlice,
  },
});
