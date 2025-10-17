import axios from 'axios';

let handler = async (m, { conn, command }) => {
  // رسالة توضيحية للمستخدم عند كتابة الأمر بدون صورة
  if (!m.quoted && !m.msg.imageMessage && !m.msg.videoMessage) {
    return await conn.reply(m.chat,
      `🧞 يرجى إرسال صورة مع الأمر أو الرد على صورة بالأمر: *${command}*\n\n` +
      `🧞 مثال:\n` +
      `- أرسل صورة مع تعليق: ${command}\n` +
      `- أو رد على صورة بالأمر: ${command}\n\n` +
      `🅜🅘🅝🅐🅣🅞 🅑🅞🅣🧞`, m);
  }

  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  if (!mime) return await conn.reply(m.chat,
    `🧞 الرجاء إرسال صورة مع تعليق أو الرد على صورة بالأمر *${command}* 🧞\n\n🅜🅘🅝🅐🅣🅞 🅑🅞🅣🧞`, m);

  if (!/image\/(jpe?g|png)/.test(mime)) return await conn.reply(m.chat,
    `🧞 الملف المرسل ليس صورة! فقط صيغة JPG/JPEG/PNG مدعومة. 🧞\n\n🅜🅘🅝🅐🅣🅞 🅑🅞🅣🧞`, m);

  try {
    await conn.sendMessage(m.chat, { react: { text: '🧑‍🦲', key: m.key } });

    const imgBuffer = await q.download();
    const FormData = (await import('form-data')).default;
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', imgBuffer, { filename: 'image.jpg', contentType: mime });

    const catboxRes = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders(),
    });

    const imageUrl = catboxRes.data;
    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.includes('catbox.moe')) {
      throw new Error('فشل رفع الصورة إلى Catbox.');
    }

    const defaultText = 'تم جعل الرأس أصلع';
    const apiUrl = `https://api.ubed.my.id/maker/Jadi-Apa-Aja?apikey=free1&imageUrl=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(defaultText)}`;

    const { data: resultBuffer } = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    if (!resultBuffer || resultBuffer.byteLength < 100) {
      throw new Error('فشل الحصول على الصورة من API.');
    }

    await conn.sendMessage(m.chat, {
      image: resultBuffer,
      caption: `🧞 هذه هي النتيجة: *${defaultText}* 🧞\n\n🅜🅘🅝🅐🅣🅞 🅑🅞🅣🧞`,
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error("🧞 خطأ في معالج أمر أصلع:", err);
    try {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    } catch (e) {}
    await conn.reply(m.chat, `🧞 ❌ حدث خطأ أثناء معالجة الصورة. 🧞\n\n🅜🅘🅝🅐🅣🅞 🅑🅞🅣🧞`, m);
  }
};

// تعريف الأوامر بالإنجليزي والعربي معاً
handler.help = ['botakkan', 'اصلع2'];
handler.tags = ['ai', 'image'];
handler.command = /^(botakkan|اصلع2)$/i;
handler.limit = 1;
handler.register = true;
handler.premium = false;

export default handler;