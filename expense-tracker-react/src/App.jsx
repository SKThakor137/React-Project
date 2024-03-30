import "./App.css";
import AddTransaction from "./Components/AddTransaction";
import Balance from "./Components/Balance";
import ExpenseList from "./Components/ExpenseList";
import Header from "./Components/Header";
import IncomeExpense from "./Components/IncomeExpense";
import { GlobalProvider } from "./Context/GlobalState";

function App() {
  return (
    <>
      <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpense />
        <ExpenseList />
        <AddTransaction />
      </div>
     </GlobalProvider>
    </>
  );
}

export default App;
