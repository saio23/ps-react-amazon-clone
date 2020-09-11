import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header"
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import {auth} from './firebase'
import { useStateValue } from "./StateProvider";


function App() {

  const [{},dispatch] = useStateValue();

useEffect(() => {
  //  will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
   

      if (authUser){
       
        //  the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
        console.log('The user is >>> ',authUser.displayName ? authUser.displayName : authUser.email);
      }else{
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    } )
  },[])



  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path="/login">
            <Login/>
          </Route>
        
          <Route path="/checkout">
          <Header/>  
          <Checkout/>
          </Route>
        
          {/* Last path is the default route */}
          <Route path="/">
            <Header/>
            <Home/> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
// Sticky Banner
// Ad Banner
// GridView items
export default App;
