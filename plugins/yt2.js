import yts from 'yt-search';
import axios from 'axios';

let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`❗ من فضلك أدخل اسم الأغنية.\nمثال: *${command} lucid dreams*`);

    try {
        // إرسال رد فعل أثناء البحث
        conn.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

        // البحث في يوتيوب
        let searchResults = await yts(text);
        if (searchResults.all.length === 0) return m.reply("❌ لم يتم العثور على فيديو أو لا يمكن تحميله.");

        let videos = searchResults.all.filter(v => v.type === 'video');
        if (videos.length === 0) return m.reply("❌ لم يتم العثور على مقاطع فيديو.");

        let video = videos[0];
        let thumbnailUrl = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

        const caption = `╭───⧉ *『 🎵 تشغيل الموسيقى 』* ⧉───╮

📺 *『 القناة 』:* ${video.author.name}
👁️ *『 المشاهدات 』:* ${video.views} مشاهدة
⏱️ *『 المدة 』:* ${video.timestamp}
🔗 *『 رابط التشغيل 』:* ${video.url}

╰────⧉ *『 🎧 جاري إرسال الصوت... 』*`;

        await conn.sendMessage(m.chat, {
            contextInfo: { 
                externalAdReply: { 
                    showAdAttribution: true, 
                    title: video.title,
                    body: new Date().toLocaleString('ar-EG'),														
                    mediaType: 2,  
                    renderLargerThumbnail: true,
                    thumbnail: { url: thumbnailUrl },
                    mediaUrl: video.url,
                    sourceUrl: video.url
                }
            },
            image: { url: thumbnailUrl },
            text: caption
        }, { quoted: m });

        // تحميل الصوت باستخدام الـ API
        let response = await fetch(`https://ochinpo-helper.hf.space/yt?query=${text}`).then(res => res.json());
        let audioUrl = response.result.download.audio;

        const audioMessage = await conn.sendMessage(m.chat, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mpeg', 
            ptt: true // إرسالها كرسالة صوتية
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '🎶', key: audioMessage.key } });

    } catch (err) {
        console.error(err);
        m.reply(`❌ حدث خطأ أثناء معالجة طلبك:\n${err.message}`);
    }
};

handler.help = handler.command = ['yt2'];
handler.tags = ['downloader'];
export default handler;