const http = require('http');
const url = require('url');

module.exports = {
  getDB(req) {
    return req.app.get('db');
  },
  checkURL: e => {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'HEAD',
        host: url.parse(e).host,
        port: 80
      };
      var req = http.request(options, function(r) {
        if (r.statusCode >= 200 && r.statusCode < 400) return resolve(1);
        return reject(0);
      });
      req.end();
      req.on('error', () => {
        return reject(0);
      });
    });
  }
};
