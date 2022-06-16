const { Client } = require("pg");

const newClient = () => {
  const client = new Client({
    host: "192.168.0.120",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "test",
  });
  return client;
};

const testPg = async (callback) => {
  const client = newClient();
  try {
    console.log("1");
    await client.connect();
    console.log("11");
    const res = await client.query("SELECT name from test;");
    console.log("111");
    client.end();
    console.log(res.rows[0].name); // Hello world!
    console.log("1111");
    callback(null, res.rows);
  } catch (error) {
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

function pepe() {
  const client = new Client(config);
  client
    .connect()
    .then((r) => r.json())
    .then((j) => console.log(j))
    .catch((error) => console.error(error.message));
}
module.exports = { testPg, addName };
