import "./ChooseOption.css";
import double from "../assets/buttons/double.png";
import hit from "../assets/buttons/hit.png";
import stand from "../assets/buttons/stand.png";


export const ChooseOption = () =>{
  return(
    <div className="chooseOption">        
      <div >
        <img className="button" src={hit} width="30px" alt="hit"/>
        <div className="buttonInfo">Hit</div>
      </div>        
      <div >
        <img className="button" src={stand} width="30px" alt="stand"/>
        <div className="buttonInfo">Stand</div>
      </div>
      <div >
        <img className="button"  src={double} width="30px" alt="double"/>
        <div className="buttonInfo">Double</div>
      </div> 
    </div>
  );
};