const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply("❗ استخدم الأمر من القايمة فقط.");

  let [model, text] = args.join(' ').split('|');
  if (!model || !text) return m.reply("⚠️ خطأ في المعطيات.");

  const res = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=${model}&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${encodeURIComponent(text.trim())}`;

  await m.reply("⚙️ جاري إنشاء اللوجو...");
  await conn.sendFile(m.chat, res, 'flamingtext.jpg', `✅ تم إنشاء اللوجو بنمط *${model}*`, m);
};

handler.command = /^flamegen$/i;
export default handler;