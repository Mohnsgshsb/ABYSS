let handler = async (m, { conn }) => {
    const videos = [ 
'https://telegra.ph/file/683fcc7549f171b72a169.mp4',
'https://telegra.ph/file/f47614dae11f9d440efb9.mp4',
'https://telegra.ph/file/a454e7a625df490e9ca55.mp4',
'https://telegra.ph/file/de6a6bc20db58946e73e8.mp4',
'https://telegra.ph/file/84039399405b5913b5777.mp4',
'https://telegra.ph/file/eeb2e29a434b5dad1a36d.mp4',
'https://telegra.ph/file/3bfc98b44adb801be8ac1.mp4',
'https://telegra.ph/file/cb1d8c931428cd706968a.mp4',
'https://telegra.ph/file/96c59c8a2433430f22932.mp4',
'https://telegra.ph/file/2d92ee80093a88e90e854.mp4',
'https://telegra.ph/file/cc6d4378b0f69321fc411.mp4',
'https://telegra.ph/file/7a9aa4eea49f57a6b4bbd.mp4',
'https://telegra.ph/file/4a88571acda4a27a63e1a.mp4',
'https://telegra.ph/file/fdaac934c30ee91a5818b.mp4', 
'https://telegra.ph/file/b553aa0329199454ac18d.mp4',
'https://telegra.ph/file/9a8aeb20afb7be84fb175.mp4',
'https://telegra.ph/file/f97a86ec62837ef77eafa.mp4',
'https://telegra.ph/file/eab091afcf6c93be27361.mp4',
'https://telegra.ph/file/5e75523b4ae7f1d2f01d4.mp4',
'https://telegra.ph/file/8053825a4d9fa6d577868.mp4',
'https://telegra.ph/file/0fb8a51476f824515c847.mp4',
'https://telegra.ph/file/82fe75cbecdd73968e1a3.mp4', 
'https://telegra.ph/file/bc44c51b4ed96d25e6ba8.mp4',
'https://telegra.ph/file/5c265eb2f32b0617f5fc4.mp4',
'https://telegra.ph/file/7b0aea515fa0e3cc03310.mp4',
'https://telegra.ph/file/a27b5d4a3c282343f67bc.mp4', 
'https://telegra.ph/file/e17b27327d3d0787ac5d2.mp4', 
'https://telegra.ph/file/a566ca506f2579c25a93e.mp4', 
    ];

    let randomVideo = videos[Math.floor(Math.random() * videos.length)];

    await conn.sendMessage(m.chat, {
        video: { url: randomVideo },
        caption: '⧼🔥┊ ايـديـت بـلـيـتـش ┊🔥⧽',
        buttons: [
            {
                buttonId: '.بيليتش',
                buttonText: {
                    displayText: '↬⌯الـ🔍ـمـزيـد‹◝'
                },
                type: 1
            }
        ],
        footer: `${global.gt}`,
        headerType: 4,
        viewOnce: true
    }, { quoted: m });
}

handler.command = ['اديت7', 'بيليتش'];
handler.tags = ['fun', 'video'];
handler.help = ['فيديو عشوائي'];
handler.limit = 1
handler.register = true
export default handler;