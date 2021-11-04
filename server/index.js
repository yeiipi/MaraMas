const express = require("express");
const app = express();
const PORT = process.env.PORT ||4000;
const { pool } = require("./database");
const bcrypt= require("bcrypt");
const session= require("express-session");
const flash=  require('express-flash');
const passport= require("passport")
const fs = require('fs');
const initializePassport= require("./passportconfig")

const { default: datoss } = require("./prueba");
const { allowedNodeEnvironmentFlags } = require("process");
const { render } = require("ejs");
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
app.get("/logout", (req, res) => {
    req.logout();
    res.render("home", { message: "You have logged out successfully" });
  });

app.get("/dashboard", checkNotAuthenticated, (req,res) =>{
    pool.query(
        `select
        count(extract(dow from purchase_date) = 1 or null) as monday,
        count(extract(dow from purchase_date) = 2 or null) as tuesday,
        count(extract(dow from purchase_date) = 3 or null) as wednesday,
        count(extract(dow from purchase_date) = 4 or null) as thursday,
        count(extract(dow from purchase_date) = 5 or null) as friday,
        count(extract(dow from purchase_date) = 6 or null) as Saturday,
        count(extract(dow from purchase_date) = 7 or null) as Sunday
        FROM package
    where purchase_date between date_trunc('week', current_date::date) and date_trunc('week', current_date ::date) + interval '6 days'
    `, (err, results)=>{
        if (err){
            throw err
        }
        const datoss={data1: [results.rows[0].monday, results.rows[0].tuesday, results.rows[0].wednesday, results.rows[0].thursday, results.rows[0].friday, results.rows[0].saturday, results.rows[0].sunday]   
        };
        pool.query(
            `select
            count(extract(month from purchase_date) = 1 or null) as January,
            count(extract(month from purchase_date) = 2 or null) as February,
            count(extract(month from purchase_date) = 3 or null) as March,
            count(extract(month from purchase_date) = 4 or null) as April,
            count(extract(month from purchase_date) = 5 or null) as May,
            count(extract(month from purchase_date) = 6 or null) as June,
            count(extract(month from purchase_date) = 7 or null) as July,
            count(extract(month from purchase_date) = 8 or null) as August,
            count(extract(month from purchase_date) = 9 or null) as September,
            count(extract(month from purchase_date) = 10 or null) as October,
            count(extract(month from purchase_date) = 11 or null) as November,
            count(extract(month from purchase_date) = 12 or null) as December
            
            
            FROM package
        where purchase_date between date_trunc('year', current_date::date) and date_trunc('year', current_date ::date) + interval '1 year'
        `, (err, results)=>{
            if (err){
                throw err
            }
            datoss.data2= [results.rows[0].january, results.rows[0].february, results.rows[0].march, results.rows[0].april, results.rows[0].may, results.rows[0].june, results.rows[0].july, results.rows[0].august, results.rows[0].september, results.rows[0].october, results.rows[0].november, results.rows[0].december]
            pool.query(`SELECT category, count(*) FROM package
            where purchase_date between date_trunc('week', current_date::date) and date_trunc('week', current_date ::date) + interval '6 days'    
            GROUP BY category
            ORDER BY category asc`, (err, results)=>{
                if (err){
                    throw err;
                }
                datoss.data3=[]
                for(let i=0; i<results.rows.length; i++){
                    if(results.rows[i].category=='Cloth'){
                        datoss.data3[0]=results.rows[i].count
                    }
                    else{
                        continue;
                    }
                }
                for(let i=0; i<results.rows.length; i++){
                    if(results.rows[i].category=='Electronic'){
                        datoss.data3[1]=results.rows[i].count
                    }
                    else{
                        continue;
                    }
                }
                for(let i=0; i<results.rows.length; i++){
                    if(results.rows[i].category=='Food'){
                        datoss.data3[2]=results.rows[i].count
                    }
                    else{
                        continue;
                    }
                }
                pool.query(`SELECT category, count(*) FROM package
                where purchase_date between date_trunc('month', current_date::date) and date_trunc('month', current_date ::date) + interval '1 month'    
                GROUP BY category
                ORDER BY category asc`, (err, results)=>{
                    if (err){
                        throw err;
                    }
                    datoss.data4=[]
                    for(let i=0; i<results.rows.length; i++){
                        if(results.rows[i].category=='Cloth'){
                            datoss.data4[0]=results.rows[i].count
                        }
                        else{
                            continue;
                        }
                    }
                    for(let i=0; i<results.rows.length; i++){
                        if(results.rows[i].category=='Electronic'){
                            datoss.data4[1]=results.rows[i].count
                        }
                        else{
                            continue;
                        }
                    }
                    for(let i=0; i<results.rows.length; i++){
                        if(results.rows[i].category=='Food'){
                            datoss.data4[2]=results.rows[i].count
                        }
                        else{
                            continue;
                        }
                    }
                    pool.query(`SELECT category, count(*) FROM package
                    where purchase_date between date_trunc('year', current_date::date) and date_trunc('year', current_date ::date) + interval '1 year'    
                    GROUP BY category
                    ORDER BY category asc`, (err, results)=>{
                        if (err){
                            throw err;
                        }
                        datoss.data5=[]
                        for(let i=0; i<results.rows.length; i++){
                            if(results.rows[i].category=='Cloth'){
                                datoss.data5[0]=results.rows[i].count
                            }
                            else{
                                continue;
                            }
                        }
                        for(let i=0; i<results.rows.length; i++){
                            if(results.rows[i].category=='Electronic'){
                                datoss.data5[1]=results.rows[i].count
                            }
                            else{
                                continue;
                            }
                        }
                        for(let i=0; i<results.rows.length; i++){
                            if(results.rows[i].category=='Food'){
                                datoss.data5[2]=results.rows[i].count
                            }
                            else{
                                continue;
                            }
                        }
                        pool.query(`select count(*)
                        FROM package
                        where (purchase_date between date_trunc('month', current_date::date) and date_trunc('month', current_date ::date) + interval '1 month') and
                        (delivery_date is not null)`, (err, results)=>{
                            if(err){
                                throw err;
                            }
                            let cant= results.rows[0].count
                            pool.query(`select count(*)
                            FROM package
                            where (purchase_date between date_trunc('month', current_date::date) and date_trunc('month', current_date ::date) + interval '1 month')
                            `, (err, results)=>{
                                if (err){
                                    throw err;
                                }
                                let tot=results.rows[0].count
                                
                                datoss.data0=cant //Top completed orders
                                datoss.data6=parseFloat(((cant/tot)*100).toFixed(1))
                                pool.query(`SELECT COUNT(*) FROM package 
                                WHERE (delivery_date is not null) and (delivery_date<=estimated_delivery) and (delivery_date between date_trunc('week', current_date::date) and date_trunc('week', current_date ::date) + interval '1 week')
                                `, (err, results)=>{
                                    if(err){
                                        throw err
                                    }
                                    //Paquetes entregados a tiempo en la semana
                                    datoss.data7=[]
                                    datoss.data7[0]=results.rows[0].count;
                                    pool.query(`SELECT COUNT(*) FROM package 
                                    WHERE (delivery_date is not null) and (delivery_date>estimated_delivery) and (delivery_date between date_trunc('week', current_date::date) and date_trunc('week', current_date ::date) + interval '1 week')
                                    `, (err, results)=>{
                                        if(err){
                                            throw err;
                                        }
                                        datoss.data7[1]=results.rows[0].count
                                        pool.query(`SELECT COUNT(*) FROM package 
                                        WHERE (delivery_date is not null) and (delivery_date<=estimated_delivery) and (delivery_date between date_trunc('month', current_date::date) and date_trunc('month', current_date ::date) + interval '1 month')
                                        `, (err, results)=>{
                                            if(err){
                                                throw err
                                            }
                                            datoss.data8=[]
                                            datoss.data8[0]=results.rows[0].count;
                                            pool.query(`SELECT COUNT(*) FROM package 
                                            WHERE (delivery_date is not null) and (delivery_date>estimated_delivery) and (delivery_date between date_trunc('month', current_date::date) and date_trunc('month', current_date ::date) + interval '1 month')
                                            `, (err, results)=>{
                                                if(err){
                                                    throw err
                                                }
                                                datoss.data8[1]=results.rows[0].count
                                                pool.query(`SELECT COUNT(*) FROM package 
                                                WHERE (delivery_date is not null) and (delivery_date<=estimated_delivery) and (delivery_date between date_trunc('year', current_date::date) and date_trunc('year', current_date ::date) + interval '1 year')
                                                `, (err, results)=>{
                                                    if(err){
                                                        throw err
                                                    }
                                                    datoss.data9=[]
                                                    datoss.data9[0]=results.rows[0].count
                                                    pool.query(`SELECT COUNT(*) FROM package 
                                                    WHERE (delivery_date is not null) and (delivery_date>estimated_delivery) and (delivery_date between date_trunc('year', current_date::date) and date_trunc('year', current_date ::date) + interval '1 year')
                                                    `, (err, results)=>{
                                                        if(err){
                                                            throw err
                                                        }
                                                        datoss.data9[1]=results.rows[0].count;
                                                        pool.query(`SELECT 
     
                                                        to_char(date_trunc('month', delivery_date), 'MM') AS month_number,
                                                        sum (price) AS monthly_sum
                                                 FROM package 
                                                 WHERE (delivery_date is not null) and (delivery_date between date_trunc('year', current_date::date) and date_trunc('year', current_date ::date) + interval '1 year'
                                                 )
                                                 GROUP BY date_trunc('month', delivery_date);
                                                 `, (err, results)=>{

                                                    if (err){
                                                        throw err;
                                                    }
                                                    datoss.data10=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                                    if(results.rows.length==0){
                                                        
                                                    }
                                                    else{
                                                        for(i=0; i<results.rows.length; ++i){
                                                            let idx=parseInt(results.rows[i].month_number);
                                                            datoss.data10[idx-1]=parseInt(results.rows[i].monthly_sum)
                                                        }
                                                    }
                                                    
                                                    console.log(datoss.data10)
                                                    pool.query(`SELECT COUNT(*) FROM PACKAGE WHERE (delivery_date is null) 
                                                    `, (err,results)=>{
                                                        if(err){
                                                            throw err
                                                        }
                                                        datoss.data11=results.rows[0].count //Current active orders in all our history
                                                        pool.query(`SELECT count(*) FROM delivery_person WHERE status=true
                                                        `, (err, results)=>{
                                                            if(err){
                                                                throw err
                                                            }
                                                            datoss.data12= results.rows[0].count //Current active drivers
                                                            pool.query(`SELECT count(*) FROM delivery_person
                                                            `, (err, results)=>{
                                                                if(err){
                                                                    throw err
                                                                }
                                                                datoss.data13= results.rows[0].count
                                                                var today = new Date();
                                                                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                                                res.render("dashboard", {
                                                                    user: req.user.user_name,
                                                                    data100: date,
                                                                    data0: datoss.data0,
                                                                    data1: datoss.data1,
                                                                    data2: datoss.data2,
                                                                    data3: datoss.data3,
                                                                    data4: datoss.data4,
                                                                    data5: datoss.data5,
                                                                    data6: datoss.data6,
                                                                    data7: datoss.data7,
                                                                    data8: datoss.data8,
                                                                    data9: datoss.data9,
                                                                    data10: datoss.data10,
                                                                    data11: datoss.data11,
                                                                    data12: datoss.data12,
                                                                    data13: datoss.data13

                                                            });
                                                            })
                                                        })
                                                        
                                                    })
                                                 })

                                                        
                                                    })
                                                })
                                                
        
                                            })

                                        })
                                        

                                    })
                                })
                                

                            })

                        })
                       
                    })
                })

            })
            
               
            // let dataaa= JSON.stringify(datoss);
            // fs.writeFileSync('./public/data/datos1.json', dataaa);
        }
        
        )
    }
    
    )

});

