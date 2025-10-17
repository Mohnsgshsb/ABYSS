import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { command, usedPrefix, conn, args, text }) => {
    let fake = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: '120363387503112989@g.us',
        },
        message: {
            conversation: '₊· ͟͟͞͞➳❥ 🍓𝐀𝐁𝐘𝐒𝐒_𝐁𝐎𝐓🧁'
        },
        participant: '0@s.whatsapp.net',
    };

    let img = 'https://files.catbox.moe/zsv3tg.jpg';
    let message = `╭── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ──╮
*˼🧚‍♀️˹ ⪦┆مـرحـبـاً بـك يــا عــيــونــي*
*˼🥷˹ ⪦┆لا تقلق شغاله 24/24 ساعه*
*🦦⚡˹ ⪦┆انا كاي بوت*
╰── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ──╯
> ˼⚠️˹ مــلـاحـــظـــة ⇅ ↶
╭── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ──╮
*• ➊ - _يمنع سب البوت = سب المطور_*
*• ➋ - _ممنوع الاسبام بالبوت_*
*• ➌ - _إذا البوت اطرد ما بيدخل تاني_*
*• ❹ - _تابع الاوامر من الازرار_*
╰── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ──╯`;

    let buttons = [
        {
            buttonId: `.الاوامر`,
            buttonText: { displayText: '🍫┊「 الـقـائـمـة الرائـيسيه 」🍥' },
            type: 1,
        },
        {
            buttonId: `.تسجيل هاها.16`,
            buttonText: { displayText: '🍡┊「 الـتـسجـيـل الرائـيـسـي 」🍧' },
            type: 1,
        },
        {
            buttonId: `.المطور`,
            buttonText: { displayText: '🧁┊「 الـمـطـور 」🍭' },
            type: 1,
        },
    ];

    let buttonMessage = {
        image: { url: img },
        caption: message,
        footer: '₊· ͟͟͞͞➳❥ 🍓𝐀𝐁𝐘𝐒𝐒_𝐁𝐎𝐓🧁',
        buttons: buttons,
        headerType: 1,
        viewOnce: true
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: fake });
};

handler.customPrefix = /^(بوت)$/i;
handler.command = new RegExp;

export default handler;