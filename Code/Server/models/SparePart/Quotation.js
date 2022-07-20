const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../User/user");
const QuotationsSchema = new mongoose.Schema(
  {
    OrderID: { type: String, required: true, unique: true },
    UserID: { type: String, required: true },
    ItemName: { type: String },
    Quantity: { type: Number },
    OrderPrice: { type: Number },
    UserName: { type: String },
    Status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotations", QuotationsSchema);
