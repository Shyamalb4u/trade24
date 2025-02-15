const express = require("express");
const sql = require("mssql");
const dbconfig = require("../dbconfig");

sql.connect(dbconfig, (err) => {
  if (err) {
    throw err;
  }
});

exports.signup = async (req, res, next) => {
  const mail = req.body.mail;
  const fname = req.body.fname;
  const spn = req.body.spn;
  const ips = req.body.ipa;
  try {
    const result = await new sql.Request()
      .input("intro_id", spn)
      .input("app_name", fname)
      .input("Email", mail)
      .input("ip", ips)
      .execute("registration");
    //console.log(result.recordset);
    //console.log(result.recordset[0].uid);
    if (result.recordset[0].uid === "MAIL") {
      res.status(404).json({ data: result.recordset[0].uid });
    } else if (result.recordset[0].uid === "INTRO") {
      res.status(404).json({ data: "Sponsor Not Exists" });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  } catch (err) {
    throw err;
  }
};
exports.getUser = (req, res, next) => {
  const uid = req.params.id;
  console.log(uid);
  new sql.Request()
    .input("id", uid)
    .execute("getUserProfile")
    .then((result) => {
      //console.log(result.recordset[0]);
      //res.status(200).json({ data: result.recordset });
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getMail = (req, res, next) => {
  const uid = req.params.mail;
  console.log(uid);
  new sql.Request()
    .input("mail", uid)
    .execute("getMail")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getall = (req, res, next) => {
  new sql.Request()
    .execute("getAll")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getDirect = (req, res, next) => {
  const uid = req.params.uid;
  console.log(uid);
  new sql.Request()
    .input("uid", uid)
    .execute("getDirect")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
      // if (result.recordset[0]) {
      //   res.status(200).json({ data: result.recordset });
      // } else {
      //   res.status(404).json({ data: "No Data" });
      // }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getDirectSummery = (req, res, next) => {
  const uid = req.params.uid;
  console.log(uid);
  new sql.Request()
    .input("uid", uid)
    .execute("getDirectSummery")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.bankUpdate = async (req, res, next) => {
  const mail = req.body.mail;
  const fname = req.body.fname;
  const accNo = req.body.accNo;
  const bank = req.body.bank;
  const branch = req.body.branch;
  const ifsc = req.body.ifsc;
  try {
    const result = await new sql.Request()
      .input("mail", mail)
      .input("acName", fname)
      .input("acNo", accNo)
      .input("bank", bank)
      .input("branch", branch)
      .input("ifsc", ifsc)
      .execute("setBank");
    res.status(200).json({ data: "Updated" });
  } catch (err) {
    throw err;
  }
};
exports.fundRequest = async (req, res, next) => {
  const mail = req.body.mail;
  const txn = req.body.txn;
  const amt = req.body.amount;
  try {
    const result = await new sql.Request()
      .input("mail", mail)
      .input("txn", txn)
      .input("amount", amt)
      .execute("SP_add_fund");
    res.status(200).json({ data: "Updated" });
  } catch (err) {
    throw err;
  }
};
exports.topup = async (req, res, next) => {
  const mail = req.body.mail;
  const amt = req.body.amt;
  const dur = req.body.dur;
  try {
    const result = await new sql.Request()
      .input("mail", mail)
      .input("amt", amt)
      .input("dur", dur)
      .execute("SP_Activation");
    res.status(200).json({ data: "Updated" });
  } catch (err) {
    throw err;
  }
};
exports.getBank = (req, res, next) => {
  const uid = req.params.mail;
  console.log(uid);
  new sql.Request()
    .input("mail", uid)
    .execute("getBank")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getFundRequest = (req, res, next) => {
  const uid = req.params.mail;
  console.log(uid);
  new sql.Request()
    .input("mail", uid)
    .input("type", "user")
    .execute("getFund_request")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getFundBalance = (req, res, next) => {
  const uid = req.params.mail;
  console.log(uid);
  new sql.Request()
    .input("mail", uid)
    .execute("getFundBalance")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getMyPackages = (req, res, next) => {
  const uid = req.params.mail;
  new sql.Request()
    .input("mail", uid)
    .execute("get_myPackage")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getExpDate = (req, res, next) => {
  const uid = req.params.mail;
  new sql.Request()
    .input("mail", uid)
    .execute("getExpDate_status")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
