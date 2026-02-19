const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

exports.getNavbarPlayer = asyncHandler(async (req, res) => {
  const q = `
  SELECT 
    person_id,
    first_name,
    last_name,
    country,
    height,
    weight,
    season_exp,
    team_name,
    team_abbreviation,
    position,
    jersey
  FROM common_player_info
  `;
  const result = await db.query(q);
  res.send(result);
});
