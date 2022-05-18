const res = require("express/lib/response");
var Item = require("../Model/item.model");

//get all items with deletion status false
exports.getItems = (req, res) => {
  Item.find({ isDeleted: false }, "-_id", (err, items) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(items);
  });
};
//get deleted items
exports.getDeletedItems = (req, res) => {
  Item.find({ isDeleted: true }, "-_id", (err, items) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(items);
  });
};
//get item with id regardless of deletion status
exports.getItemsByID = (req, res) => {
  !req.params.itemID &&
    res.status(400).json({ message: "Item ID is required" });
  Item.findOne({ itemID: req.params.itemID }, "-_id", (err, item) => {
    if (err) {
      res.status(500).send(err);
    }
    !!item
      ? res.status(200).json(item)
      : res
          .status(404)
          .json({ message: `Item with the ${req.params.itemID} not found` });
  });
};

//generate uuid if id isnt present
generateUUID = () => {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
};

//add item if itemID is unique
exports.postItem = (req, res) => {
  Item.findOne({ itemID: req.body.itemID }, (err, item) => {
    if (err) {
      res.status(500).send(err);
    }
    if (item) {
      res
        .status(400)
        .json({ message: `Item with id ${req.params.itemID} already exists` });
    } else {
      Item.create(
        {
          itemID: req.body.itemID || generateUUID(),
          itemName: req.body.itemName,
          itemQuantity: req.body.itemQuantity,
          itemPrice: req.body.itemPrice,
          itemDescription: req.body.itemDescription,
          purchaseDate: req.body.purchaseDate,
          expiryDate: req.body.expiryDate,
          isDeleted: req.body.isDeleted || false,
          deletionComment: req.body.deletionComment,
        },
        (err, item) => {
          if (err) {
            res.status(500).send(err);
          }

          if (!!item) {
            const { _id, ...resp } = item._doc;
            res.status(200).json(resp);
          } else {
            res.status(500).send("Error in creating item");
          }
        }
      );
    }
  });
};

exports.updateItem = (req, res) => {
  !req.params.itemID &&
    res.status(400).json({ message: "Item ID is required" });
  Item.findOneAndUpdate(
    { itemID: req.params.itemID },
    {
      itemID: req.params.itemID,
      itemName: req.body.itemName,
      itemQuantity: req.body.itemQuantity,
      itemPrice: req.body.itemPrice,
      itemDescription: req.body.itemDescription,
      purchaseDate: req.body.purchaseDate,
      expiryDate: req.body.expiryDate,
    },
    { new: true },
    (err, item) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!!item) {
        res.status(200).json(item);
      } else {
        res
          .status(400)
          .json({ message: `Item with the ${req.params.itemID} not found` });
      }
    }
  );
};
//soft delete item with id
exports.softDeleteItem = (req, res) => {
  !req.params.itemID &&
    res.status(400).json({ message: "Item ID is required" });
  Item.findOneAndUpdate(
    { itemID: req.params.itemID },
    {
      isDeleted: true,
      deletionComment: req.body.deletionComment,
    },
    { new: true },
    (err, item) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!!item) {
        res.status(200).json(item);
      } else {
        res
          .status(400)
          .json({ message: `Item with the ${req.params.itemID} not found` });
      }
    }
  );
};
//undo soft delete item with id
exports.undoDelete = (req, res) => {
  !req.params.itemID &&
    res.status(400).json({ message: "Item ID is required" });
  Item.findOneAndUpdate(
    { itemID: req.params.itemID },
    {
      isDeleted: false,
      deletionComment: "",
    },
    { new: true },
    (err, item) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!!item) {
        res.status(200).json(item);
      } else {
        res
          .status(400)
          .json({ message: `Item with the ${req.params.itemID} not found` });
      }
    }
  );
};
