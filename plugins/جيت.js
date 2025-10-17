import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

  if (command === 'جيت') {
    if (!text) throw `[❗] يرجي إدخال إسم المشروع للبحث.\n> مثال: ${usedPrefix + command} TheMystic-Bot-MD`;

    const res = await fetch(`https://api.github.com/search/repositories?q=${text}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    const json = await res.json();
    if (!json.items || json.items.length === 0) throw 'لم يتم العثور على أي مشروع بهذا الاسم.';

    const avatarUrl = json.items[0].owner.avatar_url;
    const imagen = await conn.getFile(avatarUrl).data;
    const media = await prepareWAMessageMedia({ image: { url: avatarUrl } }, { upload: conn.waUploadToServer });

    let heager = json.items.map((repo, index) => ({
      header: repo.owner.login,
      title: repo.full_name,
      id: `${usedPrefix}g.1 ${repo.clone_url}`,
      description: `تحميل المستودع👨‍💻`
    }));

    const caption = `╭───────────────────────╮
*${text} ➠ ❲ تم الحصول علي المشاريع ب اسم ❳*
╰───────────────────────╯

> *اختر المستودع المطلوب للتحميل:*
🚀 *GitHub Search*`;
    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: caption },
            footer: { text: '𝑲𝑨𝑰〔⚡️〕𝑩𝑶𝑻' },
            header: {
              hasMediaAttachment: true,
              imageMessage: media.imageMessage,
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: '〔قائمه المشاريع🗃〕',
                    sections: [
                      {
                        title: '〔قائمه المشاريع🗃〕',
                        highlight_label: '📂',
                        rows: heager
                      }
                    ]
                  }),
                }
              ],
              messageParamsJson: "",
            },
          },
        },
      }
    }, { userJid: conn.user.jid, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } else if (command === 'g.1') {
    if (!args[0]) throw `يرجى تقديم رابط GitHub صحيح باستخدام الصيغة التالية: *${usedPrefix + command}* https://github.com/BrunoSobrino/TheMystic-Bot-MD`;
    if (!regex.test(args[0])) throw `رابط GitHub غير صحيح. يرجى التحقق من الرابط وإعادة المحاولة.`;

    let [_, user, repo] = args[0].match(regex) || [];
    repo = repo.replace(/.git$/, '');

    const url = `https://api.github.com/repos/${user}/${repo}/zipball`;
    const headRes = await fetch(url, { method: 'HEAD' });
    if (!headRes.ok) throw new Error(`HTTP error! Status: ${headRes.status}`);

    const filename = headRes.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];

    m.reply('جاري تحميل الملف من GitHub...');
    await conn.sendFile(m.chat, url, filename, null, m);
  }
};

handler.help = ['githubs'];
handler.tags = ['buscadores'];
handler.command = /^(جيت|g.1)$/i;
export default handler;

function formatDate(n, locale = 'ar') {
  const d = new Date(n);
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
            }