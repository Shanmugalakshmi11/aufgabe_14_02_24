const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AppRouter } = require("./src/routes");

// Zugriff auf Umgebungsvariablen
const { PORT } = process.env;

// Initialisierung von expres
const app = express();
app.use(bodyParser.json());
// Use for development
app.use(cors());

app.use("/v1", AppRouter);

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
