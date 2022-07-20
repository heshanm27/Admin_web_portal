const router = require("express").Router();
const Bill = require("../../models/Finance/Bill");
const salaryReport = require("../../models/Finance/Report");
const sparePartReport = require("../../models/SparePart/Report");
const maintanceReport = require("../../models/Maintain/Report");
const vehicleReport = require("../../models/Vehicle/Report");

//add new warrenty
router.post("/add", async (req, res) => {
  try {
    //add new bill
    const newBill = new Bill({
      Billl_ID: req.body.Billl_ID,
      Total: req.body.Total,
      date: req.body.date,
      ItemCount: req.body.ItemCount,
      discount: req.body.discount,
      Item_Used: req.body.Item_Used,
    });

    //save
    const savedBill = await newBill.save();

    res.status(200).json(savedBill);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  Bill.find({})
    .populate("Item_Used.id")
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/getreport", async (req, res) => {
  let date = new Date();
  let today = formatDate(date);
  let month = new Date().getMonth();
  let prevMonth = date.setMonth(month - 1);
  let formatPrevMonth = new Date(date.setMonth(month - 1));
  let lastmonthe = formatDate(formatPrevMonth);

  let obj = {
    sparepartIncome: 0,
    sparepartExpences: 0,
    maintainIncome: 0,
    maintainExpences: 0,
    EmpTotalSalaryPay: 0,
    vehicalTotalProfit: 0,
    spareDetails: "Spare Part",
    vehicleDetails: "Vehicle Sell",
    empDetails: "Salary Pay",
    maintainDetails: "Maintanace",
  };

  await maintanceReport
    .find(
      { reportDate: { $gte: new Date(lastmonthe), $lte: new Date(today) } },
      { Totalincome: 1, Totalexpence: 1 }
    )
    .then((income) => {
      income.map((item) => {
        obj.maintainExpences = item.Totalexpence;
        obj.maintainIncome = item.Totalincome;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  await sparePartReport
    .find(
      {
        reportDate: {
          $gte: new Date(lastmonthe),
          $lte: new Date(today),
        },
      },
      { TotalProfit: 1, Totalexpence: 1 }
    )
    .then((spare) => {
      spare.map((item) => {
        obj.sparepartExpences = item.TotalProfit;
        obj.sparepartIncome = item.Totalexpence;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  await salaryReport
    .find(
      {
        reportDate: {
          $gte: new Date(lastmonthe),
          $lte: new Date(today),
        },
      },
      { TotalSalaryPay: 1 }
    )
    .then((spare) => {
      spare.map((item) => {
        obj.EmpTotalSalaryPay = item.TotalSalaryPay;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  await vehicleReport
    .find(
      {
        reportDate: {
          $gte: new Date(lastmonthe),
          $lte: new Date(today),
        },
      },
      { TotalProfit: 1 }
    )
    .then((spare) => {
      spare.map((item) => {
        obj.vehicalTotalProfit = item.TotalProfit;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  await res.status(200).json({ obj });
});
router.get("/:id", async (req, res) => {
  Bill.findById(req.params.id)
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Bill.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Bill.findByIdAndDelete(req.params.id)
    .then((Bills) => {
      res.status(200).json({ Bills });
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
