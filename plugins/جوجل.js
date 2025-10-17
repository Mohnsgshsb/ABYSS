import axios from 'axios';
import cheerio from 'cheerio';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = pkg;

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply("\` *『 اكتب الكلمة اللي بتبحث عنها مع الأمر 🧚 』\`*");

  const query = args.join(" ");
  await m.react("🔎");
  await conn.reply(m.chat, "❲ ˼جاري البحث🕴️˹ ❳", m);

  try {
    const url = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    let results = [];

    $('a.result-link').each((i, el) => {
      const link = $(el).attr('href');
      const title = $(el).text().trim();
      const parent = $(el).parent();
      const description = parent.find('br').next().text().trim();

      if (title && link) {
        results.push({
          title,
          description: description || "لا يوجد وصف تفصيلي.",
          link
        });
      }
    });

    if (!results.length) return m.reply("*『مش لاقي اي حاجه للبحث ده❗』*");

    // 🔍 دالة جلب صورة من Google Images
    async function fetchImage(query) {
      try {
        const imgUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
        const { data } = await axios.get(imgUrl, {
          headers: { "User-Agent": "Mozilla/5.0" }
        });
        const $ = cheerio.load(data);
        const imageUrl = $('img').first().attr('src');
        return imageUrl?.startsWith('http') ? imageUrl : null;
      } catch (e) {
        return null;
      }
    }

    // 📷 إنشاء صورة لكل كرت
    async function createImageMessage(searchText) {
      const imageUrl = await fetchImage(searchText) || "https://files.catbox.moe/ggxx14.jpg";
      const { imageMessage } = await generateWAMessageContent(
        { image: { url: imageUrl } },
        { upload: conn.waUploadToServer }
      );
      return imageMessage;
    }

    const topDecoration = '┏━━━━━━━━━━━━━━━━⬣*';
    const bottomDecoration = '*┗━━━━━━━━━━━━━━━━⬣*';
    const botCredit = '';

    let cards = [];
    for (let i = 0; i < Math.min(results.length, 5); i++) {
      const res = results[i];

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `${topDecoration}

❲ ˼نتيجة رقم🔥˹ ❳ ${i + 1}*
*ــ͓ؔ͢✵  *${res.title}*
*ــ͓ؔ͢✵  ${res.description}

${bottomDecoration}
${botCredit}`
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: true,
          imageMessage: await createImageMessage(res.title)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🔗 فتح الرابط",
              url: res.link
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
              text: `🔍 *نتائج البحث عن:* 「${query}」\n\nقم باختيار واحدة من النتائج التالية:\n\n${botCredit}`
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
          })
        }
      }
    }, { quoted: m });

    await m.react("✅");
    await conn.relayMessage(m.chat, finalMessage.message, { messageId: finalMessage.key.id });

  } catch (err) {
    console.error(err);
    m.reply("❌ حدث خطأ أثناء جلب نتائج البحث.");
  }
};

handler.help = ['بحث', 'جوجل', 'google'];
handler.tags = ['tools'];
handler.command = /^بحث|جوجل|google$/i;

export default handler;