app.get("/register", checkNotAuthenticated,(req,res) =>{
    res.render("register");
});

app.get("/dispatcher", checkNotAuthenticated, (req, res)=>{
    res.render("dispatcher", {user: req.user.user_name})
})

app.get("/driver/vehicles", checkNotAuthenticated, (req, res)=>{
    const datossss= {}
            pool.query(`SELECT * FROM vehicle
            `,(err, results)=>{
                if(err){
                    throw err
                }
                 datossss.data2=[]
                 datossss.data3=[]
                 datossss.data4=[]
                 datossss.data5=[]
                 datossss.data6=[]
                 datossss.data7=[]
                
                for(p=0; p<results.rows.length; p++){
                    
                    datossss.data2.push(results.rows[p].license_plate)
                    datossss.data3.push(results.rows[p].tipo)
                    datossss.data4.push(results.rows[p].model)
                    datossss.data5.push(results.rows[p].mechanical_status)
                    datossss.data6.push(results.rows[p].brand)
                    datossss.data7.push(results.rows[p].capacity)
                }
                res.render("fleet", {
                    user: req.user.user_name,
                    data1: datossss.data1,
                    data2: datossss.data2,
                    data3: datossss.data3,
                    data4: datossss.data4,
                    data5: datossss.data5,
                    data6: datossss.data6,
                    data7: datossss.data7
                })
            })
        })

