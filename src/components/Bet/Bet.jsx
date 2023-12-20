import { useEffect, useState } from "react";
import "./Bet.css";
import { useDispatch } from "react-redux";
import {setGameStarted,setBetModal,reduceChips,setBet} from "../store/cardsDataSlice";
import { useSelector } from "react-redux";
import {NOT_ENOUGH_CHIPS,MINIMAL_BET} from "../constant";

export const Bet = ({setWinnerModal,setShowModal}) => {
  const {startChipsCount,bet} = useSelector((state)=> state.cardsSlice);

  const[error, setError] = useState(false);
  const[minimalChipsError, setMinimalChipsError] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{
    setError(false);
    setMinimalChipsError(false);
  },[]);

  const handleSubmit = () => {
    if(startChipsCount-bet>=0){
      dispatch(reduceChips(bet));   
      dispatch(setGameStarted(true));
      dispatch(setBetModal(false));    
    }
   
    if(startChipsCount-bet<0){
      dispatch(setBet(0));
      setError(true);
      dispatch(setGameStarted(false));
      dispatch(setBetModal(true)); 
    }
    if(bet<20){
      dispatch(setBet(0));
      setMinimalChipsError(true);
      dispatch(setGameStarted(false));
      dispatch(setBetModal(true));
    }
  };

  const handleNewGame = () =>{
    setShowModal(true);
    dispatch(setBetModal(false));
    setWinnerModal(false);
  };


  return (
    <div className="bet">
      <span className="betHeader">Place your bet:</span>
      <input className="input" type="number" value={bet} onChange={(e)=>dispatch(setBet(+e.target.value))}/>
      {error?<span className="error">{NOT_ENOUGH_CHIPS}</span>:null}
      {minimalChipsError?<span className="error">{MINIMAL_BET}</span>:null}
      {startChipsCount===0?
        <button className="startButton" onClick={handleNewGame}>New game</button>
        :<button className="startButton" onClick={handleSubmit}>Start</button>
      }
    </div>
  );
};