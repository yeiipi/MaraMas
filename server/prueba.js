const {pool}= require("./database.js")

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
    var datoss= [results.rows[0].monday, results.rows[0].tuesday, results.rows[0].wednesday, results.rows[0].thursday, results.rows[0].friday, results.rows[0].saturday, results.rows[0].sunday];
    
    
    
}
)
