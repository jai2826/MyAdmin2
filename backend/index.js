const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
app.use(cors())
const port = 5000;


app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/auth"),
);
app.use(
  "/api/blog",
  require("./routes/blog"),
);

app.get("/", (req, res) => {
  res.send("helloworld");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
