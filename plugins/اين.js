const gameDuration = 60000;
const poin = 2000;
const game = '.جغرافيا';

export async function handler(m, { command, text, conn }) {

    let id = m.chat;
    conn.locGame = conn.locGame || {};

    let currentGame = conn.locGame[id];

    let src = [
        { name: "آسيا", question: "أين تقع دولة اليابان؟", img: "https://i.ibb.co/2vTZfP0/japan.jpg" },
        { name: "أوروبا", question: "أين تقع دولة فرنسا؟", img: "https://i.ibb.co/ypn9V5x/france.jpg" },
        { name: "أفريقيا", question: "أين تقع دولة مصر؟", img: "https://i.ibb.co/tHs3cxt/egypt.jpg" },
        { name: "أمريكا الجنوبية", question: "أين تقع دولة البرازيل؟", img: "https://i.ibb.co/PYskq3X/brazil.jpg" },
        { name: "أمريكا الشمالية", question: "أين تقع دولة كندا؟", img: "https://i.ibb.co/LS9Kztm/canada.jpg" },
        { name: "أوروبا", question: "أين تقع دولة ألمانيا؟", img: "https://i.ibb.co/nfRTJxV/germany.jpg" },
        { name: "آسيا", question: "أين تقع دولة السعودية؟", img: "https://i.ibb.co/jrG98jF/ksa.jpg" }
    ];

    let poster = 'https://i.ibb.co/qCtj0np/world-map.jpg';

    if (!src || src.length === 0) {
        return conn.reply(m.chat, '> *◞🧁◜ لا توجد أسئلة حالياً.*', m);
    }

    if (currentGame) {
        if (!text) {
            return conn.reply(m.chat, '> *◞❕◜ هناك لعبة جارية حالياً.*', m);
        } else if (text === currentGame[1].name) {
            m.react('✅');
            global.db.data.users[m.sender].exp += poin;
            conn.sendButton(m.chat, `> *◞🍮◜ أحسنت! ربحت ${poin} نقطة!*`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            clearTimeout(currentGame[3]);
            delete conn.locGame[id];
        } else if (text === 'انسحب') {
            clearTimeout(currentGame[3]);
            conn.sendButton(m.chat, `> *◞🌸◜ تم الانسحاب. الإجابة: ${currentGame[1].name}*`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            delete conn.locGame[id];
        } else {
            m.react('❌');
            clearTimeout(currentGame[3]);
            conn.sendButton(m.chat, `> *◞🍯◜ خطأ! الإجابة: ${currentGame[1].name}*`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            delete conn.locGame[id];
        }
    } else {
        if (!text) {
            let question = src[Math.floor(Math.random() * src.length)];
            let options = [question.name];

            while (options.length < 4) {
                let option = src[Math.floor(Math.random() * src.length)].name;
                if (!options.includes(option)) options.push(option);
            }

            options = options.sort(() => Math.random() - 0.5);

            conn.locGame[id] = [m, question, 10, setTimeout(() => {
                delete conn.locGame[id];
                conn.sendButton(m.chat, `> *◞🍧◜ انتهى الوقت! الإجابة: ${question.name}*`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            }, gameDuration)];

            let message = `
> ‹◝ ${question.question} ⛅ ↬

*┐┈─๋︩︪─═⊐‹جغرافيا›⊏═─๋︩︪─┈┌*
> *↬⌯الوقت ⏳: ${(gameDuration / 1000).toFixed(0)} ثانية*
> *↬⌯الجائزة: 2000 نقطة*
> *للانسحاب اضغط ◞انسحب›*
*┘┈─๋︩︪─═⊐‹جغرافيا›⊏═─๋︩︪─┈└*
`;

            let img = question.img || poster;

            await conn.sendButton(m.chat, message, `> 𝑀𝐼𝐾𝐸𝑌 𝐵𝛩𝑇`, img, [
                [`🍡┇${options[0]}┇🍡`, `${game} ${options[0]}`],
                [`🍡┇${options[1]}┇🍡`, `${game} ${options[1]}`],
                [`🍡┇${options[2]}┇🍡`, `${game} ${options[2]}`],
                [`🍡┇${options[3]}┇🍡`, `${game} ${options[3]}`],
                [`◞انسحب🏃‍♂️◜`, `${game} انسحب`]
            ], null, null);
        } else {
            m.react('👇🏻');
            conn.sendButton(m.chat, `> *انتهت اللعبة ◞🍫◜*`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
        }
    }
}

handler.help = ['اين'];
handler.tags = ['العاب'];
handler.command = ['جغرافيا'];

export default handler;