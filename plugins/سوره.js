/*
YouTube Quran Player 🕋
تشغيل سور القرآن الكريم بدون أخطاء حماية
*/

import yts from 'yt-search';
import axios from 'axios';

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🕋 ❎ يرجى كتابة اسم السورة!\n\n📌 مثال:\n*${usedPrefix + command} الكهف*`;

  try {
    await m.react?.('🔍');

    let res = await yts(`سورة ${text} كاملة`);
    let vid = res.videos.find(v => v.seconds > 120);
    if (!vid) throw '❎ لم يتم العثور على تلاوة مناسبة للسورة المطلوبة.';

    // استعمال API لتحميل الصوت
    let apiRes = await axios.get(`https://api.akuari.my.id/downloader/youtube?link=${vid.url}`);
    let audioUrl = apiRes.data.mp3?.url;

    if (!audioUrl) throw '❎ لم يتم الحصول على الصوت. حاول مرة أخرى.';

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: vid.title,
          body: 'تلاوة مباركة من القرآن الكريم',
          mediaType: 2,
          mediaUrl: vid.url,
          thumbnail: vid.thumbnail,
          sourceUrl: vid.url,
          renderLargerThumbnail: true,
        }
      }
    }, { quoted: m });

    await m.react?.('✅');

  } catch (e) {
    console.error(e);
    await m.react?.('❌');
    throw `🕋 ❎ تعذر تشغيل السورة.\n\n📋 التفاصيل: ${e.message || e}`;
  }
};

handler.before = async (m, { command, usedPrefix }) => {
  if (!m.text) {
    let example = `${usedPrefix}${command} الكهف`;
    throw `🕋 طريقة الاستخدام:\n\nاكتب اسم السورة بعد الأمر لتشغيلها.\n\n📌 مثال:\n*${example}*\n\n📖 يتم التشغيل من YouTube بصوت جميل.`;
  }
};

handler.help = ['قران', 'القران', 'سورة', 'سوره'];
handler.command = /^سورة|سوره$/i;
handler.tags = ['religion'];
handler.limit = true;

export default handler;