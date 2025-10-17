let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner} ) {
    const fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net"
    }

    if (!m.isGroup) return !1
    
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[conn.user.jid] || {}
    
    if (isBotAdmin && chat.antifake && !isAdmin && !isOwner && !isROwner) {
        let texto = `${ag}*@${m.sender.split`@`[0]}* في الجروب ده مش مسموح بأرقام مزيفة/عربية، هيتطرد...`
        
        const checkAndRemove = async (prefix) => {
            if (m.sender.startsWith(prefix)) {
                await conn.reply(m.chat, texto, fkontak, m)
                let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                if (responseb[0].status === "404") return 
            }
        }
        
        await checkAndRemove('91')
        await checkAndRemove('92')
        await checkAndRemove('222')
        await checkAndRemove('93')
        await checkAndRemove('265')
        await checkAndRemove('61')
        await checkAndRemove('62')
        await checkAndRemove('966')
        await checkAndRemove('229')
        await checkAndRemove('40')
        await checkAndRemove('49')
        await checkAndRemove('33')
        await checkAndRemove('963')
        await checkAndRemove('967')
        await checkAndRemove('234')
        await checkAndRemove('210')
        await checkAndRemove('212')
    }
}

export default handler
