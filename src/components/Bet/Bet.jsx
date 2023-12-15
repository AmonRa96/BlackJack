import { useState } from "react";
import "./Bet.css";

export const Bet = ({bet,setBet,setGameStarted,setBetModal,startOptions,setStartOptions}) => {
  let notEnoughChips = "you don't have enough chips";
  let minimalBet = "Minimal bet is 20";
  const[error, setError] = useState(false);
  const[minimalChipsError, setMinimalChipsError] = useState(false);
  const handleSubmit = () => {
    setGameStarted(true);
    setBetModal(false);    
    setStartOptions({
      ...name,
      chipsCount:startOptions.chipsCount-bet
    });
    if(startOptions.chipsCount-bet<0){
      setBet(0);
      setError(true);
      setGameStarted(false);
      setBetModal(true); 
      setStartOptions({
        ...name,
        chipsCount:startOptions.chipsCount
      });
    }
    if(bet<20){
      setBet(0);
      setMinimalChipsError(true);
      setGameStarted(false);
      setBetModal(true); 
      setStartOptions({
        ...name,
        chipsCount:startOptions.chipsCount
      });  
    }
  };


  return (
    <div className="bet">
      <span className="betHeader">Place your bet:</span>
      <input className="input" type="number" value={bet} onChange={(e)=>setBet(e.target.value)}/>
      {error?<span className="error">{notEnoughChips}</span>:null}
      {minimalChipsError?<span className="error">{minimalBet}</span>:null}
      <button className="startButton" onClick={handleSubmit}>Start</button>
    </div>
  );
};