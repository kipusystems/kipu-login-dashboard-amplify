import React, { useEffect } from 'react';
import './App.css';
import Landing from './landing/Landing'
import Dashboard from './dashboard/Dashboard'
import { Auth, Hub } from 'aws-amplify';
import './assets/styles/styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, resetUser } from './features/user/userSlice'
import { updateAccounts, resetAccounts } from './features/accounts/accountSlice'
import { accountFetcher, goToURL } from './functions/Fetcher'
import { resetQueryResult } from './features/accounts/querySlice'
import { displayMessage } from './features/toggle/displayMessageSlice'
import { messageBody } from './features/messages/contentSlice'
import { updateLoadingStatus } from './features/accounts/isLoadingSlice'

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
    dispatch(resetAccounts());
    dispatch(resetQueryResult());
    dispatch(displayMessage(false));
    dispatch(messageBody(''));
    dispatch(updateLoadingStatus(true))
  }

  async function setCognitoUser(){
    await Auth.currentAuthenticatedUser().then(result => {
      assignCookies(result.signInUserSession)
      return dispatch(updateUser(JSON.stringify(result)))
    }).catch((error) => { console.log(error) })
  }

  async function setAccounts(){
    await accountFetcher(currentUser).then(result => {
      let data = result.data
      let accounts = data.accounts
      if(accounts == null) {
        dispatch(updateLoadingStatus(false))
        dispatch(displayMessage(true));
        dispatch(messageBody('You do not have access to any accounts. Please contact your administrator'));
        return true
      }
      if(accounts.length === 1){ return goToURL(accounts[0]) }
      if(accounts.length > 1){ 
        dispatch(displayMessage(false));
        dispatch(messageBody(''));
        dispatch(updateLoadingStatus(false));
        return dispatch(updateAccounts(accounts)) 
      }
    });
  };

  function setCookie(id, value){
    console.log('setting cookie -> ', id)
    console.log('with value of -> ', value)
    let cookie = `${id}=${value};domain=kipuworks.com`
    document.cookie = cookie;
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
      setAccounts();
    }
  }, [currentUser]);

  return (
    <div className="App">
      { currentUser.email === '' ? <Landing/> : <Dashboard/>}
    </div>
  );
}

export default App;
