import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import AppReducer from "./AppReducer";

// initialize
const initialState = {
  transactions: [
    // { id: 1, text: "Flower", amount: -20 },
    // { id: 2, text: "Salary", amount: 300 },
    // { id: 3, text: "Book", amount: -10 },
    // { id: 4, text: "Camera", amount: 150 },
  ],
};

// Create Context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  console.log(typeof children);
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action

  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  GlobalProvider.propTypes = {
    children: PropTypes.object.isRequired,
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
