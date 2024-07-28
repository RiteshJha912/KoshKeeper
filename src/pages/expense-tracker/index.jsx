import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import KoshaKeeperLogo2 from "../../assets/KoshaKeeperLogo2.png";
import "./styles.css";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>Welcome, {name}!</h1>
          <div className="balance">
            <h3>Current Balance:</h3>
            {balance >= 0 ? (
                <h2>₹{balance}</h2>
            ) : (
                <h2>- ₹{balance * -1}</h2>
            )}
            </div>
            <hr className="balance-divider" />
            <div className="summary">
            <div className="income">
                <h4>Total Income</h4>
                <p>₹{income}</p>
            </div>
            <div className="expense">
                <h4>Total Expenses</h4>
                <p>₹{expenses}</p>
            </div>
            </div>


          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <div className="transaction-type">
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} alt="Profile" />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      
      <div className="transactions-container">
        <div className="transactions">
          <h3>Transaction History</h3>
          <ul>
            {transactions.map((transaction, index) => {
              const { description, transactionAmount, transactionType } = transaction;
              return (
                <li key={index}>
                  <h4>{description}</h4>
                  <p>
                    ₹{transactionAmount} | {" "}
                    <span
                      className={
                        transactionType === "expense" ? "expense" : "income"
                      }
                    >
                      {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
