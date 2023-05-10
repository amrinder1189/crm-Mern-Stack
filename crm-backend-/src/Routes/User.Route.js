const express = require("express");
var jwt = require("jsonwebtoken");
const router = express.Router();
const {
  insertUser,
  getUserByEmail,
  updatepassReset,
  tokenadd,
} = require("../Model/User/usermodel");
const { hashPassword, comparePass } = require("../utilies/Passwordhash");
const bcrypt = require("bcrypt");
const {createjwt} = require("../utilies/jwt.helper");
const {
  insertPinEmail,
  getemailPin,
  findanddeletePin,
} = require("../Model/PIN/Pin.model");
const { emailProcess } = require("../utilies/MailSend");

router.all("/", (req, res, next) => { 
  // res.json({message:"Amrinder from router folder"})
  next();
});
/*******************************
 * //    FOR CREATING THE USER *
 *******************************/
router.post("/", async (req, res) => {
  const { name, company, email, address, phone, password } = req.body;

  try {
    const pass = await hashPassword(password);
    const newobj = { name, company, email, address, phone, password: pass };
    const result = await insertUser(newobj);
    console.log(result);
    res.json({data: result });
  } catch (error) {
    res.json({ message: "error", err: error });
  }
});



// for getting the user 

router.get("/getuser", async (req, res) => {
  console.log(req.headers,"i am header")
  const { authorization } = req.headers;
  var decoded = jwt.verify(authorization, process.env.JWT_ACCESS_SECRET);
  // const user_id = decoded.payload._id;

  //get all tickets for this user
  // console.log(decoded)
  const {_id,name,email} = decoded
  res.json({ data: decoded});
  console.log( {_id,name,email} )
});


/**************************************************************
 * //   FOR LOGING THE USER IN EMAIL AND PASSWORD CHECKING... *
 **************************************************************/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Pls provide email and password" });
  }

  //checking user if exist
  const user = await getUserByEmail(email);
  //comparing the password
  const passValidation = await bcrypt.compare(password, user.password);

  if (passValidation) {
    try {
      console.log("working here");
      const token = await createjwt(user);
      const addtoken = await tokenadd(email, token);
      // console.log(user,"tokenis ---")
      // console.log("amrindr-", passValidation);
      // console.log("amri token-", addtoken);
      res.json({data:addtoken})
      console.log('done res sendded')
    } catch (error) {
      console.log(error, "this is error");
    }
  } else {
    console.log("Wrong password");
  }
});

/****************************************************************
 * ROUTER FOR THE PASSWORD RESETING INCLUDING THE EMAIL SENDING *
 ****************************************************************/

router.post("/password-reset", async (req, res) => {
  const { email } = req.body;
  console.log('start')
  //checking the user email
  try {
    const checkuser = await getUserByEmail(email);
    console.log(checkuser)
    if (checkuser._id) {
      const Resetpin = await insertPinEmail(email);
      const mailer = await emailProcess(email, Resetpin.pin);
      //   console.log(mailer);
      res.json({message:"success"})
    }
  } catch (error) {
    console.log(error);
    res.json({message:"fail"})
  }
});



router.patch("/password-reset", async (req, res) => {
  // get pin from the body
  const { email, pin, newpassword } = req.body;
  const checkpin = await getemailPin(pin);

  if (checkpin.pin === pin) {
    const pass = await hashPassword(newpassword);
    const updatePassUser = await updatepassReset(email, pass);
    console.log("updated" - updatePassUser);
    // delete the PIN in datavbase

    const deletePIN = await findanddeletePin(email, pin);
    if (deletePIN) {
      console.log("PIN deleted");
      res.json({ message: "pin deleted" });
    }
  }
});

module.exports = router;
