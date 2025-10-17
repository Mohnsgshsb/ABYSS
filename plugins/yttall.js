import axios from 'axios';

let handler = async (m, { conn, args, command }) => {
  let url = args[0];
  if (!url) return m.reply(`❗ الرجاء إدخال رابط YouTube.\nمثال:\n*.${command} https://youtu.be/dQw4w9WgXcQ*`);
  if (!isValidYouTubeUrl(url)) return m.reply(`❌ الرابط غير صالح، يجب أن يكون رابط YouTube.`);

  m.reply("⏳ جاري معالجة الفيديو، الرجاء الانتظار...");

  let quality = getQualityFromCommand(command);

  let result = await ytdl(url, quality);

  if (!result.success) return m.reply(`❌ خطأ: ${result.error.message}`);

  let { title, downloadUrl, image, type, quality: q } = result.data;

  await conn.sendMessage(m.chat, { 
    video: { url: downloadUrl }, 
    caption: `🎬 *${title}*\n📥 الجودة: ${q}`
  }, { quoted: m });
};

handler.help = ['ytt360', 'ytt480', 'ytt720', 'ytt1080', 'yttaudio'];
handler.tags = ['downloader'];
handler.command = ['ytt360', 'ytt480', 'ytt720', 'ytt1080', 'yttaudio'];

export default handler;

// ✅ الأدوات المدمجة

function isValidYouTubeUrl(url) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
}

function getQualityFromCommand(command) {
  if (command.includes('360')) return '360';
  if (command.includes('480')) return '480';
  if (command.includes('720')) return '720';
  if (command.includes('1080')) return '1080';
  if (command.includes('audio')) return 'audio';
  return '720';
}

async function ytdl(url, quality = "720") {
  try {
    const validQuality = {
      "360": 360,
      "480": 480,
      "720": 720,
      "1080": 1080,
      "audio": "mp3",
    };

    if (!Object.keys(validQuality).includes(quality)) {
      return {
        success: false,
        error: {
          message: "⚠️ الجودة غير صالحة. الجودات المدعومة: " + Object.keys(validQuality).join(', ')
        }
      };
    }

    const q = validQuality[quality];

    const { data: firstRequest } = await axios.get(
      `https://p.oceansaver.in/ajax/download.php?button=1&start=1&end=1&format=${q}&iframe_source=https://allinonetools.com/&url=${encodeURIComponent(url)}`,
      {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );

    if (!firstRequest || !firstRequest.progress_url) {
      return {
        success: false,
        error: { message: "فشل بدء عملية التحميل." }
      };
    }

    const { progress_url } = firstRequest;
    let attempts = 0, maxAttempts = 40, datas;

    do {
      if (attempts >= maxAttempts) {
        return { success: false, error: { message: "⏱️ استغرقت العملية وقتاً طويلاً." } };
      }

      await new Promise(r => setTimeout(r, 3000));

      try {
        const { data } = await axios.get(progress_url, {
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        datas = data;
      } catch {}

      attempts++;
    } while (!datas?.download_url);

    return {
      success: true,
      data: {
        title: firstRequest.info?.title || "Unknown Title",
        image: firstRequest.info?.image || "",
        downloadUrl: datas.download_url,
        quality,
        type: quality === "audio" ? "mp3" : "mp4"
      }
    };

  } catch (error) {
    return {
      success: false,
      error: {
        message: error.response?.data?.message || error.message || "❌ حدث خطأ أثناء التحميل."
      }
    };
  }
}