import CryptoJS from "crypto-js";

export default function Decrypt(params) {
  const env = `${process.env.NEXT_PUBLIC_ENCRYPT_KEY}`
  const key = CryptoJS.enc.Utf8.parse(env);

  const paramsDecoded = CryptoJS.enc.Base64.parse(params);
  
  const iv = paramsDecoded.clone();
  iv.sigBytes = 16;
  iv.clamp();


  const encryptedMessage = paramsDecoded.clone();
  encryptedMessage.words.splice(0, 4);
  encryptedMessage.sigBytes -= 16;

  // Decrypt the message
  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: encryptedMessage,
    },
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
  return plaintext;
}
