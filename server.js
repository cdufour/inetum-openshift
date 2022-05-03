const express = require('express');

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  connectionLimit: 5
});

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
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM Demo");
    res.json(result);
  } catch (err) {
    //throw err;
    res.json(err);
  } finally {
    if (conn) return conn.end();
  }
}
});

app.listen(port, () => console.log('Serveur écoutant le port ' + port));
