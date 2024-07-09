import { client } from 'pg';
const client = new client({
    user: "postgres",
    host: "localhost",
    port: 3000,
    database: "postgres",
    // password: 
})

client.connect();

client.query(`select * from users`, (err, res) =>{
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
})