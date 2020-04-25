import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth } from "../../config/firebase";
import { generateUserDocument } from "../../config/firebase";
import CommerceLogo from "../../assets/commerceColor.png";
import "./styles.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="mt-8">
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <div className="main-box">
          <span className="main-span">
           <a href="">
          <img className="logo" src={CommerceLogo} alt="Commerce Logo" />
        </a>
            <form className="">
              <TextField
                type="text"
                className="login-text"
                name="displayName"
                value={displayName}
                placeholder="Name"
                id="displayName"
                onChange={event => onChangeHandler(event)}
              />
              <br />
              <br />
              <TextField
                type="email"
                className="login-text"
                name="userEmail"
                value={email}
                placeholder="Email"
                id="userEmail"
                onChange={event => onChangeHandler(event)}
              />
              <br />
              <br />
              <TextField
                type="password"
                className="login-text"
                name="userPassword"
                value={password}
                placeholder="Password"
                id="userPassword"
                onChange={event => onChangeHandler(event)}
              />
              <br />
              <br />
              <Button
                variant="contained"
                className="signIn-btn"
                onClick={event => {
                  createUserWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                Sign up
              </Button>
            </form>

            <p className="text-center my-3">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                Sign in here
              </Link>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
