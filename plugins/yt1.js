import yts from "yt-search";
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`❗️ الرجاء كتابة اسم الفيديو للبحث.\n\n• مثال:\n${usedPrefix + command} أغنية حسين الجسمي`);

    await m.reply('🔎 جاري البحث عن نتائج في يوتيوب...');

    async function createImage(url) {
        const { imageMessage } = await generateWAMessageContent({
            image: { url }
        }, {
            upload: conn.waUploadToServer
        });
        return imageMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let push = [];
    let results = await yts(text);
    let videos = results.videos.slice(0, 15);
    shuffleArray(videos);

    let i = 1;
    for (let video of videos) {
        let imageUrl = video.thumbnail;
        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `
*❲ العنوان : ${video.title} ❳* \n\n◡̈⃝➥ *\`『 المدن 』\`* ${video.timestamp}\n◡̈⃝➥ *\`『 المشاهدات 』\`*:* ${video.views}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '𝑲𝑨𝑰〔🔥〕𝑩𝑶𝑻'
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `الفيديو رقم ${i++}`,
                hasMediaAttachment: true,
                imageMessage: await createImage(imageUrl)
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "تحميل 📥",
                            id: `.يوتيوب ${video.url}`
                        })
                    }
                ]
            })
        });
    }

    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "✅ تم العثور على النتائج التالية:"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: '⚡ 𝑀𝐼𝐾𝐸𝑌 𝐵𝛩𝑇 ⚡'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [...push]
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
}

handler.help = ["yts-slid"];
handler.tags = ["search"];
handler.command = /^(yt1)$/i;

export default handler;