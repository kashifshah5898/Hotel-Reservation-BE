var CryptoJS = require("crypto-js");

const securityKey = 'secret_key_123';

const decryptedText = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, securityKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText)
};

const encryptedText = (decryptText) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(decryptText), securityKey).toString();
    return ciphertext
};



module.exports = { decryptedText, encryptedText }