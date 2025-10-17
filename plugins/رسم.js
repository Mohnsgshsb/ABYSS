import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys';

const stylesMap = {
  "1": "realistic", "2": "fantasy", "3": "cyberpunk", "4": "anime", "5": "cartoon",
  "6": "photorealistic", "7": "cinematic", "8": "artistic", "9": "vintage", "10": "futuristic",
  "11": "dark", "12": "minimalist", "13": "concept art", "14": "portrait", "15": "steampunk",
  "16": "surreal", "17": "impressionist", "18": "expressionist", "19": "modern", "20": "baroque",
  "21": "pixel art", "22": "sketch", "23": "watercolor"
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return await m.reply(`🦄 *يرجى كتابة وصف للصورة!*\n\n🥀 *مثال:*\n➤ ${usedPrefix}${command}+ قطة جميلة`);

  const rows = Object.entries(stylesMap).map(([num, style]) => ({
    header: `النمط رقم [${num}]`,
    title: `🌻 ${style}`,
    description: `اضغط هنا لتوليد الصورة بنمط *${style}*`,
    id: `${usedPrefix}ديب-تخيل${num} ${text}`
  }));

  const mediaMessage = await prepareWAMessageMedia({
    image: { url: "https://files.catbox.moe/n0s0mn.jpg" }
  }, { upload: conn.waUploadToServer });

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: "💮 تم العثور على الأنماط التالية، اختر منها وسيتم توليد الصورة تلقائيًا:" },
          footer: { text: "🌸 تم بواسطة Deep Image Bot" },
          header: {
            hasMediaAttachment: true,
            imageMessage: mediaMessage.imageMessage
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: '🌷 اختر النمط المفضل لتوليد الصورة',
                  sections: [
                    {
                      title: '🌹اختار من القايمه🌹',
                      highlight_label: "🍷 Deep Image Generator",
                      rows: rows
                    }
                  ]
                })
              }
            ]
          }
        }
      }
    }
  }, { userJid: conn.user.jid, quoted: m });

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = /^رسم$/i;
export default handler;