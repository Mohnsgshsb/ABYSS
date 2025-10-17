import axios from 'axios';
import crypto from 'crypto';
import FormData from 'form-data';

function cyphereddata(t, r = "cryptoJS") {
    t = t.toString();
    const e = crypto.randomBytes(32);
    const a = crypto.randomBytes(16);
    const i = crypto.pbkdf2Sync(r, e, 999, 32, 'sha512');
    const cipher = crypto.createCipheriv('aes-256-cbc', i, a);
    let encrypted = cipher.update(t, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return JSON.stringify({
        amtext: encrypted,
        slam_ltol: e.toString('hex'),
        iavmol: a.toString('hex')
    });
}

const NoiseRemover = {
    async run(buffer) {
        const timestamp = Math.floor(Date.now() / 1000);
        const encryptedData = JSON.parse(cyphereddata(timestamp));

        const formData = new FormData();
        formData.append('media', buffer, { filename: crypto.randomBytes(3).toString('hex') + '_halo.mp3' });
        formData.append('fingerprint', crypto.randomBytes(16).toString('hex'));
        formData.append('mode', 'pulse');
        formData.append('amtext', encryptedData.amtext);
        formData.append('iavmol', encryptedData.iavmol);
        formData.append('slam_ltol', encryptedData.slam_ltol);

        const response = await axios.post(
            'https://noiseremoval.net/wp-content/plugins/audioenhancer/requests/noiseremoval/noiseremovallimited.php',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "accept": "*/*",
                    "x-requested-with": "XMLHttpRequest",
                    "Referer": "https://noiseremoval.net/",
                },
            }
        );

        return response.data;
    },
};

const handler = async (m, { conn }) => {
    try {
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';

        if (!/audio|video/.test(mime)) {
            return m.reply('🍡 *| المرجو إرسال أو الرد على مقطع صوتي أو فيديو لإزالة الضجيج*.');
        }

        m.reply('🧚 *|المرجو الانتظار قليلاً، يتم معالجة الصوت...*');

        const media = await quoted.download();
        const result = await NoiseRemover.run(media);

        if (result.error) {
            return m.reply(`فشل في إزالة الضجيج: ${result.message}`);
        }

        const enhancedAudioUrl = result.media.enhanced.uri;

        await conn.sendMessage(m.chat, {
            audio: { url: enhancedAudioUrl },
            mimetype: 'audio/mp4', // صيغة مدعومة للتشغيل المباشر
            ptt: true // إرسال كمقطع صوتي يمكن الاستماع إليه مباشرة
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        m.reply('حدث خطأ أثناء معالجة المقطع الصوتي.');
    }
};

handler.help = ['removenoise'];
handler.command = ['حذف-الازعاج'];
handler.tags = ['ai'];
handler.limit = true;
export default handler;
