const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Create a new bot instance
const bot = new TelegramBot("6146830733:AAEX9OjGjzMNDQ-47-UYwOw3XryryLEghBs", {
  polling: true,
});

async function checkUsername(username, chatId) {
  const available = [];

  // Memeriksa keditemukanan username pada Instagram
  try {
    const instagramResponse = await axios.get(
      `https://www.instagram.com/${username}/?__a=1&__d=1`
    );
    if (instagramResponse.status === 200) {
      bot.sendMessage(
        chatId,
        `Username Instagram ${username} ditemukan. Silahkan kunjungi https://www.instagram.com/${username}`
      );
    } else {
      bot.sendMessage(chatId, `Username Instagram ${username} tidak ditemukan`);
    }
  } catch (error) {
    bot.sendMessage(chatId, `Username Instagram ${username} tidak ditemukan`);
  }

  // Memeriksa keditemukanan username pada Twitter
  try {
    const twitterResponse = await axios.get(`https://nitter.net/${username}`);
    if (twitterResponse.status === 200) {
      bot.sendMessage(
        chatId,
        `Username Twitter ${username} ditemukan. Silahkan kunjungi https://www.twitter.com/${username}`
      );
    } else {
      bot.sendMessage(chatId, `Username Twitter ${username} tidak ditemukan`);
    }
  } catch (error) {
    bot.sendMessage(chatId, `Username Twitter ${username} tidak ditemukan`);
  }

  // Memeriksa keditemukanan username pada TikTok
  try {
    const tiktokResponse = await axios.get(
      `https://www.tiktok.com/@${username}`
    );
    if (tiktokResponse.status === 200) {
      bot.sendMessage(
        chatId,
        `Username Tiktok ${username} ditemukan. Silahkan kunjungi https://www.tiktok.com/@${username}`
      );
    } else {
      bot.sendMessage(chatId, `Username Tiktok ${username} tidak ditemukan`);
    }
  } catch (error) {
    bot.sendMessage(chatId, `Username Tiktok ${username} tidak ditemukan`);
  }
}

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    bot.sendMessage(chatId, "Selamat Datang di Bot Cek Username");
    bot.sendMessage(chatId, "Silakan Mengetikan username yang ingin di cek");
  } else {
    bot.sendMessage(chatId, "Sedang mengecek username...");

    checkUsername(text, chatId);
  }
});
