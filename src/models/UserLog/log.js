var mysql = require('mysql');

const pool = mysql.createPool({
  host: "10.10.30.111",
  user: "testuser",
  password: "$123Test",
  database: "reprocessEngine"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
let engine = {};
engine.createRequest = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO mainlog  SET ?', [postData], (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results);
    });
  });
};
module.exports = engine