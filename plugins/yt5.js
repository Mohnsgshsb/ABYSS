import axios from 'axios';

const regex = /https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(\?[\w=&-]+)?|https:\/\/(?:www\.)?youtube\.com\/(?:shorts|watch)\/[a-zA-Z0-9_-]+(?:\?si=[a-zA-Z0-9_-]+)?/i;

const handler = async (m, { conn, args, command, usedPrefix }) => {
    try {
        if (!args[0]) {
            return m.reply(`❗ يرجى إدخال رابط يوتيوب!\n\n📌 مثال:\n${usedPrefix + command} https://youtu.be/Wky7Gz_5CZs`);
        }

        const isLink = args[0].match(regex);
        if (!isLink) {
            return m.reply("❌ هذا ليس رابط يوتيوب صالح!");
        }

        if (!conn.youtube) conn.youtube = {};
        if (typeof conn.youtube[m.sender] !== "undefined") {
            return m.reply("⚠️ لديك عملية تحميل جارية بالفعل! الرجاء الانتظار حتى تنتهي.");
        }

        await m.reply("⏳ جارٍ معالجة طلبك، يرجى الانتظار قليلًا...");
        conn.youtube[m.sender] = "loading";

        const response = await axios.get('https://api.vreden.my.id/api/ytmp3', {
            params: { url: args[0] },
        });

        const result = response.data;
        if (!result || result.status !== 200 || !result.result) {
            return m.reply("❌ حدث خطأ أثناء تحميل الصوت.");
        }

        const metadata = result.result.metadata;
        const download = result.result.download;

        if (!download || !download.url) {
            return m.reply("❌ الصوت غير متوفر للتنزيل.");
        }

        const caption = `🎵 *تحميل صوت من يوتيوب*

📌 *العنوان:* ${metadata.title}
⏱️ *المدة:* ${metadata.duration.timestamp}
👤 *القناة:* ${metadata.author.name}
👁️ *عدد المشاهدات:* ${metadata.views.toLocaleString()}
📅 *تاريخ النشر:* ${metadata.ago}`;

        // إرسال صورة الفيديو ومعلوماته
        await conn.sendMessage(m.chat, {
            image: { url: metadata.thumbnail },
            caption: caption
        }, { quoted: m });

        // إرسال ملف الصوت
        await conn.sendMessage(
            m.chat,
            { audio: { url: download.url }, mimetype: 'audio/mpeg', fileName: download.filename },
            { quoted: m }
        );

    } catch (error) {
        console.error(error);
        m.reply(`❌ حدث خطأ أثناء تحميل الصوت:\n${error.message}`);
    } finally {
        if (conn.youtube) {
            delete conn.youtube[m.sender];
        }
    }
};

handler.help = ['ytaudio2'];
handler.tags = ['downloader'];
handler.command = /^(yt5)$/i;

export default handler;