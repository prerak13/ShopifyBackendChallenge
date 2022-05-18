const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    itemID: String,
    itemName: String,
    itemQuantity: Number,
    itemPrice: Number,
    itemDescription: String,
    purchaseDate: Date,
    expiryDate: Date,
    isDeleted: Boolean,
    deletionComment: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", ItemSchema);
