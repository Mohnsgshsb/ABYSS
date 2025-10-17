import fs from 'fs';

const gameDuration = 60000;
const poin = 500;
const game = '.ايموجي';
const botname = '';

export async function handler(m, { command, text, conn }) {

    let id = m.chat;
    conn.tebakGame = conn.tebakGame ? conn.tebakGame : {};
    let currentGame = conn.tebakGame[id];

    let src = JSON.parse(fs.readFileSync('./src/game/miku4.json'));
    let poster = 'https://telegra.ph/file/2c3426633b8fa430dfd18.jpg'; // صورة رمزية ثابتة

    if (!src || src.length === 0) {
        return conn.reply(m.chat, '> *◞⚠️◜ لا تـوجـد أسـئـلـة مـتـاحـة حـالـيـا.*', m);
    }

    if (currentGame) {
        if (!text) {
            return conn.reply(m.chat, `> *◞🧚◜ هـنـاك لـعـبـة قـيـد الـتـشـغـيـل.*`, m);
        } else if (text === currentGame[1].response) {
            m.react('✅');
            global.db.data.users[m.sender].exp += poin;

            conn.sendButton(m.chat, `> *◞🍫◜ إجـابـة صـحـيـحـة! ربـحـت ${poin} نـقـطـة!*`, `> ${botname}`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            clearTimeout(currentGame[3]);
            delete conn.tebakGame[id];

        } else if (text === 'انسحب') {
            clearTimeout(currentGame[3]);
            conn.sendButton(m.chat, `> *◞🧁◜ تـم الانـسـحـاب. الاجـابـة كـانـت: ${currentGame[1].response}*`, `> ${botname}`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            delete conn.tebakGame[id];

        } else {
            m.react('❌');
            clearTimeout(currentGame[3]);
            conn.sendButton(m.chat, `> *◞🍯◜ خـطـأ! الاجـابـة كـانـت: ${currentGame[1].response}*`, `> ${botname}`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            delete conn.tebakGame[id];
        }

    } else {
        if (!text) {
            let question = src[Math.floor(Math.random() * src.length)];
            let options = [question.response];

            while (options.length < 4) {
                let option = src[Math.floor(Math.random() * src.length)].response;
                if (!options.includes(option)) options.push(option);
            }

            options = options.sort(() => Math.random() - 0.5);

            conn.tebakGame[id] = [m, question, poin, setTimeout(() => {
                delete conn.tebakGame[id];
                conn.sendButton(m.chat, `> *◞🍩◜ انتهى الوقت. الاجـابـة كـانـت: ${question.response}*`, `> ${botname}`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
            }, gameDuration)];

            let message = `


*┐┈─๋︩︪──๋︩︪─═⊐‹🍧›⊏═─๋︩︪──๋︩︪─┈┌*
> *↬⌯السـؤال:* ${question.question}
> *↬⌯الوقـت:* ${(gameDuration / 1000).toFixed(2)} ثـانـيـة
> *↬⌯الـجائـزة:* ${poin} نـقـاط
> *للانسحاب اضغط ◞انسحب›*
*┘┈─๋︩︪──๋︩︪─═⊐‹🍧›⊏═─๋︩︪──๋︩︪─┈└*
`;

            await conn.sendButton(m.chat, message, `> ${botname}`, poster, [
                [`🍡┇${options[0]}┇🍡`, `${game} ${options[0]}`],
                [`🍡┇${options[1]}┇🍡`, `${game} ${options[1]}`],
                [`🍡┇${options[2]}┇🍡`, `${game} ${options[2]}`],
                [`🍡┇${options[3]}┇🍡`, `${game} ${options[3]}`],
                [`◞انسحب🏃‍♂️◜`, `${game} انسحب`]
            ], null, null);
        } else {
            m.react('👇🏻');
            conn.sendButton(m.chat, `> *لـقـد انـتـهـت الـعـبـة ◞🍡◜*`, `> ${botname}`, poster, [[`↬⌯الـمـ🌸ـزيـد‹◝`, `${game}`]], null, null);
        }
    }
}

handler.help = ['ايموجي'];
handler.tags = ['game'];
handler.command = /^(ايموجي)$/i;

export default handler;