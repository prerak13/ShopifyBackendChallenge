var express = require("express");
const { route } = require("express/lib/application");
var router = express.Router();

var itemController = require("../Controller/item.controller");
//get all items with deletion status false
router.get("/", itemController.getItems);
//get deleted items
router.get("/deleted/", itemController.getDeletedItems);
//get item with id regardless of deletion status
router.get("/:itemID", itemController.getItemsByID);
//add item if itemID is unique
router.post("/", itemController.postItem);
//update item
router.put("/:itemID", itemController.updateItem);
//delete item
router.delete("/:itemID", itemController.softDeleteItem);
//restore item
router.patch("/restore/:itemID", itemController.undoDelete);

module.exports = router;
