const db = require("../config/db");
exports.getFilterByCity = (req, res) => {
  const q = `SELECT distinct city from team;`;
  db.query(q, (err, result) => {
    if (err) console.log(err);
    let city = [];
    result.map((team) => city.push(team["city"]));
    const data = JSON.stringify(city);
    res.send(data);
    console.log(data);
  });
};
