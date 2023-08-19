const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());

app.get('/api/authors', async (req, res) => {
  const rows = await db.getAuthors();
  res.send(rows);
});

app.get('/api/hymns', async (req, res) => {
  const rows = await db.getHymns();
  res.send(rows);
});

app.get('/api/stanzas', async (req, res) => {
  const { hymn_id } = req.query
  const rows = await db.getStanzasByHymnId(hymn_id);
  res.send(rows);
});

app.get('/api/favorites', async (req, res) => {
  const rows = await db.getFavorites();
  res.send(rows);
});

app.post('/api/favorites', async (req, res) => {
  const { hymn_id } = req.body
  const row = await db.addFavorite(hymn_id);
  res.send(row);
});

app.delete('/api/favorites/:hymnId', async (req, res) => {
  const { hymnId } = req.params
  const row = await db.removeFavorite(hymnId);
  res.send(row);
});

app.listen(3000, () => {
  console.log('listen port 3000!');
});
