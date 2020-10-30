const validator = require('validator');
const bcrypt    = require('bcrypt');

const repository = require('../repositories/customeRepository');

class Customer {

    errors = { errors: {} };

    constructor(data){
        this.data = data;
        this.customerDataValidate();
        this.returnDataCustomer();
    }

    async customerDataValidate(data){
        
        validator.isEmail(data.email) ? "" : this.errors.email = "Erro ao validar e-mail";

        return this.errors;
    }

    async encryptPassword(password){
        if(password === undefined){
            return;
        }
        let encryptedPassword = await bcrypt.hashSync(password, 8);
        return encryptedPassword;
        
    }

    async formatDate(){
        let date = new Date();
        
        let dateFormated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        this.data.updated_at = dateFormated;
    }

    getErrors(){
        return this.errors;
    }

    getData() {
        return this.data;
    }

}

module.exports = Customer;
