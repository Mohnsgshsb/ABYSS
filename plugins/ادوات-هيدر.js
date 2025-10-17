import axios from 'axios'

let handler = async (m, { text, command }) => {
    if (!text) {
        let usage = command === 'headers' ? 
            '🧞 هذا الأمر يعرض معلومات *الهيدر (Headers)* لأي موقع ويب عبر الرابط المدخل.\n\n' +
            '🛠 *كيفية الاستخدام:*\n' +
            '🔹 *headers <الرابط>*\n' +
            '🔹 مثال: `headers https://example.com`' :
            '🧞 هذا الأمر يعرض معلومات *الهيدر (Headers)* لأي موقع ويب عبر الرابط المدخل.\n\n' +
            '🛠 *كيفية الاستخدام:*\n' +
            '🔹 *هيدر <الرابط>*\n' +
            '🔹 مثال: `هيدر https://example.com`'

        throw usage
    }

    try {
        let res = await axios.get(text)
        let headers = Object.keys(res.headers).map((v) => `🧞 • ${v}: ${res.headers[v]}`).join('\n')

        m.reply(`🧞 *معلومات الهيدر للموقع:*\n\n${headers}`)
    } catch (e) {
        throw '🧞 حدث خطأ أثناء جلب المعلومات. تأكد من إدخال رابط صحيح.'
    }
}

handler.help = ['headers', 'هيدر']
handler.command = /^(headers|هيدر)$/i
handler.tags = ['tools', 'أدوات']

export default handler