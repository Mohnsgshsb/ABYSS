import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import { savetube } from '../lib/yt-savetube.js' 
import { ogmp3 } from '../lib/youtubedl.js'; 
import { amdl, ytdown } from '../lib/scraper.js';  
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ytmp3, ytmp4 } = require("@hiudyy/ytdl");

async function tr(text) {
  return text; // ترجمة وهمية
}

const userRequests = {};
let handler = async (m, { conn, text, args, command }) => {
  if (!args[0]) throw `*🔎 ماذا تريد البحث؟ 🤔 الرجاء إدخال رابط اليوتيوب لتحميل الصوت أو الفيديو.*`

  const sendType = command.includes('doc') ? 'document' : command.includes('mp3') ? 'audio' : 'video';
  const yt_play = await search(args.join(' '));
  let youtubeLink = args[0].includes('you') ? args[0] : yt_play[0].url;

  if (userRequests[m.sender]) {
    return m.reply(`⏳ *يرجى الانتظار...* هناك طلب قيد المعالجة بالفعل، الرجاء انتظار انتهائه قبل إرسال طلب آخر.`)
  }
  userRequests[m.sender] = true;
  try {
    if (command.match(/ytmp3|fgmp3|ytmp3doc/)) {
      m.reply([
        `⌛ انتظر من فضلك... ✋ جاري تنزيل الصوت الخاص بك 🎵`,
        `⌛ جارٍ المعالجة... 🛠️\n*أنا أحاول تنزيل الصوت الخاص بك، الرجاء الانتظار 🏃‍♂️💨*`,
        `تمهل قليلًا 😎\n\n*تأكد من كتابة اسم الأغنية أو رابط الفيديو بشكل صحيح.*\n\n> *إذا لم يعمل أمر *ytmp3 جرب *ytmp3doc*`
      ].getRandom())

      try {
        const result = await savetube.download(args[0], 'mp3')
        const data = result.result
        await conn.sendMessage(m.chat, { [sendType]: { url: data.download }, mimetype: 'audio/mpeg', fileName: `audio.mp3`, caption: `🎵 إليك الصوت الخاص بك!` }, { quoted: m });
      } catch {
        try {
          const res = await ogmp3.download(yt_play[0].url, '320', 'audio');
          await conn.sendMessage(m.chat, { [sendType]: { url: res.result.download }, mimetype: 'audio/mpeg', fileName: `audio.mp3`, caption: `🎵 إليك الصوت الخاص بك!` }, { quoted: m });
        } catch {
          try {
            const audiodlp = await ytmp3(args);
            conn.sendMessage(m.chat, { [sendType]: audiodlp, mimetype: "audio/mpeg", caption: `🎵 إليك الصوت الخاص بك!` }, { quoted: m });
          } catch {
            try {
              const format = args[1] || '720p';
              const response = await amdl.download(args[0], format);
              const { title, type, download } = response.result;
              if (type === 'audio') {
                await conn.sendMessage(m.chat, { [sendType]: { url: download }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`, caption: `🎵 إليك الصوت الخاص بك!` }, { quoted: m });
              }
            } catch {
              try {
                const response = await ytdown.download(args[0], 'mp3');
                const { title, type, download } = response;
                if (type === 'audio') {
                  await conn.sendMessage(m.chat, { [sendType]: { url: download }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`, caption: `🎵 إليك الصوت الخاص بك!` }, { quoted: m });
                }
              } catch {
                try {
                  const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${args}`);
                  let { data } = await res.json();
                  await conn.sendMessage(m.chat, { [sendType]: { url: data.dl }, mimetype: 'audio/mpeg', fileName: `audio.mp3`, caption: `🎵 إليك الصوت الخاص بك!` }, { quoted: m });
                } catch {
                  try {
                    const res = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${args}`)
                    let data = await res.json();
                    await conn.sendMessage(m.chat, { [sendType]: { url: data.data.downloadUrl }, mimetype: 'audio/mpeg', fileName: `audio.mp3`, caption: `🎵 إليك الصوت الخاص بك!` }, { quoted: m });
                  } catch {
                    throw '❌ تعذر تحميل الصوت. تأكد من الرابط أو حاول لاحقًا.'
                  }
                }
              }
            }
          }
        }
      }
    }

    if (command.match(/ytmp4|fgmp4|ytmp4doc/)) {
      m.reply([
        `⌛ انتظر من فضلك... ✋ جاري تنزيل الفيديو الخاص بك 🎬`,
        `⌛ جارٍ المعالجة... 🛠️\n*أنا أحاول تنزيل الفيديو الخاص بك، الرجاء الانتظار 🏃‍♂️💨*`,
        `تمهل قليلًا ✋🥸🤚\n\n*أنا بصدد تحميل الفيديو الخاص بك 🔄*\n\n> *يرجى الانتظار قليلًا...*`
      ].getRandom())
      try {
        const result = await savetube.download(args[0], "720")
        const data = result.result
        await conn.sendMessage(m.chat, { [sendType]: { url: data.download }, mimetype: 'video/mp4', fileName: `${data.title}.mp4`, caption: `🎬 إليك الفيديو الخاص بك:\n🔥 العنوان: ${data.title}` }, { quoted: m });
      } catch {
        try {
          const video = await ytmp4(args);
          await conn.sendMessage(m.chat, { [sendType]: { url: video }, fileName: `video.mp4`, mimetype: 'video/mp4', caption: `🎬 إليك الفيديو الخاص بك:\n🔥 العنوان: ${yt_play[0].title}` }, { quoted: m });
        } catch {
          try {
            const res = await ogmp3.download(yt_play[0].url, '720', 'video');
            await conn.sendMessage(m.chat, { [sendType]: { url: res.result.download }, mimetype: 'video/mp4', caption: `🎬 إليك الفيديو الخاص بك:\n🔥 العنوان: ${yt_play[0].title}` }, { quoted: m });
          } catch {
            try {
              const response = await amdl.download(args[0], '720p');
              const { title, type, download } = response.result;
              if (type === 'video') {
                await conn.sendMessage(m.chat, { [sendType]: { url: download }, mimetype: 'video/mp4', caption: `🎬 إليك الفيديو الخاص بك:\n🔥 العنوان: ${title}` }, { quoted: m });
              }
            } catch {
              try {
                const response = await ytdown.download(args[0], 'mp4');
                const { title, type, download } = response;
                if (type === 'video') {
                  await conn.sendMessage(m.chat, { [sendType]: { url: download }, mimetype: 'video/mp4', caption: `🎬 إليك الفيديو الخاص بك:\n🔥 العنوان: ${title}` }, { quoted: m });
                }
              } catch {
                try {
                  const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${args}`);
                  let { data } = await res.json();
                  await conn.sendMessage(m.chat, { [sendType]: { url: data.dl }, mimetype: 'video/mp4', fileName: `video.mp4`, caption: `🎬 إليك الفيديو الخاص بك:\n🔥 العنوان: ${yt_play[0].title}` }, { quoted: m });
                } catch {
                  try {
                    const res = await fetch(`https://api.agatz.xyz/api/ytmp4?url=${args}`)
                    let data = await res.json();
                    await conn.sendMessage(m.chat, { [sendType]: { url: data.data.downloadUrl }, mimetype: 'video/mp4', fileName: `video.mp4`, caption: `🎬 إليك الفيديو الخاص بك:\n🔥 العنوان: ${yt_play[0].title}` }, { quoted: m });
                  } catch {
                    throw '❌ تعذر تحميل الفيديو. تأكد من الرابط أو حاول لاحقًا.'
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    m.react("❌")
  } finally {
    delete userRequests[m.sender];
  }
}

handler.help = ['ytmp3', 'ytmp4'];
handler.tags = ['downloader'];
handler.command = /^ytmp3|ytmp4|fgmp4|audio|fgmp3|dlmp3|ytmp4doc|ytmp3doc?$/i
export default handler

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'ar', gl: 'EG', ...options });
  return search.videos;
}