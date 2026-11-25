const express = require('express');
const path = require('path');

const app = express();

// Отключаем кэш
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Статические файлы (вся папка проекта, кроме api)
app.use(express.static(path.resolve(__dirname, '..')));

// SPA fallback - все остальные маршруты ведут на index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

module.exports = app;

