const gameDuration = 60000;
const poin = 2000;
const game = '.لغز';

export async function handler(m, { command, text, conn }) {
    let id = m.chat;
    conn.riddleGame = conn.riddleGame || {};
    let currentGame = conn.riddleGame[id];

    let src = [
        { name: "الظل", question: "شيء يتبعك في كل مكان ولا يمسك أو يُرى؟" },
        { name: "السلم", question: "شيء يصعد ولا ينزل؟" },
        { name: "القلم", question: "شيء يكتب ولا يقرأ؟" },
        { name: "الحفرة", question: "ما هو الشيء الذي كلما أخذت منه كبر؟" },
        { name: "الصوت", question: "ما هو الشيء الذي لا يُرى وإذا تكلمت به كسرته؟" },
        { name: "الماء", question: "ما هو الشيء الذي له لون ولا طعم ولا رائحة؟" },
        { name: "السر", question: "ما هو الشيء الذي إذا بُحْتَ به لم يعد ملكك؟" },
        { name: "الباب", question: "ما هو الشيء الذي له مفاتيح ولا يفتح؟" },
        { name: "الساعة", question: "ما هو الشيء الذي يدور حول نفسه ولا يتعب؟" },
        { name: "العقل", question: "ما هو الشيء الذي كلما زاد نقص؟" },
        // أضف حتى 30 بنفس النمط...
    ];

    let poster = 'https://i.ibb.co/YB7VbQZ/logo-cover.jpg';

    if (!src || src.length === 0) {
        return conn.reply(m.chat, '> *لا توجد ألغاز متاحة حالياً.*', m);
    }

    if (currentGame) {
        if (!text) {
            return conn.reply(m.chat, '> *هناك لغز قيد التشغيل بالفعل.*', m);
        } else if (text.toLowerCase() === currentGame[1].name.toLowerCase()) {
            m.react('✅');
            global.db.data.users[m.sender].exp += poin;
            conn.sendButton(m.chat, `> *أحسنت! ربحت ${poin} نقطة!*`, `> ألغاز`, poster, [[`↬⌯لغز جديد`, `${game}`]], null, null);
            clearTimeout(currentGame[3]);
            delete conn.riddleGame[id];
        } else if (text === 'انسحب') {
            clearTimeout(currentGame[3]);
            conn.sendButton(m.chat, `> *تم الانسحاب. الإجابة: ${currentGame[1].name}*`, `> ألغاز`, poster, [[`↬⌯جرب لغز آخر`, `${game}`]], null, null);
            delete conn.riddleGame[id];
        } else {
            m.react('❌');
            clearTimeout(currentGame[3]);
            conn.sendButton(m.chat, `> *خطأ! الإجابة الصحيحة: ${currentGame[1].name}*`, `> ألغاز`, poster, [[`↬⌯حاول مرة أخرى`, `${game}`]], null, null);
            delete conn.riddleGame[id];
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

            conn.riddleGame[id] = [m, question, 10, setTimeout(() => {
                delete conn.riddleGame[id];
                conn.sendButton(m.chat, `> *انتهى الوقت! الإجابة: ${question.name}*`, `> ألغاز`, poster, [[`↬⌯جرب لغز آخر`, `${game}`]], null, null);
            }, gameDuration)];

            let msg = `
> ‹◝ ${question.question} ⛅ ↬

*┐┈─๋︩︪─═⊐‹تحدي الألغاز›⊏═─๋︩︪─┈┌*
> *↬⌯الوقت ⏳: ${(gameDuration / 1000)} ثانية*
> *↬⌯الجائزة: 2000 نقطة*
> *للانسحاب اضغط ◞انسحب›*
*┘┈─๋︩︪─═⊐‹تحدي الألغاز›⊏═─๋︩︪─┈└*
`;

            await conn.sendButton(m.chat, msg, `> ألغاز`, poster, [
                [`🍡┇${options[0]}┇🍡`, `${game} ${options[0]}`],
                [`🍡┇${options[1]}┇🍡`, `${game} ${options[1]}`],
                [`🍡┇${options[2]}┇🍡`, `${game} ${options[2]}`],
                [`🍡┇${options[3]}┇🍡`, `${game} ${options[3]}`],
                [`◞انسحب🏃‍♂️◜`, `${game} انسحب`]
            ], null, null);
        } else {
            m.react('👇🏻');
            conn.sendButton(m.chat, `> *انتهت اللعبة ◞❕◜*`, `> ألغاز`, poster, [[`↬⌯ابدأ من جديد`, `${game}`]], null, null);
        }
    }
}

handler.help = ['لغز', 'فزورة', 'فزوره', 'الغاز'];
handler.tags = ['العاب'];
handler.command = ['لغز', 'فزورة', 'فزوره', 'الغاز'];

export default handler;