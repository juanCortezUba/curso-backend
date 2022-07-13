const PORT = 5000; // port
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express(); //creo un server express un app
const {
  testPg,
  addName,
  pg_newUser,
  pg_getUsers,
  pg_updateUser,
} = require("./components/testpg");
app.use(cors()); // use cors

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

// GET POST PUT DELETE..... (http) CRM CRUD ABM
// apache file server
// donde -> url  http://www.ciencia.org/ratones?edad>90&accion=diseccion -> get
// que  -> api rest

// www.ciencia.org   es un domain y nesesita resolverse.
//  necesito un ip entonces www.ciencia.org lo atrapa un dns
// domain name service  devuelve ip
//
app.get("/api/start", function (req, res) {
  let { query } = req; //
  let { codigo, user, hash } = query;

  console.log(query);

  res.status(200).json({
    message: `Bienvenido usuario ${user} con código ${codigo}`,
    status: "ok",
  });
});

app.post("/api/user/setcreds", (req, resp) => {
  console.log("setCreds");
  // consulta DB
//  if (rowCount > 0) {
    resp.status(200).json({ hash: "sdfsdfsdfs6546546546", message: "ok" });
 
});

app.post("/updateUser", (req, resp) => {
  console.log("/updateUser");
  console.log(req.body);
  let user = req.body.user;
  pg_updateUser(user, (error, result) => {
    if (error) {
      return resp.status(215).json({ error });
    }
    resp.status(200).json({ data: result.rows });
  });
});

app.post("/getusers", (req, resp) => {
  console.log("getusers");
  pg_getUsers((error, result) => {
    if (error) {
      return resp.status(215).json({ error });
    }
    return resp.status(200).json({ result });
  });
});
app.post("/newuser", (req, resp) => {
  console.log("/newuser");
  const { user } = req.body;
  pg_newUser(user, (error, result) => {
    if (error) {
      return resp.status(215).json({ error });
    }
    return resp.status(200).json({ data: result.rows });
  });
});

app.post("/query", (req, resp) => {
  console.log(`query ${JSON.stringify(req.body)}`);
  const { user } = req.body;

  testPg((err, result) => {
    if (err) resp.status(512).json({ error: err });
    resp.status(200).json({ data: result });
  }, user);
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
