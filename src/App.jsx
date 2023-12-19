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
import {
  shuffleData,
  setMyCardsSum,
  setDealerCardsSum,
  setWinner,
  setBetModal,
  setGameStarted,
  setDealerPlay,
  setDealerCardsEndPoint,
  addDealerCard,
  addChips
} from "./components/store/cardsDataSlice";

export const App = () => {
  const { gameStarted,betModal,cards,winner, dealerCards, myCards, myCardsSum, dealerCardsSum,dealerPlay,dealerCardsEndPoint } =
    useSelector((state) => state.cardsSlice);

  const [winnerModal, setWinnerModal] = useState(false);
  const [showModal, setShowModal] = useState(false);  
  const [bet, setBet] = useState(20);
  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shuffleData(cards));
    dispatch(setDealerPlay(false));
    dispatch(setDealerCardsEndPoint(28));
  }, [gameStarted,betModal]);

  useEffect(() => {
    dispatch(setMyCardsSum());
  }, [myCards]);
  useEffect(() => {
    dispatch(setDealerCardsSum());
  }, [dealerCards]);

  useEffect(()=>{
    //if point is more than 21----------------------------------------------
    if(myCardsSum>21||dealerCardsSum===21){
      dispatch(setWinner("Dealer win!!!"));
      setWinnerModal(true);
      setTimeout(()=>{
        setWinnerModal(false);
        dispatch(setBetModal(true));  
        dispatch(setGameStarted(false));   
      },3000);    
    }else if(dealerCardsSum>21||myCardsSum===21){
      dispatch(setWinner("Yow win!!!"));      
      dispatch(addChips(bet));
      setWinnerModal(true);
      setTimeout(()=>{
        setWinnerModal(false);
        dispatch(setBetModal(true));  
        dispatch(setGameStarted(false));   
      },3000);  
    }
    if(dealerPlay){
      if(dealerCardsSum<myCardsSum){       
        setTimeout(()=>{
          dispatch(addDealerCard(dealerCardsEndPoint));
        },1000);    
      }   
      if(dealerCardsSum>myCardsSum&&dealerCardsSum<=21||dealerCardsSum===myCardsSum){
        dispatch(setWinner("Dealer win!!!"));
        setWinnerModal(true);
        setTimeout(()=>{
          setWinnerModal(false);
          dispatch(setBetModal(true));  
          dispatch(setGameStarted(false));   
        },3000); 
      }  
    }
  },[myCardsSum,dealerCardsSum,winnerModal,dealerPlay]);

console.log({
winner,betModal,gameStarted,winnerModal,
})
// console.log(startOptions.chipsCount,"chips")
  return (
    <div
      className="App"
      style={{
        background: `no-repeat  url(${background})`,
        backgroundSize: "100% 100%",
      }}
    >
      <HouseRules />
      {!showModal && !betModal && !gameStarted ? (
        <button className="sitButton" onClick={handleShowModal}>
          Sit
        </button>
      ) : null}
      {showModal ? (
        <Modal setShowModal={setShowModal} width={600}>
          <StartOptions
            setShowModal={setShowModal}
          />
        </Modal>
      ) : null}
      {betModal ? (
        <div>
          <Chips bet={bet} setBet={setBet} clickDisable={false} />
          <Bet
            bet={bet}
            setBet={setBet} 
           
            setShowModal={setShowModal}
          />
          <Balance/>
        </div>
      ) : null}
      {gameStarted ? (
        <div>
          {winnerModal?
            <Modal closeButton={false}>
              <div className="winnerModal">
                {winner}
              </div>
            
            </Modal>
            :null}
          <Chips bet={bet} setBet={setBet} clickDisable={true} />
          <div className="sum">{myCardsSum}</div>
          <MyCards myCards={myCards} />
          <div className="dSum">{dealerCardsSum}</div>
          <DealerCards dealerCards={dealerCards} />
          <Balance/>
          <ChooseOption gameStarted={gameStarted} setWinnerModal={setWinnerModal} />
        </div>
      ) : null}
    </div>
  );
};
