/* eslint-disable no-undef */
/* eslint-disable global-require */

export const Card = ({src,index}) =>{
 
  return(
    <div style={{
      position:"relative",
      right: `${60*index}px`
    }}>
      <img src={require(`../../assets/${src}`)}  width="100px" alt="pic"/>
    </div>
  );
};