app.get("/driver", checkNotAuthenticated,(req,res)=>{

    pool.query(`SELECT COUNT(*) FROM vehicle WHERE mechanical_status= true
    `, (err, results)=>{
        if(err){
            throw err
        }
        //Total de vehiculos activos
        let act=results.rows[0].count
        pool.query(`SELECT count(*) FROM vehicle WHERE mechanical_status= false
        `, (err, results)=>{
            if(err){
                throw err
            }
            const datosss= {data1: [parseInt(act), parseInt(results.rows[0].count)]}
            pool.query(`SELECT * FROM vehicle
            `,(err, results)=>{
                if(err){
                    throw err
                }
                 datosss.data2=[]
                 datosss.data3=[]
                 datosss.data4=[]
                 datosss.data5=[]
                
                for(p=0; p<results.rows.length; p++){
                    
                    datosss.data2.push(results.rows[p].license_plate)
                    datosss.data3.push(results.rows[p].tipo)
                    datosss.data4.push(results.rows[p].model)
                    datosss.data5.push(results.rows[p].mechanical_status)
                }
                console.log(datosss.data3)
                res.render("driver", {
                    user: req.user.user_name,
                    data1: datosss.data1,
                    data2: datosss.data2,
                    data3: datosss.data3,
                    data4: datosss.data4,
                    data5: datosss.data5,
                })
            })
            
        })
    })
    
})


