const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"Juanlu17",
    host: "localhost",
    port: 5432,
    database : "MARA"
});

module.exports = pool;
