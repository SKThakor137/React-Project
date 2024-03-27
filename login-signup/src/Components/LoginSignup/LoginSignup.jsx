import "./LoginSignup.css";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <></>
        ) : (
          <div className="input">
            <div className="icon">
              <FaUser />
            </div>
            <input type="text" name="" id="" placeholder="Name" />
          </div>
        )}
        <div className="input">
          <div className="icon">
            <MdEmail />
          </div>
          <input type="email" name="" id="" placeholder="Email Id" />
        </div>
        <div className="input">
          <div className="icon">
            <MdPassword />
          </div>
          <input type="password" name="" id="" placeholder="Password" />
        </div>
      </div>
      {action === "Sign Up" ? (
        <></>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
