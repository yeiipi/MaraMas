require("dotenv").config();

const {pool }= require("pg");
const isProduction= process.env.NODE_ENV=== 'production';
module.exports = pool;

const connectionString = 'postgresql://$'
