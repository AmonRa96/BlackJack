import "./ChooseOption.css";
import double from "../assets/buttons/double.png";
import hit from "../assets/buttons/hit.png";
import stand from "../assets/buttons/stand.png";
import { useDispatch } from "react-redux";
import { hitCard, setDealerPlay } from "../store/cardsDataSlice";

export const ChooseOption = () => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(hitCard());    
  };

  const handleStand = () => {
    dispatch(setDealerPlay(true));
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
      <div>
        <img className="button" src={double} width="30px" alt="double" />
        <div className="buttonInfo">Double</div>
      </div>
    </div>
  );
};
