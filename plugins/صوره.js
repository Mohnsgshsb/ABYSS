import pkg from '@whiskeysockets/baileys';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = pkg;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `⚠️ أرسل الكلمة التي تريد البحث عنها.\n\nمثال: *${usedPrefix + command} lisa blackpink*`;

  await m.react('⌛');
  conn.reply(m.chat, '> ⏳ *جاري البحث عن الصور...*', m);

  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent(
      { image: { url } },
      { upload: conn.waUploadToServer }
    );
    return imageMessage;
  }

  let results = [];
  try {
    const res = await fetch(`https://the-end-api.vercel.app/home/sections/Search/api/api/pinterest/search?q=${encodeURIComponent(text)}&apikey=pinterest-key-emamtheTop-emam-gggjyfg-unlimit`);
    const json = await res.json();
    if (!json.status || !json.results) throw new Error('لا توجد نتائج');
    results = json.results.slice(0, 10);
  } catch (e) {
    console.error('خطأ أثناء جلب الصور:', e.message);
    await m.react("❌");
    return m.reply(`❌ لم يتم العثور على نتائج لـ *"${text}"*.`);
  }

  const decoration = '';

  let cards = [];
  for (let i = 0; i < results.length; i++) {
    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `${decoration}\n📸 *صورة رقم ${i + 1}*\n🔎 نتيجة البحث: *${text}*\n> ♡┆𖧷₊˚˖𓍢ִ🍓𝐀𝐁𝐘𝐒𝐒_𝐁𝐎𝐓˚.🎀༘⋆ﾟ＊┆♡`
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: await createImageMessage(results[i].url)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [{
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "📢 قناة البوت",
            url: "https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c"
          })
        }]
      })
    });
  }

  const finalMessage = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `> 🔍 *ابحث بكلمات دقيقة أو باللغة الإنجليزية لتحصل على أفضل النتائج.*`
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards
          })
        })
      }
    }
  }, { quoted: m });

  await m.react("✅");
  await conn.relayMessage(m.chat, finalMessage.message, { messageId: finalMessage.key.id });
};

handler.command = /^(صوره|صورة)$/i
handler.tags = ['بحث'];
handler.help = ['بون <كلمة>'];

export default handler;