import CryptoJS from 'crypto-js';

export const encryptData = (data: string): string =>
  CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY as string).toString();

export const decryptData = (encryptedData: string): string =>
  CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY as string).toString(
    CryptoJS.enc.Utf8,
  );
