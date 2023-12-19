import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";
import { shuffleArray } from "../../utils";


const cardsDataSlice = createSlice({
  name: "cardsData",
  initialState: {
    name: "",
    startChipsCount: 100,
    gameStarted: false,
    betModal: false,
    cards: cards,
    myCards: cards.slice(0,2),
    dealerCards: cards.slice(26,28),
    myCardsSum: 0,
    dealerCardsSum: 0,
    winner: "",
    dealerPlay: false,
    dealerCardsEndPoint: 28

    
  },
  reducers: {
    shuffleData: (state) =>{
      shuffleArray(state.cards);
      state.myCards=state.cards.slice(0,2);
      state.dealerCards=state.cards.slice(26,28);
    }, 
    hitCard: (state)=>{
      state.myCards.push(state.cards[state.myCards.length]);
    },
    setMyCardsSum: (state) =>{
      state.myCardsSum =  state.myCards.map((obj=>obj.point)).reduce((point,aggr)=>{
        return point +aggr;
      },0);    
    },
    setDealerCardsSum: (state) =>{
      state.dealerCardsSum = state.dealerCards.map((obj=>obj.point)).reduce((point,aggr)=>{
        return point +aggr;
      },0);
    },
    setGameStarted: (state,{payload}) =>{
      state.gameStarted = payload;
    },
    setBetModal: (state,{payload}) =>{
      state.betModal = payload;
    },
    setDealerPlay: (state,{payload}) =>{
      state.dealerPlay = payload;
    },
    addDealerCard: (state,{payload}) =>{
      
      state.dealerCards.push(state.cards[payload]);  
      state.dealerCardsEndPoint= payload+1; 
    },
    setWinner: (state,{payload}) =>{
      state.winner= payload;
    },
    setDealerCardsEndPoint: (state, {payload}) =>{
      state.dealerCardsEndPoint=payload;
    },
    setStartChips: (state,{payload}) =>{
      state.startChipsCount = payload;
    },
    setStartName: (state,{payload}) =>{
      state.name = payload;
    },
    addChips: (state,{payload}) =>{
      state.startChipsCount = state.startChipsCount+payload;
    },
    reduceChips: (state,{payload}) =>{
      state.startChipsCount = state.startChipsCount-payload;

    }

  
  },
});

export const { shuffleData,hitCard,setMyCardsSum,setDealerCardsSum,setGameStarted,setBetModal,addDealerCard,setWinner,setDealerPlay,setDealerCardsEndPoint,setStartName,setStartChips,addChips,reduceChips } =  cardsDataSlice.actions;
export default cardsDataSlice.reducer;


//state.dealerCards.push(state.cards[(state.dealerCards[length-1]).id+1]);
//  console.log(payload,"payload");
//console.log(current(state.dealerCards[state.dealerCards.length-1]),"yyyy")