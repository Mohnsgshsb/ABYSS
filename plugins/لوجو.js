import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys';

const models = {
  'fluffy-logo': 'Fluffy Logo',
  'lava-logo': 'Lava Logo',
  'cool-logo': 'Cool Logo',
  'comic-logo': 'Comic Logo',
  'fire-logo': 'Fire Logo',
  'water-logo': 'Water Logo',
  'ice-logo': 'Ice Logo',
  'elegant-logo': 'Elegant Logo',
  'gold-logo': 'Gold Logo',
  'blue-logo': 'Blue Logo',
  'silver-logo': 'Silver Logo',
  'neon-logo': 'Neon Logo',
  'skate-name': 'Skate Name',
  'retro-logo': 'Retro Logo',
  'candy-logo': 'Candy Logo',
  'glossy-logo': 'Glossy Logo',
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return await m.reply(`🦋 *اكتب النص اللي عايز تعمل بيه اللوجو*\n\n📌 مثال:\n${usedPrefix + command} Silana`);

  const rows = Object.entries(models).map(([key, label]) => ({
    header: `🌹 ${label}`,
    title: `🌹 اختر نمط ${label}`,
    description: `اضغط لتوليد لوجو بنمط ${label}`,
    id: `${usedPrefix}flamegen ${key}|${text}`
  }));

  const mediaMessage = await prepareWAMessageMedia({
    image: { url: 'https://tinyurl.com/2ct8jnxs' }
  }, { upload: conn.waUploadToServer });

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: "🍮 اختر نوع اللوجو الذي تريده من القائمة أدناه:" },
          footer: { text: "🍡 FlamingText Logo Generator" },
          header: {
            hasMediaAttachment: true,
            imageMessage: mediaMessage.imageMessage
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                  title: "🎆 اختر النمط المفضل",
                  sections: [
                    {
                      title: "💘 أنماط متاحة",
                      highlight_label: "🌷 ستايلات الوجوهات",
                      rows
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

handler.command = /^لوجو$/i;
export default handler;