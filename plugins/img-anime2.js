import axios from 'axios';
const handler = async (m, {command, conn, usedPrefix}) => {
  const res = (await axios.get(`https://raw.githubusercontent.com/Mohnd32145/Media/master/JSON/anime-${command}.json`)).data;
  const haha = await res[Math.floor(res.length * Math.random())];
  
conn.sendButton(m.chat, `〔🌸${command}🌸〕`.trim(), author, haha, [['『الي بعدو🍬』', `${usedPrefix + command}`]], m)
  m.react('👀');
};
handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'brouto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'جوزو', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay'];
handler.tags = ['anime'];
export default handler;