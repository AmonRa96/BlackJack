/* eslint-disable no-constant-condition */
import twenty from "../assets/chips/green.png";
import fifty from "../assets/chips/red.png";
import hundred from "../assets/chips/blue.png";
import pass from "../assets/chips/black.png";
import "./Chips.css";
import useSound from "use-sound";
import sound from "../sounds/chipSound.mp3";
import cancelChips from "../sounds/cancelChips.mp3";
import { useDispatch, useSelector } from "react-redux";
import { setBet } from "../store/cardsDataSlice";


export const Chips = ({clickDisable }) =>{
  const {bet} = useSelector((state)=>state.cardsSlice);
  const [oneChipSound] = useSound(sound);
  const [cancelChipsSound] = useSound(cancelChips);
  const dispatch = useDispatch();

  const handleClick20 = () =>{
    oneChipSound();
    dispatch(setBet(bet+20));
  };

  const handleClick50 = () =>{
    oneChipSound();
    dispatch(setBet(bet+50));
  };

  const handleClick100 = () =>{
    oneChipSound();
    dispatch(setBet(bet+100));
  };
  
  const handleClick0 = () =>{
    cancelChipsSound();
    dispatch(setBet(0));
  };

  return (
    <div className="chips">
      <div onClick={clickDisable?()=>{}:handleClick20}  className="chipsTwenty"><img src={twenty} alt="chips" width="50px"/></div>
      <div onClick={clickDisable?()=>{}:handleClick50}  className="chipsFifty"><img src={fifty} alt="chips" width="50px"/></div>
      <div onClick={clickDisable?()=>{}:handleClick100}  className="chipsHundred"><img src={hundred} alt="chips" width="50px"/></div>  
      <div onClick={clickDisable?()=>{}:handleClick0} className="chipsPass"> <img src={pass} alt="chips" width="57px"/></div>
    </div>
  );
};