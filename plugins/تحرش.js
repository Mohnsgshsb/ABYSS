let handler = async (m, { conn, text }) => {
  const usageMessage = '*`『 اعمل ريب على الشخص اللي عايز تتحرش بيه 😂💋 』`*';

  const who = m.mentionedJid?.[0] 
    || (m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false);

  if (!who) return conn.reply(m.chat, usageMessage, m, { mentions: [m.sender] });

  if (who === conn.user.jid || who === m.sender) {
    return conn.reply(m.chat, `🙄 تتحرش بنفسك؟ ولا فيك إيه بالضبط؟`, m);
  }

  let user = who.split('@')[0];
  let sender = m.sender.split('@')[0];

  let phrases = [
    `🫦 *@${sender} بيتحرش بـ @${user} من تحت لتحت 👀*`,
    `🥵 *@${sender} عمل عينه زايغة على @${user} 💦*`,
    `💋 *@${sender} قال لـ @${user}: "هاتي رقمك بقى يا قمر" 🫦*`,
    `💋 *@${sender} بعت قبلة طايرة لـ @${user}* 💋`,
    `🫦 *@${sender} بيتحرش بـ @${user} وبيقولها: "انتي اللي وقعتيني في الحب" 🫦*`
  ];

  let cap = phrases[Math.floor(Math.random() * phrases.length)];

  await conn.sendMessage(m.chat, { text: cap, mentions: [m.sender, who] }, { quoted: m });
};

handler.command = ['تحرش'];
handler.owner = false;
export default handler;