const sqlite3 = require('sqlite3').verbose();
const path = require('path');

console.log(__dirname);
// open the database
let db = new sqlite3.Database(path.join(__dirname, 'assets/db/hymnalV004.db'), sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error('ERROR', err.message);
  }
  console.log('Connected to the hymnal database.');
});

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

function getAuthors () {
  return new Promise((resolve, reject) => {
    db.all('select * from authors;', [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows)
    });
  })
}

function getHymns () {
  return new Promise((resolve, reject) => {
    db.all('select * from hymns;', [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows)
    });
  })
}

function getStanzasByHymnId (hymnId) {
  return new Promise((resolve, reject) => {
    db.all('select * from stanzas where hymn_id=?;', [hymnId], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows)
    });
  })
}

function getFavorites () {
  return new Promise((resolve, reject) => {
    db.all('select * from favorites;', [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows)
    });
  })
}

function addFavorite (hymnId) {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR IGNORE INTO favorites(hymn_id) VALUES(?);', [hymnId], (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true)
    });
  })
}

function removeFavorite (hymnId) {
  return new Promise((resolve, reject) => {
    db.run('DELETE from favorites WHERE hymn_id=?;', [hymnId], (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true)
    });
  })
}

module.exports = {
  getAuthors,
  getHymns,
  getStanzasByHymnId,
  getFavorites,
  addFavorite,
  removeFavorite
}
