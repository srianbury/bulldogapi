import CryptoJS from 'crypto-js';

function encrypt(plainText){
    const cipherText = CryptoJS.AES.encrypt(plainText, process.env.ENCRYPT_SCRT_KEY).toString();
    return cipherText;
}

function decrypt(cipherText){
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.ENCRYPT_SCRT_KEY);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}

export { encrypt, decrypt };