// scripts/downloadFont.js
// Script untuk download Pacifico-Regular.ttf dari Google Fonts (GitHub mirror)

const https = require('https');
const fs = require('fs');
const path = require('path');

const url =
  'https://github.com/google/fonts/raw/main/ofl/pacifico/Pacifico-Regular.ttf';
const dest = path.join(__dirname, '../assets/font/Pacifico-Regular.ttf');

if (!fs.existsSync(path.dirname(dest))) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
}

function downloadFont(fontUrl, destPath) {
  https.get(fontUrl, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Font Pacifico-Regular.ttf downloaded!');
      });
    } else if (res.statusCode === 302 || res.statusCode === 301) {
      // Follow redirect
      const redirectUrl = res.headers.location;
      console.log('Redirecting to', redirectUrl);
      downloadFont(redirectUrl, destPath);
    } else {
      console.log('Font download failed:', res.statusCode);
    }
  });
}

downloadFont(url, dest);
