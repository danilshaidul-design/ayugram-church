// Minimal static server for Vercel
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  let filePath = path.join(__dirname, req.url);

  if (req.url === '/') {
    filePath = path.join(__dirname, 'index.html');
  }

  try {
    const data = fs.readFileSync(filePath);
    res.setHeader('Cache-Control', 'no-store');
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.end('Not found');
  }
};
