import { configureStore } from "@reduxjs/toolkit";
import cardsDataSlice from "./cardsDataClice";

export default configureStore({
  reducer: {
    cardsSlice: cardsDataSlice,
  },
});