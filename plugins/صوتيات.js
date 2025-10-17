import { unlinkSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, __dirname, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.mimetype || '')

    if (q && (mime.startsWith('audio') || q.audio || q.ptt)) {
      let set
      if (/عميق/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'
      if (/منفوخ/.test(command)) set = '-af acrusher=.1:1:64:0:log'
      if (/تخين/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
      if (/صاخب/.test(command)) set = '-af volume=12'
      if (/سريع/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
      if (/تخينن/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
      if (/رفيع/.test(command)) set = '-filter:a "atempo=1.06,asetrate=44100*1.25"'
      if (/تقطيع/.test(command)) set = '-filter_complex "areverse"'
      if (/روبوت/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
      if (/بطيء/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
      if (/ناعم/.test(command)) set = '-filter:a "atempo=1.1,asetrate=44100"'
      if (/سنجاب/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'

      if (!set) throw '❌ تأثير غير معروف.'

      let tmpPath = join(__dirname, '../tmp')
      if (!existsSync(tmpPath)) mkdirSync(tmpPath)

      let ran = getRandom('.mp3')
      let filename = join(tmpPath, ran)
      let media = await q.download(true)

      exec(`ffmpeg -i "${media}" ${set} "${filename}"`, async (err, stderr, stdout) => {
        unlinkSync(media)
        if (err) {
          console.error('FFmpeg Error:', stderr)
          throw '❌ حدث خطأ أثناء معالجة الصوت.'
        }

        let buff = readFileSync(filename)
        if (buff.length < 1000) throw '❌ الملف الناتج صغير جدًا أو غير صالح للإرسال.'

        await conn.sendMessage(m.chat, {
          audio: buff,
          mimetype: 'audio/mpeg',
          fileName: ran
        }, { quoted: m })

        setTimeout(() => {
          if (existsSync(filename)) unlinkSync(filename)
        }, 3000)
      })
    } else {
      throw `❗ *يرجى الرد على رسالة صوتية لاستخدام الأمر:* ${usedPrefix + command}`
    }
  } catch (e) {
    throw e
  }
}

handler.help = ['عميق','منفوخ','تخين','صاخب','سريع','تخينن','رفيع','تقطيع','روبوت','بطيء','ناعم','سنجاب'].map(v => v + ' [رد على صوت]')
handler.tags = ['audio']
handler.command = /^(عميق|منفوخ|تخين|صاخب|سريع|تخينن|رفيع|تقطيع|روبوت|بطيء|ناعم|سنجاب)$/i

export default handler

const getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`