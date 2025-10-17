let handler = async (m, { conn }) => {
  let caption = `
*『ايه الكرسي🥹💘』*

『اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ』
`.trim()

  await conn.reply(m.chat, caption, m)

  await conn.sendMessage(m.chat, { 
    audio: { 
      url: 'https://files.catbox.moe/vd9rvk.aac'
    }, 
    mimetype: 'audio/aac', 
    ptt: true 
  }, { quoted: m });
};
  
handler.help = ['ayatkursi']
handler.tags = ['islamic']
handler.command = /^(ايه-الكرسي|اية الكرسي)$/i
handler.limit = true

export default handler