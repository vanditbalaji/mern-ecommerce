import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./searchModal.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SearchModal = ({ isOpen, onRequestClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const product = useSelector((state) => state?.product?.products);

  useEffect(() => {
    setInputValue("");
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputValue.trim() !== "") {
      const queryWords = inputValue.split(" ");
      const newFilteredProducts = product.filter((product) => {
        return queryWords.every((word) =>
          product?.title?.toLowerCase().includes(word.toLowerCase())
        );
      });
      setFilteredProducts(newFilteredProducts.slice(0, 5));
    } else {
      setFilteredProducts([]);
    }
  }, [isOpen, inputValue, product]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);

    const newFilteredProducts = product
      .filter((products) =>
        products?.title?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);

    setFilteredProducts(newFilteredProducts);
  };

  const handleChangeId = (id) => {
    const CryptoJS = require("crypto-js");
    const secretKey = "your-secret-key";
    const encryptedString = CryptoJS.AES.encrypt(id, secretKey).toString();
    const modifiedEncryptedString = encryptedString.replace(/\//g, "_");
    const modifiedToOriginal = modifiedEncryptedString.replace(/_/g, "/");
    const bytes = CryptoJS.AES.decrypt(modifiedToOriginal, secretKey);

    return modifiedEncryptedString;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Search Modal"
      className={`search-modal ${
        filteredProducts.length > 0 ? "search-modal-filter" : ""
      }`}
      overlayClassName="search-overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <div className="header">
          <button className="close-button" onClick={onRequestClose}>
            <FaTimes />
          </button>
          <h2 className="search">Search Products</h2>
        </div>
        <input
          type="text"
          placeholder="Enter something..."
          value={inputValue}
          onChange={handleInputChange}
          className="search-input"
        />
        {filteredProducts.map((product) => (
          <Link
            to={`/store/productDetails/${handleChangeId(product.id)}`}
            key={product.id}
            onClick={onRequestClose}
            className="product-link"
          >
            <div className="product-item">
              <div className="flex items-center">
                <div className="mb-4 mr-2">
                  <img
                    className="rounded-full h-9 w-9"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <span className="product-title">{product.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Modal>
  );
};

export default SearchModal;
