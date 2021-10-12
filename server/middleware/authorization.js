const jwt = require("jsonwebtoken")
require("dotenv").config()

// Este archivo se encarga de verificar que la persona tiene el permiso para entrar a la página

module.exports = async(req,res,next) =>{
    try {
        const jwtToken = req.header("token");
        if (!jwtToken){
            return res.status(403).json("No autorizado")
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        // En los enturamientos, req.user contendrá el id del usuario
        req.user = payload.user;
        next();

    } catch (err) {
        console.error(err.message)
        return res.status(403).json("No autorizado")
        
    }
}