const bcrypt = require('bcrypt');
const salt = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const hashPassword = (pass) => {
   return new Promise((resolve) => {
    // console.log(pass)
    resolve(bcrypt.hashSync(pass, salt))
   })
    }



module.exports= {
    hashPassword,
    
}