app.post("/dashboard", checkNotAuthenticated,(req, res)=>{
    let {reference_date}=req.body
    if(reference_date.length==0){
        res.redirect("/dashboard")
    }
    else{
    pool.query(
        `select
        count(extract(dow from purchase_date) = 1 or null) as monday,
        count(extract(dow from purchase_date) = 2 or null) as tuesday,
        count(extract(dow from purchase_date) = 3 or null) as wednesday,
        count(extract(dow from purchase_date) = 4 or null) as thursday,
        count(extract(dow from purchase_date) = 5 or null) as friday,
        count(extract(dow from purchase_date) = 6 or null) as Saturday,
        count(extract(dow from purchase_date) = 7 or null) as Sunday
        FROM package
    where purchase_date between date_trunc('week', $1::date) and date_trunc('week', $1 ::date) + interval '6 days'
    `,[reference_date], (err, results)=>{
        if (err){
            throw err
        }
        const datoss={data1: [results.rows[0].monday, results.rows[0].tuesday, results.rows[0].wednesday, results.rows[0].thursday, results.rows[0].friday, results.rows[0].saturday, results.rows[0].sunday]   
        };
        pool.query(
            `select
            count(extract(month from purchase_date) = 1 or null) as January,
            count(extract(month from purchase_date) = 2 or null) as February,
            count(extract(month from purchase_date) = 3 or null) as March,
            count(extract(month from purchase_date) = 4 or null) as April,
            count(extract(month from purchase_date) = 5 or null) as May,
            count(extract(month from purchase_date) = 6 or null) as June,
            count(extract(month from purchase_date) = 7 or null) as July,
            count(extract(month from purchase_date) = 8 or null) as August,
            count(extract(month from purchase_date) = 9 or null) as September,
            count(extract(month from purchase_date) = 10 or null) as October,
            count(extract(month from purchase_date) = 11 or null) as November,
            count(extract(month from purchase_date) = 12 or null) as December
            
            
            FROM package
        where purchase_date between date_trunc('year', $1::date) and date_trunc('year', $1 ::date) + interval '1 year'
        `, [reference_date], (err, results)=>{
            if (err){
                throw err
            }
            datoss.data2= [results.rows[0].january, results.rows[0].february, results.rows[0].march, results.rows[0].april, results.rows[0].may, results.rows[0].june, results.rows[0].july, results.rows[0].august, results.rows[0].september, results.rows[0].october, results.rows[0].november, results.rows[0].december]
            pool.query(`SELECT category, count(*) FROM package
            where purchase_date between date_trunc('week', $1::date) and date_trunc('week', $1 ::date) + interval '6 days'    
            GROUP BY category
            ORDER BY category asc`, [reference_date],(err, results)=>{
                if (err){
                    throw err;
                }
                datoss.data3=[]
                for(let i=0; i<results.rows.length; i++){
                    if(results.rows[i].category=='Cloth'){
                        datoss.data3[0]=results.rows[i].count
                    }
                    else{
                        continue;
                    }
                }
                for(let i=0; i<results.rows.length; i++){
                    if(results.rows[i].category=='Electronic'){
                        datoss.data3[1]=results.rows[i].count
                    }
                    else{
                        continue;
                    }
                }
                for(let i=0; i<results.rows.length; i++){
                    if(results.rows[i].category=='Food'){
                        datoss.data3[2]=results.rows[i].count
                    }
                    else{
                        continue;
                    }
                }
                pool.query(`SELECT category, count(*) FROM package
                where purchase_date between date_trunc('month', $1::date) and date_trunc('month', $1 ::date) + interval '1 month'    
                GROUP BY category
                ORDER BY category asc`,[reference_date], (err, results)=>{
                    if (err){
                        throw err;
                    }
                    datoss.data4=[]
                    for(let i=0; i<results.rows.length; i++){
                        if(results.rows[i].category=='Cloth'){
                            datoss.data4[0]=results.rows[i].count
                        }
                        else{
                            continue;
                        }
                    }
                    for(let i=0; i<results.rows.length; i++){
                        if(results.rows[i].category=='Electronic'){
                            datoss.data4[1]=results.rows[i].count
                        }
                        else{
                            continue;
                        }
                    }
                    for(let i=0; i<results.rows.length; i++){
                        if(results.rows[i].category=='Food'){
                            datoss.data4[2]=results.rows[i].count
                        }
                        else{
                            continue;
                        }
                    }
                    pool.query(`SELECT category, count(*) FROM package
                    where purchase_date between date_trunc('year', $1::date) and date_trunc('year', $1 ::date) + interval '1 year'    
                    GROUP BY category
                    ORDER BY category asc`, [reference_date],(err, results)=>{
                        if (err){
                            throw err;
                        }
                        datoss.data5=[]
                        for(let i=0; i<results.rows.length; i++){
                            if(results.rows[i].category=='Cloth'){
                                datoss.data5[0]=results.rows[i].count
                            }
                            else{
                                continue;
                            }
                        }
                        for(let i=0; i<results.rows.length; i++){
                            if(results.rows[i].category=='Electronic'){
                                datoss.data5[1]=results.rows[i].count
                            }
                            else{
                                continue;
                            }
                        }
                        for(let i=0; i<results.rows.length; i++){
                            if(results.rows[i].category=='Food'){
                                datoss.data5[2]=results.rows[i].count
                            }
                            else{
                                continue;
                            }
                        }
                        pool.query(`select count(*)
                        FROM package
                        where (purchase_date between date_trunc('month', $1::date) and date_trunc('month', $1 ::date) + interval '1 month') and
                        (delivery_date is not null)`,[reference_date], (err, results)=>{
                            if(err){
                                throw err;
                            }
                            let cant= results.rows[0].count
                            pool.query(`select count(*)
                            FROM package
                            where (purchase_date between date_trunc('month', $1::date) and date_trunc('month', $1 ::date) + interval '1 month')
                            `, [reference_date],(err, results)=>{
                                if (err){
                                    throw err;
                                }
                                let tot=results.rows[0].count
                                
                                datoss.data0=cant //Top completed orders
                                datoss.data6=parseFloat(((cant/tot)*100).toFixed(1))
                                pool.query(`SELECT COUNT(*) FROM package 
                                WHERE (delivery_date is not null) and (delivery_date<=estimated_delivery) and (delivery_date between date_trunc('week', $1::date) and date_trunc('week', $1 ::date) + interval '1 week')
                                `,[reference_date], (err, results)=>{
                                    if(err){
                                        throw err
                                    }
                                    //Paquetes entregados a tiempo en la semana
                                    datoss.data7=[]
                                    datoss.data7[0]=results.rows[0].count;
                                    pool.query(`SELECT COUNT(*) FROM package 
                                    WHERE (delivery_date is not null) and (delivery_date>estimated_delivery) and (delivery_date between date_trunc('week', $1::date) and date_trunc('week', $1 ::date) + interval '1 week')
                                    `, [reference_date],(err, results)=>{
                                        if(err){
                                            throw err;
                                        }
                                        datoss.data7[1]=results.rows[0].count
                                        console.log(datoss.data7)
                                        pool.query(`SELECT COUNT(*) FROM package 
                                        WHERE (delivery_date is not null) and (delivery_date<=estimated_delivery) and (delivery_date between date_trunc('month', $1::date) and date_trunc('month', $1 ::date) + interval '1 month')
                                        `,[reference_date], (err, results)=>{
                                            if(err){
                                                throw err
                                            }
                                            datoss.data8=[]
                                            datoss.data8[0]=results.rows[0].count;
                                            pool.query(`SELECT COUNT(*) FROM package 
                                            WHERE (delivery_date is not null) and (delivery_date>estimated_delivery) and (delivery_date between date_trunc('month', $1::date) and date_trunc('month', $1 ::date) + interval '1 month')
                                            `, [reference_date],(err, results)=>{
                                                if(err){
                                                    throw err
                                                }
                                                datoss.data8[1]=results.rows[0].count
                                                pool.query(`SELECT COUNT(*) FROM package 
                                                WHERE (delivery_date is not null) and (delivery_date<=estimated_delivery) and (delivery_date between date_trunc('year', $1::date) and date_trunc('year', $1 ::date) + interval '1 year')
                                                `,[reference_date], (err, results)=>{
                                                    if(err){
                                                        throw err
                                                    }
                                                    datoss.data9=[]
                                                    datoss.data9[0]=results.rows[0].count
                                                    pool.query(`SELECT COUNT(*) FROM package 
                                                    WHERE (delivery_date is not null) and (delivery_date>estimated_delivery) and (delivery_date between date_trunc('year', $1::date) and date_trunc('year', $1 ::date) + interval '1 year')
                                                    `, [reference_date], (err, results)=>{
                                                        if(err){
                                                            throw err
                                                        }
                                                        datoss.data9[1]=results.rows[0].count;
                                                        pool.query(`SELECT 
     
                                                        to_char(date_trunc('month', delivery_date), 'MM') AS month_number,
                                                        sum (price) AS monthly_sum
                                                 FROM package 
                                                 WHERE (delivery_date is not null) and (delivery_date between date_trunc('year', $1::date) and date_trunc('year', $1 ::date) + interval '1 year'
                                                 )
                                                 GROUP BY date_trunc('month', delivery_date);
                                                 `, [reference_date], (err, results)=>{

                                                    if (err){
                                                        throw err;
                                                    }
                                                    datoss.data10=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                                    if(results.rows.length==0){
                                                        
                                                    }
                                                    else{
                                                        for(i=0; i<results.rows.length; ++i){
                                                            let idx=parseInt(results.rows[i].month_number);
                                                            datoss.data10[idx-1]=parseInt(results.rows[i].monthly_sum)
                                                        }
                                                    }
                                                    
                                                    console.log(datoss.data10)
                                                    pool.query(`SELECT COUNT(*) FROM PACKAGE WHERE (delivery_date is null) 
                                                    `, (err,results)=>{
                                                        if(err){
                                                            throw err
                                                        }
                                                        datoss.data11=results.rows[0].count //Current active orders in all our history
                                                        pool.query(`SELECT count(*) FROM delivery_person WHERE status=true
                                                        `, (err, results)=>{
                                                            if(err){
                                                                throw err
                                                            }
                                                            datoss.data12= results.rows[0].count //Current active drivers
                                                            pool.query(`SELECT count(*) FROM delivery_person
                                                            `, (err, results)=>{
                                                                if(err){
                                                                    throw err
                                                                }
                                                                datoss.data13= results.rows[0].count
                                                                res.render("dashboard", {
                                                                    user: req.user.user_name,
                                                                    data100: reference_date,
                                                                    data0: datoss.data0,
                                                                    data1: datoss.data1,
                                                                    data2: datoss.data2,
                                                                    data3: datoss.data3,
                                                                    data4: datoss.data4,
                                                                    data5: datoss.data5,
                                                                    data6: datoss.data6,
                                                                    data7: datoss.data7,
                                                                    data8: datoss.data8,
                                                                    data9: datoss.data9,
                                                                    data10: datoss.data10,
                                                                    data11: datoss.data11,
                                                                    data12: datoss.data12,
                                                                    data13: datoss.data13

                                                            });
                                                            })
                                                        })
                                                        
                                                    })
                                                 })

                                                        
                                                    })
                                                })
                                                
        
                                            })

                                        })
                                        

                                    })
                                })
                                

                            })

                        })
                       
                    })
                })

            })
            
               
            // let dataaa= JSON.stringify(datoss);
            // fs.writeFileSync('./public/data/datos1.json', dataaa);
        }
        
        )
    }
    
    )


}})
app.post("/users/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true    
    })
  );
  app.post("/register-driver", async(req, res)=>{
    let {
        user_name, user_lastname, user_email, user_password, confirm, address, phone_number
    }=req.body
    let errors=[]
    if(!user_name|| !user_lastname|| !user_email|| !user_password ||!address|| !phone_number|| !confirm){
        errors.push({message: "Please complete all the fields"})
    }
    if(user_password<6){
      errors.push({message: "Your password is too short"})
    }
    if(user_password!==confirm){
        errors.push({message: "Password do not match"})
    }
    if(phone_number.length!=10){
        errors.push({message: "Phone number not valid"})
    }
    if(errors.length>0){
      res.render('register', {errors})}
    else{
        let hashpassword= await bcrypt.hash(user_password, 10);
        pool.query(
            'SELECT * FROM users WHERE user_email= $1', [user_email], (err, results)=>{
                if(err){
                    throw err
                }
                if(results.rows.length>0){
                    errors.push({message: "Sorry, this email is already registered"});
                    res.render('register', {errors});
                }
                else{
                    pool.query(`INSERT INTO users (user_name, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4)
                    RETURNING user_id, user_password`, [user_name, user_lastname, user_email, hashpassword], (err, results)=>{
                        if(err){
                            throw err
                        }
                        const new_user_id= results.rows[0].user_id;
                       pool.query(
                      `INSERT INTO delivery_person (first_name, last_name, address, phone_num, id_auth, status) VALUES ($1, $2, $3, $4, $5, false)`,
                      [user_name, user_lastname, address, phone_number, new_user_id], (err, results)=>{
                          if(err){
                              throw err
                          }
                          req.flash("success_msg", "You are now registered, please log in");
                          res.redirect('/users/login');
                      }
          )
                        
                    }
                        
                    )
                }
            }
        )
    }
});
  app.post("/register-admin", async(req, res)=>{
      let {
          user_name, user_lastname, user_email, user_password, confirm, address, phone_number
      }=req.body
      let errors=[]
      if(!user_name|| !user_lastname|| !user_email|| !user_password ||!address|| !phone_number|| !confirm){
          errors.push({message: "Please complete all the fields"})
      }
      if(user_password<6){
        errors.push({message: "Your password is too short"})
      }
      if(user_password!==confirm){
          errors.push({message: "Password do not match"})
      }
      if(phone_number.length!=10){
        errors.push({message: "Phone number not valid"})
    }
      if(errors.length>0){
        res.render('register', {errors})}
      else{
          let hashpassword= await bcrypt.hash(user_password, 10);
          pool.query(
              'SELECT * FROM users WHERE user_email= $1', [user_email], (err, results)=>{
                  if(err){
                      throw err
                  }
                  if(results.rows.length>0){
                      errors.push({message: "Sorry, this email is already registered"});
                      res.render('register', {errors});
                  }
                  else{
                      pool.query(`INSERT INTO users (user_name, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4)
                      RETURNING user_id, user_password`, [user_name, user_lastname, user_email, hashpassword], (err, results)=>{
                          if(err){
                              throw err
                          }
                          const new_user_id= results.rows[0].user_id;
                         pool.query(
                        `INSERT INTO administrator (first_name, last_name, address, phone_num, id_auth) VALUES ($1, $2, $3, $4, $5)`,
                        [user_name, user_lastname, address, phone_number, new_user_id], (err, results)=>{
                            if(err){
                                throw err
                            }
                            req.flash("success_msg", "You are now registered, please log in");
                            res.redirect('/users/login');
                        }
            )
                          
                      }
                          
                      )
                  }
              }
          )
      }
});
app.post("/register-dispatcher", async(req, res)=>{
    let {
        user_name, user_lastname, user_email, user_password, confirm, address, phone_number
    }=req.body
    let errors=[]
    if(!user_name|| !user_lastname|| !user_email|| !user_password ||!address|| !phone_number|| !confirm){
        errors.push({message: "Please complete all the fields"})
    }
    if(user_password<6){
      errors.push({message: "Your password is too short"})
    }
    if(user_password!==confirm){
        errors.push({message: "Password do not match"})
    }
    if(phone_number.length!=10){
        errors.push({message: "Phone number not valid"})
    }
    if(errors.length>0){
      res.render('register', {errors})}
    else{
        let hashpassword= await bcrypt.hash(user_password, 10);
        pool.query(
            'SELECT * FROM users WHERE user_email= $1', [user_email], (err, results)=>{
                if(err){
                    throw err
                }
                if(results.rows.length>0){
                    errors.push({message: "Sorry, this email is already registered"});
                    res.render('register', {errors});
                }
                else{
                    pool.query(`INSERT INTO users (user_name, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4)
                    RETURNING user_id, user_password`, [user_name, user_lastname, user_email, hashpassword], (err, results)=>{
                        if(err){
                            throw err
                        }
                        const new_user_id= results.rows[0].user_id;
                       pool.query(
                      `INSERT INTO dispatcher (first_name, last_name, address, phone_num, id_auth, status) VALUES ($1, $2, $3, $4, $5, 0)`,
                      [user_name, user_lastname, address, phone_number, new_user_id], (err, results)=>{
                          if(err){
                              throw err
                          }
                          req.flash("success_msg", "You are now registered, please log in");
                          res.redirect('/users/login');
                      }
          )
                        
                    }
                        
                    )
                }
            }
        )
    }
});

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

  app.use(function(req,res){
    res.status(404).render('404');
});
// Ruta prueba 
app.listen(PORT, () => {
    console.log('El servidor ha iniciado en puerto '+ PORT);
});