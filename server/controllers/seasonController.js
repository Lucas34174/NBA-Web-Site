const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

exports.getSeasonById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT DISTINCT SUBSTR(season_id, 2, 5) as season 
    FROM game 
    WHERE team_id_home = ? OR team_id_away = ? 
    ORDER BY SUBSTR(season_id, 2, 5) DESC;`;

  const [result] = await db.query(q, [id, id]);

  const season = result.map((game) => game.season);

  res.send(season);
});
