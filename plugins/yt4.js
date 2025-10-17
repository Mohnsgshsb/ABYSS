//plugin by noureddineouafy 
//scrape by Seaavey (THANKS bro)

import axios from "axios"

// Function to download YouTube media (audio or video)
const Download_YT = async (url, type = "audio") => {
  try {
    let payload = {
      height: type === "audio" ? 0 : 360,
      media_type: type,
      url
    };
    const { task_id } = await axios.post(`https://api.grabtheclip.com/submit-download`, payload).then(res => res.data);

    while (true) {
      const response = await axios.get(`https://api.grabtheclip.com/get-download/${task_id}`).then(res => res.data);

      if (response.status === "Success") {
        return response;
      } else if (response.status === "Failed") {
        console.error(response.result?.error);
        return undefined;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("خطأ أثناء جلب التحميل:", error);
    return undefined;
  }
};

// Main handler for the plugin
let handler = async (m, { conn, command, text }) => {
  try {
    const url = text.trim();
    let type = "";

    if (command === "yt4") {
      type = "audio";
    } else if (command === "ytttt") {
      type = "video";
    } else {
      return conn.sendMessage(m.chat, { text: "❌ أمر غير معروف." }, { quoted: m });
    }

    if (!url) {
      return conn.sendMessage(
        m.chat,
        { text: `🛑 يرجى إرسال رابط اليوتيوب. الصيغة:\n.${command} <الرابط>` },
        { quoted: m }
      );
    }

    await conn.sendMessage(
      m.chat,
      { text: `⏳ جاري تحميل ${type === "audio" ? "الصوت" : "الفيديو"}، الرجاء الانتظار...` },
      { quoted: m }
    );

    const download = await Download_YT(url, type);
    if (!download) {
      return conn.sendMessage(m.chat, { text: "⚠️ فشل تحميل الوسائط. حاول مرة أخرى لاحقًا." }, { quoted: m });
    }

    if (!download.result || !download.result.url) {
      return conn.sendMessage(m.chat, { text: `🚫 لم يتم العثور على رابط للوسائط. الرد:\n${JSON.stringify(download, null, 2)}` }, { quoted: m });
    }

    if (type === "audio") {
      // إرسال الصوت فقط دون نص
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: download.result.url },
          fileName: "audio.mp3",
          mimetype: "audio/mpeg"
        },
        { quoted: m }
      );
    } else {
      // إرسال الفيديو مع النص
      await conn.sendMessage(
        m.chat,
        {
          document: { url: download.result.url },
          fileName: "video.mp4",
          mimetype: "video/mp4",
          caption: "✅ تم تحميل الفيديو بنجاح!"
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("خطأ في المعالج:", error);
    await conn.sendMessage(m.chat, { text: "❗ حدث خطأ أثناء معالجة طلبك." }, { quoted: m });
  }
};

// Plugin metadata
handler.help = ["ytmp3", "ytmp4"];
handler.command = ["yt4", "ytttt"];
handler.tags = ["downloader"];
export default handler;