const express = require("express");
const app = express();
const PORT = process.env.PORT ||4000
const cors = require ("cors");
const pool = require("./database");

// Middleware
app.use(cors());
app.use(express.json()) //Permite interactuar con req.body

//Routes
// Insert conatiner info
app.post("/container", async(req,res)=>{  //Revisas si usar async o no
    try{
        const {id,num,capacity,address} = req.body
        const newContainer = await pool.query("INSERT INTO container VALUES ($1,$2,$3,$4) RETURNING *",
        [id,num,capacity,address]
        );
        res.json(newContainer.rows[0]);
        // console.log(num)
    }catch (err){
        console.error(err.message);
    }})  

// Get all container
//SANTIAGO´S WORK
app.set('view engine', 'ejs')

app.get("/", (req,res) =>{
    res.render("home");
});
  
app.get("/users/login", (req,res) =>{
    res.render("login");
});

app.get("/users/dashboard", (req,res) =>{
    res.render("dashboard", {user: "Sadj"});
});
app.use('/public', express.static('public'));

app.use('/resources', express.static('resources'));


// get specific container
app.get("/container/:id",async(req,res)=>{
    try {
        const{id} = req.params;
        const container = await pool.query("SELECT * FROM container WHERE id_container = $1",
        [id])
        res.json(container.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

//update container
app.put("/container/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {capacity} = req.body;
        // console.log(capacity)
        const update_container = await pool.query("UPDATE container SET capacity = $1 WHERE id_container=$2",
        [capacity,id]);
        res.json("Container was updated!")
    } catch (err) {
        console.error(err.message)
    }
})

// delete container
app.delete("/container/:id", async(req,res)=>{
    try {
        const{id} = req.params;
        const deleteContainer = await pool.query("DELETE FROM container WHERE id_container=$1",[id]);
        res.json("Container was deleted")
    } catch (err) {
        console.error(err.message)  
    }
})

// Register and login routes
app.use("/auth",require("./routes/jwtAuth"));


// Ruta prueba 
app.use("/prueba",require("./routes/prueba"))
app.listen(PORT, () => {
    console.log('El servido ha iniciado en puerto '+ PORT);
});