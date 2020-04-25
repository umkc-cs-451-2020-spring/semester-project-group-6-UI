import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth } from "../../config/firebase";
import { signInWithGoogle }  from "../../config/firebase";
import Button from "@material-ui/core/Button";
import CommerceLogo from "../../assets/commerceColor.png";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

import "./styles.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-logo">
        <a href="">
          <img className="logo" src={CommerceLogo} alt="Commerce Logo" />
        </a>
      </div>
      <Paper elevation={3} className="login-box">
        <Typography
          align="center"
          variant="h4"
        >
          Sign In
        </Typography>
        {error !== null 
        ?
          <Typography className="error-text" align="center" variant="subtitle2">{error}</Typography>
        : 
          null}
        <TextField 
          className="form-field"
          label="Email: "
          margin="normal"
          type="string"
          align="center"
          name="userEmail"
          value={email}
          id="userEmail"
          onChange={(event) => onChangeHandler(event)}
        />
        <TextField 
          className="form-field"
          label="Password: "
          margin="normal"
          type="password"
          align="center"
          name="userPassword"
          value={password}
          id="userPassword"
          onChange={(event) => onChangeHandler(event)}
        />
        <div className="sign-buttons">
          <Button
            className="signIn-btn"
            onClick={(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
          >
            Sign In
          </Button>
          <div>
            <Button
              className="google-btn"
              onClick={() => signInWithGoogle()}>
              Sign in with Google
            </Button>
          </div>
        </div>
        <div className="links">
          <Typography variant="button">
            Don't have an account? {" "}
          </Typography>
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
              Sign up here
          </Link>{" "}
          <div>
            <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
              Forgot Password?
            </Link>
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default SignIn;
