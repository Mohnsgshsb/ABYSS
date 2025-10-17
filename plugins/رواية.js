import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";
import { generateWAMessageFromContent, prepareWAMessageMedia } from "@whiskeysockets/baileys";

const searchWattpad = async (query) => {
  try {
    const formattedQuery = encodeURIComponent(query);
    const url = `https://www.wattpad.com/search/${formattedQuery}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];

    $(".title").each((index, element) => {
      const title = $(element).text().trim();
      const link = $(element).closest("a").attr("href");
      if (title && link) {
        results.push({ index: index + 1, title, link: `https://www.wattpad.com${link}` });
      }
    });
    return results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

const getWattpadStoryDetails = async (storyUrl) => {
  try {
    const response = await fetch(storyUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $("h1").text().trim();
    const author = $(".author a").text().trim();
    const description = $("meta[name='description']").attr("content");
    const image = $("meta[property='og:image']").attr("content") || $(".cover__BlyZa").attr("src") || "https://raw.githubusercontent.com/Adamjjjw614/Adam/main/uploads/1747198091100.jpg";
    
    const chapters = [];
    $("a._6qJpE").each((index, element) => {
      const chapterTitle = $(element).text().trim();
      const rawLink = $(element).attr("href");
      const chapterLink = rawLink.startsWith("https://www.wattpad.com") ? rawLink : `https://www.wattpad.com${rawLink}`;
      if (chapterTitle && chapterLink) {
        chapters.push({ index: index + 1, title: chapterTitle, link: chapterLink });
      }
    });
    
    return { title, author, description, image, chapters };
  } catch (error) {
    console.error("Error fetching story details:", error);
    return null;
  }
};

const getChapterContent = async (chapterUrl) => {
  try {
    const response = await fetch(chapterUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    let content = "";
    $(".panel-reading p, .panel-reading div").each((index, element) => {
      let paragraph = $(element).text().trim();
      if (paragraph) content += paragraph + "\n\n";
    });
    
    return content.trim();
  } catch (error) {
    console.error("Error fetching chapter content:", error);
    return null;
  }
};

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (command === 'روايه') {
    if (!text) return await m.reply("⚠️ الرجاء إدخال اسم الرواية للبحث عنها.");
    let results = await searchWattpad(text);
    if (!results.length) return await m.reply("❌ لم يتم العثور على نتائج.");

    const rows = results.map((story, index) => ({
      header: `الرواية رقم: [${index + 1}]`,
      title: `${story.title}`,
      description: '',
      id: `${usedPrefix}اختيار-روايه ${index + 1}`
    }));

    const caption = `🍡 *نتائج البحث عن: ${text}*\n\nاختر رواية من القائمة أدناه:`;
    
    const mediaMessage = await prepareWAMessageMedia({ image: { url: "https://files.catbox.moe/54pkn7.jpg" } }, { upload: conn.waUploadToServer });
    
    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: caption },
            footer: { text: "Wattpad Bot" },
            header: {
              hasMediaAttachment: true,
              imageMessage: mediaMessage.imageMessage
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: '「 قــائــمــة الروايات 」',
                    sections: [
                      {
                        title: '「 نتائج البحث 」',
                        highlight_label: "Wattpad Bot",
                        rows: rows
                      }
                    ]
                  })
                }
              ]
            }
          }
        }
      }
    }, { userJid: conn.user.jid, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    global.wattpadResults = results;
    return;
  }

  if (command === 'اختيار-روايه') {
    if (!text) return await m.reply("⚠️ الرجاء إدخال رقم الرواية من قائمة البحث.");
    let choice = parseInt(text);
    if (isNaN(choice)) return await m.reply("❌ الرجاء إدخال رقم صحيح.");

    if (!global.wattpadResults || choice < 1 || choice > global.wattpadResults.length) {
      return await m.reply("❌ لم يتم العثور على الرواية المحددة. قم بإجراء بحث جديد أولاً.");
    }

    let selectedStory = global.wattpadResults[choice - 1];
    await m.reply(`🌸 *تم اختيار الرواية:* ${selectedStory.title}\n🔄 *جاري جلب المعلومات...*`);

    let details = await getWattpadStoryDetails(selectedStory.link);
    if (!details) return await m.reply("❌ لم يتم العثور على معلومات الرواية.");

    const rows = details.chapters.map((chapter, index) => ({
      header: `الفصل رقم: [${index + 1}]`,
      title: `${chapter.title}`,
      description: '',
      id: `${usedPrefix}اختيار-فصل ${index + 1}`
    }));

    const caption = `🧚 *${details.title}*\n🍡 *المؤلف:* ${details.author}\n🍡 *الوصف:* ${details.description}\n\nاختر فصل من القائمة أدناه:`;
    
    const mediaMessage = await prepareWAMessageMedia({ image: { url: details.image } }, { upload: conn.waUploadToServer });
    
    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: caption },
            footer: { text: "Wattpad Bot" },
            header: {
              hasMediaAttachment: true,
              imageMessage: mediaMessage.imageMessage
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: '「 قــائــمــة الفصول 」',
                    sections: [
                      {
                        title: '「 فصول الرواية 」',
                        highlight_label: "Wattpad Bot",
                        rows: rows
                      }
                    ]
                  })
                }
              ]
            }
          }
        }
      }
    }, { userJid: conn.user.jid, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    global.wattpadChapters = details.chapters;
    return;
  }

  if (command === 'اختيار-فصل') {
    if (!text) return await m.reply("⚠️ الرجاء إدخال رقم الفصل من قائمة الفصول.");
    let choice = parseInt(text);
    if (isNaN(choice)) return await m.reply("❌ الرجاء إدخال رقم صحيح.");

    if (!global.wattpadChapters || choice < 1 || choice > global.wattpadChapters.length) {
      return await m.reply("❌ لم يتم العثور على الفصل المحدد. قم باختيار رواية أولاً.");
    }

    let selectedChapter = global.wattpadChapters[choice - 1];
    await m.reply(`📖 *تم اختيار الفصل:* ${selectedChapter.title}\n🔄 *جاري جلب المحتوى...*`);

    let content = await getChapterContent(selectedChapter.link);
    if (!content) return await m.reply("❌ لم يتم العثور على محتوى الفصل.");

    let filePath = `./${selectedChapter.title.replace(/\s+/g, '_')}.txt`;
    fs.writeFileSync(filePath, content);
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(filePath),
      mimetype: "text/plain",
      fileName: `${selectedChapter.title}.txt`
    }, { quoted: m });

    fs.unlinkSync(filePath);
    return;
  }
};

handler.command = ['روايه', 'اختيار-روايه', 'اختيار-فصل'];
export default handler;