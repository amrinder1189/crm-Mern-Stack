const userschema = require("./userschema");
const { UserSchema } = require("./userschema");

const insertUser = (userobj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userobj)
      .save()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) {console.log('khali ha bhai'); return false;}
   try{   
   console.log('start 1')
    resolve(UserSchema.findOne({ email }));
}catch(error){reject(error)}


})}

const updatepassReset = (email, pass) => {
  return new Promise((resolve, reject) => {
    try {
      const data = UserSchema.findOneAndUpdate(
        { email: email },
        {
          $set: { password: pass },
        },
        { new: true }
      );

      resolve(data);
      // console.log("data is ", data);
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

const tokenadd = (email, token) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log(typeof email, typeof token, "hhh");

      UserSchema.findOneAndUpdate(
        { email },
        {
          $set: { refreshtoken: token },
        },
        { new: true }
      ).then((data) => resolve(data));

      console.log("updated token");
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  insertUser,
  getUserByEmail,
  tokenadd,
  updatepassReset,
};
