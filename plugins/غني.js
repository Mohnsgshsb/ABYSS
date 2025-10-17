import axios from "axios";
import ytSearch from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("*❐ أكتـب إسـم الأغنـية أو المغنـي لـلبحث...*");

  await m.react("🎧");

  try {
    const search = await ytSearch(text);
    const video = search.videos[0];

    if (!video) return m.reply("*❌ لـم يتم العثـور على نتـائج. جرب اسم آخر.*");

    const link = video.url;
    const apis = [
      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${link}`,
      `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${link}`
    ];

    for (const api of apis) {
      try {
        const { data } = await axios.get(api);

        if (data.status === 200 || data.success) {
          const audioUrl = data.result?.downloadUrl || data.url;
          const title = data.result?.title || video.title;
          const artist = data.result?.author || video.author.name;
          const thumbnail = data.result?.image || video.thumbnail;

          await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `
╭──〔 *مـعـلومـات الأغـنـيـة* 〕──╮
│• *الـعـنـوان:* ${title}
│• *المـغـنـي:* ${artist}
│• *الـمـدة:* ${video.timestamp}
│• *المـشـاهدات:* ${video.views.toLocaleString()}
╰───────────────╯
            `.trim()
          }, { quoted: m });

          await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: "audio/mp4"
          }, { quoted: m });

          await conn.sendMessage(m.chat, {
            document: { url: audioUrl },
            fileName: `${title}.mp3`,
            mimetype: "audio/mp3"
          }, { quoted: m });

          await m.reply("*✅ تـم إرسـال الأغنـيـة كـصوت ومـلـف.*");
          return;
        }
      } catch (err) {
        console.log(`⚠️ API خطأ (${api}):`, err.message);
        continue;
      }
    }

    return m.reply("*⚠️ جـمـيـع الـروابـط فـشـلـت. حـاول لاحقًا أو استخدم اسـم أقـل دقـة.*");
  } catch (error) {
    console.error("❌ خطأ:", error);
    return m.reply(`*❌ حـدث خـطـأ أثنـاء التحميـل:*\n${error.message}`);
  }
};

handler.help = ["اغنية"];
handler.tags = ["downloader"];
handler.command = /^غني$/i;

export default handler;