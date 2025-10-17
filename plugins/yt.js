import { generateWAMessageFromContent, prepareWAMessageMedia } from "@whiskeysockets/baileys";
import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, command, text }) => {`˼🍷˹ ↜ *جـارٍ تـجـهـيـز الـصـوت* ◡̈⃝➥
> ┇≡ ◡̈⃝🎂↜『معلومـات الـمقـطـع』↶
┏━╼━━╃⌬〔🎧〕⌬╄━━╾━┓
┇≡ ◡̈⃝🎶↜ الـعـنـوان ↞『 ${metadata.title} 』
┇≡ ◡̈⃝📺↜ الـقـنـاة ↞『 ${metadata.author.name} 』
┇≡ ◡̈⃝⏱️↜ الـمـدة ↞『 ${metadata.duration.timestamp} 』
┇≡ ◡̈⃝👁️↜ المـشـاهدات ↞『 ${metadata.views.toLocaleString()} 』
┇≡ ◡̈⃝📅↜ تـاريـخ الـنـشـر ↞『 ${metadata.ago} 』
┗━╼━━╃⌬〔🍷〕⌬╄━━╾━┛
> ◡̈⃝🧁↜ *استعد لسماع شيء رائع!* 🎧`;

  try {
    await m.react('🔍');
    let search = await yts(text);
    let video = search.all[0];
    let linkyt = video.url;

    const caption = ``;

    const { imageMessage } = await prepareWAMessageMedia(
      { image: { url: video.thumbnail } },
      { upload: conn.waUploadToServer }
    );

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: caption },
            footer: { text: "🎧 Powered by YouTube Bot" },
            header: {
              hasMediaAttachment: true,
              imageMessage
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: '⋄┄〘 🕷️ تحميل الصوت 🎧〙┄⋄',
                    id: `${usedPrefix}ytmp3 ${linkyt}`
                  })
                },
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: '⋄┄〘 🎥 تحميل الفيديو 🔥〙┄⋄ ',
                    id: `${usedPrefix}فيديو ${linkyt}`
                  })
                },
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: '⋄┄〘👁️ نتائج أخرى 👁️〙┄⋄',
                    id: `${usedPrefix}yt1 ${text}`
                  })
                },
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: '⋄┄〘🧚 المصادر الاحتياطية 🧚〙┄⋄ ',
                    sections: [
                      {
                        title: "˼🍷˹ ↜ 『 قائمة الصوتيات 』↶",
                        highlight_label: "Audio Extras",
                        rows: [
                          { title: "『 1 』", id: `.ريك ${linkyt}` },
                          { title: "『 2 』", id: `.صوت ${linkyt}` },
                          { title: "『 3 』", id: `.تحمل ${linkyt}` },
                          { title: "『 4 』", id: `.yt2 ${linkyt}` },
                          { title: "『 5 』", id: `.yt5 ${linkyt}` },
                          { title: "『 6 』", id: `.ytaudio ${linkyt}` }
                        ]
                      },
                      {
                        title: "˼🍷˹ ↜ 『 قائمة الفيديوهات 』↶",
                        highlight_label: "Video Extras",
                        rows: [
                          { title: "『 1 』", id: `.يوتيوب ${linkyt}` },
                          { title: "『 2 』", id: `.ytmp4 ${linkyt}` },
                          { title: "『 3 』", id: `.فيديو1 ${linkyt}` },
                          { title: "『 4 』", id: `.gmp4 ${linkyt}` },
                          { title: "『 5 』", id: `.حمل2 ${linkyt}` },
                          { title: "『 6 』", id: `.ytmp4doc ${linkyt}` }
                        ]
                      }
                    ]
                  })
                }
              ]
            }
          }
        }
      }
    }, { userJid: conn.user.jid, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react('✅');
  } catch (error) {
    console.error("⚠️ خطأ:", error);
    await m.react('❌');
    await conn.sendMessage(m.chat, {
      text: `❌ حدث خطأ أثناء البحث أو الإرسال. الرجاء المحاولة لاحقًا.`,
      quoted: m
    });
  }
};

handler.help = ['تشغيل'].map(v => v + ' <اسم الأغنية/الفيديو>');
handler.tags = ['تحميل'];
handler.command = /^(شغل)$/i;

export default handler;