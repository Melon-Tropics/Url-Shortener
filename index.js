const express = require('express');
const cors = require('cors');
var sqlite3 = require('sqlite3').verbose();
const queries = require('./routes/queries');
const PORT = process.env.PORT || 5000;

const app = express();

// Allow cross-origin
app.use(cors());
//allow OPTIONS on all resources
app.options('*', cors());

var dbFile = 'BATMAN.db';
// makes the object that represents the database in our code
var db = new sqlite3.Database(dbFile);
// If not, initialize it
var cmdStr =
  'CREATE TABLE IF NOT EXISTS BATMAN (id TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT, originalUrl TEXT)';
db.run(cmdStr);
app.set('db', db);
app.use('/*', queries);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
