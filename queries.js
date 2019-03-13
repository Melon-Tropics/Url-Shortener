const { getDB, checkURL } = require('./controllers/utils');
const crypto = require('crypto');

module.exports = {
  getAll: req => {
    return new Promise((resolve, reject) => {
      const q = req.query;
      const o = Object.keys(q)[0];
      if (req.baseUrl === '/short' && o === 'url') {
        const originalUrl = q.url;
        checkURL(originalUrl)
          .then(() => {
            const DB = getDB(req);
            const id = crypto
              .createHash('md5')
              .update(originalUrl)
              .digest('base64')
              .replace(/\//g, '_')
              .replace(/\+/g, '-');
            const code = id.substring(0, 6);
            const statement = DB.prepare(
              'INSERT INTO BATMAN (id, code, originalUrl) VALUES (?, ?, ?)',
              [id, code, originalUrl]
            );
            DB.get('SELECT code FROM BATMAN WHERE id = ?', id, (err, res) => {
              if (err) return reject({ error: err });
              if (res && res.code && res.code.length > 0) {
                console.log('repeat');
                return resolve({ code: res.code });
              }
              statement.run(err => {
                if (err) return reject({ error: err });
                return resolve({ code: code });
              });
            });
          })
          .catch(() => {
            return reject({ error: '404' });
          });
      } else if (req.baseUrl === '/superDump') {
        const DB = getDB(req);
        DB.all('SELECT * FROM BATMAN', (err, res) => {
          if (err) return reject({ error: err });
          resolve({ data: res });
        });
      } else {
        const code = req.baseUrl.substring(1);
        const DB = getDB(req);
        DB.get(
          'SELECT originalUrl FROM BATMAN where code = ?',
          code,
          (err, res) => {
            if (err) return reject({ error: err });
            if (!res) return reject({ error: '404' });
            resolve(res);
          }
        );
      }
    });
  }
};
