const express = require('express');
const app = express();
const port = 8080;

// routes
app.get('/', (req, res) => {
  res.send('ok');
});

app.listen(port, () => console.log('Serveur écoutant le port ' + port));
