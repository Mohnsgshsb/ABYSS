import fetch from 'node-fetch';

const gameDuration = 60000;
const poin = 2000;
const game = '.سلاح';
const botname = `Free fire`;

const questions = [
  { name: "mp5", img: "https://files.catbox.moe/s2s4ka.jpg" },
  { name: "كاتانا", img: "https://files.catbox.moe/s7yc15.jpg" },
  { name: "ak", img: "https://files.catbox.moe/ps57mx.jpg" },
  { name: "برير", img: "https://files.catbox.moe/rmsnex.jpg" },
  { name: "ump", img: "https://files.catbox.moe/nazxlv.jpg" },
  { name: "mp40", img: "https://files.catbox.moe/suyk8x.jpg" },
  { name: "m500", img: "https://files.catbox.moe/ty85vk.jpg" },
  { name: "نسر صحراء", img: "https://files.catbox.moe/4dhvu3.jpg" },
  { name: "xm8", img: "https://files.catbox.moe/6anmm6.jpg" },
  { name: "sniper", img: "https://files.catbox.moe/0fdknn.jpg" },
  { name: "scar", img: "https://files.catbox.moe/ea8del.jpg" },
  { name: "victor", img: "https://files.catbox.moe/rppoav.jpg" },
  { name: "space", img: "https://files.catbox.moe/wc3bue.jpg" },
  { name: "طومسون", img: "https://files.catbox.moe/syosb8.jpg" },
  { name: "sks", img: "https://files.catbox.moe/3krkvp.jpg" },
  { name: "جروزا", img: "https://files.catbox.moe/14ldtk.jpg" },
  { name: "فاماس", img: "https://files.catbox.moe/3zl5ch.jpg" }
];

export async function handler(m, { command, text, conn }) {
  let id = m.chat;
  conn.tebakGame = conn.tebakGame || {};
  let currentGame = conn.tebakGame[id];
  let poster = 'https://qu.ax/qlqve.jpg';

  if (currentGame) {
    if (!text) {
      return conn.reply(m.chat, '> *◞❕◜ هـنـاك لـعـبـة قـيـد الـتـشـغـيـل.*', m);
    } else if (text === currentGame[1].name) {
      m.react('✅');
      global.db.data.users[m.sender].exp += poin;
      conn.sendButton(m.chat, `> *◞🍷◜ أحسنت! ربحت ${poin} نقطة.*`, `> ${botname}`, poster, [[`↬⌯الـمــ🍮ـزيـد‹◝`, `${game}`]], null, null);
      clearTimeout(currentGame[3]);
      delete conn.tebakGame[id];
    } else if (text === 'انسحب') {
      clearTimeout(currentGame[3]);
      conn.sendButton(m.chat, `> *◞🍡◜ انسحبت! كانت الإجابة الصحيحة: ${currentGame[1].name}*`, `> ${botname}`, poster, [[`↬⌯الـمــ🍮ـزيـد‹◝`, `${game}`]], null, null);
      delete conn.tebakGame[id];
    } else {
      clearTimeout(currentGame[3]);
      m.react('❌');
      conn.sendButton(m.chat, `> *◞🌸◜ خطأ! الإجابة كانت: ${currentGame[1].name}*`, `> ${botname}`, poster, [[`↬⌯الـمــ🍮ـزيـد‹◝`, `${game}`]], null, null);
      delete conn.tebakGame[id];
    }
  } else {
    if (!text) {
      let question = questions[Math.floor(Math.random() * questions.length)];
      let options = [question.name];

      while (options.length < 4) {
        let option = questions[Math.floor(Math.random() * questions.length)].name;
        if (!options.includes(option)) options.push(option);
      }

      options = options.sort(() => Math.random() - 0.5);

      conn.tebakGame[id] = [m, question, 10, setTimeout(() => {
        delete conn.tebakGame[id];
        conn.sendButton(m.chat, `> *◞⏰◜ انتهى الوقت! الإجابة كانت: ${question.name}*`, `> ${botname}`, poster, [[`↬⌯الـمــ↪️ـزيـد‹◝`, `${game}`]], null, null);
      }, gameDuration)];

      let message = `
> ‹◝ احـزر نـوع الـسـلاح↬

*┐┈─๋︩︪──๋︩︪─═⊐‹🌹›⊏═─๋︩︪──๋︩︪─┈┌*
> *↬⌯وقـت الاجـابـة: ${(gameDuration / 1000).toFixed(2)} ثـواني*
> *↬⌯الـجـائـزة: 2000 نـقـاط*
> *انسـحـب؟ اضـغـط ◞انـسـحـاب◜*
*┘┈─๋︩︪──๋︩︪─═⊐‹🌹›⊏═─๋︩︪──๋︩︪─┈└*
`;

      await conn.sendButton(m.chat, message, `> ${botname}`, question.img, [
        [`🍡┇${options[0]}┇🍡`, `${game} ${options[0]}`],
        [`🍡┇${options[1]}┇🍡`, `${game} ${options[1]}`],
        [`🍡┇${options[2]}┇🍡`, `${game} ${options[2]}`],
        [`🍡┇${options[3]}┇🍡`, `${game} ${options[3]}`],
        [`◞انـسـحـاب🌸◜`, `${game} انسحب`]
      ], null, null);
    } else {
      m.react('👇🏻');
      conn.sendButton(m.chat, `> *اللعبة غير فعالة حالياً.*`, `> ${botname}`, poster, [[`↬⌯الـمــ🍮ـزيـد‹◝`, `${game}`]], null, null);
    }
  }
}

handler.help = ['سلاح'];
handler.tags = ['العاب'];
handler.command = ['سلاح'];

export default handler;