const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
const asynHandler = require("../../../middleware/async");
const page = "Home";
exports.RenderMain = asynHandler(async (req, res) => {
  res.render("apps/tbills/home/", {
    pageData: page,
    pageIndex: "Home",
    home: true,
    user: req.session,
  });
});
exports.Project = asynHandler(async (req, res) => {
  res.render("apps/tbills/home/", {
    pageData: page,
    layout: "track.hbs",
    pageIndex: "Home",
    home: true,
    user: req.session,
  });
});

exports.UploadPage = asynHandler(async (req, res) => {
  let did = req.body.did;
  // if (did) {
  //   // try {
  //   //   let { data } = await axios.post(
  //   //     "http://192.168.0.90:6111/api/v1/customers",
  //   //     { did }
  //   //   );
  //   //   if (data && data.Status == 1) {
  //   //   res.render("apps/tbills/customer", { result: data.Data });
  //   //   }else{
  //   //     req.flash("error_msg", "Invalid Customer");
  //   //     return res.redirect("back");
  //   //   }
  //   // } catch (error) {
  //   //   req.flash("error_msg", "Invalid Customer");
  //   // return res.redirect("back");
  //   // }
  // } else {
  //   res.render("apps/tbills/customer/", {
  //     pageData: page,
  //     pageIndex: "Home",
  //     home: true,
  //   });
  // }
  res.render("apps/tbills/customer/", {
    pageData: page,
    pageIndex: "Home",
    home: true,
    user: req.session,
  });
});

exports.UploadData = asynHandler(async (req, res) => {
  let did = req.body.did;
  // Set The Storage Engine
  const storage = multer.diskStorage({
    destination: "./public/upload",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  // Init Upload
  const upload = multer({
    storage: storage,
  }).single("uploaded_file");

  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send("Error: No File Selected!");
      } else {
        const wb = xlsx.readFile(req.file.path, { cellDates: true });
        var ws = wb.Sheets["Sheet1"];
        let convert = xlsx.utils.sheet_to_json(ws);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
    async function getData() {
    console.log("Converted,Pushing to kofi-->")
    
      let { data } = await axios.post(
        `https://apihive.calbankgh.com/api/Collection/MigrateGhanaCard`,
        {
          servicerequest: {
            ServiceID: "1016",
            apiKey: "73C4D645-E5D4-4955-8D83-16872E5501D7",
            apiToken: "2D4110B7-81D7-41CC-9CDC-C044D5C5305A",
          },

          RequestData: convert,
        },
        config
      );
      
      console.log(data);
      if (data) {
       
        res.render("apps/tbills/customer/", {
          pageData: page,
          pageIndex: "Home",
          home: true,
          user: req.session,
          Data: data.responses
        });
      
      } else {
        res.status(500).json({
          Status: 0,
          Message: data,
        });
      }
    }

    getData()
      }
    }
  });
});

exports.GetTbillsCustomers = asynHandler(async (req, res) => {
  let did = req.body.did;
  let username = req.session.user;
  try {
    let { data } = await axios.post(
      "http://192.168.0.90:6111/api/v1/customers",
      { did, username }
    );
    if (data && data.Status == 1) {
      res.render("apps/tbills/customer", {
        result: data.Data,
        user: req.session,
      });
    } else {
      req.flash("error_msg", "Invalid Customer");
      return res.redirect("/apps/tbills/customer");
    }
  } catch (error) {
    req.flash("error_msg", "Invalid Customer");
  }
});

exports.GetTbillsAdvices = asynHandler(async (req, res) => {
  let did = req.params.id;
  let username = req.session.user;
  let csd = req.params.id;

  try {
    let { data } = await axios.post("http://192.168.0.90:6111/api/v1/bog", {
      did,
      username,
    });
    res.render("apps/tbills/customer/advices", {
      result: data,
      csd,
      user: req.session,
    });
  } catch (error) {
    req.flash("error_msg", "Invalid Customer");
    return res.redirect("/apps/tbills/customer");
  }
});
exports.GetTbillsInvoice = asynHandler(async (req, res) => {
  // console.log(JSON.stringify(req.body.custId));
  let bigArray = [];
  let did = req.body.custId;
  let username = req.session.user;
  let csd = req.body.csd;
  let nohead = did.replace("SHORT NAME,", "");
  // let stringedData = JSON.stringify([req.body.custId]);

  if (did === "") {
    req.flash("error_msg", "Please Select an advice Before Proceeding...");
    return res.redirect("back");
  }
  // let unique = Object.values(
  //   JSON.parse(did).reduce(
  //     (acc, cur) => Object.assign(acc, { [cur.tender]: cur }),
  //     {}
  //   )
  // );

  const usingSplit = did.split(",");
  try {
    let { data } = await axios.post("http://192.168.0.90:6111/api/v1/invoice", {
      usingSplit,
      username,
      csd,
    });

    res.render("apps/tbills/customer/invoice", {
      layout: "invoice.hbs",
      result: data,
      user: req.session,
    });
  } catch (error) {
    res.send(error.response.data);
  }
});

exports.RenderElevy = asynHandler(async (req, res) => {

  var dateNow= new Date();  
  var firstDate = new Date().toISOString().slice(0, 10)
  var lastDate = new Date().toISOString().slice(0, 10)

  //new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toJSON().slice(0,10);   //begining of the month
  // var lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).toJSON().slice(0,10);   ///LAST Date of the month


  let StartDate = req.body.StartDate || firstDate;
  console.log(firstDate,lastDate);
  let EndDate = req.body.EndDate || lastDate;

  try {
    let { data } = await axios.post("https://elevyapi.calbankgh.com/ELevyAPI/Report/GetConfirmations", {
      StartDate,
      EndDate,
    });

   
    const TransferAmount = data.Data
  .map(item => item.TransferAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TransferAmount);

  const TaxableAmount = data.Data
  .map(item => item.TaxableAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TaxableAmount);

  const ElevyAmount = data.Data
  .map(item => item.ElevyAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(ElevyAmount);
   
    
    res.render("apps/elevy/home/", {
      pageData: page,
      pageIndex: "Elevy",
      count:data.Data.length,
      firstDate :StartDate,
      lastDate :EndDate,
      home: true,
      user: req.session,
      data: data.Data,
      TransferAmount,
      TaxableAmount,
      layout: "elevy.hbs",
      ElevyAmount
    });
  } catch (error) {
    req.flash("error_msg", "Invalid Data");
    return res.redirect("elevy");
  }

  const calculateSum = (obj, field) => obj
  .map(items => items.attributes[field])
  .reduce((prev, curr) => prev + curr, 0);
});

exports.ProcessElevy = asynHandler(async (req, res) => {
  try {
    let { data } = await axios.post("https://elevyapi.calbankgh.com/ELevyAPI/Report/GetConfirmations", req.body);

   
    const TransferAmount = data.Data
  .map(item => item.TransferAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TransferAmount);

  const TaxableAmount = data.Data
  .map(item => item.TaxableAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TaxableAmount);

  const ElevyAmount = data.Data
  .map(item => item.ElevyAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(ElevyAmount);
   
    
    res.render("apps/elevy/home/", {
      pageData: page,
      pageIndex: "Elevy",
      count:data.Data.length,
      firstDate,
      lastDate,
      home: true,
      user: req.session,
      data: data.Data,
      TransferAmount,
      TaxableAmount,
      layout: "elevy.hbs",
      ElevyAmount
    });
  } catch (error) {
    req.flash("error_msg", "Invalid Data");
    return res.redirect("elevy");
  }

})