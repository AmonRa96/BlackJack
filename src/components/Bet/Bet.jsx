import { useState } from "react";
import "./Bet.css";
import { useDispatch } from "react-redux";
import {setGameStarted,setBetModal,reduceChips} from "../store/cardsDataSlice";
import { useSelector } from "react-redux";

export const Bet = ({bet,setBet,setShowModal}) => {
const {startChipsCount} = useSelector((state)=> state.cardsSlice);
  const dispatch = useDispatch();

  let notEnoughChips = "you don't have enough chips";
  let minimalBet = "Minimal bet is 20";
  const[error, setError] = useState(false);
  const[minimalChipsError, setMinimalChipsError] = useState(false);


  const handleSubmit = () => {
    dispatch(setGameStarted(true));
    dispatch(setBetModal(false));    
    dispatch(reduceChips(bet));

    if(startChipsCount-bet<0){
      setBet(0);
      setError(true);
      dispatch(setGameStarted(false));
      dispatch(setBetModal(true)); 
    }
    if(bet<20){
      setBet(0);
      setMinimalChipsError(true);
      dispatch(setGameStarted(false));
      dispatch(setBetModal(true));
    }
  };

  const handleNewGame = () =>{
    dispatch(setGameStarted(false));
    dispatch(setBetModal(false));
    setShowModal(true)
    console.log("ffff")
  };


  return (
    <div className="bet">
      <span className="betHeader">Place your bet:</span>
      <input className="input" type="number" value={bet} onChange={(e)=>setBet(e.target.value)}/>
      {error?<span className="error">{notEnoughChips}</span>:null}
      {minimalChipsError?<span className="error">{minimalBet}</span>:null}
      {startChipsCount===0?
      <button className="startButton" onClick={handleNewGame}>New game</button>
      :<button className="startButton" onClick={handleSubmit}>Start</button>}
    </div>
  );
};