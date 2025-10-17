// instagram.com/noureddine_ouafy
import fetch from "node-fetch"
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys"

let handler = async (m, { conn, text }) => {
  if (!text) throw "This command is for searching on YouTube, for example:\n.ytfinder noureddine ouafy"

  const regex = /^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+$/
  const isMatch = regex.test(text)

  if (isMatch) {
    let ress = await (await fetch("https://backendace.1010diy.com/web/free-mp3-finder/detail?url=" + text)).json()
    let res = ress.data

    let audioList = res.audios.map((item, index) => {
  return `╭─『 🎧 AUDIO ${index + 1} 』─╮
 *『 الصيغة 』:* ${item.ext}
 *『 الحجم 』:* ${item.fileSize}
 *『 الرابط 』:* ${item.url.replace("/download?url=", "")}
 *『 الجودة 』:* ${item.formatNote}
 *『 HD 』:* ${item.hd ? 'نعم' : 'لا'}
 *『 Pro 』:* ${item.pro ? 'نعم' : 'لا'}
╰──────────────╯`
}).join("\n\n")

    let videoList = res.videos.map((item, index) => {
      return ` ╭─『 🎧 VIDEO ${index + 1} 』─╮
 *『 الصيغة 』:* ${item.ext}
 *『 الحجم 』:* ${item.fileSize}
 *『 الرابط 』:* ${item.url.replace("/download?url=", "")}
 *『 الجودة 』:* ${item.formatNote}
 *『 HD 』:* ${item.hd ? 'نعم' : 'لا'}
 *『 Pro 』:* ${item.pro ? 'نعم' : 'لا'}
╰──────────────╯`
}).join("\n\n")

    await m.reply(audioList + "\n\n" + videoList)
  } else {
    let ress = await (await fetch("https://backendace.1010diy.com/web/free-mp3-finder/query?q=" + text + "&type=youtube&pageToken=")).json()
    let res = ress.data

    let searchResults = res.items.map((item, index) => {
      return `[ RESULT ${index + 1} ]

Title: ${item.title}
Url: ${item.url}
Duration: ${item.duration}
Views: ${item.viewCount}

Description: ${item.description}
Published: ${item.publishedAt}`
    }).filter(Boolean).join("\n\n________________________\n\n")

    let ytthumb = await (await conn.getFile(res.items[0].thumbnail)).data
    let msg = await generateWAMessageFromContent(m.chat, {
      extendedTextMessage: {
        text: searchResults,
        jpegThumbnail: ytthumb,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: "Y O U T U B E",
            body: "S E A R C H",
            containsAutoReply: true,
            mediaType: 1,
            mediaUrl: res.items[0].url,
            renderLargerThumbnail: true,
            showAdAttribution: true,
            sourceUrl: res.items[0].url,
            thumbnail: ytthumb,
            thumbnailUrl: res.items[0].thumbnail
          }
        }
      }
    }, {
      quoted: m
    })
    await conn.relayMessage(m.chat, msg.message, {})
  }
}

handler.help = ["ytfinder"]
handler.tags = ["search"]
handler.command = /^(yt3)$/i

export default handler

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}