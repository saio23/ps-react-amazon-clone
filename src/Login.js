import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const signIn = e =>{
        e.preventDefault();

        // firebase login
        auth
        .signInWithEmailAndPassword(email,password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
        
    };

    const register = e => {
       e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            //succesfully created new user
            console.log(auth)
            if (auth){
                history.push('/')
            }
        })
        .catch(error => alert(error.message));
    };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://dronesaferegister.org.uk/blog/wp-content/uploads/2019/03/amazon.jpg"
          alt=''
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

          <button className="login__signInButton" onClick={signIn}>Sign In</button>
        </form>
        <p>
          By continuing, you agree to the FAKE AMAZON CLONE Conditions of Use
          and Privacy Notice.
        </p>
        <button className="login__registerButton" onClick={register}>
          Create your Clone Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
