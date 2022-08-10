import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './navbar/Navbar' 
import Landing from './landing/Landing'
import Dashboard from './dashboard/Dashboard'
import styles from './assets/styles/styles.css'
import { Auth, Hub } from 'aws-amplify';

function App(){

  const [user, setUser] = useState({})

  Hub.listen('auth', (data) => {
    const event = data.payload.event;
    if (event === "signOut") {
      setUser({})
    }
    if (event === "signIn") {
      setCognitoUser()
    }
  });

  async function setCognitoUser(){
    await Auth.currentAuthenticatedUser().then(result => {
      return setUser(result)  
    })
  }

  useEffect(() => {
    setCognitoUser()
  }, []);

  return (
    <div className="App">
      <Navbar user={user}/>
      {Object.keys(user).length === 0 ? <Landing/> : <Dashboard/>}
    </div>
  );
}

export default App;
