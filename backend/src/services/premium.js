const Premium = require("../models/Premium");
const User = require("../models/User");
const moment = require("moment-timezone");
const premiumService = {
  addPremium: async (req, res) => {
    try {
      const { userId, money, packageType } = req.body;
      const currentDate = moment.tz("Asia/Ho_Chi_Minh");
      switch (packageType) {
        case 1:
          expiryDate = new Date(currentDate.clone().add(1, "month"));
          break;
        case 3:
          expiryDate = new Date(currentDate.clone().add(3, "month"));
          break;
        case 12:
          expiryDate = new Date(currentDate.clone().add(1, "year"));
          break;
        default:
          break;
      }

      const premiumPackage = new Premium({
        userId,
        money,
        package: packageType,
        expiryDate,
      });
      const savedpremiumPackage = await premiumPackage.save();
await User.findByIdAndUpdate(userId,{premium:true});
      return res.status(200).json(savedpremiumPackage);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllPremium:async(req,res)=>{
    try {
      const packagePremium = await Premium.find();
      res.status(200).json(packagePremium);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  ,
  updatePremium: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // createPaymentUrl: async (req, res, next) => {
  //   var ipAddr =
  //     req.headers["x-forwarded-for"] ||
  //     req.connection.remoteAddress ||
  //     req.socket.remoteAddress ||
  //     req.connection.socket.remoteAddress;

  //   var config = require("config");
  //   var dateFormat = require("dateformat");

  //   var tmnCode = config.get("CCULYM5I");
  //   var secretKey = config.get("NXRBGDEFSBILMAGVHOXWHCIPZQGLFGTY");
  //   var vnpUrl = config.get(
  //     "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
  //   );
  //   var returnUrl = config.get("http://localhost:5173/");

  //   var date = new Date();

  //   var createDate = dateFormat(date, "yyyymmddHHmmss");
  //   var orderId = dateFormat(date, "HHmmss");
  //   var amount = req.body.amount;
  //   var bankCode = req.body.bankCode;

  //   var orderInfo = req.body.orderDescription;
  //   var orderType = req.body.orderType;
  //   var locale = req.body.language;
  //   if (locale === null || locale === "") {
  //     locale = "vn";
  //   }
  //   var currCode = "VND";
  //   var vnp_Params = {};
  //   vnp_Params["vnp_Version"] = "2.1.0";
  //   vnp_Params["vnp_Command"] = "pay";
  //   vnp_Params["vnp_TmnCode"] = tmnCode;
  //   vnp_Params['vnp_Merchant'] = ''
  //   vnp_Params["vnp_Locale"] = locale;
  //   vnp_Params["vnp_CurrCode"] = currCode;
  //   vnp_Params["vnp_TxnRef"] = orderId;
  //   vnp_Params["vnp_OrderInfo"] = orderInfo;
  //   vnp_Params["vnp_OrderType"] = orderType;
  //   vnp_Params["vnp_Amount"] = amount * 100;
  //   vnp_Params["vnp_ReturnUrl"] = returnUrl;
  //   vnp_Params["vnp_IpAddr"] = ipAddr;
  //   vnp_Params["vnp_CreateDate"] = createDate;
  //   if (bankCode !== null && bankCode !== "") {
  //     vnp_Params["vnp_BankCode"] = bankCode;
  //   }

  //   vnp_Params = sortObject(vnp_Params);

  //   var querystring = require("qs");
  //   var signData = querystring.stringify(vnp_Params, { encode: false });
  //   var crypto = require("crypto");
  //   var hmac = crypto.createHmac("sha512", secretKey);
  //   var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  //   vnp_Params["vnp_SecureHash"] = signed;
  //   vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  //   res.redirect(vnpUrl);
  // },
  // vnpayIpn: async (req, res, next) => {
  //   var vnp_Params = req.query;
  //   var secureHash = vnp_Params["vnp_SecureHash"];

  //   delete vnp_Params["vnp_SecureHash"];
  //   delete vnp_Params["vnp_SecureHashType"];

  //   vnp_Params = sortObject(vnp_Params);
  //   var config = require("config");
  //   var secretKey = config.get("vnp_HashSecret");
  //   var querystring = require("qs");
  //   var signData = querystring.stringify(vnp_Params, { encode: false });
  //   var crypto = require("crypto");
  //   var hmac = crypto.createHmac("sha512", secretKey);
  //   var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  //   if (secureHash === signed) {
  //     var orderId = vnp_Params["vnp_TxnRef"];
  //     var rspCode = vnp_Params["vnp_ResponseCode"];
  //     res.status(200).json({ RspCode: "00", Message: "success" });
  //   } else {
  //     res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  //   }
  // },
  // vnpayReturn:async(req,res,next)=>{
  //   var vnp_Params = req.query;

  //   var secureHash = vnp_Params['vnp_SecureHash'];

  //   delete vnp_Params['vnp_SecureHash'];
  //   delete vnp_Params['vnp_SecureHashType'];

  //   vnp_Params = sortObject(vnp_Params);

  //   var config = require('config');
  //   var tmnCode = config.get('vnp_TmnCode');
  //   var secretKey = config.get('vnp_HashSecret');

  //   var querystring = require('qs');
  //   var signData = querystring.stringify(vnp_Params, { encode: false });
  //   var crypto = require("crypto");
  //   var hmac = crypto.createHmac("sha512", secretKey);
  //   var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

  //   if(secureHash === signed){

  //       res.render('success', {code: vnp_Params['vnp_ResponseCode']})
  //   } else{
  //       res.render('success', {code: '97'})
  //   }
  // }
};

module.exports = premiumService;
