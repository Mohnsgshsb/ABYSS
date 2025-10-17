import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  if (!m.message?.viewOnceMessageV2 && !m.message?.viewOnceMessageV2Extension) return

  const type = m.message?.viewOnceMessageV2?.message 
             ? Object.keys(m.message.viewOnceMessageV2.message)[0] 
             : Object.keys(m.message.viewOnceMessageV2Extension.message)[0]

  const msg = m.message.viewOnceMessageV2?.message?.[type] || m.message.viewOnceMessageV2Extension?.message?.[type]

  if (!msg) return

  let mediaType = ''
  if (type === 'imageMessage') mediaType = 'image'
  else if (type === 'videoMessage') mediaType = 'video'
  else if (type === 'audioMessage') mediaType = 'audio'
  else return

  const stream = await downloadContentFromMessage(msg, mediaType)
  let buffer = Buffer.from([])

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }

  let filename = `antiviewonce.${mediaType === 'audio' ? 'mp3' : mediaType === 'video' ? 'mp4' : 'jpg'}`
  await conn.sendFile(m.chat, buffer, filename, `❐╎تم كشف عرض لمرة واحدة`, m)
}

handler.before = true
handler.group = true
handler.private = true
handler.tag = 'group'
handler.disabled = false
export default handler