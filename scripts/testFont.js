const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

const fontPath = path.join(__dirname, '../assets/font/GreatVibes-Regular.ttf');
console.log("Font exists:", fs.existsSync(fontPath));

registerFont(fontPath, { family: 'Great Vibes' });

const canvas = createCanvas(800, 400);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = '80px "Great Vibes"';

ctx.fillStyle = '#000';
ctx.fillText('Desta Anugra Pratama', 400, 200);
ctx.textAlign = 'center';

const out = fs.createWriteStream('test-output.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => {
  console.log('✅ Test image generated');
});
