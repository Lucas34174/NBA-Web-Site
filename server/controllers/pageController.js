const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

exports.getTeamPage = asyncHandler(async (req, res) => {
  const q = `  
  SELECT 
    team_id,
    abbreviation,
    nickname,
    yearfounded,
    city,
    arena,
    arenacapacity,
    owner,
    generalmanager,
    headcoach
  FROM team_details;`;
  const result = await db.query(q);
  res.send(result[0]);
});
