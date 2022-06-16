const PORT = 5000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const { testPg, addName } = require("./components/testpg");
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 5000,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// GET POST PUT DELETE
app.get("/api/start", function (req, res) {
  let { query, params } = req;
  let { codigo, user, hash } = query;
  console.log(query);

  console.log(params);

  res.status(200).json({
    message: `Bienvenido usuario ${user} con código ${codigo}`,
    status: "ok",
  });
});

app.post("/api/user/setcreds", (req, resp) => {
  console.log("setCreds");
  // consulta DB
  if (rowCount > 0) {
    resp.status(200).json({ hash: "sdfsdfsdfs6546546546", message: "ok" });
  } else {
    resp.status(205).json({
      hash: "sdfsdfsdfs6546546546",
      message: "No hay Usuario con esos datos ",
    });
  }
});

app.post("/query", (req, resp) => {
  console.log("query");
  testPg((err, result) => {
    if (err) {
      console.log("error");
      resp.status(512).json({ errorMessage: err });
    }
    console.log("ok");
    resp.status(200).json({ data: result });
  });
});

app.get("/addName", (req, resp) => {
  console.log(req.query);
  const { name } = req.query;
  if (!name) {
    resp.status(512).json({ errorMessage: "requiere que indique un nombre" });
  }
  addName((err, result) => {
    if (err) {
      resp.status(512).json({ errorMessage: err });
    }
    resp.status(200).json({ data: result });
  }, name);
});

app.listen(PORT);
// http://localhost:5000/
console.log(`Server started on port ${PORT}`);
