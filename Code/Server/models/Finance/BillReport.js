const mongoose = require("mongoose");

const EmployeeBillReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    Totalincome: { type: Number },
    TotalProfit: { type: Number },
    Totalexpence: { type: Number },
    reportData: [
      {
        Discription: { type: String },
        Expences: { type: Number },
        Earning: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmpBillReport", EmployeeBillReportSchema);
