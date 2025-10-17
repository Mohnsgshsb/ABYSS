// SOURCE SCRAPER: https://whatsapp.com/channel/0029Vb5EZCjIiRotHCI1213L/436
// Edited & Fixed by 💘Mohnd🌷 — Buttons (MP3 / MP4) Version

import yts from "yt-search";
import fetch from "node-fetch";

const WAIT_REACTION = "⏳";
const SUCCESS_REACTION = "✅";
const ERROR_REACTION = "❌";

function parseDurationToSeconds(durationInput) {
  if (typeof durationInput === 'number') return durationInput;
  if (typeof durationInput !== 'string') return null;
  const parts = durationInput.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

const yt = {
  baseUrl: 'https://ssvid.net',
  headers: {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://ssvid.net',
    'referer': 'https://ssvid.net/youtube'
  },

  async hit(path, payload) {
    const body = new URLSearchParams(payload);
    const r = await fetch(this.baseUrl + path, { method: 'POST', headers: this.headers, body });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  },

  async download(queryOrYtUrl, format = 'mp3') {
    const search = await this.hit('/api/ajax/search', { query: queryOrYtUrl, vt: 'youtube' });
    if (!search || !search.links) throw new Error('لم يتم العثور على نتائج من السيرفر');

    let resultKey;
    if (format === 'mp3') {
      resultKey = search.links?.mp3?.mp3128?.k;
    } else {
      const mp4s = Object.values(search.links.mp4 || {});
      const selected = mp4s.find(v => v.q === format) || mp4s[0];
      resultKey = selected?.k;
    }

    if (!resultKey) throw new Error('لم يتم العثور على رابط التنزيل');
    const convert = await this.hit('/api/ajax/convert', { k: resultKey, vid: search.vid });
    if (!convert?.dlink) throw new Error('فشل التحويل أو لم يتم العثور على الرابط');

    return {
      ...convert,
      title: search.title,
      ftype: format,
      fquality: convert.q || 'N/A',
      thumb: search.thumb
    };
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `🌷 اكتب اسم أغنية أو رابط YouTube.\n\nمثال:\n${usedPrefix + command} let me down`
    );
  }

  // البحث في YouTube
  if (!text.includes("youtube.com") && !text.includes("youtu.be")) {
    const search = await yts(text);
    if (!search.videos.length) return m.reply("❌ لم يتم العثور على نتائج.");

    const vid = search.videos[0];
    const url = vid.url;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: vid.thumbnail },
        caption: `💘 *تم العثور على نتيجة:*\n\n🎵 ${vid.title}\n🕓 ${vid.timestamp}\n👤 ${vid.author.name}\n\n🍡 اختر نوع التحميل:`,
        footer: "🌹 Downloader By Mohnd 🌷",
        buttons: [
          { buttonId: `${usedPrefix + command} ${url} mp3`, buttonText: { displayText: "🎧 تحميل MP3" }, type: 1 },
          { buttonId: `${usedPrefix + command} ${url} mp4`, buttonText: { displayText: "🎬 تحميل MP4" }, type: 1 }
        ],
        headerType: 4
      },
      { quoted: m }
    );
    return;
  }

  // التحقق من التنسيق
  const args = text.trim().split(" ");
  const last = args[args.length - 1].toLowerCase();
  const format = ['mp3', 'mp4', '360p', '720p', '1080p'].includes(last) ? last : null;
  const query = format ? args.slice(0, -1).join(" ") : args.join(" ");

  if (!format) {
    await conn.sendMessage(
      m.chat,
      {
        text: "🍷 اختر نوع التحميل:",
        footer: "💘 Downloader By Mohnd 🌷",
        buttons: [
          { buttonId: `${usedPrefix + command} ${query} mp3`, buttonText: { displayText: "🎧 تحميل MP3" }, type: 1 },
          { buttonId: `${usedPrefix + command} ${query} mp4`, buttonText: { displayText: "🎬 تحميل MP4" }, type: 1 }
        ],
        headerType: 1
      },
      { quoted: m }
    );
    return;
  }

  // بدأ التحميل
  await m.react(WAIT_REACTION);
  try {
    const res = await yt.download(query, format === 'mp4' ? '720p' : 'mp3');
    const caption = `💘 *تم التحميل بنجاح!*\n\n🎵 *العنوان:* ${res.title}\n📽️ *النوع:* ${format.toUpperCase()}`;

    await conn.sendMessage(
      m.chat,
      {
        [format === 'mp3' ? 'audio' : 'video']: { url: res.dlink },
        mimetype: format === 'mp3' ? 'audio/mpeg' : 'video/mp4',
        caption
      },
      { quoted: m }
    );

    await m.react(SUCCESS_REACTION);
  } catch (e) {
    console.error(e);
    await m.reply(`❌ حدث خطأ أثناء التحميل:\n${e.message}`);
    await m.react(ERROR_REACTION);
  }
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = /^(اغنية|اغنيه)$/i;
handler.limit = true;

export default handler;