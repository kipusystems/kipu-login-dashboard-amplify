import React, { useEffect } from 'react';
import './App.css';
import Navbar from './navbar/Navbar' 
import Landing from './landing/Landing'
import Dashboard from './dashboard/Dashboard'
import { Auth, Hub } from 'aws-amplify';
import styles from './assets/styles/styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, resetUser } from './features/user/userSlice'
import { updateInstances } from './features/instances/instanceSlice'
import { instanceFetcher } from './functions/Fetcher'

function App(){

  const currentUser = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  Hub.listen('auth', (data) => {
    const event = data.payload.event;
    if (event === "signOut") {
      deleteCookies()
      dispatch(resetUser());
    }
    if (event === "signIn") {
      setCognitoUser();
      setInstances();
    }
  });

  async function setInstances(){
    await instanceFetcher(currentUser).then(result => {
      dispatch(updateInstances(result.data.data.instances));
      return true
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

  async function setCognitoUser(){
    await Auth.currentAuthenticatedUser().then(result => {
      assignCookies(result.signInUserSession)
      return dispatch(updateUser(JSON.stringify(result)))
    })
  }

  useEffect(() => {
    setCognitoUser();
  }, []);

  useEffect(() => {
    setInstances();
  }, [currentUser]);

  return (
    <div className="App">
      <Navbar currentUser={currentUser}/>
      { currentUser.email === '' ? <Landing/> : <Dashboard/>}
    </div>
  );
}

export default App;
