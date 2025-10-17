import fs from 'fs'
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from "@whiskeysockets/baileys"

const handler = async (m, { conn, args }) => {
  let ppgc
  try {
    ppgc = await conn.profilePictureUrl(m.chat, 'image')
  const groupMetadata = await conn.groupMetadata(group);
  const groupName = groupMetadata.subject;
  const groupDesc = groupMetadata.desc || 'لا يوجد وصف متاح';
  } catch {
    ppgc = 'https://files.catbox.moe/zsv3tg.jpg'
  }

  const ppgcbuff = await conn.getFile(ppgc)
  const device = await getDevice(m.key.id)

  if (device !== 'desktop' && device !== 'web') {
    const linkcode = await conn.groupInviteCode(m.chat)
    const messa = await prepareWAMessageMedia({ image: ppgcbuff.data }, { upload: conn.waUploadToServer })

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: '┏━━━━━━❰･𓃦･❱━━━━━━┓\n\n> ≡ ◡̈⃝❯ *\`『 اسم الجروب 🧚🏻‍♂️ 』\`*: ${groupName}\n> ≡ ◡̈⃝❯ *\`『 الوصف 』\`* ${groupDesc}\n\n♡         ㅤ    ❍ㅤ       ⎙ㅤ           ⌲\n┗━━━━━━❰･𓃠･❱━━━━━━┛' }, // حذف الرموز الغريبة
            footer: { text: `${global.wm}`.trim() },
            header: {
              hasMediaAttachment: true,
              imageMessage: messa.imageMessage
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'cta_copy',
                  buttonParamsJson: JSON.stringify({
                    display_text: '◞❐ نـسـخ الـرابـط╎📄◈',
                    copy_code: `https://chat.whatsapp.com/${linkcode}`,
                    id: `https://chat.whatsapp.com/${linkcode}`
                  })
                }
              ],
              messageParamsJson: ""
            }
          }
        }
      }
    }, { userJid: conn.user.jid, quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  } else {
    conn.reply(m.chat, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat), m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          description: null,
          title: '◞❐ مـعـلـومـات الـجـروب╎💈◈',
          body: global.wm,
          previewType: 0,
          thumbnailUrl: ppgc,
          sourceUrl: 'https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c'
        }
      }
    })
  }
}

handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^(لينك)$/i
handler.group = true
handler.botAdmin = true

export default handler