module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const fs = require('fs');
  const path = require('path');
  res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
};
