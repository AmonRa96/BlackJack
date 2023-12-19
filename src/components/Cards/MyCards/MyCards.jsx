/* eslint-disable no-undef */
import "./MyCards.css";
import { Card } from "../Card/Card";

export const MyCards = ({ myCards }) => {



  return(
    <div className="myCards">
      {myCards.map(({id,img},index)=>{
        return(
          <Card key={id} src={img} index={index}/>
        );
      })}
    </div>
  ); 
};
