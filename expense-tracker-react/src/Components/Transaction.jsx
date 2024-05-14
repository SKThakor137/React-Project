import { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from "../Context/GlobalState";

const Transaction = ({ currList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(currList.text);
  const [editedAmount, setEditedAmount] = useState(currList.amount);

  const sign = currList.amount < 0 ? "-" : "+";
  const { deleteTransaction, editTransaction } = useContext(GlobalContext);

  const handleEdit = () => {
    if (editedText === "") {
      alert("please enter transaction");
      return;
    }
    if (editedAmount == 0) {
      alert("please enter transaction amount");
      return;
    }
    editTransaction({
      ...currList,
      text: editedText,
      amount: +editedAmount,
    });
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <li
          className={currList.amount < 0 ? "minus" : "plus"}
          key={currList.id}
        >
          {currList.text}
          <span>
            {sign}${Math.abs(currList.amount)}
          </span>
          <button
            className="delete-btn"
            onClick={() => deleteTransaction(currList.id)}
          >
            <MdDelete className="delete-icon" />
          </button>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <FaEdit className="edit-icon" />
          </button>
        </li>
      ) : (
        <li>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
          />
          <button className="save-btn" onClick={handleEdit}>
            Save
          </button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </li>
      )}
    </>
  );
};

export default Transaction;
