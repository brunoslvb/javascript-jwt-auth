const bcrypt = require('bcrypt');

module.exports = {

    senha(value){
        let regex;

        regex = new RegExp("!@#$%&*()");
        if(regex.test(value)){
            console.log('Especiais')
        }
    },

    getDate(){
        let date = new Date();
        
        let dateFormated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        return dateFormated;
    },

    async encryptPassword(password){
        let encryptedPassword = await bcrypt.hashSync(password, 8);
        return encryptedPassword;   
    },

    async comparePassword(plainText, hash){
        let result = await bcrypt.compareSync(plainText, hash);
        return result;
    }

}