import "./DealerCards.css";
import { Card } from "../Card/Card";

export const DealerCards = ({ dealerCards }) => {

  return(
    <div className="dealerCards">
      {dealerCards.map(({id,img},index)=>{
        return(
          
          <Card key={id} src={img} index={index}/>
          
          
        );
      })}
    </div>
  ); 
};
