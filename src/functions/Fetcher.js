import axios from 'axios'

export function fetcher({method, url, data}={}){
  axios.get(`${url}`)
  .then(res => {
    const persons = res.data;
    this.setState({ persons });
  })
}