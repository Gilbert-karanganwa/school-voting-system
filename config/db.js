const mysql=require('mysql2');
//CREATE CONNECTION

const db=mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "",
    database: "school-voting-system"
});

db.connect((err)=>{
    if(err) {
    console.log("connection error");
    console.log(err);

    }
    console.log("database connected")
});
module.exports=db;
