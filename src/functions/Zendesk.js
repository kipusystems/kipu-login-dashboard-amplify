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
  const link = await new jose.SignJWT(payload(user))
  .setProtectedHeader({ alg })
  .setExpirationTime('2h')
  .sign(secret).then(token => {
      console.log('process.env.REACT_APP_ZENDESK_SUBDOMAIN -> ', process.env.REACT_APP_ZENDESK_SUBDOMAIN)
      console.log('token -> ', token)
      if (process.env.REACT_APP_ZENDESK_SUBDOMAIN && token){
        console.log('yes')
        return `https://${process.env.REACT_APP_ZENDESK_SUBDOMAIN}.zendesk.com/access/jwt?jwt=${token}`
      }else{
        console.log('no')
        return ""
      }
    }
  )
  console.log(link)
  return link
}