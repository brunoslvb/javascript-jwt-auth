const jwt = require('jsonwebtoken');

const repository = require('../repositories/customeRepository');

const utils = require('../utils/functions');

module.exports = {

    async get(req, res, next) {

        try{
            const customers = await repository.get();
            return res.json(customers);
        } catch(err){
            return res.status(500).json({ message: "ERRO", data: err })
        }

    },


    async post (req, res, next) {

        let data = {
            email: req.body.email,
            password: await utils.encryptPassword(req.body.password),
            created_at: utils.getDate(),
            updated_at: utils.getDate()
        };

        try{
            let customerData = await repository.getWhere('email', req.body.email);

            if(customerData){
               return res.status(400).json({ message: "E-mail já cadastrado" });
            }

            await repository.post(data);
            return res.status(200).json({ message: "Cliente cadastrado com sucesso." });
        } catch(err) {
            return res.status(500).json({ message: "ERRO", data: err });
        }
    },

    async put(req, res, next){
        const { id } = req.params;

        let data = {
            email: req.body.email,
            updated_at: utils.getDate()
        };

        try{

            let customerData = await repository.getWhere('email', req.body.email);

            if(customerData){
               return res.status(400).json({ message: "E-mail já cadastrado" });
            }

            await repository.put(id, data);
            return res.status(200).json({ message: "Cliente atualizado com sucesso." });
        } catch(err) {
            return res.status(500).json({ message: "ERRO", data: err });
        }
    },

    async changePassword(req, res, next){
        const { id } = req.params;
        const { currentPassword, newPassword, newPassword2 } = req.body;

        let customerData;

        if(currentPassword === newPassword){
            return res.status(400).json({ message: "A nova senha deve ser diferente da anterior" });
        }

        try{
            customerData = await repository.getById(id);
            
            if(!customerData){
                return res.status(404).json({ message: "Cliente não encontrado" });
            }
            // console.log(customerData);
        } catch(err) {
            return res.status(500).json({ message: "ERRO - getById", data: err });
        }
        
        if(newPassword !== newPassword2){
            return res.status(400).json({ message: "Novas senhas inválidas" });
        }

        if(!await utils.checkPassword(currentPassword, customerData.password)){
            return res.status(400).json({ message: "Senha inválida" });
        }

        let data = {
            password: await utils.encryptPassword(newPassword),
            updated_at: utils.getDate()
        };

        try{
            await repository.changePassword(id, data);
            return res.status(200).json({ message: "Senha atualizada com sucesso" });
        } catch(err) {
            return res.status(500).json({ message: "ERRO - UpdatePassword", data: err });
        }

    },

    async login(req, res, next){
        const { email, password } = req.body;

        try{

            let customerData = await repository.getWhere('email', email);

            if(!customerData){
                return res.status(404).json({ message: "Cliente não encontrado" });
            }

            const id = customerData.id;

            if(!await utils.comparePassword(password, customerData.password)){
                return res.status(400).json({ message: "Senha inválida" });
            }

            let token = jwt.sign({ id }, process.env.SECRET_KEY, {
                expiresIn: 300 // expires in 5min
            });

            return res.status(200).json({ message: "CLiente logado", user: customerData, token: token });

        } catch(err) {
            return res.status(500).json({ message: "ERRO - Login", data: err });
        }
    }

}