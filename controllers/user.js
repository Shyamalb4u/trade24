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
      res.status(404).json({ data: result.recordset[0].uid });
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
