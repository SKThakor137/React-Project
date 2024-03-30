import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

const Transaction = ({ currList }) => {
  const sign = currList.amount < 0 ? "-" : "+";

  const { deleteTransaction } = useContext(GlobalContext);
  return (
    <>
      <li className={currList.amount < 0 ? "minus" : "plus"} key={currList.id}>
        {currList.text}
        <span>
          {sign}${Math.abs(currList.amount)}
        </span>
        <button
          className="delete-btn"
          onClick={() => deleteTransaction(currList.id)}
        >
          x
        </button>
      </li>
    </>
  );
};

export default Transaction;
