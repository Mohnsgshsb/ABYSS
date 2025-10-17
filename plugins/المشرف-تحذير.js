const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (m.mentionedJid.includes(conn.user.jid)) return;

  const pp = './src/warn.jpg';
  let who;

  if (m.isGroup) {
    who = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : '';
  } else {
    who = m.chat;
  }

  if (!who) {
    const warntext = `*[❗] قم بالرد على رسالة أو منشن المستخدم*\n\n*—◉ مثال:*\n*${usedPrefix + command} @${global.suittag}*`;
    await m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
    return;
  }

  // التأكد من أن المستخدم موجود في قاعدة البيانات
  let user = global.db.data.users[who];
  if (!user) {
    global.db.data.users[who] = { warn: 0 };
    user = global.db.data.users[who];
  }

  const dReason = 'بدون سبب';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  user.warn = (user.warn || 0) + 1;

  await m.reply(
    `*┏┅ ━━━━━━━━━━━━━━━━ ┅ ━┓*
*┃╻⚠️╹↵ ٭ تم تحذير المستخدم ٭ ↯*
*┣ ┅ ━━━━━━━━━━━━━━━━ ┅ ━⊹❐*
*┃╻👤╹↵ ٭ المستخدم ↯*
*┃╻📧╹↵ ٭〙@${who.split`@`[0]}〘*
*┃╻❓╹↵ ٭ السبب:〙 ${sdms} 〘*
*┣┅ ━━━━━━━━━━━━━━━━ ┅ ━⊹❐*
*┃╻❗╹↵ ٭ التحذيرات:〙 ${user.warn}/3 〘*
*┗┅ ━━━━━━━━━━━━━━━━ ┅ ━┛*`,
    null,
    { mentions: [who] }
  );

  if (user.warn >= 3) {
    user.warn = 0;
    await m.reply(
      `*❍━━━══━━❪🌸❫━━══━━━❍*
「👻」⇇ *『حذرتك ثلاث مرات!!』* ⇇「🌝」
「🍁」⇇ *『@${who.split`@`[0]}』* لقد تجاوزت *3* تحذيرات.
「🌟」⇇ *『سيتم طردك الآن!』 👽*
*❍━━━══━━❪🌸❫━━══━━━❍*`,
      null,
      { mentions: [who] }
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.command = /^(advertir|advertencia|تحذير|warn|انذار)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;