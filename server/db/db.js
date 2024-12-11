const {Pool} =require('pg');
require('dotenv').config();
const pool =new Pool({
    user:'postgres',
    host:'localhost',
    database:'bibliotheque',
    password:'fouad2003',
    port:'5432',
})
module.exports=pool