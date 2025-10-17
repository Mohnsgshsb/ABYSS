import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text || !text.includes('tiktok')) {
    return conn.reply(m.chat, '📌 أرسل رابط TikTok صالح أولاً', m)
  }

  try {
    let response = await axios.post(
      'https://lovetik.com/api/ajax/search',
      new URLSearchParams({ query: text }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Referer': 'https://lovetik.com/',
          'Origin': 'https://lovetik.com',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    )

    const res = response.data

    if (!res || !res.links || !res.links[0] || !res.cover) {
      return conn.reply(m.chat, '❌ لم أستطع جلب الفيديو من الرابط المرسل', m)
    }

    const title = res.desc || 'فيديو من TikTok'
    const author = res.author || 'غير معروف'
    const music = res.music || 'غير معروف'

    const caption = `
🧚 *←* *العنوان:* ${title}
🧚 *←* *المستخدم:* ${author}
🧚 *←* *الصوت:* ${music}
🧚 *←* *الرابط:* ${text}
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: res.cover },
      caption: caption,
      buttons: [
        { buttonId: `${usedPrefix}تيك2 ${text}`, buttonText: { displayText: '『🍡 | تــيـك 1 | 🍡』' }, type: 1 },
        { buttonId: `${usedPrefix}تيك1 ${text}`, buttonText: { displayText: '『🍡 | تــيـك 2 | 🍡』' }, type: 1 },
        { buttonId: `${usedPrefix}tiktokmp3 ${text}`, buttonText: { displayText: '『🍡 | صوتي | 🍡』' }, type: 1 }
      ],
      footer: '🍡 *| اختار نوع التحميل*',
      headerType: 4 // صورة مع أزرار
    }, { quoted: m })

  } catch (err) {
    console.error('TikTok Error:', err)
    conn.reply(m.chat, '⚠️ حصل خطأ أثناء تحميل الفيديو، جرب مرة تانية.', m)
  }
}

handler.command = /^تيك$/i
export default handler