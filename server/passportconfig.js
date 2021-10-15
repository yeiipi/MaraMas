const LocalStrategy= require("passport-local").Strategy;
const { pool }= require("./database");
const bcrypt= require("bcrypt");


function initialize(passport){

    const authenticateUser= (user_email, user_password, done)=>{

        pool.query(`SELECT * FROM users WHERE user_email= $1`, [user_email], (err, results)=>{
            if (err){
                throw err
            }
            console.log(results.rows);
            if(results.rows.length>0){
                const user= results.rows[0];
                bcrypt.compare(user_password, user.user_password, (err, isMatch)=>{
                    if(err){
                        throw err
                    }
                    if(isMatch){
                        return done(null, user);
                    }
                    else{
                        return done(null, false, {message: 'PASSWORD INCORRECT'})
                    }

                })
            }else{
                return done(null, false, {message: 'Email wrong'})
            }
        })

    }
    passport.use(
        new LocalStrategy({
        usernameField: 'user_email',
        passwordField: 'user_password'
    }, 
    authenticateUser
    )
    );
passport.serializeUser((user, done)=>done(null, user.user_id))  
passport.deserializeUser((user_id, done)=>{

    pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id], (err, results)=>{

        if(err){
            throw err
        }
        return done(null, results.rows[0])
    })
})
}

module.exports= initialize;