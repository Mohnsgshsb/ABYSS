/*
  💘 واقعي AI مولّد الصور
  🌷 instagram.com/noureddine_ouafy
  🧚 صنع بواسطة SaaOffc + تعديل التنسيق بالعربية 💫
*/

import axios from 'axios'
import FormData from 'form-data'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

const styleMap = {
  photorealistic: 'نمط واقعي',
  cinematic: 'نمط سينمائي',
  hyperreal: 'نمط فائق الواقعية',
  portrait: 'نمط بورتريه'
}

const resolutionMap = {
  '512x512': 'دقّة 512x512',
  '768x768': 'دقّة 768x768',
  '1024x1024': 'دقّة 1024x1024',
  '1920x1080': 'دقّة 1920x1080'
}

async function generateRealisticImage({ prompt, style = 'photorealistic', resolution = '768x768', seed = null }) {
  const form = new FormData()
  form.append('action', 'generate_realistic_ai_image')
  form.append('prompt', `${style}: ${prompt}`)
  form.append('seed', (seed || Math.floor(Math.random() * 100000)).toString())
  form.append('width', resolution.split('x')[0])
  form.append('height', resolution.split('x')[1])

  try {
    const res = await axios.post('https://realisticaiimagegenerator.com/wp-admin/admin-ajax.php', form, {
      headers: {
        ...form.getHeaders(),
        'origin': 'https://realisticaiimagegenerator.com',
        'referer': 'https://realisticaiimagegenerator.com/',
        'user-agent': 'Mozilla/5.0',
      }
    })

    const json = res.data
    if (json?.success && json.data?.imageUrl) {
      return { success: true, url: json.data.imageUrl }
    } else {
      return { success: false, error: '❌ لم يتم العثور على نتيجة مناسبة.' }
    }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    const styleRows = Object.keys(styleMap).map(k => ({
      header: `🎨 ${styleMap[k]}`,
      title: `🧚 اختر النمط: ${styleMap[k]}`,
      description: `🌷 توليد صورة بالنمط ${styleMap[k]}`,
      id: `${usedPrefix}${command} ${k}|768x768|وصف الصورة هنا`
    }))

    const resoRows = Object.keys(resolutionMap).map(k => ({
      header: `📐 ${resolutionMap[k]}`,
      title: `💘 اختر الدقّة ${k}`,
      description: `🍡 استخدم ${k} لجودة مختلفة`,
      id: `${usedPrefix}${command} photorealistic|${k}|وصف الصورة هنا`
    }))

    const mediaMessage = await prepareWAMessageMedia({
      image: { url: "https://files.catbox.moe/3n2vrv.jpg" }
    }, { upload: conn.waUploadToServer })

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              hasMediaAttachment: true,
              imageMessage: mediaMessage.imageMessage
            },
            body: { text: "🌹 *اختر النمط أو الدقّة لتوليد الصورة بالذكاء الاصطناعي 💘*" },
            footer: { text: "🧚 بوت الصور الواقعية | الإصدار العربي 🌷" },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                    title: "🎨 اختر النمط",
                    sections: [{ title: "🩵 الأنماط المتاحة", rows: styleRows }]
                  })
                },
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                    title: "📐 اختر الدقّة",
                    sections: [{ title: "🍷 الدقّات المتاحة", rows: resoRows }]
                  })
                }
              ]
            }
          }
        }
      }
    }, { userJid: conn.user.jid, quoted: m })

    return await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  }

  const [style = 'photorealistic', resolution = '768x768', ...promptArr] = text.split('|').map(v => v.trim())
  const prompt = promptArr.join(' ')
  if (!prompt) return m.reply('🍷 اكتب وصف الصورة بعد النمط والدقّة يا جميل 🌹')

  await m.reply('⏳ جاري توليد الصورة... 💘 انتظر لحظات 🌷')

  const result = await generateRealisticImage({ prompt, style, resolution })
  if (result.success) {
    await conn.sendFile(m.chat, result.url, 'ai-image.jpg', `🖼️ *الصورة المطلوبة:*\n${prompt}\n\n🎨 النمط: ${styleMap[style]}\n📐 الدقّة: ${resolution}`, m)
  } else {
    m.reply(`❌ حدث خطأ أثناء التوليد:\n${result.error}`)
  }
}

handler.help = ['aiصورة']
handler.tags = ['ai']
handler.command = ['aiصورة', 'توليد-صوره']
handler.limit = true

export default handler