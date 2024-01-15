import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";
import { shuffleArray } from "../../utils";

const musicSetting = localStorage.getItem("musicSetting");

const cardsDataSlice = createSlice({
  name: "cardsData",
  initialState: {
    name: "",
    startChipsCount: null,
    firstDealerCardDisable: true,
    bet:20,
    gameStarted: false,
    betModal: false,
    cards: cards,
    myCards: cards.slice(0,2),
    dealerCards: cards.slice(26,28),
    myCardsSum: 0,
    dealerCardsSum: 0,
    winner: "",
    dealerPlay: false,
    dealerCardsEndPoint: 28,
    doubleBet: false,
    hitClicked: false,  
    musicOn:musicSetting?true:false,
    effectsSound:true,
    volumePoint: 0.5,
  },
  reducers: {
    setStartName: (state,{payload}) =>{
      state.name = payload;
    },
    setStartChips: (state,{payload}) =>{
      state.startChipsCount = payload;
    },
    shuffleData: (state) =>{
      shuffleArray(state.cards);
      state.myCards=state.cards.slice(0,2);
      state.dealerCards=state.cards.slice(26,28);
    }, 
    hitCard: (state)=>{
      state.myCards.push(state.cards[state.myCards.length]);
    },
    setHitClicked: (state,{payload}) =>{
      state.hitClicked = payload;
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
    setDealerCardsEndPoint: (state, {payload}) =>{
      state.dealerCardsEndPoint=payload;
    },
    addDealerCard: (state,{payload}) =>{      
      state.dealerCards.push(state.cards[payload]);  
      state.dealerCardsEndPoint= payload+1; 
    },   
    addChips: (state) =>{
      state.startChipsCount = state.startChipsCount+2*state.bet;
    },  
    reduceChips: (state,{payload}) =>{
      state.startChipsCount = state.startChipsCount-payload;
    },     
    enableDealerFirstCard: (state, {payload})=>{
      state.firstDealerCardDisable = payload;
    },
    setBetDoubled: (state,{payload}) =>{
      state.doubleBet = payload;
    }, setBet: (state,{payload}) =>{
      state.bet = payload;
    }, 
    setWinner: (state,{payload}) =>{
      state.winner= payload;
    }, 
    setMusicOn: (state,{payload})=>{
      state.musicOn = payload;
    },
    setEffectsSound: (state,{payload})=>{
      state.effectsSound = payload;
    },
    setVolumePoint: (state,{payload})=>{
      state.volumePoint = payload;
    }
   
    
  },
});

export const { setBet,shuffleData,hitCard,setVolumePoint,setMusicOn,setEffectsSound,setHitClicked,setMyCardsSum,setDealerCardsSum,setGameStarted,setBetModal,addDealerCard,setWinner,setDealerPlay,setDealerCardsEndPoint,setStartName,setStartChips,addChips,reduceChips,enableDealerFirstCard, setBetDoubled } =  cardsDataSlice.actions;
export default cardsDataSlice.reducer;


