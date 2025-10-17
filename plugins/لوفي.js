import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("- 「☠️」 هل تظن أنني أقرأ العقول؟ اكتب شيئًا بعد الأمر");

  await m.reply("... انتظر، فينوم يرد.");

  try {
    let result = await CleanDx(text);
    await m.reply(`*╮━══━❪☠️❫══━━❍*\n『 لوفي ⚓ 』${result}\n*╯━══━❪☠️❫━══━❍*`);
  } catch (e) {
    await m.reply("『 ☠️ 』حتى فينوم ما فهمك... جرّب مرة أخرى.");
  }
};

handler.help = ["dx"];
handler.tags = ["ai"];
handler.command = /^(فينوم)$/i;

export default handler;

async function CleanDx(your_qus) {
  let Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";
  
  // لوفي بأسلوبه المرح والحماسي
  let prompt = `أنت فينوم من فيلم اجنبي اكشن مثير. رد كما لو أنك فينوم بشخصيتك المتحكمه و العصبيه و المحب للمشاكل. سؤالي هو: ${your_qus}`;

  let response = await fetch(Baseurl + encodeURIComponent(prompt));
  let data = await response.json();
  return data.message;
}