let handler = async (m, {conn, text, config}) => {
    if (!text) return m.reply('فين النص ?');

    // Fallback for missing config.cenel
    const channelId = config?.cenel?.id || '120363377578749872@newsletter';
    const channelName = config?.cenel?.name || 'صلي  على النبي 😄';
    const thumbnailUrl = config?.img?.nekobot || 'https://cdn.cifumo.xyz/f10/images/f63d343843ee.jpg';

    await conn.sendMessage(channelId, {
        text: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 9999, 
            isForwarded: true, 
            forwardedNewsletterMessageInfo: {
                newsletterJid: channelId,
                serverMessageId: 20,
                newsletterName: channelName
            },
            externalAdReply: {
                title: "Noureddine Ouafy", 
                body: "هذه رسالة من أليس بوت | ABYSS BOT",
                thumbnailUrl: thumbnailUrl, 
                sourceUrl: null,
                mediaType: 1
            }
        }
    });

    m.reply('تم الارسال 😁');
}

handler.help = handler.command = ['send-to-channel'];
handler.tags = ['owner'];
handler.owner = true
export default handler;
