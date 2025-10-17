import { prepareWAMessageMedia } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const tagUser = '@' + m.sender.split("@s.whatsapp.net")[0];

  // تحميل الصورة من الإنترنت
  const imageUrl = 'https://files.catbox.moe/zsv3tg.jpg';
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
                  title: '『 صور خلفيات 🧚‍♀️』',
                  sections: [
                    {
                      title: '͟͟͞͞➳❥ 🍓𝐀𝐁𝐘𝐒𝐒_𝐁𝐎𝐓🧁 ⋆｡˚✮',
                      highlight_label: '⤲',
                      rows: [
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇انمي┇🍬❯', id: '.منوع' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇انميشن┇🎨❯', id: '.انميشن' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇حقيقي┇☠️❯', id: '.حقيقي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇مراتي┇🎄❯', id: '.مراتي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇بنات مثيره┇💎❯', id: '.بنت' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇ولد┇✨️❯', id: '.خلفية-اولاد' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇بنت┇☠️❯', id: '.خلفية-بنات' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇مانهوو┇🍬❯', id: '.مانهوو' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇كوسبلاي┇🔥❯', id: '.خلفيه-كوسبلاي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇زواج┇💎❯', id: '.مراتي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇تقطيم┇🧚‍♀️❯', id: '.تطقيم' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇ولاد┇🎡❯', id: '.طقم2' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇بنات┇🎀❯', id: '.طقمي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇كرتون┇🖼❯', id: '.كرتون' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇كرستيانو┇🎱❯', id: '.كريستيانو' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇ميسي┇🀄❯', id: '.ميسي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇قطط┇🐈❯', id: '.قطه' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇كلب┇🐶❯', id: '.كلب' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇جبال┇🏔❯', id: '.جبل' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇فضاء┇🔮❯', id: '.فضاء' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇كواكب┇🪐❯', id: '.كوكب' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇ببجي┇🔥❯', id: '.ببجي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇جيمنج┇🕹❯', id: '.جيمينج' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇بروفايل┇🎨❯', id: '.خلفيات' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇قهوه┇☕️❯', id: '.قهوه' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇تكنولوجي┇🕹❯ا', id: '.تكنولوجيا' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇هكر┇🪄❯', id: '.هكر' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇سيارات┇🏎❯', id: '.عربية' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇موتوسيكلات┇🏍❯', id: '.موتسيكل' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇عشوائي┇🏔❯', id: '.عشوائي' },
                        { header: '『 صور خلفيات 🧚‍♀️』', title: '⧉⏎┇ميمز┇🖼❯', id: '.ميمز' }
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
handler.command = ['الخلفيات'];

export default handler;