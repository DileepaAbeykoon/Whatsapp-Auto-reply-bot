const { MessageMedia } = require('whatsapp-web.js');
const keywordsList = require('./keywords');

async function handleMessage(client, msg, text) {

    for (let item of keywordsList) {
        if (item.keywords.some(k => text.includes(k))) {

            // If product has media (image)
            if (item.media) {
                const media = MessageMedia.fromFilePath(item.media);
                await client.sendMessage(msg.from, media, { caption: item.response });
                return;
            }

            // Normal text-only reply
            await msg.reply(item.response);
            return;
        }
    }

    // No keyword matched
    //await msg.reply("❓ Sorry, I didn't understand.\nType *menu* to see commands.");
}

module.exports = { handleMessage };
[[]]