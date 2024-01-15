/* eslint-disable no-undef */
/* eslint-disable global-require */
import "./Card.css";
import background from "../../assets/zzz.jpg";

export const Card = ({src,index,firstDealerCardDisable}) =>{
 
  return(
    <div style={{
      position:"relative",
      right: `${60*index}px`
    }}>
      {firstDealerCardDisable&&index===0? <img src={background} alt="back" className="firstClosedCard"/>:null}
      <img src={require(`../../assets/${src}`)}  width="100px" alt="pic" />
    </div>
  );
};