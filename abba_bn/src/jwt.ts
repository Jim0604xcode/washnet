import sha512 from 'js-sha512';
let sha384 = sha512.sha384
let secret = 'ashdkjashdsadasdsadsadajkashdkjashdkjhasjkdakjsdh'


export type Role = "admin"|"customer"
export type JWT = {
    usersId:string
    role:Role
    exp: number

}

export const createJwt = (usersId:string,role:Role,duration:number) => {

    // create Header
    let header = JSON.stringify({
        'typ':'JWT',
        'alg':'HS384'
    })
    let now = Math.ceil(new Date().getTime() / 1000)
    let exp = now + duration;
    // console.log('22',now,exp)
    //create the token payload
    let payload = JSON.stringify({
        'usersId':usersId,
        'role':role,
        'exp':exp
    })

    let base64UrlHeader = base64EncodeHook(header)
    let base64UrlPayload = base64EncodeHook(payload)
    let signature = sha384.hmac(secret,base64UrlHeader + '.' + base64UrlPayload);
    let base64UrlSignature = base64EncodeHook(signature)

    let jwt = base64UrlHeader + '.' + base64UrlPayload + '.' + base64UrlSignature

    return jwt
}

export const verifyJwt = (jwt:string) => {

    // split the token client
    let tokenParts = jwt.split('.')
    let header = base64decode(tokenParts[0])
    let payload = base64decode(tokenParts[1])
    let signatureProvided = tokenParts[2]

    // check is expired

    let exp = JSON.parse(payload).exp
    let now = Math.ceil(new Date().getTime() / 1000)
    let tokenIsExpired = now - exp > 0 
    // console.log('52',now,exp,now-exp)
    if(tokenIsExpired){
        
        throw new Error('token is expired')
        
    }

    // build a signature base on the header and payload using secret
    let base64UrlHeader = base64EncodeHook(header)
    let base64UrlPayload = base64EncodeHook(payload)
    let signature = sha384.hmac(secret,base64UrlHeader + '.' + base64UrlPayload);
    let base64UrlSignature = base64EncodeHook(signature)

    // verify it matches the signature provided in the token

    let signatureValid = (base64UrlSignature === signatureProvided)
    let obj = JSON.parse(payload)
    if(!signatureValid){
        throw new Error('signature is not match provided in the token')
        
    }else{
        return obj
    }



}

const base64EncodeHook = (text:string) => {
    //'+' to '-' '/'to'_' '='to''
    let p = text
    p = p.replace(/\+/g,'-')
    p = p.replace(/\//g,'_')
    p = p.replace(/=/g,'')

    return base64encode(p)
}

const base64encode = (str:string):string =>Buffer.from(str,'binary').toString('base64')
const base64decode = (str:string):string =>Buffer.from(str,'base64').toString('binary')



