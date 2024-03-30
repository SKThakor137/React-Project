import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import Transaction from "./Transaction";

const ExpenseList = () => {
  // const context = useContext(GlobalContext)
  const { transactions } = useContext(GlobalContext);
  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((currList) => (
          <Transaction key={currList.id} currList ={currList}/>
        ))}

        {/* <li className="minus">
          Cash <span>-$400</span>
          <button className="delete-btn">x</button>
        </li> */}
      </ul>
    </>
  );
};

export default ExpenseList;
