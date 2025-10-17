import axios from 'axios'

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('❌ يرجى وضع رابط تيك توك بعد الأمر.\nمثال: تيك https://vm.tiktok.com/ZSkRbdmUy/')
  let url = args[0]
  m.reply('⏳ جارٍ تحميل الفيديو، يرجى الانتظار...')

  try {
    let res = await axios.post(
      'https://lovetik.com/api/ajax/search',
      new URLSearchParams({ 'query': url }),
      {
        headers: {
          'Host': 'lovetik.com',
          'Connection': 'keep-alive',
          'sec-ch-ua-platform': '"Android"',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 14; 22120RN86G Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.125 Mobile Safari/537.36',
          'Accept': '*/*',
          'sec-ch-ua': '"Chromium";v="136", "Android WebView";v="136", "Not.A/Brand";v="99"',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'sec-ch-ua-mobile': '?1',
          'Origin': 'https://lovetik.com',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Referer': 'https://lovetik.com/',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
        }
      }
    )

    const result = res.data
    if (!result || !result.links?.[0]?.a) throw new Error('لم يتم العثور على فيديو أو الرابط غير صالح.')

    const videoUrl = result.links[0].a // بدون العلامة المائية
    const title = result.desc || 'بدون عنوان'
    const thumbnail = result.cover || null

    // إرسال معلومات الفيديو والصورة المصغرة
    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: `🎬 *العنوان:* ${title}\n🔗 *الرابط:* ${url}\n📥 *جاري إرسال الفيديو بدون علامة مائية...*`
    }, { quoted: m })

    // إرسال الفيديو
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: '✅ *تم التحميل بنجاح!*'
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ حدث خطأ أثناء التحميل: ' + e.message)
  }
}

handler.command = /^تيك1$/i
export default handler