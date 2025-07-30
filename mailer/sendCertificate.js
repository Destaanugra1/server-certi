// mailer/sendCertificate.js
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

/**
 * Kirim sertifikat ke email user
 * @param {string} toEmail - Alamat email tujuan
 * @param {string} name - Nama user (untuk subjek atau isi)
 * @param {Buffer} attachmentBuffer - Buffer PNG sertifikat
 */
async function sendCertificate(toEmail, name, attachmentBuffer) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ganti jika pakai layanan SMTP lain
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Panitia Sertifikat" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Sertifikat untuk ${name}`,
    text: `Halo ${name},\n\nBerikut terlampir sertifikat kamu.\n\nSalam,\nPanitia`,
    attachments: [
      {
        filename: 'sertifikat.png',
        content: attachmentBuffer,
        contentType: 'image/png',
      },
    ],
  };

  // Kirim email
  return transporter.sendMail(mailOptions);
}

module.exports = sendCertificate;
