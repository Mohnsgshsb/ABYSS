const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply('> *\`『 🧚🏻‍♂️ تم ظبط رسالة الترحيب بنجاح 』\`*');
  } else {
    throw '> *\`『 اكتب رسالة الترحيب الي عايز تضفها استخدم 』\`*\n*- @user (ذكر المستخدم)*\n*- @group (اسم الجروب)*\n*- @desc (وصف الجروب)*';
  }
};
handler.help = ['setwelcome <نص>'];
handler.tags = ['group'];
handler.command = ['الترحيب'];
handler.admin = true;
export default handler;
