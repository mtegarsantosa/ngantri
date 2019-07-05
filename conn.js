const mysql = require('mysql')
const db = mysql.createConnection({
  host:'localhost',
  user:'phpmyadmin',
  password:'root',
  database:'sabarv3',
  multipleStatements: true
})
db.connect((err)=>{
  if(err) console.log(err)
  else console.log('berhasil ngonek db')
})


module.exports = db
