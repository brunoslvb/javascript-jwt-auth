const jwt = require('jsonwebtoken');

module.exports = {

    async auth(req, res, next){

        const authorization = req.headers.authorization;

        if(!authorization){
            return res.status(401).json({ message: "Requisição não autorizada" });
        }

        const parts = authorization.split(" ");

        console.log(parts, parts.length);

        if(!parts.length === 2){
            return res.status(401).json({ message: "Token inválido" });
        }

        const [ type, token ] = parts;

        if(!type.startsWith("Bearer")){
            return res.status(401).json({ message: "Token não preenche os requisitos" });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

            if(err){
                return res.status(401).json({ message: "Token inválido" });
            }

            req.userId = decoded.id;

            console.log(decoded.id);

            return next();

        });

    }

}