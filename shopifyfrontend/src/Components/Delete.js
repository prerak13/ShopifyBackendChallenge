import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;
function Delete(props) {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [comment, setComment] = useState("");
  const id = useParams().id;

  useEffect(() => {
    axios.get("/items/" + id).then(function (response) {
      setItemName(response.data.itemName);
    });
  }, [id]);

  return (
    <div className="container fluid">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          axios
            .delete("/items/" + id, {
              data: {
                deletionComment: comment,
              },
            })
            .then(function (response) {
              if (response.status !== 200) {
                alert("Deletion failed");
              }
              alert("Deletion sucess");

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
            disabled={true}
          />
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Deletion Comment </label>
          <input
            className="form-control"
            aria-describedby="deletion comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Delete
        </button>
      </form>
    </div>
  );
}

export default Delete;
