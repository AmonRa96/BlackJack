import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Settings.css";
import { setBetModal,setGameStarted,setVolumeOn } from "../store/cardsDataSlice";
import volOn from "../assets/buttons/volOn.png";
import volOff from "../assets/buttons/soundOff.png";
import useSound from "use-sound";
import sound from "../sounds/the-best-jazz-club-in-new-orleans-164472.mp3";

export const Settings = ({setShowModal,effectsSound,setEffectsSound}) =>{
  const {volumeOn} = useSelector((state)=>state.cardsSlice);
  const [volumePoint,setVolumePoint] = useState(0.5);
  const [mus,{stop}] = useSound(sound,{volume:volumePoint});
console.log(volumeOn,"volon")
  const dispatch = useDispatch();



  const startNewGame = () =>{
    setShowModal(true);
    dispatch(setBetModal(false));  
    dispatch(setGameStarted(false)); 
  };
  const musicOn = (e) =>{
    e.preventDefault();
    console.log("1");
    dispatch(setVolumeOn(false));
    stop();

  };

  const musicOff = (e) =>{
    e.preventDefault();
    dispatch(setVolumeOn(true));
    mus()
  };

  const effectSoundOn = (e) =>{
    e.preventDefault();
    setEffectsSound(true);


  };

  const effectSoundOff = (e) =>{
    e.preventDefault();
    setEffectsSound(false);

  };

  const reduceSound = (e) =>{
    e.preventDefault();
    if(volumePoint>0.2){
      setVolumePoint(volumePoint-0.1);
    }
   
  };
  const addSound = (e) =>{
    e.preventDefault();
    if(volumePoint<=0.9){
      setVolumePoint(volumePoint+0.1);
    }
  };

  return (
    <div className="settings">
      <h1 className="settingsHeader">Settings</h1>
      <div className="buttonAndSpan">
        <span>Music volume</span>
        <div className="addReduce">
          <button className="mainButton addReduceButton" onClick={reduceSound}>-</button>
          <span className="volumePoint">{Math.round(10*volumePoint)}</span>
          <button className="mainButton addReduceButton" onClick={addSound}>+</button>
        </div>        
      </div>
      <div className="buttonAndSpan">
        <span className="buttonSpan">Music sound</span>        
        {
          volumeOn?
            <>
              <button className="mainButton settingsSoundButton" onClick={musicOn}><img src={volOn} alt="volOn" width="30px"/></button>
            </>
            :
            <>
              <button className="mainButton settingsSoundButton" onClick={musicOff}><img src={volOff} alt="volOff" width="30px"/></button>
            </>
        }      
      </div>
      <div className="buttonAndSpan">
        <span className="buttonSpan">Effects sound</span>
        {
          effectsSound?
            <>
              <button className="mainButton settingsSoundButton" onClick={effectSoundOff}><img src={volOn} alt="volOn" width="30px"/></button>
            </>
            :
            <>
              <button className="mainButton settingsSoundButton" onClick={effectSoundOn}><img src={volOff} alt="volOff" width="30px"/></button>
            </>
        }
      </div>
      <button onClick={startNewGame} className="newGameButton">Start new game</button>
    </div>
  );
};