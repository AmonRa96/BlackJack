import { useEffect, useState } from "react";
import "./App.css";
import background from "./components/assets/table.png";
import newGame from "./components/assets/buttons/newGame.png";
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
import useSound from "use-sound";
import blackJackSound from "./components/sounds/blackJack.mp3";
import hitSound from "./components/sounds/hit.mp3";
import winSound from "./components/sounds/win.mp3";
import loseSound from "./components/sounds/lose.mp3";
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
  addChips,
  enableDealerFirstCard,
  setBetDoubled,
  setHitClicked,
  setEffectsSound,
} from "./components/store/cardsDataSlice";
import { Settings } from "./components/settings/Settings";
import sound from "./components/sounds/the-best-jazz-club-in-new-orleans-164472.mp3";

export const App = () => {
  const {
    hitClicked,
    volumePoint,
    effectsSound,
    gameStarted,
    betModal,
    doubleBet,
    bet,
    firstDealerCardDisable,
    cards,
    winner,
    dealerCards,
    myCards,
    myCardsSum,
    dealerCardsSum,
    dealerPlay,
    dealerCardsEndPoint
  }
   = useSelector((state) => state.cardsSlice);

  const [winnerModal, setWinnerModal] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [showSettingsModal,setShowSettingsModal] = useState(false);


  const [blackJack] = useSound(blackJackSound);
  const [hitting] = useSound(hitSound);
  const [win] = useSound(winSound);
  const [lose] = useSound(loseSound);
  const [mus,{stop}] = useSound(sound,{volume:volumePoint});
  const musicSetting = localStorage.getItem("musicSetting");
  const effectSoundSetting = localStorage.getItem("effectSoundSetting");

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const dispatch = useDispatch(); 

  useEffect(()=>{
    musicSetting? mus() : stop();    //but it doesn't work because  chrome blocks autoplay
  },[]);

  useEffect(()=>{
    effectSoundSetting?dispatch(setEffectsSound(true)):dispatch(setEffectsSound(false));
  },[effectSoundSetting]);

  useEffect(() => { 
    dispatch(shuffleData(cards));
    dispatch(setDealerPlay(false));
    dispatch(setDealerCardsEndPoint(28));
    dispatch(enableDealerFirstCard(true));
    dispatch(setBetDoubled(false));
    dispatch(setHitClicked(false));
    dispatch(setMyCardsSum(0));
  }, [gameStarted,betModal]);

  useEffect(() => {
    dispatch(setMyCardsSum());
  }, [myCards]);

  useEffect(() => {
    dispatch(setDealerCardsSum());
  }, [dealerCards]); 
  
  useEffect(()=>{  
    if(myCardsSum===21&&!hitClicked){
      effectsSound? blackJack():()=>{};
      dispatch(setWinner("Black Jack!!!"));      
      dispatch(addChips(3.5*bet));
      setWinnerModal(true);
      setTimeout(()=>{
        setWinnerModal(false);
        dispatch(setBetModal(true));  
        dispatch(setGameStarted(false));   
      },3000);  
    }
    if(myCardsSum>21){
      dispatch(setWinner("Dealer win!!!"));
      effectsSound?  lose():()=>{};     
      setWinnerModal(true);
      setTimeout(()=>{
        setWinnerModal(false);
        dispatch(setBetModal(true));  
        dispatch(setGameStarted(false));   
      },3000);  
    }
    if(dealerPlay){
      if(myCardsSum>21||dealerCardsSum===21){
        dispatch(setWinner("Dealer win!!!"));
        effectsSound?  lose():()=>{}; 
        setWinnerModal(true);
        setTimeout(()=>{          
          setWinnerModal(false);
          dispatch(setBetModal(true));  
          dispatch(setGameStarted(false));   
        },3000);    
      }
      if(dealerCardsSum>21){
        dispatch(setWinner("Yow win!!!"));
        if(doubleBet){
          dispatch(addChips(4*bet));
        }      
        dispatch(addChips(2*bet));
        effectsSound?   win():()=>{};       
        setWinnerModal(true);
        setTimeout(()=>{
          setWinnerModal(false);
          dispatch(setBetModal(true));  
          dispatch(setGameStarted(false));   
        },3000);  
      }
      if(dealerCardsSum<myCardsSum){       
        setTimeout(()=>{
          effectsSound?hitting():()=>{};   
          dispatch(addDealerCard(dealerCardsEndPoint));

        },1000);    
      }   
      if(dealerCardsSum>myCardsSum&&dealerCardsSum<=21||dealerCardsSum===myCardsSum){
        dispatch(setWinner("Dealer win!!!"));
        effectsSound?lose():()=>{}; 
        setWinnerModal(true);
        setTimeout(()=>{
          setWinnerModal(false);
          dispatch(setBetModal(true));  
          dispatch(setGameStarted(false));    
        },3000); 
      }  
    }
  },[dealerPlay,myCardsSum,dealerCardsSum,doubleBet,effectsSound]);

 
  const showSettings = () => {
    setShowSettingsModal(true);    
  };

  return (
    <div
      className="App"
      style={{
        background: `no-repeat  url(${background})`,
        backgroundSize: "100% 100%",
      }}
    >   
      <button className="menuButton" onClick={showSettings}><img src={newGame} alt="new" width="40px"/></button>   
      {showSettingsModal?
        <Modal setShowModal={setShowSettingsModal} width={600} height={450}>
          <Settings setShowModal={setShowModal} mus={mus} stop={stop} setShowSettingsModal={setShowSettingsModal}/>
        </Modal>
        :
        null  
      }
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
            setWinnerModal={setWinnerModal}
          />
        </Modal>
      ) : null}
      {betModal ? (
        <div>
          <Chips  clickDisable={false} />
          <Bet            
            setWinnerModal={setWinnerModal}
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
          <Chips clickDisable={true} />
          <div className="sum">{myCardsSum}</div>
          <MyCards myCards={myCards} setWinnerModal={setWinnerModal}/>
          <div className="dSum">{firstDealerCardDisable? dealerCards[1].point:dealerCardsSum}</div>
          <DealerCards dealerCards={dealerCards} />
          <Balance/>
          <ChooseOption gameStarted={gameStarted} setWinnerModal={setWinnerModal} effectsSound={effectsSound} />
        </div>
      ) : null}
    </div>
  );
};
