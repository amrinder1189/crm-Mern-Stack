const { ResetPinSchema } = require("../PIN/resetPinSchema");

const insertPinEmail = (email) => {
  console.log(email);
  return new Promise((resolve, reject) => {
    const resetPin = Math.floor(100000 + Math.random() * 900000);
    const obj = {
      email,
      pin: resetPin,
    };
    ResetPinSchema(obj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

const getemailPin = (pin) => {
  const data = ResetPinSchema.findOne({ pin });

  return data;
};

const findanddeletePin = (email, pin) => {
  const data = ResetPinSchema.findOneAndDelete({ email, pin });
  return data;
};

module.exports = { insertPinEmail, getemailPin, findanddeletePin };
