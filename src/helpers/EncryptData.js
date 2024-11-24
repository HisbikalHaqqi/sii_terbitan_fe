import CryptoJS from "crypto-js";

export default function EncryptData(params) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const env = `${process.env.NEXT_PUBLIC_ENCRYPT_KEY}`

  const key = CryptoJS.enc.Utf8.parse(env);

  if (env !== "" || null) {
    try {
      const encrypted = CryptoJS.AES.encrypt(params, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const ciphertext = iv
        .concat(encrypted.ciphertext)
        .toString(CryptoJS.enc.Base64);

        return ciphertext;
    } catch (error) {
      console.error("Error get data:", error);
      return error;
    }
  }
}


