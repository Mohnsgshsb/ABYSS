const handler = (m) => m;

handler.before = async function(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (!m.isGroup) return !1;  // تأكد من أن الرسالة في مجموعة

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (isBotAdmin && chat.antiArab2 && !isAdmin && !isOwner && !isROwner && bot.restrict) {
    const sender = m.sender;
    const restrictedPrefixes = ['212', '265', '92'];  // الأرقام المحظورة

    for (let prefix of restrictedPrefixes) {
      if (sender.startsWith(prefix)) {
        m.reply(`*[❗] في هذه المجموعة لا يُسمح بأرقام عربية أو غير عادية، لذا سيتم طردك من المجموعة.*`);
        const responseb = await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
        if (responseb[0].status === '404') return;
        break;  // بمجرد العثور على تطابق، نخرج من الحلقة ونتوقف عن التحقق
      }
    }
  }
};

export default handler;