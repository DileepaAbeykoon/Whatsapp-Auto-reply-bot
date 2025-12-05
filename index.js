const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const socket = require('socket.io');
const qrcode = require('qrcode-terminal');
const path = require('path');

const { handleMessage } = require('./bot/handlers');
const { welcomeMessage } = require('./bot/greeting');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// WhatsApp Client Configuration (uses installed Chrome)
const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './whatsapp-session' }),
    puppeteer: {
        headless: false,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const greetedUsers = new Set();
let io;

// QR Generate
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    if (io) {
        io.emit('qr', { url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qr}` });
        io.emit('message', '📲 QR Generated — Scan to Connect');
    }
});

// WhatsApp Ready Event
client.on('ready', () => {
    console.log('📌 WhatsApp Bot Connected Successfully!');
    if (io) io.emit('ready', { connected: true });
});

// Message Listener
client.on('message', async msg => {
    const chatId = msg.from;
    const text = msg.body.toLowerCase();

    if (!greetedUsers.has(chatId) && welcomeMessage) {
        await msg.reply(welcomeMessage);
        greetedUsers.add(chatId);
    }

    await handleMessage(client, msg, text);
});

// Init Bot
client.initialize();

// Server & Socket.io Connection
const server = app.listen(3000, () => console.log('\n🚀 Server Started → http://localhost:3000\n'));
io = socket(server);
io.on('connection', () => console.log('📡 Dashboard Connected'));
