import axios from 'axios';
const { generateWAMessageFromContent, prepareWAMessageMedia } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🔴 لازم تدخل اسم الفنان أو الأغنية!\n🔹 مثال:\n${usedPrefix + command} TINI`);

  try {
    let resultados = await spotifyxv(text);
    if (resultados.length === 0) return m.reply(`⚠️ مع الأسف مش لاقي حاجة تطابق بحثك 😔`);

    const result = resultados[0];
    const albumInfo = await obtenerAlbumInfo(result.album);

    const { imageMessage } = await prepareWAMessageMedia({
      image: { url: albumInfo.imagen }
    }, { upload: conn.waUploadToServer });

    const teksnya = `*❍━━━══━━❪🌸❫━━══━━━❍*
🧚 *｢العنوان｣:* ${result.nombre}
🍫 *｢الفنانين｣:* ${result.artistas.join(', ')}
🍡 *｢البوم｣:* ${result.album}
🍥 *｢المده｣:* ${timestamp(result.duracion)}
🍭 *｢الرابط｣:* ${result.url}
*❍━━━══━━❪🌸❫━━══━━━❍*`;

    const messageContent = {
      buttonsMessage: {
        contentText: teksnya,
        footerText: 'Spotify',
        buttons: [
          {
            buttonId: `.سبوت-تحميل ${result.url}`,
            buttonText: { displayText: '🎧┊「 حمل الاغنيه 」┊🍭' },
            type: 1
          }
        ],
        headerType: 4,
        imageMessage: imageMessage
      }
    };

    const message = generateWAMessageFromContent(
      m.chat,
      { ephemeralMessage: { message: messageContent } },
      { userJid: conn.user.id }
    );

    await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

  } catch (e) {
    console.error("❗ خطأ:", e);
    return m.reply(`❗ حدث خطأ أثناء البحث. حاول مرة ثانية.`);
  }
};

handler.command = /^(سبوتيفاي)$/i;
export default handler;

// الوظائف المساعدة
async function spotifyxv(query) {
  const token = await obtenerTokenSpotify();
  const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  return response.data.tracks.items.map(item => ({
    id: item.id,
    nombre: item.name,
    artistas: item.artists.map(artist => artist.name),
    album: item.album.name,
    duracion: item.duration_ms,
    url: item.external_urls.spotify
  }));
}

async function obtenerTokenSpotify() {
  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': "Basic " + Buffer.from("cda875b7ec6a4aeea0c8357bfdbab9c2:c2859b35c5164ff7be4f979e19224dbe").toString("base64")
      }
    });
    return response.data.access_token;
  } catch (err) {
    console.error("Error fetching token:", err);
  }
}

async function obtenerAlbumInfo(albumName) {
  const token = await obtenerTokenSpotify();
  const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(albumName)}&type=album`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const albums = response.data.albums.items;
  if (albums.length > 0) {
    const album = albums[0];
    return { nombre: album.name, imagen: album.images[0].url };
  }
  return { nombre: albumName };
}

function timestamp(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}