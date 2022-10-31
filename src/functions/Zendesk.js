import JWT from 'expo-jwt';

function hex(n){
  n = n || 16;
  var result = '';
  while (n--){
   result += Math.floor(Math.random()*16).toString(16).toUpperCase();
  }
  return result;
}

function payload(user){
  if (process.env.REACT_APP_ZENDESK_SHARED_SECRET) {
    let iat = Date.now()
    let jti = `${iat}/${hex(18)}`
    let payloadData = {
      iat: iat,
      jti: jti,
      name: user.name,
      email: user.email,
    }
    return payloadData
  }else{
    return ''
  }
}

export function zendeskLink(user){
  const jwtToken = JWT.encode(payload(user), process.env.REACT_APP_ZENDESK_SHARED_SECRET)

  if (process.env.REACT_APP_ZENDESK_SUBDOMAIN && jwtToken){
    return `https://${process.env.REACT_APP_ZENDESK_SUBDOMAIN}.zendesk.com/access/jwt?jwt=${jwtToken}`
  }else{
    return ""
  }
}