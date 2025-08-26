const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/dbconfig");
const db = require("./models");
const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");

app.use("/api/v1", authRoutes);
app.use("/api/v1", postRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ message: "API backend P3EXAME_ESPECIAL22 a correr" });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com a BD bem sucedida.");
    
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados com a BD.");

    app.listen(PORT, () => {
      console.log(`Server a correr na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar a app:", err);
    process.exit(1);
  }
})();
