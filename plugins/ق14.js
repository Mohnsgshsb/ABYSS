let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender) || 'مستخدم';
  let taguser = '@' + m.sender.split("@")[0];

  let currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
  let groupName = groupMetadata ? groupMetadata.subject : 'غير معروف';
  let groupMembers = groupMetadata ? groupMetadata.participants.length : 'غير معروف';

  let message = `*_:•⪼مـــرحبــــاً بـــكـ/ﻲ يـا ❪${taguser}❫ في قسم التعديل*
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
> *شرح القسم:•⪼ القسم يقدم لك اوامر تعديل الصور*
*❍━━━══━━❪🌸❫━━══━━━❍*
> *｢❆┊قــــــســـــــم تـعـديـل الـصـور┊❆｣*
*❍━━━══━━❪🌸❫━━══━━━❍*
┊🍨┊:•⪼ ⌟تمويه⌜ 
┊🍨┊:•⪼ ⌟بلور⌜ 
┊🍨┊:•⪼ ⌟بكسل⌜ 
┊🍨┊:•⪼ ⌟ازاله_الضباب⌜ 
┊🍨┊:•⪼ ⌟اعادة_تلوين⌜ 
┊🍨┊:•⪼ ⌟توضيح⌜
┊🍨┊:•⪼ ⌟حذف_الوترمارك⌜ 
┊🍨┊:•⪼ ⌟تحسين⌜ 
┊🍨┊:•⪼ ⌟ازاله_الخلفيه⌜ 
┊🍨┊:•⪼ ⌟توليد-صوره⌜ 
┊🍨┊:•⪼ ⌟خليفه-اتش⌜
┊🍨┊:•⪼ ⌟تحسين2⌜
┊🍨┊:•⪼ ⌟اجمل⌜
┊🍨┊:•⪼ ⌟لون⌜
┊🍨┊:•⪼ ⌟تفريغ⌜
┊🍨┊:•⪼ ⌟جوده⌜
┊🍨┊:•⪼ ⌟نضف⌜
*❍━━━══━━❪🌸❫━━══━━━❍*
*┊🍫┊البوت:•⪼𝐀𝐁𝐘𝐒𝐒*`;

  const emojiReaction = '🍥';

  try {
    await conn.sendMessage(m.chat, { react: { text: emojiReaction, key: m.key } });

    await conn.sendMessage(m.chat, { 
      image: { url: 'https://files.catbox.moe/n0s0mn.jpg' },
      caption: message,
      mentions: [m.sender]
    });
  } catch (error) {
    console.error("Error sending message:", error);
    await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء إرسال الصورة.' });
  }
};

handler.command = /^(ق14)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;