import "./DealerCards.css";
import { Card } from "../Card/Card";
import { useSelector } from "react-redux";


export const DealerCards = ({ dealerCards }) => {
  const {firstDealerCardDisable} = useSelector((state) => state.cardsSlice);

  return(
    <div className="dealerCards">
      {dealerCards.map(({id,img},index)=>{
        return(          
          <Card key={id} src={img} index={index} firstDealerCardDisable={firstDealerCardDisable}/>   
        );
      })}
    </div>
  ); 
};
