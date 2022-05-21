import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "./Components/Delete";

const axios = require("axios").default;

function App() {
  const [items, setItems] = useState([]);
  const [deletedItems, setDeleatedItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/items").then(function (response) {
      setItems(response.data);
    });

    axios.get("/items/deleted").then(function (response) {
      setDeleatedItems(response.data);
    });
  }, []);

  return (
    <div className="container fluid">
      <div className="row">
        <h1>Inventory Items</h1>
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            navigate("/create/");
          }}
        >
          +++ Create New Items +++
        </button>
      </div>
      <div className="row">
        <h3>Non deleted items</h3>
      </div>

      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ItemName</th>
              <th scope="col">ItemDescription</th>

              <th scope="col">ItemQuantity</th>
              <th scope="col">ItemPrice</th>

              <th scope="col">PurchaseDate</th>
              <th scope="col">ExpiryDate</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{x.itemName}</td>
                  <td>{x.itemDescription}</td>
                  <td>{x.itemQuantity}</td>
                  <td>{x.itemPrice}</td>
                  <td>{x.purchaseDate && x.purchaseDate.slice(0, 10)}</td>
                  <td>{x.expiryDate && x.expiryDate.slice(0, 10)}</td>
                  <td>
                    {/* UPDATE */}
                    <svg
                      onClick={() => {
                        navigate("/update/" + x.itemID);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="blue"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    {/* Delete */}
                    <svg
                      onClick={() => {
                        navigate("/delete/" + x.itemID);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      style={{ marginLeft: "10px" }}
                      fill="red"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <h3>Deleted items</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ItemName</th>
              <th scope="col">ItemDescription</th>

              <th scope="col">ItemQuantity</th>
              <th scope="col">ItemPrice</th>

              <th scope="col">PurchaseDate</th>
              <th scope="col">ExpiryDate</th>

              <th scope="col">Delete Comment</th>

              <th scope="col">Restore Item</th>
            </tr>
          </thead>
          <tbody>
            {deletedItems.map((x, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{x.itemName}</td>
                  <td>{x.itemDescription}</td>
                  <td>{x.itemQuantity}</td>
                  <td>{x.itemPrice}</td>
                  <td>{x.purchaseDate && x.purchaseDate.slice(0, 10)}</td>
                  <td>{x.expiryDate && x.expiryDate.slice(0, 10)}</td>
                  <td>{x.deletionComment}</td>
                  <td>
                    <svg
                      onClick={() => {
                        axios
                          .patch("/items/restore/" + x.itemID)
                          .then((res) => {
                            if (res.status !== 200) {
                              alert("Error");
                            } else {
                              alert("Item Restored Sucessfully");
                              window.location.reload(true);
                            }
                          });
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="purple"
                      className="bi bi-bootstrap-reboot"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                      <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
