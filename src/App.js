import React, { useEffect } from 'react';
import './App.css';
import Navbar from './navbar/Navbar' 
import Landing from './landing/Landing'
import Dashboard from './dashboard/Dashboard'
import { Auth, Hub } from 'aws-amplify';
import styles from './assets/styles/styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, resetUser } from './features/user/userSlice'
import { updateInstances, resetInstances } from './features/instances/instanceSlice'
import { instanceFetcher, goToInstance } from './functions/Fetcher'
import { resetQueryResult } from './features/instances/querySlice'
import { displayMessage } from './features/toggle/displayMessageSlice'
import { messageBody } from './features/messages/contentSlice'

function App(){

  const currentUser = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  Hub.listen('auth', (data) => {
    const event = data.payload.event;
    if (event === "signOut") {
      signOut();
    }
    if (event === "signIn") {
      setCognitoUser();
    }
  });

  function signOut(){
    deleteCookies()
    dispatch(resetUser());
    dispatch(resetInstances());
    dispatch(resetQueryResult());
    dispatch(displayMessage(false));
    dispatch(messageBody(''));
  }

  async function setCognitoUser(){
    await Auth.currentAuthenticatedUser().then(result => {
      assignCookies(result.signInUserSession)
      return dispatch(updateUser(JSON.stringify(result)))
    }).catch((error) => { console.log(error) })
  }

  async function setInstances(){
    await instanceFetcher(currentUser).then(result => {
      let data = result.data
      if(data.instances == null) {
        dispatch(displayMessage(true));
        dispatch(messageBody('You do not have access to any instances. Please contact your administrator'));
        return true
      }
      let instances = data.instances
      if(instances.length === 1){ return goToInstance(instances[0]) }
      if(instances.length > 1){ 
        dispatch(displayMessage(false));
        dispatch(messageBody(''));
        return dispatch(updateInstances(instances)) 
      }
    });
  };

  function setCookie(id, value){
    document.cookie = `${id}=${value};`;
  }

  function deleteCookies(){
    document.cookie = "KIPU_SSO_ID_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "KIPU_SSO_ACCES_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "KIPU_SSO_REFRESH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  }

  function assignCookies(data){
    var idToken = data.idToken.jwtToken;
    var accessToken = data.accessToken.jwtToken;
    var refreshToken = data.refreshToken.token;
    setCookie('KIPU_SSO_ID_TOKEN', idToken);
    setCookie('KIPU_SSO_ACCES_TOKEN', accessToken);
    setCookie('KIPU_SSO_REFRESH_TOKEN', refreshToken);
  }

  useEffect(() => {
    setCognitoUser();
  });

  useEffect(() => {
    if(currentUser.email !== ''){
      setInstances();
    }
  }, [currentUser]);

  return (
    <div className="App">
      <Navbar currentUser={currentUser}/>
      { currentUser.email === '' ? <Landing/> : <Dashboard/>}
    </div>
  );
}

export default App;
