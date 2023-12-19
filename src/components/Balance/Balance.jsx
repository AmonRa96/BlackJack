import { useSelector } from "react-redux";
import "./Balance.css";

export const Balance = () => {
  const {startChipsCount} = useSelector((state)=>state.cardsSlice)
  return (
    <div className="balance">Balance: {startChipsCount}</div>
  );
};