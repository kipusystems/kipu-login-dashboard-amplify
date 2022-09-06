import axios from 'axios';

const INSTANCE_FETCH_URL = `${process.env.REACT_APP_BASE_INSTANCE_URL}user/verify-user`

export function instanceFetcher(user){
  var data = JSON.stringify({email: user.email});
  var config = {
    method: 'post',
    url: INSTANCE_FETCH_URL,
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

export function instanceUrl(subDomain){
  return `https://${subDomain}.kipuworks.com`
}

export function goToInstance(instance){
  return window.location.href = `https://${instance.instance_subdomain}.kipuworks.com`
}

