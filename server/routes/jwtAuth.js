const router = require("express").Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utiles/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Registro
router.post("/register", validInfo, async(req,res)=>{
    try {
        const {name,lastname,email,password} = req.body;
        
        const user = await pool.query("SELECT * FROM users WHERE user_email =$1",
        [email]);
        
        // Comprobar que el usuario no exista
        if (user.rows.length !== 0){
            return res.status(401).send("El usuario ya existe");
        }

        //Encriptar contraseña
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);

        // Insertar usuario en la BD
        const newUser = await pool.query("INSERT INTO users (user_name,user_lastname, user_email, user_password) VALUES ($1,$2,$3,$4) RETURNING *",
        [name, lastname,email,bcryptPassword]
        );

        // Generación del token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }   
})

//Login Route
router.post("/login", validInfo, async(req,res)=>{
    try {
        // Extraer req.body
        const {email,password} = req.body

        // Comprobar si el usuario existe
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
        [email]);
        if (user.rows.length === 0){
            return res.status(401).json("El usuario no existe")
        }
        // Comprobar que la contraseña sea correcta
        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);

        if (!validPassword){
            return res.status(401).json("Email o contraseña incorrectos")
        }
        // Asignar token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

router.get("/is-verify", authorization, async (req,res)=>{
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;