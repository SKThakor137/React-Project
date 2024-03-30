import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transactions) => transactions.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, val) => (acc += val), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, val) => (acc += val), 0) *
    -1
  ).toFixed(2);

  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">
            +${income}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">
            -${expense}
          </p>
        </div>
      </div>
    </>
  );
};

export default IncomeExpense;