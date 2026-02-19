const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const express = require("express");

const teamRoutes = require("./routes/teamRoutes");
const statRoutes = require("./routes/statRoutes");
const seasonRoutes = require("./routes/seasonRoutes");
const playerRoutes = require("./routes/playerRoutes");
const pageRoutes = require("./routes/pageRoutes");
const navbarRoutes = require("./routes/navbarRoutes");
const gameRoutes = require("./routes/gameRoutes");
const filterRoutes = require("./routes/filterRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); //permettre la requete vers une autre port
app.use(express.json());

app.use("/team", teamRoutes);
app.use("/stat", statRoutes);
app.use("/season", seasonRoutes);
app.use("/navbar", navbarRoutes);
app.use("/game", gameRoutes);
app.use("/player", playerRoutes);
app.use("/page", pageRoutes);
app.use("/filter", filterRoutes);

const port = 7000;

app.listen(port, "localhost", () => {
  //démarre le serveur
  console.log("server is listen on port " + port + " now...");
});
