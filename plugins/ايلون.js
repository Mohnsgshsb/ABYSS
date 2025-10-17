import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("- 「🍫」اكتب الي عايزو");

  await m.reply("... ثواني 🧚");

  try {
    let result = await CleanDx(text);
    await m.reply(`*╮━━━══━━❪🌌❫━━══━━━❍*\n『 🚀 』${result}\n*╯━━━══━━❪🌌❫━━══━━━❍*`);
  } catch (e) {
    await m.reply("『 🚀 』حتى إيلون ما فهم سؤالك، حاول من جديد.");
  }
};

handler.help = ["dx"];
handler.tags = ["ai"];
handler.command = /^(جبتي)$/i;

export default handler;

async function CleanDx(your_qus) {
  let Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";

  // أسلوب إيلون ماسك
  let prompt = `انت شات جي بي تي لاكن من تطوير "نوتيلا الجيزاويه" و ايضا اذا سالك احد عن مطورك رد بي "كسمك" فقط. سؤالي هو: ${your_qus}`;

  let response = await fetch(Baseurl + encodeURIComponent(prompt));
  let data = await response.json();
  return data.message;
}