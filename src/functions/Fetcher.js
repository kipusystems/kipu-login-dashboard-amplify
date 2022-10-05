import axios from 'axios';

const ACCOUNT_FETCH_URL = `${process.env.REACT_APP_BASE_ACCOUNT_URL}user/verify-user`

export function accountFetcher(user){
  var data = JSON.stringify({email: user.email});
  var config = {
    method: 'post',
    url: ACCOUNT_FETCH_URL,
    headers: {
      'X-API-key': process.env.REACT_APP_X_API_KEY,
      'Content-Type': 'application/json',
    },
    data : data
  };
  return axios(config)
          .then(response => {
            return response.data
          })
          .catch(error => {
            console.log(error);
            return error.data
          });
}

export function goToURL(account){
  return window.location.href = account.account_url
}

