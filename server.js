const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Отключаем кэш для разработки
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Статические файлы
app.use(express.static(path.join(__dirname, '.')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

app.listen(PORT, () => {
  const ip = getLocalIP();
  console.log(`\n✅ Сервер запущен!\n`);
  console.log(`📱 Локально: http://localhost:${PORT}`);
  console.log(`🌐 Для других в сети: http://${ip}:${PORT}\n`);
  console.log(`Дайте этот адрес другим людям, чтобы они зашли на сайт.`);
});
