let linkRegex = /(?:chat\.whatsapp\.com\/|whatsapp\.com\/channel\/)([0-9A-Za-z]{20,})/i;
const grupoBase = 'https://chat.whatsapp.com';

export async function before(m, { isAdmin, isBotAdmin, participants, conn }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup || !m.text) return !1;

    const user = m.sender;
    const chat = m.chat;
    const bang = m.key.id;
    const delet = m.key.participant || m.participant || user;
    const groupAdmins = participants.filter(p => p.admin);

    const isLink = linkRegex.exec(m.text);

    // كاش لبيانات الجروب
    const chatData = global.db.data.chats[chat] ||= {};
    const warnDB = chatData.warn ||= {};
    warnDB[user] ||= 0;

    // لو ادمن بيبعت لينك
    if (isAdmin && m.text.includes(grupoBase)) {
        return m.reply('*`『 مش هطردك ع انت ادمن، أي حد غير الادمن هينزل لنك هيوحشنا 』`*');
    }

    // لو مش ادمن و فيه لينك
    if (isLink && !isAdmin) {
        try {
            // كاش لرابط الجروب
            chatData.groupLink ||= `https://chat.whatsapp.com/${await conn.groupInviteCode(chat)}`;
            if (m.text.includes(chatData.groupLink)) return !0;

            // زيادة التحذير
            const warnCount = ++warnDB[user];

            await conn.sendMessage(chat, {
                text: `⬣━━━━〘مانع الروابط🥷🩸〙━━━━┏
🐉🔥┇  تم اكتشاف رابط
❐⊹━━━━━『𝑲𝑨𝑰』━━━━━⊹❐
🐉❗️┇ @${user.split('@')[0]} ممنوع يسطا
❐⊹━━━━━『𝑲𝑨𝑰』━━━━━⊹❐
🐉🔥┇تحذير رقم (${warnCount}/3)
⬣━━━━〘مانع الروابط🥷🩸〙━━━━┗`,
                mentions: [user]
            }, { quoted: m });

            if (!isBotAdmin) {
                return conn.sendMessage(chat, {
                    text: `*『مش أدمن، مش هقدر أمسح اللينك』*`,
                    mentions: groupAdmins.map(v => v.id)
                }, { quoted: m });
            }

            // مسح الرسالة
            await conn.sendMessage(chat, {
                delete: { remoteJid: chat, fromMe: false, id: bang, participant: delet }
            });

            // طرد لو 3 تحذيرات
            if (warnCount >= 3) {
                await conn.groupParticipantsUpdate(chat, [user], 'remove');
                warnDB[user] = 0;
            }

        } catch (e) {
            console.error('❌ خطأ في معالجة الرابط:', e);
        }
    }

    return !0;
}