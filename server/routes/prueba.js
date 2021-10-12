const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req,res)=>{
    try {
        const user = await pool.query("SELECT user_name, user_lastname FROM users WHERE user_id = $1",
        [req.user]);
        res.json(user.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Error del servidor");
    }
})

module.exports = router;