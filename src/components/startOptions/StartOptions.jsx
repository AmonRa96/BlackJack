import { useState } from "react";
import "./StartOptions.css";

export const StartOptions = ({setStartOptions,setShowModal,setBetModal}) =>{
  const [name,setName] = useState("Jack");
  const [chipsCount,setChipsCount] = useState("100");

  const handleStart = () =>{
    setStartOptions({
      name,
      chipsCount
    });
    setShowModal(false);
    setBetModal(true);
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