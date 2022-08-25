import axios from 'axios';

const INSTANCE_FETCH_URL = `${process.env.REACT_APP_BASE_INSTANCE_URL}user/verify-user`

export function instanceFetcher(currentUser){
  var data = JSON.stringify({email: currentUser.email});
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
            console.log('success')
            return response
          })
          .catch(error => {
            console.log(error);
            return error
          });
}