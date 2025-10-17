function clockString(ms) { let h = Math.floor(ms / 3600000); let m = Math.floor(ms % 3600000 / 60000); let s = Math.floor(ms % 60000 / 1000); return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':'); }

import pkg from '@whiskeysockets/baileys'; const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => { let d = new Date(new Date() + 3600000); let locale = 'ar'; let week = d.toLocaleDateString(locale, { weekday: 'long' }); let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }); let _uptime = process.uptime() * 1000; let uptime = clockString(_uptime); let user = global.db.data.users[m.sender]; let name = conn.getName(m.sender); let { money, joincount } = user; let { exp, limit, level, role } = user; let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length; let more = String.fromCharCode(8206); let readMore = more.repeat(850); let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender; let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

await conn.sendMessage(m.chat, { react: { text: '📂', key: m.key } });

const zack = 'https://files.catbox.moe/busm02.jpg';
const mentionId = m.key.participant || m.key.remoteJid;

    conn.relayMessage(m.chat, { 
        viewOnceMessage: { 
            message: { 
                interactiveMessage: { 
                    header: { title: `terbo` }, 
                    body: { 
                        text: `*┊🌸┊⇇مـنـور يـا @${mentionId.split('@')[0]} اتـمـنـي ان انـكـ/ي تـسـمـتـ؏ـ/ـي بي وقتك*
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
*↜مـعلـومـاتـك يـا مـز/ه🐤🍭↶*
*❍━━━══━━❪🌸❫━━══━━━❍*
*🍬┊⇇الـمـنـشـن↜❪@${mentionId.split('@')[0]}❫*
*🍭┊⇇الـرتـبـه↜❪${role}❫*
*🌸┊⇇الـمـسـتـوي↜❪${level}❫*
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
*↜مـعـلـومـات مطورتي🧚‍♀️↶*
*❍━━━══━━❪🍭❫━━══━━━❍*
*🍷┊⇇الـقـب↶*
> *｢🍫┊𝐍𝐮𝐭𝐞𝐥𝐥𝐚┊🍫｣*
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
*╮═━━━━━━✦✿✦━━━━━━═╭*   
*┊     ｢🌸┊التـنـبـيـهـات┊🌸｣     ┊*
*╯═━━━━━━✦✿✦━━━━━━═╰*
*❪1❫↜ممنوع سب البوت*
*❪2❫↜للشكوه او للاقتراح↶*
> *.ابلاغ*
*❪3❫↜ضغط علي الزر لي عرض الاوامر*
*❪4❫↜لا تنسي قبل اي امر↜❪.❫*
*❪5❫↜استخدم امر｢تسجيل/reg｣ لي تشغيل بعض الاوامر*
*❍━━━══━━❪🍫❫━━══━━━❍*`,subtitle: "Araab Zack",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: zack } }, { upload: conn.waUploadToServer }, {quoted: m}))},
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: false,
                    },nativeFlowMessage: { buttons: [


                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '⌈🍭┊اوامر┊🍬⌋',
                                    sections: [
                                        {
                                            title: '❪🐣┊مـهـام_الـبـوت┊🍡❫',
                                            highlight_label: '𝐀𝐁𝐘𝐒𝐒_𝐁𝐎𝐓',
                                            rows: [
                                                     {
    header: '👑┊القـ👑ـسـم الأول',
    title: '🍫┊「 قسم_الألعاب 」🍥',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق1'
},
{
    header: '👨🏻‍💻┊القـ👨🏻‍💻ـسـم الثاني',
    title: '🍬┊「 قسم_الصور 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق2'
},
{
    header: '🐦‍🔥┊القـ🐦‍🔥ـسـم الثالث',
    title: '🍨┊「 قسم_المشرفين 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق3'
},
{
    header: '👑┊القـ👑ـسـم الرابع',
    title: '🍨┊「 قسم_التحويلات 」🍬',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق4'
},
{
    header: '🛡┊القـ🛡ـسـم الخامس',
    title: '🍬┊「 قسم_التحميل 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق5'
},
{
    header: '🕹┊القـ🕹ـسـم السادس',
    title: '🍬┊「 قسم_البنك 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق6'
},
{
    header: '🌀┊القـ🌀ـسـم السابع',
    title: '🍬┊「 قسم_AI 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق7'
},
{
    header: '🎧┊القـ🎧ـسـم الثامن',
    title: '🍬┊「 قسم_الألقاب 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق8'
},
{
    header: '🤖┊القـ🤖ـسـم التاسع',
    title: '🍬┊「 قسم_المرح 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق9'
},
{
    header: '😌┊الـــقـ🍭ـسـم العاشر',
    title: '🍬┊「 قسم_الاعلام 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق10'
},
{
    header: '🍬┊الـقـ🧚ـسـم الحادي عشر',
    title: '🍬┊「 قسم_الاصوات 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق11'
},
{
    header: '👁️┊القـ🍬ـسـم الثاني عشر',
    title: '🍬┊「 قسم_الانمي 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.الانمي'
},
{
    header: '🌸┊الق🍡ـسـم الثالث عشر',
    title: '🍬┊「 قسم_الدين 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق12'
},
{
    header: '🍭┊الق🎂ـسـم الرابع عشر',
    title: '🍬┊「 قسم_الادوات 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق13'
},
{
    header: '🍭┊الق🎂ـسـم الخامس عشر',
    title: '🍬┊「 قسم_الخلفيات 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.الخلفيات'
},
{
    header: '🍭┊الق🎂ـسـم السادس عشر',
    title: '🍬┊「 قسم_الصور 」🍨',
    description: '—͟͟͞͞𖣘𝐕𝐈𝐏 𝐌𝐄𝐍𝐔',
    id: '.ق14'
}
                                            ]
                                        }
                                    ]
                                }),
                  messageParamsJson: ''
                     },
                    {
                                name: "cta_url",
                                buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الـمـطـور╎📲⌋","url":"https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c","merchant_url":"https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c"}'
                            }
                        ]
                    }
                }
            }
        }
    }, {});

await conn.sendMessage(m.chat, { 
        audio: { 
            url: 'https://raw.githubusercontent.com/Mohnd32145/Media/main/AUD-20250517-WA0029.mp3'  // رابط الصوت
        }, 
        mimetype: 'audio/mpeg', 
        ptt: true 
    }, { quoted: m });
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['menu', 'مهام', 'اوامر', 'الاوامر', 'قائمة', 'القائمة'];

export default handler;