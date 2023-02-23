import * as jose from 'jose'

function hex(n){
  n = n || 16;
  var result = '';
  while (n--){
   result += Math.floor(Math.random()*16).toString(16).toUpperCase();
  }
  return result;
}

function payload(user){
  console.log('user -> ', user)
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

export async function zendeskLink(user){
  const alg = 'HS256'
  const secret = new TextEncoder().encode(
    process.env.REACT_APP_ZENDESK_SHARED_SECRET,
  )
  console.log('payload(user) -> ', payload(user))
  const link = new jose.SignJWT(payload(user))
  .setProtectedHeader({ alg })
  .setExpirationTime('2h')
  .sign(secret).then(token => {
      if (process.env.REACT_APP_ZENDESK_SUBDOMAIN && token){
        return `https://${process.env.REACT_APP_ZENDESK_SUBDOMAIN}.zendesk.com/access/jwt?jwt=${token}`
      }else{
        return ""
      }
    }
  )
  return link
}