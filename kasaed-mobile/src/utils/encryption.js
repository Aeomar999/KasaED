import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "KasaEd-Secure-Key-2024-SRH-Mobile-App";

export const encryptMessage = (message) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(message),
      ENCRYPTION_KEY
    ).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptMessage = (encryptedMessage) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPTION_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

export const generateMessageId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
