import express from "express";

const { Client } = require("pg");

//Database connection settings
const client = new Client({
  host: "localhost",
  user: "Ruslan_Bakanov",
  password: "",
  database: "homework-3",
});
client.connect();

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("App listening at http://localhost");
});

app.get("/user", (req: any, res: any) => {
  const data = req.query;
  console.log(data.login, data.email);
  if (data.login && data.email) {

    //SQL-query
    const sql = `INSERT INTO customer(email, login) VALUES('${data.email}', '${data.login}')`;
    client.query(sql, (err: any, res: any) => {
      if (!err) {
        if (res.rows.lenth) {
          console.log(res.rows);
        }
      } else {
        console.log(err.message);
      }
      client.end();
    });
  }

  res.end();
});
