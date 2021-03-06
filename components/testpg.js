const { Client } = require("pg");
const config = {
  host: "192.168.1.102",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "test",
};
const newClient = () => {
  return new Client({
    host: "192.168.1.102",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "test",
  });
};

/*
name	character varying(20)	

passwd	character varying(30)	

email	character varying(50)	

date	timestamp without time zone	

status	integer	



*/

const pg_updateUser=async (user , callback )=>{

  const client = newClient();
  try {
    /* todo ok  */
    await client.connect();
    qry = {
      text: "update usuario set name=$1, passwd=$2 , email=$3 , date= now() , status=2  where id=$4;",
      values: [user.name , user.passwd , user.email , user.id],
    };
    const res = await client.query(qry);
    client.end();
    console.log(res);
    callback(null, res.rows);
  } catch (error) {
    /* ups hubo error */
    client.end();
    console.log("catch error");
    console.log(error);
    callback(error, null);
  }
};




// Seguridad


const testPg = async (callback, user) => {
  const client = newClient();
  try {
    /* todo ok  */
    await client.connect();
    qry = {
      text: "SELECT *  from test where name=$1",
      values: [user],
    };
    const res = await client.query(qry);
    client.end();
    console.log(res);
    callback(null, res.rows);
  } catch (error) {
    /* ups hubo error */
    client.end();
    console.log("catch error");
    console.log(error);
    callback(error, null);
  }
};

const addName = async (callback, name) => {
  console.log(`testPg id: ${name} `);
  const client = new Client(config);
  try {
    await client.connect();
    const res = await client.query("insert into test(name) values($1)  ", [
      name,
    ]);
    console.log(res); // Hello world!
    console.log(res.rowCount); // Hello world!
    callback(null, res.rowCount);
    //  await client.end();
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
};

async function pg_newUser(user, callback) {
  console.log(user);

  const qry = {
    text: 'insert into "usuario" (name,passwd,email,date, status, hash) values($1,$2,$3,$4,$5,md5($2::character varying)::text)',
    values: [
      user.name,
      user.passwd,
      user.email,
      user.date,
      user.status,
      // "rgdsrtyreytrhffh453",
    ],
  };

  const client = newClient();
  console.log(client);
  await client.connect();

  client
    .query(qry)
    .then((result) => {
      console.log(result);
      callback(null, result);
    })
    .catch((err) => {
      console.log(err);
      callback(err, null);
    });
}
const pg_getUsers = async (callback) => {
  const client = newClient();
  await client.connect();

  client
    .query('select * from "usuario"; ')
    .then((result) => {
      console.log(result);
      callback(null, result);
    })
    .catch((err) => {
      console.log(err);
      callback(err, null);
    });
};
function pepe() {
  const client = new Client(config);
  client.connect();

  client
    .then((r) => r.json())
    .then((j) => console.log(j))
    .catch((error) => console.error(error.message));
}
module.exports = { testPg, addName, pg_newUser, pg_getUsers , pg_updateUser};
