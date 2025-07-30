// utils/generateCertificate.js
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

// (Opsional) jika kamu ingin pakai font khusus
const fontPath = path.join(__dirname, '../assets/font/GreatVibes-Regular.ttf');
console.log('Font exists:', fs.existsSync(fontPath));
registerFont(path.join(__dirname, '../assets/font/GreatVibes-Regular.ttf'), {
  family: 'Great Vibes',
});
console.log('✅ Font registered');

/**
 * Generate sertifikat dengan nama user
 * @param {string} name - Nama yang akan dicetak di sertifikat
 * @returns {Promise<Buffer>} - Buffer PNG hasil sertifikat
 */
async function generateCertificate(name) {
  const templatePath = path.join(__dirname, '../cert-templates/pro.png');
  const image = await loadImage(templatePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  // Gambar template
  ctx.drawImage(image, 0, 0);

  // Atur gaya teks
  ctx.font = '80px "Great Vibes"';
  console.log(ctx.font);
  ctx.fillStyle = '#1a237e';
  ctx.textAlign = 'center';
  ctx.fillText(name, canvas.width / 2, canvas.height * 0.55);

  // Return buffer PNG
  return canvas.toBuffer('image/png');
}

module.exports = generateCertificate;
