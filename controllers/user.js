const express = require("express");
const sql = require("mssql");
const dbconfig = require("../dbconfig");
const axios = require("axios");

sql.connect(dbconfig, (err) => {
  if (err) {
    throw err;
  }
});

const POLYGONSCAN_API_KEY = "NZXCNXHZAYKPJXVVGCA1U5RAK92NJCJKN9";
const CONTRACT_ADDRESS = "0xB9dF5FDa1c435cD4017a1F1F9111996520b64439";
const BURN_ADDRESS = "0x000000000000000000000000000000000000dead"; // Example burn address
const LOCKED_WALLETS = [
  "0x1aAa6B88225A4Bd37Fd2257567b8e128384d5011",
  "0x3954984395002107C5f6aa1115c7EBA9AB4F78b0",
  "0x4cc463F677329fa4481CA496BAD2aa398afB75dC",
  "0x580ecA07c3Ad6eD6c35C071F44Df46cCaFEb5094",
  "0xEDDf191e5581C7aFd9B634B48C1c4a2cAbAeF8D4",
]; // Add locked wallets

// Function to get token supply
async function getTotalSupply() {
  const url =
    "https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=" +
    CONTRACT_ADDRESS +
    "&apikey=" +
    POLYGONSCAN_API_KEY;
  const response = await axios.get(url);
  return response.data.result; // Returns total supply
}

// Function to get wallet balances
async function getWalletBalance(wallet) {
  const url =
    "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=" +
    CONTRACT_ADDRESS +
    "&address=" +
    wallet +
    "&tag=latest&apikey=" +
    POLYGONSCAN_API_KEY;
  const response = await axios.get(url);
  return response.data.result;
}

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

exports.getCirculatingSupply = async (req, res, next) => {
  try {
    const totalSupply = await getTotalSupply();
    const burnedTokens = await getWalletBalance(BURN_ADDRESS);
    const lockedTokens = await getWalletBalance(
      "0x1aAa6B88225A4Bd37Fd2257567b8e128384d5011"
    );

    // let lockedTokens = 0;
    // for (let wallet of LOCKED_WALLETS) {
    //   let balance = await getWalletBalance(wallet);
    //   lockedTokens += parseInt(balance);
    // }
    //const circulatingSupply = totalSupply - burnedTokens - lockedTokens;
    const circulatingSupply = totalSupply - burnedTokens - lockedTokens;

    res.json({ circulating_supply: circulatingSupply });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};
