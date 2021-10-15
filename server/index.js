const express = require("express");
const app = express();
const PORT = process.env.PORT ||4000;
const { pool } = require("./database");
const bcrypt= require("bcrypt");
const session= require("express-session");
const flash=  require('express-flash');
const passport= require("passport")

const initializePassport= require("./passportconfig")

initializePassport(passport);

// Middleware
app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: 'secret',
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no vaue which we do not want to do
      saveUninitialized: false
    })
  );
  // Funtion inside passport which initializes passport
  app.use(passport.initialize());
  // Store our variables to be persisted across the whole session. Works with app.use(Session) above
  app.use(passport.session());
app.use(flash());

app.use(express.json()) //Permite interactuar con req.body
app.use(express.urlencoded({ extended:false}))
app.use('/public', express.static('public'));

app.use('/resources', express.static('resources'));
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
  
app.get("/users/login", checkAuthenticated, (req,res) =>{
    res.render("login");
});
app.get("/users/logout", (req, res) => {
    req.logout();
    res.render("home", { message: "You have logged out successfully" });
  });
app.get("/users/register", (req,res) =>{
    res.render("register");
});

app.get("/dashboard", checkNotAuthenticated, (req,res) =>{
    console.log(req.user)
    res.render("dashboard", {user: req.user.user_name});
});

app.post(
    "/users/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true    
    })
  );

app.post("/users/register", async(req ,res)=>{
    let{ user_name, user_lastname, user_email, user_password}=req.body;
   

    let errors=[]
    if(!user_name|| !user_lastname|| !user_email|| !user_password){
     errors.push({message: "Please enter all the fields"});   
    }
    if(user_password.length <6){
        errors.push({message: "Password is too short"})
    }
    if(errors.length>0){
        res.render('register', {errors})
    }else{ 
        let hashpassword= await bcrypt.hash(user_password, 10);
    
    
    pool.query(`SELECT * FROM users WHERE user_email = $1`, [user_email], (err, results)=> 
    {
        if(err){
            throw err
            
        }
    if(results.rows.length>0){
        errors.push({message: "Email already registered"});
        res.render('register', {errors});
    }
    else{
        pool.query(`INSERT INTO users (user_name, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4)
        RETURNING user_id, user_password`, [user_name, user_lastname, user_email, hashpassword], (err, results)=>{
            if(err){
                throw err
            }
            req.flash("success_msg", "You are now registered, please log in");
            res.redirect('/users/login');
        })
    }
}
    )}
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }
    next();
  }
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }
// Ruta prueba 
app.listen(PORT, () => {
    console.log('El servido ha iniciado en puerto '+ PORT);
});