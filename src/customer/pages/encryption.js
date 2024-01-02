import React from "react";

const Encryption = () => {
  const CryptoJS = require("crypto-js");
  const productId = 12;
  const encryptedProductId = CryptoJS.AES.encrypt(
    productId.toString(),
    "secret-key"
  ).toString();

  const encryptedProductIdFromUrl =
    "U2FsdGVkX1+VHoOn5cR4Xkx0+AqqXXTVauHD8g1wpNI="; // Retrieve from the URL
  const bytes = CryptoJS.AES.decrypt(encryptedProductIdFromUrl, "secret-key");
  const decryptedProductId = parseInt(bytes.toString(CryptoJS.enc.Utf8));
  return <div></div>;
};

export default Encryption;
