import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";
import { shuffleArray } from "../../utils";


const cardsDataSlice = createSlice({
  name: "cardsData",
  initialState: {
    cardsData: cards
   
  },
  reducers: {
   shuffleData: (state) =>{
   shuffleArray(state.cardsData)
   } 
  },
});

export const { shuffleData } =  cardsDataSlice.actions;
export default cardsDataSlice.reducer;