import React, {useState,useEffect} from 'react';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import './MainLayout.css';
import './Components/styles.css';
import 'reactjs-popup/dist/index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import MainLayout from './Screens/MainLayout';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  const [signedIn,setSignedIn] = useState(true);
  // update signedIn state 
  const updateAuthState = (signedInSatus)=>{
    setSignedIn(signedInSatus);
  }

  if(signedIn == true){
    return (
      <Router>
          <Switch>
            <Route exact path="/">
              <MainLayout updateAuthState={updateAuthState} page={"main"}/>
            </Route>
            <Route exact path="/consulting">
              <MainLayout updateAuthState={updateAuthState} page={"consulting"} />
            </Route>
            <Route exact path="/organise">
              <MainLayout updateAuthState={updateAuthState} page={"organise"} />
            </Route>
            <Route exact path="/profile">
              <MainLayout updateAuthState={updateAuthState} page={"profile"} />
            </Route>
            <Route exact path="*">
              <MainLayout page={"noMatch"}/>
            </Route>
          </Switch>
      </Router>
    );
  }else{
    return (
      <Router>
          <Switch>
            <Route exact path="/">
              <MainLayout updateAuthState={updateAuthState} page={"signIn"}/>
            </Route>
            <Route exact path="/profile">
              <MainLayout updateAuthState={updateAuthState} page={"signIn"}/>
            </Route>
            <Route exact path="/signUp">
             <MainLayout page={"signUp"}/>
            </Route>
            <Route exact path="/passwordReset">
              <MainLayout page={"passwordReset"}/>
            </Route>
            <Route exact path="*">
              <MainLayout page={"noMatch"}/>
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
