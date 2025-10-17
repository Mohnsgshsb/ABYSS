import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia } = pkg;

let handler = async (m, { conn, usedPrefix }) => {
  const buttons = [
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇ايديت ➁┇🎀❯",
        id: `${usedPrefix}ايديت1`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇ايديت ➁┇🔥❯",
        id: `${usedPrefix}انمي2`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇ايديت ➂┇🐼❯",
        id: `${usedPrefix}اديت2`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇لصديق┇🧑‍🤝‍🧑❯",
        id: `${usedPrefix}لصديق`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇خيال┇🧞‍♂️❯",
        id: `${usedPrefix}ايديت-انمي`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇كوسبلاي┇🫦❯",
        id: `${usedPrefix}كوسبلاي`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇اغنيه┇🎶❯",
        id: `${usedPrefix}ايديت-اغنيه`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇انمي┇🧧❯",
        id: `${usedPrefix}ايديت انمي`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇استوري┇🎞️❯",
        id: `${usedPrefix}استوريهات`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇ستيت┇🧚‍♀️❯",
        id: `${usedPrefix}انميات`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇حلات وتس┇🎡❯",
        id: `${usedPrefix}حلات-وتس`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇كوره┇🎱❯",
        id: `${usedPrefix}ايديت-كورة`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇عربيات┇🏎❯",
        id: `${usedPrefix}سياره`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⧉⏎┇اهداف┇⚽❯",
        id: `${usedPrefix}اهداف`
      })
    }
  ];

  await conn.relayMessage(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "⟪🧚‍♀️┇قسم الانمي┇🧚‍♀️⟫",
            hasMediaAttachment: false
          },
          body: {
            text: `*\`『 اتفضل يحب القائمه 』\`*
*「🧚🏻‍♂️دوس علي زر اختار علشان تختار الزر الايديت الي يناسبك」*`,
            subtitle: "⟦𝗞𝗔𝗜⤲🔥⤲𝗕𝗢𝗧⟧."
          },
          nativeFlowMessage: {
            buttons
          }
        }
      }
    }
  }, {});
};

handler.help = ['ايديت'];
handler.tags = ['edit'];
handler.command = /^(ايديت-مختلط)$/i;

export default handler;