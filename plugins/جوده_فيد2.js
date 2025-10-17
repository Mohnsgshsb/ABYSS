import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { writeFileSync } from "fs";
import { fileTypeFromBuffer } from "file-type";

const resolutions = {
  "480": "480",
  "720": "720",
  "1080": "1080",
  "2k": "1440",
  "4k": "2160",
  "8k": "4320"
};

const handler = async (m, { conn, args }) => {
  conn.videohd = conn.videohd || {};
  if (m.sender in conn.videohd) return m.reply("⏳ 💘 *جاري ترقية الفيديو، اصبر يحبي.* 🌷");

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';
  if (!/^video/.test(mime)) return m.reply("🍡 *من فضلك قم بالرد على فيديو لرفع جودته .* 🌹");

  const res = args[0]?.toLowerCase();
  if (!resolutions[res])  m.reply("🌷 *اختر الجودة من الأزرار فقط يا لطيف.* 💘");

  try {
    m.reply(`🧚 *جاري ترقية الفيديو إلى ${res.toUpperCase()} بجودة فائقة...* 💘🍷`);
    const targetHeight = resolutions[res];
    const id = m.sender.split("@")[0];
    const inputPath = `./tmp/input_${id}.mp4`;
    const outputPath = `./tmp/hdvideo_${id}.mp4`;

    const buffer = await q.download();
    const type = await fileTypeFromBuffer(buffer);
    const inputExt = type?.ext || "mp4";
    const inputFilePath = `./tmp/input_${id}.${inputExt}`;
    writeFileSync(inputFilePath, buffer);

    conn.videohd[m.sender] = true;

    const form = new FormData();
    form.append("video", fs.createReadStream(inputFilePath));
    form.append("resolution", targetHeight);
    form.append("fps", 60);

    const response = await axios.post("http://193.149.164.168:4167/hdvideo", form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      responseType: "stream"
    });

    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    writer.on("finish", async () => {
      const finalBuffer = fs.readFileSync(outputPath);
      await conn.sendMessage(m.chat, {
        video: finalBuffer,
        mimetype: "video/mp4",
        fileName: path.basename(outputPath),
        caption: `💘🌷 تمت ترقية الفيديو إلى ${res.toUpperCase()} 60FPS بنجاح! 🧚🍷🌹`
      }, { quoted: m });

      delete conn.videohd[m.sender];
      fs.unlinkSync(inputFilePath);
      fs.unlinkSync(outputPath);
    });
  } catch (e) {
    delete conn.videohd[m.sender];
    return m.reply("❌🍷 *حدث خطأ أثناء معالجة الفيديو:* " + e.message);
  }
};

handler.command = /^رفع-فيد$/i;
export default handler;