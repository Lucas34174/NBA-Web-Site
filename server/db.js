const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "NBA",
});

connection.connect((err) => {
  if (err) {
    console.log("error:" + err);
    return;
  }
  console.log("Connection successful to mysql db...");
});

module.exports = connection;
