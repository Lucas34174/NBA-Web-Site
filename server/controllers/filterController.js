const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
exports.getFilterByCity = asyncHandler(async (req, res) => {
  const q = `SELECT distinct city from team;`;
  const [result] = await db.query(q);
  let city = result.map((team) => team.city);
  res.send(city);
});
