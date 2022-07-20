const router = require("express").Router();
const mongoose = require("mongoose");
const Quotations = require("../../models/SparePart/Quotation");
// const objId = mongoose.Types.ObjectId;

router.post("/add", async (req, res) => {
  try {
    const newQuotations = await Quotations.create({
      OrderID: req.body.OrderID,
      UserID: req.body.UserID,
      Quantity: req.body.Quantity,
      OrderPrice: req.body.OrderPrice,
      UserName: req.body.UserName,
      ItemName: req.body.ItemName,
      Status: "Pending",
    });
    await newQuotations.save();
    res.status(200).send({ message: "Sucessfully new Quotations added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// router.get("/sparepartreport", async (req, res) => {
//   let date = new Date();
//   let today = formatDate(date);
//   let month = new Date().getMonth();
//   let prevMonth = date.setMonth(month - 1);
//   let formatPrevMonth = new Date(date.setMonth(month - 1));

//   let lastmonthe = formatDate(formatPrevMonth);
//   SparePart.find({
//     $or: [
//       {
//         updatedAt: {
//           $gte: new Date(lastmonthe),
//           $lte: new Date(today),
//         },
//       },
//       {
//         createdAt: {
//           $gte: new Date(lastmonthe),
//           $lte: new Date(today),
//         },
//       },
//     ],
//   })
//     .then((SpareParts) => {
//       res.status(200).json({ SpareParts });
//     })
//     .catch((error) => {
//       res.status(501).json(error.message);
//     });
// });

// update Quotations
router.put("/update/:id", async (req, res) => {
  Quotations.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((SpareParts) => {
      res.status(200).json({ SpareParts });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/getAll", async (req, res) => {
  try {
    const Quotation = await Quotations.find({});
    res.status(200).json({ Quotation });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.get("/get/:id", async (req, res) => {
  Quotations.find({ UserID: req.params.id })
    .then((Quotation) => {
      res.status(200).json({ Quotation });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Quotations.findByIdAndDelete(req.params.id)
    .then((Quotation) => {
      res.status(200).json({ Quotation });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() + 1;
  console.log([year, month, day].join("-"));
  return [year, month, day].join("-");
}
module.exports = router;
