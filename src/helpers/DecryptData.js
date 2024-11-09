import CryptoJS from "crypto-js";

export default function Decrypt(params) {
  // const env = `${process.env.NEXT_PUBLIC_ENCRYPT_KEY}`
  const env = "1n1S4ng4tr4has14";
  const key = CryptoJS.enc.Utf8.parse(env);
  // Decode the params from Base64
  const paramsDecoded = CryptoJS.enc.Base64.parse(params);
  // Extract the IV from the params
  const iv = paramsDecoded.clone();
  iv.sigBytes = 16;
  iv.clamp();

  // Extract the encrypted message (without the IV)
  const encryptedMessage = paramsDecoded.clone();
  encryptedMessage.words.splice(0, 4); // remove IV
  encryptedMessage.sigBytes -= 16; // remove IV

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

  // Convert the decrypted message to plaintext
  const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
  return plaintext;
}

const data = Decrypt(
  "WZwYtXmoOp0EDuG5q5A4bgpAGIq+yCkEfYrEaXusk/B39602oxqNVBmzNj4EPLX65tGdFeGRJYyBzOqIKhzvqn4PjlOIGRaZ+kFVc3NEKEU="
);
console.log(data);

const data2 = Decrypt(
  "fZKUlgDnA8EBKeaQOnmJANoaTp/Z0R+Xv2fpnrA7m9/aAYScWq4WinkMiqQB7fKRZS9GAEYVJUs1VhwQ8nvS01INBSv3R+RCPlZhZG87Rm9Ur+2ZuNDyX9qVyha/X9ANvHiaY8kd8+dd9p2OqC9QNozGrf5LltUWXLoif03Sjas="
);
console.log(data2);
