import { useState,useEffect } from "react";
import "./StartOptions.css";
import { useDispatch } from "react-redux";
import { setBetModal,setStartName,setStartChips } from "../store/cardsDataSlice";

export const StartOptions = ({setShowModal,setWinnerModal}) =>{
  const [name,setName] = useState("Jack");
  const [chipsCount,setChipsCount] = useState("100");

  useEffect(()=>{
    
  },[]);

  const dispatch = useDispatch();

  const handleStart = () =>{   
    dispatch(setStartName(name));
    dispatch(setStartChips(chipsCount));
    setShowModal(false);
    dispatch(setBetModal(true));
    setWinnerModal(false);
  };

  return (
    <div className="startModal">
      <div className="optionInputs">
        <div>
          <span>Your name: </span>
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} type='text'/> 
        </div> 
        <div>
          <span>Chips count: </span>
          <input className="input" value={chipsCount} onChange={(e)=>setChipsCount(e.target.value)} type='number'/> 
        </div>
      </div>      
      <button className="startButton" onClick={handleStart}>Start</button>       
    </div>
  );
};