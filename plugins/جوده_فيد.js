import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys';

const resolutions = {
  "480": "480p",
  "720": "720p",
  "1080": "1080p",
  "2k": "2K",
  "4k": "4K",
  "8k": "8K"
};

const handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';
  if (!/^video/.test(mime)) return m.reply("🍡 *من فضلك قم بالرد على فيديو تريد رفع جودته .* 🌷");

  const rows = Object.entries(resolutions).map(([key, label]) => ({
    header: `💘 ${label}`,
    title: `🌷 رفع الفيديو إلى ${label}`,
    description: `🧚 اضغط هنا لترقية الفيديو لجودة ${label} 🍷`,
    id: `${usedPrefix}رفع-فيد ${key}`
  }));

  const mediaMessage = await prepareWAMessageMedia({
    image: { url: "https://files.catbox.moe/hb8xuw.jpg" }
  }, { upload: conn.waUploadToServer });

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: "🌹 *اختر الجودة التي تريد رفع الفيديو إليها يا أنيق:* 💘" },
          footer: { text: "🍷 تم بواسطة 💘 HD Video Enhancer 💘" },
          header: {
            hasMediaAttachment: true,
            imageMessage: mediaMessage.imageMessage
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: '🧚 اختر الجودة المناسبة من القايمة 🌷',
                  sections: [
                    {
                      title: '🍡 اختيارات الجودة المتاحة 🌹',
                      highlight_label: '💘 HD Video Options 💘',
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

handler.command = /^جوده_فيد|جودة_فيد$/i;
export default handler;