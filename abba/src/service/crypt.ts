import * as CryptoJS from 'crypto-js';
let secret = 'abba51823007';
let options = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };  

export function encryptionData(data:any){
    let json = CryptoJS.AES.encrypt(JSON.stringify(data), secret, options);  
    let encryptData  = json.formatter.stringify(json);  
    return encryptData
}
export function decryptionData(encryptData:string){
    let decrypt = CryptoJS.AES.decrypt(encryptData, secret, options);    
    let data = decrypt.toString(CryptoJS.enc.Utf8);
      
    return data
}
