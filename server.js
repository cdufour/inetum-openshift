const express = require('express');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
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

app.listen(port, () => console.log('Serveur écoutant le port ' + port));
