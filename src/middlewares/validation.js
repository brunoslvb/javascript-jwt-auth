const validator = require('validator');

let errors = { errors: {} };

function checkPassword(password){

    if(password === undefined){
        return;
    }

    let array = [];

    if(!password.length >= 7){
        array.push("A senha deve conter no mínimo 7 caracteres");
    }

    if(!password.match(/([@#$%&*()!])/)){
        array.push("A senha deve conter caracteres especiais: @, #, $, %, &, *, (, ), !");
    }

    if(!password.match(/([0-9])/)){
        array.push("A senha deve conter pelo menos um número");
    }

    if(array.length > 0){
        errors.errors.password = array;
    }
    
}

async function validation(req, res, next){

    errors = { errors: {} };

    let aux = {};

    if(!validator.isEmail(req.body.email)){
        aux.email = "O email deve ser preenchido corretamente";
    }
    
    if(Object.keys(aux).length > 0){
        errors.errors = aux;
    }

    checkPassword(req.body.password);

    if(Object.keys(errors.errors).length > 0){
        return res.status(400).json(errors);
    }

    return next();

}

module.exports = validation;

