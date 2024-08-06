import CryptoJS from 'crypto-js';

export const encryptData = (data: string): string =>
  CryptoJS.AES.encrypt(data, process.env.SECRET_KEY!).toString();

export const decryptData = (encryptedData: string): string =>
  CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY!).toString(CryptoJS.enc.Utf8);
