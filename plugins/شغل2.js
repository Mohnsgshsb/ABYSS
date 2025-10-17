import yts from "yt-search";
import crypto from "crypto";
import axios from "axios";

const limit = 100;

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("📌 *اكتب اسم او رابط فيديو على اليوتيوب.*");
  m.react("⏳");
  let res = await yts(text);
  if (!res || !res.all || res.all.length === 0) {
    return m.reply("🚫 لم يتم العثور على نتائج للبحث.");
  }
  let video = res.all[0];

  const cap = `
╭── ⏤͟͟͞͞★ 『 تشغيل يوتيوب 』 ★──╮
🎵 *العنوان*: ${video.title}
👤 *المؤلف*: ${video?.author?.name || 'غير متوفر'}
⏱️ *المدة*: ${video?.duration?.timestamp || 'غير متوفر'}
👁️ *المشاهدات*: ${video.views}
🔗 *الرابط*: ${video.url}
╰── ⏤͟͟͞͞★ 『 تشغيل يوتيوب 』 ★──╯
`.trim();

  const response = await fetch(video.thumbnail);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await conn.sendFile(m.chat, buffer, "image.jpg", cap, m);

  try {
    if (command === "الصوت") {
      const api = await yta(video.url);
      await conn.sendFile(m.chat, api.result.download, api.result.title, ``, m);
    } else if (command === "فيديو1") {
      const api = await ytv(video.url);
      const res = await fetch(api.url);
      const cont = res.headers.get('Content-Length');
      const sizemb = parseInt(cont, 10) / (1024 * 1024);
      const doc = sizemb >= limit;
      await conn.sendFile(m.chat, api.url, api.title, ``, m, null, { asDocument: doc, mimetype: "video/mp4" });
    }
    await m.react("✔️");
  } catch (error) {
    return m.reply(`❌ ${error.message}`);
  }
};

handler.help = ["الصوت", "فيديو"];
handler.tags = ["تنزيل"];
handler.command = ["الصوت", "فيديو1"];
export default handler;

// === دالة تحميل الصوت ===
async function yta(link) {
  const format = "mp3";
  const apiBase = "https://media.savetube.me/api";
  const apiCDN = "/random-cdn";
  const apiInfo = "/v2/info";
  const apiDownload = "/download";

  const decryptData = async (enc) => {
    try {
      const key = Buffer.from('C5D58EF67A7584E4A29F6C35BBC4EB12', 'hex');
      const data = Buffer.from(enc, 'base64');
      const iv = data.slice(0, 16);
      const content = data.slice(16);
      const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
      let decrypted = decipher.update(content);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return JSON.parse(decrypted.toString());
    } catch (error) {
      return null;
    }
  };

  const request = async (endpoint, data = {}, method = 'post') => {
    try {
      const { data: response } = await axios({
        method,
        url: `${endpoint.startsWith('http') ? '' : apiBase}${endpoint}`,
        data: method === 'post' ? data : undefined,
        params: method === 'get' ? data : undefined,
        headers: {
          'accept': '*/*',
          'content-type': 'application/json',
          'origin': 'https://yt.savetube.me',
          'referer': 'https://yt.savetube.me/',
          'user-agent': 'Postify/1.0.0'
        }
      });
      return { status: true, data: response };
    } catch (error) {
      return { status: false, error: error.message };
    }
  };

  const youtubeID = link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  if (!youtubeID) return { status: false, error: "فشل في استخراج ID الفيديو من الرابط." };

  const qualityOptions = ['1080', '720', '480', '360', '240'];
  try {
    const cdnRes = await request(apiCDN, {}, 'get');
    if (!cdnRes.status) return cdnRes;
    const cdn = cdnRes.data.cdn;
    const infoRes = await request(`https://${cdn}${apiInfo}`, { url: `https://www.youtube.com/watch?v=${youtubeID[1]}` });
    if (!infoRes.status) return infoRes;

    const decrypted = await decryptData(infoRes.data.data);
    if (!decrypted) return { status: false, error: "فشل في فك تشفير بيانات الفيديو." };

    let downloadUrl = null;
    for (const quality of qualityOptions) {
      const downloadRes = await request(`https://${cdn}${apiDownload}`, {
        id: youtubeID[1],
        downloadType: 'audio',
        quality,
        key: decrypted.key
      });
      if (downloadRes.status && downloadRes.data.data.downloadUrl) {
        downloadUrl = downloadRes.data.data.downloadUrl;
        break;
      }
    }
    if (!downloadUrl) return { status: false, error: "لم يتم العثور على رابط تنزيل صالح." };
    const fileResponse = await axios.head(downloadUrl);
    const size = fileResponse.headers['content-length'];

    return {
      status: true,
      result: {
        title: decrypted.title || "غير معروف",
        type: 'audio',
        format,
        download: downloadUrl,
        size: size ? `${(size / 1024 / 1024).toFixed(2)} MB` : 'غير معروف'
      }
    };
  } catch (error) {
    return { status: false, error: error.message };
  }
}

// === دالة تحميل الفيديو ===
async function ytv(url) {
  const headers = {
    "accept": "*/*",
    "accept-language": "ar,en;q=0.9",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "Referer": "https://id.ytmp3.mobi/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };
  const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
  const init = await initial.json();
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;
  const converts = await fetch(convertURL, { headers });
  const convert = await converts.json();

  let info = {};
  for (let i = 0; i < 3; i++) {
    const progressResponse = await fetch(convert.progressURL, { headers });
    info = await progressResponse.json();
    if (info.progress === 3) break;
  }

  return {
    url: convert.downloadURL,
    title: info.title
  };
}