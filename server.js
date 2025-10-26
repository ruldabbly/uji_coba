// server.js

// Import Libraries
// 'dotenv' diperlukan untuk menjalankan secara lokal (npm start)
// Di Vercel, nilai akan diambil dari Environment Variables secara otomatis
require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); 

const app = express();

// --- Konfigurasi Rahasia ---
// Nilai akan diambil dari file .env (lokal) atau Vercel Environment Variables (hosting)
const BOT_TOKEN = '7995940195:AAGp6pWQWDjYYPvukrgsp1zJRnIhxfHkMm0'; // process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = '-1003293588276'; // process.env.TELEGRAM_CHAT_ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Middleware
app.use(bodyParser.json()); 

// CORS Configuration (PENTING untuk Vercel Serverless Function)
app.use((req, res, next) => {
    // Mengizinkan semua domain mengakses API (Ganti '*' dengan domain Anda untuk keamanan lebih)
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Endpoint: /api/send-telegram (Sesuai dengan vercel.json)
app.post('/api/send-telegram', async (req, res) => {
    // Pengecekan keamanan dasar
    if (!BOT_TOKEN || !CHAT_ID) {
        return res.status(500).json({ success: false, message: 'Server configuration error: Token or Chat ID missing.' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'Semua field wajib diisi.' });
    }

    // 2. Format Pesan
    const textMessage = 
        `*Pesan Baru dari Formulir Kontak*\n` +
        `------------------------------------\n` +
        `*Nama:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Subjek:* ${subject}\n` +
        `*Pesan:*\n${message}`;

    // 3. Siapkan Payload untuk Telegram
    const payload = {
        chat_id: CHAT_ID,
        text: textMessage,
        parse_mode: 'Markdown'
    };

    try {
        // 4. Kirim ke API Telegram
        const telegramResponse = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const telegramData = await telegramResponse.json();

        if (telegramData.ok) {
            res.json({ success: true, message: 'Pesan berhasil terkirim ke Telegram!' });
        } else {
            res.status(500).json({ success: false, message: `Telegram API Error: ${telegramData.description}` });
        }
    } catch (error) {
        console.error('Network or Server Error:', error);
        res.status(500).json({ success: false, message: 'Kesalahan server saat menghubungi Telegram.' });
    }
});

// Untuk deployment Vercel, kita tidak perlu menjalankan app.listen secara eksplisit.
// Namun, untuk pengujian lokal, Anda bisa menambahkan ini (di-skip oleh Vercel):
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server Node.js berjalan di http://localhost:${PORT}`);
    });
}

// Export aplikasi untuk Vercel Serverless
module.exports = app;