import { prepareWAMessageMedia } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const tagUser = '@' + m.sender.split("@s.whatsapp.net")[0];

  // تحميل الصورة من الإنترنت
  const imageUrl = 'https://files.catbox.moe/busm02.jpg';
  const media = await prepareWAMessageMedia(
    { image: { url: imageUrl } },
    { upload: conn.waUploadToServer }
  );

  conn.relayMessage(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            hasMediaAttachment: true,
            ...media,
            title: `*\`『 اتفضل يحب القائمه 』\`*\n*「🧚🏻‍♂️دوس علي زر اختار علشان تختار الزر الانمي الي يناسبك」*`
          },
          body: {
            text: ''
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'الخلفيات',
                  sections: [
                    {
                      title: 'اهلا بيك🍭',
                      highlight_label: '⤲',
                      rows: [
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇حقيقي┇☠️❯', description: '', id: '.حقيقي' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇هيناتا┇🧚‍♀️❯', description: '', id: '.هيناتا' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كورومي┇✨❯', description: '', id: '.كورومي' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كاوري┇🔥❯', description: '', id: '.كاوري' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كانيكي┇👾❯', description: '', id: '.كانيكي' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇بلاك بينك┇🦦❯', description: '', id: '.بلاكبينك' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇جبل┇🎀❯', description: '', id: '.جبل' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇عشوائي┇😋❯ا', description: '', id: '.عشوائي' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كوتوري┇😍❯', description: '', id: '.كوتوري' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇بنت┇🍬❯', description: '', id: '.بنت' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايتاشي┇🍷❯', description: '', id: '.ايتاشي' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇مادارا┇🧸❯', description: '', id: '.مادارا' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ولد┇👼❯', description: '', id: '.خلفية-ولاد' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كوسبلاي┇🤤❯', description: '', id: '.كوسبلاي' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ساكورا┇🤡❯', description: '', id: '.sakura' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ساسكي┇⚡❯', description: '', id: '.sasuke' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ساجري┇🌗❯', description: '', id: '.sagiri' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇نيوزوكو┇💥❯', description: '', id: '.nezuko' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ناروتو┇✨❯', description: '', id: '.naruto' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ميناتو┇🐼❯', description: '', id: '.minato' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ميكو┇🐤❯', description: '', id: '.miku' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ميكاسا┇💧❯', description: '', id: '.mikasa' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇مادارا┇🪐❯', description: '', id: '.madara' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇جوزو┇♨️❯', description: '', id: '.جوزو' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كوترو┇🧨❯', description: '', id: '.kotori' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كانيكي┇🧧❯', description: '', id: '.keneki' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كاوري┇🎎❯', description: '', id: '.kaori' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كاجيرو┇🪄❯', description: '', id: '.kagura' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇كاجا┇🍭❯', description: '', id: '.kaga' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايتوري┇🍦❯', description: '', id: '.itori' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايتاشي┇🍡❯', description: '', id: '.itachi' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايسوزي┇🍨❯', description: '', id: '.isuzu' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇اينوري┇❄️❯', description: '', id: '.inori' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇هيناتا┇🥂❯', description: '', id: '.hinata' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇هيستيا┇⛈️❯', description: '', id: '.hestia' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايميليا┇🍻❯ا', description: '', id: '.emilia' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايبا┇🍮❯', description: '', id: '.eba' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايرزا┇🎈❯', description: '', id: '.erza' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ديدارا┇⚗️❯', description: '', id: '.deidara' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇شيتوجي┇💎❯', description: '', id: '.chitoge' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇تشيهو┇🕯️❯', description: '', id: '.chiho' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇بوروتو┇📍❯', description: '', id: '.brouto' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇ايوزاوا┇💌❯', description: '', id: '.ayuzawa' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇اسونا┇🎊❯', description: '', id: '.asuna' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎┇اناا┇🧚‍♀️❯', description: '', id: '.anna' },
            { header: 'الاديـت و الـصـوره', title: '⧉⏎ا┇اكيما┇🥷❯', description: '', id: '.akiyama' }
           ]
                    }
                  ]
                }),
                messageParamsJson: ''
              }
            ]
          }
        }
      }
    }
  }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['الانمي'];

export default handler;