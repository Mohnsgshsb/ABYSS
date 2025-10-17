import fetch from 'node-fetch';

const handler = async (message, { conn, command, text, isAdmin }) => {
  try {
    // التحقق من وجود بيانات البوت والمستخدمين
    if (!global.owner || !global.owner[0] || !global.owner[0][0]) {
      throw "❌ إعدادات المالك غير صحيحة";
    }
    
    const botOwner = `${global.owner[0][0]}@s.whatsapp.net`;
    
    // تحديد المستهدف
    let targetJid = message.mentionedJid[0] || 
                   (message.quoted ? message.quoted.sender : text?.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
    
    // التحقق من وجود مستهدف
    if (!targetJid) {
      const errorMsg = command === 'كتم' 
        ? "╰⊱❗️⊱ *يجب ذكر الشخص أو الرد على رسالته لكتمه* ⊱❗️⊱" 
        : "╰⊱❗️⊱ *يجب ذكر الشخص أو الرد على رسالته لإلغاء كتمه* ⊱❗️⊱";
      return await conn.reply(message.chat, errorMsg, message);
    }

    // تنظيف المعرف وتنسيقه
    targetJid = targetJid.replace(/[^0-9@]/g, '');
    if (!targetJid.endsWith('@s.whatsapp.net')) {
      targetJid += '@s.whatsapp.net';
    }

    // تهيئة بيانات المستخدم إذا لم تكن موجودة
    if (!global.db.data?.users) global.db.data.users = {};
    if (!global.db.data.users[targetJid]) {
      global.db.data.users[targetJid] = {};
    }
    
    const userData = global.db.data.users[targetJid];

    // الحصول على معلومات المجموعة
    const groupMetadata = await conn.groupMetadata(message.chat);
    const groupOwner = groupMetadata.owner || message.chat.split('-')[0] + '@s.whatsapp.net';

    // التحقق من الصلاحيات والمحظورات
    if (targetJid === conn.user.jid) throw "❌ لا يمكن كتم البوت نفسه";
    if (targetJid === botOwner) throw "❌ لا يمكن كتم مالك البوت";
    if (targetJid === groupOwner) throw "❌ لا يمكن كتم مالك المجموعة";
    if (!isAdmin) throw "⚠️ هذا الأمر متاح فقط للمشرفين";

    // إعداد رسالة الرد
    const responseMessage = {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "mute_handler"
      },
      message: {
        locationMessage: {
          name: "͟͟͞͞➳❥ 🍓𝐀𝐁𝐘𝐒𝐒_𝐁𝐎𝐓🧁 ⋆｡˚✮",
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Bot;;;\nFN:Bot\nORG:Terbo\nTITLE:Bot\nEND:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    };

    // معالجة أمر الكتم
    if (command === "كتم") {
      if (userData.muto) throw "ℹ️ هذا المستخدم مكتوم بالفعل";
      userData.muto = true;
      await conn.reply(message.chat, 
        `*✅ تم كتم المستخدم @${targetJid.split('@')[0]}، لن يتمكن من استخدام أوامر البوت.*`, 
        responseMessage, null, { mentions: [targetJid] });
        
    // معالجة أمر إلغاء الكتم
    } else if (command === "الغاء-الكتم") {
      if (!userData.muto) throw "ℹ️ هذا المستخدم غير مكتوم";
      if (targetJid === message.sender && message.sender !== botOwner && message.sender !== groupOwner) {
        throw "⚠️ لا يمكنك إلغاء كتم نفسك إلا إذا كنت مالك البوت أو المجموعة";
      }
      
      userData.muto = false;
      await conn.reply(message.chat, 
        `*✅ تم إلغاء كتم المستخدم @${targetJid.split('@')[0]}، يمكنه الآن استخدام البوت.*`, 
        responseMessage, null, { mentions: [targetJid] });
    }
    
  } catch (error) {
    console.error('Error in mute handler:', error);
    await conn.reply(message.chat, `❌ حدث خطأ: ${error}`, message);
  }
};

handler.command = /^(كتم|الغاء-الكتم)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;