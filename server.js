const express = require('express');

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

app.get('/inetum', (req, res) => {
  res.send('Ô Inetum ! Comme tu es grand !');
})

app.listen(port, () => console.log('Serveur écoutant le port ' + port));
