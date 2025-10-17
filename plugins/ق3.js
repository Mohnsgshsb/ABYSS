let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender) || 'مستخدم';
  let taguser = '@' + m.sender.split("@")[0];

  let currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
  let groupName = groupMetadata ? groupMetadata.subject : 'غير معروف';
  let groupMembers = groupMetadata ? groupMetadata.participants.length : 'غير معروف';

  let message = `*_:•⪼مـــرحبــــاً بـــكـ/ﻲ يـا ❪${taguser}❫ في قسم الجروبات*
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
> *شرح القسم:•⪼ القسم يقدم لك اوامر المتعلقه بي اداره الجروبات*
*❍━━━══━━❪🌸❫━━══━━━❍*
> *｢❆┊قــــــســـــــم الجروبات┊❆｣*
*❍━━━══━━❪🌸❫━━══━━━❍*
┊🍨┊:•⪼ ⌟جروبي⌜ 
┊🍨┊:•⪼ ⌟جروب⌜ 
┊🍨┊:•⪼ ⌟ترقيه⌜
┊🍨┊:•⪼ ⌟منشن⌜
┊🍨┊:•⪼ ⌟كتم⌜
┊🍨┊:•⪼ ⌟بروفايل_الجروب⌜
┊🍨┊:•⪼ ⌟الغاء-الكتم⌜
┊🍨┊:•⪼ ⌟الترحيب⌜
┊🍨┊:•⪼ ⌟المغادره⌜
┊🍨┊:•⪼ ⌟تحذير⌜
┊🍨┊:•⪼ ⌟دعوه⌜
┊🍨┊:•⪼ ⌟مخفي⌜
┊🍨┊:•⪼ ｢الاشباح｣
┊🍨┊:•⪼ ｢طرد_الاشباح｣
┊🍨┊:•⪼ ｢لينك｣
┊🍨┊:•⪼ ｢تجديد｣
┊🍨┊:•⪼ ｢اعفاء｣
┊🍨┊:•⪼ ｢طرد｣
┊🍨┊:•⪼ ｢مسح｣
*❍━━━══━━❪🌸❫━━══━━━❍*
*┊🍫┊البوت:•⪼𝐀𝐁𝐘𝐒𝐒*`;

  const emojiReaction = '🐦‍🔥';

  try {
    await conn.sendMessage(m.chat, { react: { text: emojiReaction, key: m.key } });

    await conn.sendMessage(m.chat, { 
      image: { url: 'https://files.catbox.moe/zmzelz.jpg' },
      caption: message,
      mentions: [m.sender]
    });
  } catch (error) {
    console.error("Error sending message:", error);
    await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء إرسال الصورة.' });
  }
};

handler.command = /^(ق3)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;