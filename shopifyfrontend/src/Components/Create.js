import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;
function Create(props) {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemPurchase, setitemPurchase] = useState("");
  const [itemExpiry, setitemExpiry] = useState("");

  return (
    <div className="container fluid">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          axios
            .post("/items/", {
              itemName: itemName,
              itemDescription: itemDesc,
              itemQuantity: itemQuantity,
              itemPrice: itemPrice,
              purchaseDate: itemPurchase,
              expiryDate: itemExpiry,
            })
            .then(function (response) {
              if (response.status !== 200) {
                alert("Creation failed");
              }
              alert("Creation sucess");

              navigate("/");
            });
        }}
      >
        <div className="form-group">
          <label for="exampleInputEmail1">Item Name</label>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Item Description</label>
          <input
            className="form-control"
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Item Quantity</label>
          <input
            className="form-control"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Item Price</label>
          <input
            className="form-control"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Purchase Date (yyyy-dd-mm)</label>
          <input
            className="form-control"
            value={itemPurchase}
            onChange={(e) => setitemPurchase(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Expiry Date (yyyy-dd-mm)</label>
          <input
            className="form-control"
            value={itemExpiry}
            onChange={(e) => setitemExpiry(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default Create;
