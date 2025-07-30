// server/server.js
const dotenv = require('dotenv');
dotenv.config();
const generateCertificate = require('./utils/generateCertificate');
const sendCertificate = require('./mailer/sendCertificate');

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email } = req.body || {};

  if (!name || !email) {
    res.status(400).json({ error: 'Nama dan email wajib diisi.' });
    return;
  }

  try {
    const certBuffer = await generateCertificate(name);
    await sendCertificate(email, name, certBuffer);
    res.status(200).json({ message: 'Sertifikat berhasil dikirim ke email!' });
  } catch (err) {
    console.error('Error:', err);
    res
      .status(500)
      .json({ error: 'Terjadi kesalahan saat mengirim sertifikat.' });
  }
}

module.exports = handler;

// Untuk local development/testing
if (require.main === module) {
  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/generate', (req, res) => handler(req, res));

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}
