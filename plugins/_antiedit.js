import axios from 'axios';

const voices = {
  'ادم': 'alloy',
  'علي': 'echo',
  'بلال': 'fable',
  'فهد': 'onyx',
  'نور': 'nova',
  'اميره': 'shimmer',
  'جنى': 'coral',
  'نغم': 'verse',
  'مالك': 'ballad',
  'رماد': 'ash',
  'سلمي': 'sage',
  'محمد': 'amuch',
  'ياسر': 'aster',
  'براء': 'brook',
  'ياسمين': 'clover',
  'جاك': 'dan',
  'نجمه': 'elan'
};

const baseUrl = 'https://text.pollinations.ai';

const basePrompt = `اتكلم باللهجة المصرية، وابقى عندك 18 سنة، وخلي طريقتك ضحك ومازحة وبتغلط شوية،
و لو حد سالك انتا مين مطورك هتقولو انا مطوري مهند ولو سالك بي اسم غيث او تيربو هما مهند برضو و انتا لما حد يسالك عن اسمك قول اسمي انتا لسه كاتبو اهو يا احول و متتكلمش ديما ب صيغه الجمع و مش ديما اي حد مش تقول اسمك او اسم مطورك ونتا بتتكلم قولو لو حد سالك مين المطور .`;

let handler = async (m, { conn, text, command }) => {
  if (['قائمة_الأصوات', 'voices', 'الاصوات'].includes(command)) {
    const list = '*🎧 قائمة الأصوات المتاحة:*\n\n' +
      Object.keys(voices).map(v => `- *${v}*`).join('\n');
    return m.reply(list + '\n\n⌯ اكتب الأمر مع نص زي:\n*.نور ازيك يا نجم؟*');
  }

  if (!text) return m.reply('🎙️ اكتب النص اللي عايز الصوت يقوله بعد الأمر.');

  const voice = voices[command];
  if (!voice) return m.reply('❌ الصوت غير موجود.\nاستخدم *قائمة_الأصوات* لعرض المتاح.');

  try {
    const finalText = `${basePrompt}\n\n${text}`;
    const url = `${baseUrl}/${encodeURIComponent(finalText)}?model=openai-audio&voice=${voice}`;
    await conn.sendMessage(
      m.chat,
      { audio: { url }, mimetype: 'audio/mpeg', ptt: true },
      { quoted: m }
    );
  } catch (err) {
    console.error('TTS Error:', err);
    m.reply('❌ حصل خطأ أثناء تحويل النص إلى صوت.');
  }
};

handler.command = [...Object.keys(voices), 'قائمة_الأصوات', 'voices', 'الاصوات'];
handler.help = [
  ...Object.keys(voices).map(v => `${v} <النص>`),
  'قائمة_الأصوات - عرض قائمة الأصوات'
];
handler.tags = ['ai'];

export default handler;