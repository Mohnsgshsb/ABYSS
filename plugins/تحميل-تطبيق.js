import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {

    let appName = args.join(' ').trim();

    if (!appName) return m.reply(`*🤔 ماذا تريد تحميله؟ 🤔*\n*أدخل اسم التطبيق*\n\n*مثال:*\n${usedPrefix}${command} Free Fire`);

    const apiUrl = `https://api-streamline.vercel.app/dlapk?search=${encodeURIComponent(appName)}`;

    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`);

        }

        const data = await response.json();

        if (!data || !data.id) {

            return m.reply('لم يتم العثور على التطبيق 😔');

        }

        let { name, file, icon } = data;

        await conn.sendMessage(m.chat, {

            image: { url: icon }, // صورة أيقونة التطبيق

            caption: `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
  『اسم التطبيق:  ${name} 📍』
  『 اختر من الازرار كيفيه التحميل』
  *⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*`,

            footer: '♡┆𖧷₊˚˖𓍢ִ🍓𝐀𝐁𝐘𝐒𝐒_𝐁𝐎𝐓˚.🎀༘⋆ﾟ┆♡',

            buttons: [

                {

                    buttonId: `.تحميل_هنا ${file.path}`,

                    buttonText: {

                        displayText: '*『🍬ارسـل خـاص🍬』*'

                    }

                },

                {

                    buttonId: `.تحميل_خاص ${file.path}`,

                    buttonText: {

                        displayText: '*『🍬ارسـل هـنـا🍬』*'

                    }

                }

            ],

            viewOnce: true,

            headerType: 4,

        }, { quoted: m });

    } catch (error) {

        console.error('Error fetching data:', error);

        m.reply('حدث خطأ أثناء جلب بيانات التطبيق. حاول مرة أخرى لاحقًا.');

    }

};

handler.command = ['تطبيق','apk'];

export default handler;