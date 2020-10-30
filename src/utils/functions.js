const bcrypt = require('bcrypt');

module.exports = {

  getDate () {

    const date = new Date();

    const dateFormated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return dateFormated;

  },

  async encryptPassword (password) {

    const encryptedPassword = await bcrypt.hashSync(password, 8);
    return encryptedPassword;

  },

  async comparePassword (plainText, hash) {

    const result = await bcrypt.compareSync(plainText, hash);
    return result;

  }

};
