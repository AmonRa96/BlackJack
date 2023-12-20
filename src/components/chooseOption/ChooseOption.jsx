import "./ChooseOption.css";
import double from "../assets/buttons/double.png";
import hit from "../assets/buttons/hit.png";
import stand from "../assets/buttons/stand.png";
import { useDispatch, useSelector } from "react-redux";
import { hitCard, setDealerPlay,enableDealerFirstCard, setBet, reduceChips,setBetDoubled } from "../store/cardsDataSlice";

export const ChooseOption = () => {
  const {bet,startChipsCount} = useSelector((state)=>state.cardsSlice);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(hitCard());    
  };

  const handleStand = () => {
    dispatch(setDealerPlay(true));
    dispatch(enableDealerFirstCard(false));
  };

  const handleDouble = () => {
    if(startChipsCount-bet>0){
      dispatch(setBet(bet));
      dispatch(reduceChips(bet));
      dispatch(hitCard());
      dispatch(setBetDoubled(true));}
  };



  return (
    <div className="chooseOption">
      <div onClick={handleClick}>
        <img className="button" src={hit} width="30px" alt="hit" />
        <div className="buttonInfo">Hit</div>
      </div>
      <div onClick={handleStand}>
        <img className="button" src={stand} width="30px" alt="stand" />
        <div className="buttonInfo">Stand</div>
      </div>
      <div onClick={handleDouble}>
        <img className="button" src={double} width="30px" alt="double" />
        <div className="buttonInfo">Double</div>
      </div>
    </div>
  );
};
