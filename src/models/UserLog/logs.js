const pool = require('../../config/db');
let engine = {};
engine.createRequest = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO mainlog  SET ?', [postData], (err, results) => {
      if (err) {
        console.log(err);
      }

      console.log(results);
    });
  });
};
module.exports = engine;
