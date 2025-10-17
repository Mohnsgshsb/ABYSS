import fs from 'fs';
import acrcloud from 'acrcloud';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: '9e57b4242550cf75c233b78b403d57de',
  access_secret: 'glASDF81N346ClWxEZpT0yUeykY8R8PnXhKaHsY5',
});

const handler = async (m) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (/audio|video/.test(mime)) {
    if ((q.msg || q).seconds > 120) 
      return m.reply('*\`『 الصوت ميعديش دقتين 』\`*');

    const media = await q.download();
    const ext = mime.split('/')[1];
    fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media);
    const res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`));

    const { code, msg } = res.status;
    if (code !== 0) throw msg;

    const { title, artists, album, genres, release_date } = res.metadata.music[0];
    const txt = `
\`❰جبت الاغنيه يسطا🧚‍♀️❱\`

➦ ⟦العنوان⟧ ➬ ${title}
➦ ⟦الفنانين⟧ ➬ ${artists !== undefined ? artists.map((v) => v.name).join(', ') : 'لم يُعثر عليه'}
➦ ⟦الألبوم⟧ ➬  ${album.name || 'لم يُعثر عليه'}
➦ ⟦النوع⟧ ➬ ${genres !== undefined ? genres.map((v) => v.name).join(', ') : 'لم يُعثر عليه'}
➦ ⟦تاريخ الإصدار⟧ ➬  ${release_date || 'لم يُعثر عليه'}
`.trim();

    fs.unlinkSync(`./tmp/${m.sender}.${ext}`);
    m.reply(txt);
  } else {
    throw '*\`『 اعمل ريب ع اغنيه في فيديو قصير او ملف صوتي وهجبلك التفصيل وهنزلك الصوت🧚🏻‍♂️ 』\`*';
  }
};

handler.help = ['quemusica'];
handler.tags = ['tools'];
handler.command = /^quemusica|اعرف|whatmusic$/i;
handler.register = true;

export default handler;