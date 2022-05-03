const express = require('express');

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  connectionLimit: 5
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    console.log(rows); //[ {val: 1}, meta: ... ]
    const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
	  throw err;
  } finally {
	  if (conn) return conn.end();
  }
}

const app = express();
const port = 8080;

// routes
app.get('/', (req, res) => {
  res.send('ok');
});

app.get('/square/:n', (req, res) => {
  const n = parseInt(req.params.n);
  res.send(`Le carré de ${n} vaut ${n*n}`);
});

app.get('/cube/:n', (req, res) => {
  const n = parseInt(req.params.n);
  res.send(`Le cube de ${n} vaut ${n*n*n}`);
});

app.get('/mariadb', async (req, res) => {
  await asyncFunction();
  res.send('Mariadb');
});

app.listen(port, () => console.log('Serveur écoutant le port ' + port));
