import { createContext, useEffect, useReducer } from "react";
// import PropTypes from "prop-types";
import AppReducer from "./AppReducer";

// initialize
const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

// Create Context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  // console.log(typeof children);
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  function editTransaction(updatedTransaction) {
    // console.log(updatedTransaction)
    dispatch({
      type: "EDIT_TRANSACTION",
      payload: updatedTransaction,
    });
  }
  

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        editTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// GlobalProvider.propTypes = {
//   children: PropTypes.object.isRequired,
// };
