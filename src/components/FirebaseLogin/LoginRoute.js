import React , { useContext }  from "react";
import { UserContext } from "../../providers/UserProvider";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "../Home/Home.js";

function LoginRoute() {
  const user = useContext(UserContext);
  //console.log(user);
  return user ? (
    <Home
      user={user} 
      />
  ) : (
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
    </Router>
  );
}
export default LoginRoute;
