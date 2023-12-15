import { useEffect, useState } from "react";
import "./App.css";
import background from "./components/assets/table.png";
import { Modal } from "./components/Modal/Modal";
import { StartOptions } from "./components/startOptions/StartOptions";
import { Chips } from "./components/chips/Chips";
import { MyCards } from "./components/Cards/MyCards/MyCards";
import { DealerCards } from "./components/Cards/DealerCards/DealerCards";
import { Balance } from "./components/Balance/Balance";
import { Bet } from "./components/Bet/Bet";
import { ChooseOption } from "./components/chooseOption/ChooseOption";
import { HouseRules } from "./components/houseRules/HouseRules";
import { useDispatch, useSelector } from "react-redux";
import { shuffleData } from "./components/store/cardsDataClice";


export const App = () => {
const cards = useSelector((state)=>state.cardsSlice.cardsData);
console.log(cards,"cccc")

  const [showModal, setShowModal] = useState(false);
  const [startOptions, setStartOptions] = useState({
    name: "Person",
    chipsCount: 100,
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [betModal,setBetModal] = useState(false);
  const [bet,setBet] = useState(20);
  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(shuffleData(cards))
},[])


  const myCards = cards.slice(0,2);
  const points = myCards.map((obj=>obj.point));
  const sum = points.reduce((point,aggr)=>{
    return point +aggr;
  },0);

  const dealerCards = cards.slice(26,28);
  const dPoints = dealerCards.map((obj=>obj.point));
  const dSum = dPoints.reduce((point,aggr)=>{
    return point +aggr;
  },0);




  
  return (
    <div
      className="App"
      style={{
        background: `no-repeat  url(${background})`,
        backgroundSize: "100% 100%",
      }}
    >
      <HouseRules/>
      { !showModal&&!betModal&&!gameStarted?
        (
          <button className="sitButton" onClick={handleShowModal}>
          Sit
          </button>
        ): null}
      {showModal ? (
        <Modal setShowModal={setShowModal} width={600}>
          <StartOptions
            setShowModal={setShowModal}
            setStartOptions={setStartOptions}
            setBetModal={setBetModal}
          />
        </Modal>
      ) : null}
      {betModal?(
        <div>
          <Chips bet={bet} setBet={setBet} clickDisable={false}/> 
          <Bet bet={bet} setBet={setBet} setGameStarted={setGameStarted} setBetModal={setBetModal} startOptions={startOptions} setStartOptions={setStartOptions}/>
          <Balance balance={startOptions.chipsCount}/>
        </div>
      )
        :null
      }
      {gameStarted ? (
        <div>
          <Chips bet={bet} setBet={setBet} clickDisable={true}/>
          <div className="sum">{sum}</div>
          <MyCards myCards={myCards} />
          <div className="dSum">{dSum}</div> 
          <DealerCards dealerCards={dealerCards}/> 
          <Balance balance={startOptions.chipsCount}/>
          <ChooseOption/>
          
        </div>
      ) : null}
    </div>
  );
};
