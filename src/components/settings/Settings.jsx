import { useDispatch, useSelector } from "react-redux";
import "./Settings.css";
import { setBetModal,setGameStarted,setMusicOn,setVolumePoint,setEffectsSound } from "../store/cardsDataSlice";
import volOn from "../assets/buttons/volOn.png";
import volOff from "../assets/buttons/soundOff.png";


export const Settings = ({setShowModal,mus,stop,setShowSettingsModal}) =>{
  const {musicOn,volumePoint,effectsSound} = useSelector((state)=>state.cardsSlice);
  const dispatch = useDispatch();

  const startNewGame = () =>{
    setShowModal(true);
    dispatch(setBetModal(false));  
    dispatch(setGameStarted(false)); 
    setShowSettingsModal(false);
  };
  
  const musicSoundOff = (e) =>{
    e.preventDefault();
    dispatch(setMusicOn(false));
    localStorage.removeItem("musicSetting");
    stop();
  };

  const musicSoundOn = (e) =>{
    e.preventDefault();
    dispatch(setMusicOn(true));
    localStorage.setItem("musicSetting","on");
    mus();
  };

  const effectSoundOn = (e) =>{
    e.preventDefault();
    dispatch(setEffectsSound(true));
    localStorage.setItem("effectSoundSetting","on");


  };

  const effectSoundOff = (e) =>{
    e.preventDefault();
    dispatch(setEffectsSound(false));
    localStorage.removeItem("effectSoundSetting");


  };

  const reduceSound = (e) =>{
    e.preventDefault();
    if(volumePoint>0.2){
      dispatch(setVolumePoint(volumePoint-0.1));
    }
   
  };
  const addSound = (e) =>{
    e.preventDefault();
    if(volumePoint<=0.9){
      dispatch(setVolumePoint(volumePoint+0.1));
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
          musicOn?
            <>
              <button className="mainButton settingsSoundButton" onClick={musicSoundOff}><img src={volOn} alt="volOn" width="30px"/></button>
            </>
            :
            <>
              <button className="mainButton settingsSoundButton" onClick={musicSoundOn}><img src={volOff} alt="volOff" width="30px"/></button>
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