import axios from "axios";
import crypto from "crypto";

class SaveTubeAPI {
  constructor() {
    this.baseURL = "https://media.savetube.me/api";
    this.secretKey = "C5D58EF67A7584E4A29F6C35BBC4EB12";
    this.headers = {
      Accept: "*/*",
      "Accept-Language": "id-ID,id;q=0.9",
      Connection: "keep-alive",
      Origin: "https://yt.savetube.me",
      Referer: "https://yt.savetube.me/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
      "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24", "Microsoft Edge Simulate";v="131", "Lemur";v="131"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"'
    };
  }

  async getCDNURL() {
    try {
      const response = await axios.get(`${this.baseURL}/random-cdn`, { headers: this.headers });
      if (!response.data || !response.data.cdn) throw new Error("CDN غير متوفر!");
      return {
        info: `https://${response.data.cdn}/v2/info`,
        download: `https://${response.data.cdn}/download`
      };
    } catch (error) {
      console.error("❌ خطأ في جلب الـ CDN:", error);
      throw new Error("⚠️ فشل في جلب بيانات السيرفر، حاول لاحقًا!");
    }
  }

  decryptData(encryptedData) {
    try {
      const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from(this.secretKey, "hex"), Buffer.alloc(16, 0));
      let decrypted = decipher.update(encryptedData, "base64", "utf8") + decipher.final("utf8");
      const jsonData = decrypted.slice(decrypted.indexOf("{"), decrypted.lastIndexOf("}") + 1);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error("❌ خطأ في فك التشفير:", error);
      throw new Error("⚠️ تعذر فك تشفير البيانات!");
    }
  }

  async getInfo(url, type = "video", quality = "360") {
    try {
      const cdnURL = await this.getCDNURL();
      const response = await axios.post(cdnURL.info, { url: url }, { headers: { ...this.headers, "Content-Type": "application/json" } });

      if (!response.data || !response.data.data) throw new Error("⚠️ لم يتم العثور على بيانات الفيديو!");
      
      const info = this.decryptData(response.data.data);
      const downloadData = await this.getDownload(cdnURL, type, quality, info);
      return { ...info, ...downloadData };
    } catch (error) {
      console.error("❌ خطأ في جلب معلومات الفيديو:", error);
      throw new Error("⚠️ تعذر الحصول على معلومات الفيديو!");
    }
  }

  async getDownload(cdnURL, type, quality, { key = "", captchaToken = "" }) {
    try {
      const response = await axios.post(cdnURL.download, { downloadType: type, quality: quality, key: key, captchaToken: captchaToken }, { headers: { ...this.headers, "Content-Type": "application/json" } });

      if (!response.data || !response.data.data || !response.data.data.downloadUrl) throw new Error("⚠️ فشل في الحصول على رابط التحميل!");
      return response.data.data;
    } catch (error) {
      console.error("❌ خطأ في جلب رابط التحميل:", error);
      throw new Error("⚠️ تعذر الحصول على رابط التحميل!");
    }
  }
}

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.sendMessage(m.chat, { text: "⛔ *الرجاء إدخال رابط فيديو من يوتيوب!*" }, { quoted: m });
  }

  const url = args[0];
  const type = "video"; 
  const quality = "720"; 

  try {
    const downloader = new SaveTubeAPI();
    const result = await downloader.getInfo(url, type, quality);

    if (!result || !result.downloadUrl) {
      return conn.sendMessage(m.chat, { text: "❌ *فشل في الحصول على رابط التحميل!*" }, { quoted: m });
    }

    const response = await axios.get(result.downloadUrl, { responseType: "arraybuffer" });
    const videoBuffer = Buffer.from(response.data);

    await conn.sendMessage(m.chat, {
      video: videoBuffer,
      mimetype: "video/mp4",
      caption: `✅ *تم تحميل الفيديو بنجاح!*\n\n📌 *العنوان:* ${result.title}\n🎥 *الجودة:* ${quality}p`
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    conn.sendMessage(m.chat, { text: "❌ *حدث خطأ أثناء جلب الفيديو، حاول مجددًا!*" }, { quoted: m });
  }
};

handler.help = ["ytmp4"];
handler.tags = ["downloader"];
handler.command = ["يوتيوب", "يوث"]; 

export default handler;