import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import { ogmp3 } from '../lib/youtubedl.js';  
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ytmp3, ytmp4 } = require("@hiudyy/ytdl");
// دالة الترجمة البسيطة (يمكنك تعديلها لاستخدام ترجمة حقيقية إذا أردت)
async function tr(text) {
  return text; // هنا يمكنك استبدالها بترجمة حقيقية إذا كنت بحاجة لذلك
}

const userRequests = {};
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!args[0]) throw `*⌫┊يـجـب ادخـال اسـم الـصـوت الـذي تـريـد تـحـمـيـله ┊⌗›*`
const sendType = command.includes('doc') ? 'document' : command.includes('mp3') ? 'audio' : 'video';
const yt_play = await search(args.join(' '));
let youtubeLink = '';
if (args[0].includes('you')) {
youtubeLink = args[0];
} else {
const index = parseInt(args[0]) - 1;
if (index >= 0) {
if (Array.isArray(global.videoList) && global.videoList.length > 0) {
const matchingItem = global.videoList.find(item => item.from === m.sender);
if (matchingItem) {
if (index < matchingItem.urls.length) {
youtubeLink = matchingItem.urls[index];
} else {
throw `*⚠️ لَـم يُـتَـمّ العُـثـور عَـلـى رَوابِـط لـهـذا الـرَقم، يُـرجـى إِدخـال رَقم بَـيـن 1 و ${matchingItem.urls.length}`
}} else {
}}}}
    
if (userRequests[m.sender]) {
return m.reply(`\`『اصبر يحبي في اغنيه بتتبعب ثواني و اطلب تاني🥷🔥』\``)}
userRequests[m.sender] = true;
try {
      
if (command == 'اغنيه' || command == 'fgmp3' || command == 'ytmp3doc') {
m.reply([`*╭━─━─╃⌬〔🎶〕⌬╄─━─━╮*
*│ ⦿ العنوان:* ${yt_play[0].title || 'غير متوفر'}
*│ ⦿ الوصف:* ${yt_play[0].description || 'غير متوفر'}
*│ ⦿ المدة:* ${yt_play[0].timestamp || 'غير متوفر'}
*│ ⦿ منذ:* ${yt_play[0].ago || 'غير متوفر'}
*│ ⦿ القناة:* ${yt_play[0].author.name || 'غير متوفر'}
*╰━─━─╃⌬〔🎧〕⌬╄─━─━╯*`].getRandom())  
try {
const isAudio = command.toLowerCase().includes('mp3') || command.toLowerCase().includes('audio')
const format = isAudio ? 'mp3' : '720' 
const result = await savetube.download(args[0], format)
const data = result.result
await conn.sendMessage(m.chat, { [sendType]: { url: data.download }, mimetype: 'audio/mpeg', fileName: `audio.mp3` }, { quoted: m });
} catch {   
try {                   
const [input, quality = '320'] = text.split(' '); 
const validQualities = ['64', '96', '128', '192', '256', '320'];
const selectedQuality = validQualities.includes(quality) ? quality : '320';
const res = await ogmp3.download(yt_play[0].url, selectedQuality, 'audio');
await conn.sendMessage(m.chat, { [sendType]: { url: res.result.download }, mimetype: 'audio/mpeg', fileName: `audio.mp3` }, { quoted: m });
} catch {   
try {
const audiodlp = await ytmp3(args);
conn.sendMessage(m.chat, { [sendType]: audiodlp, mimetype: "audio/mpeg" }, { quoted: m });
} catch {
try {  
const format = args[1] || '720p';
const response = await amdl.download(args[0], format);
const { title, type, download, thumbnail } = response.result;
if (type === 'audio') {
await conn.sendMessage(m.chat, { [sendType]: { url: download }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });
}    
} catch {
try {  
const format = args[1] || 'mp3'; 
const response = await ytdown.download(args[0], format);
const { title, type, download, thumbnail } = response;
if (type === 'audio') {
await conn.sendMessage(m.chat, { [sendType]: { url: download }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m })
}
} catch {
try {        
const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${args}`);
let { data } = await res.json();
await conn.sendMessage(m.chat, { [sendType]: { url: data.dl }, mimetype: 'audio/mpeg' }, { quoted: m});
} catch {
try {  
const res = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${args}`)
let data = await res.json();
await conn.sendMessage(m.chat, { [sendType]: { url: data.data.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
} catch {
try {
const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${args}`)
let { result } = await res.json()
await conn.sendMessage(m.chat, { [sendType]: { url: await result.download.url }, mimetype: 'audio/mpeg' }, { quoted: m })
} catch {
try { 
const apiUrl = `${apis}/download/ytmp3?url=${args}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();

if (!delius.status) {
return m.react("❌")}
const downloadUrl = delius.data.download.url;
await conn.sendMessage(m.chat, { [sendType]: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
} catch {
try {
let q = '128kbps'
let v = youtubeLink
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const dl_url = await yt.audio[q].download()
const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
await conn.sendMessage(m.chat, { [sendType]: { url: dl_url }, mimetype: 'audio/mpeg' }, { quoted: m });
//conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' })
} catch {
try {
let searchh = await yts(youtubeLink)
let __res = searchh.all.map(v => v).filter(v => v.type == "video")
let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId)
let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' })
conn.sendMessage(m.chat, { [sendType]: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })  
} catch {
}}}}}}}}}}}}

if (command == 'فيديو' || command == 'فديو' || command == 'فيد') {
m.reply([`*『🎬 : اتقل يزماله بحمل الفيدو 』*`].getRandom())   
try {
const result = await savetube.download(args[0], "720")
const data = result.result
await conn.sendMessage(m.chat, { [sendType]: { url: data.download }, mimetype: 'video/mp4', fileName: `${data.title}.mp4`, caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n「🎬」 ${await tr("العنوان")} ➫ ${data.title}` }, { quoted: m })
} catch {   
try {              
const video = await ytmp4(args);
await conn.sendMessage(m.chat, { [sendType]: { url: video }, fileName: `video.mp4`, mimetype: 'video/mp4', caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n「🎬」 ${await tr("العنوان")} ➫    ${yt_play[0].title}`}, { quoted: m })
} catch {
try {   
const [input, quality = '720'] = text.split(' ');
const validQualities = ['240', '360', '480', '720', '1080'];
const selectedQuality = validQualities.includes(quality) ? quality : '720';
const res = await ogmp3.download(yt_play[0].url, selectedQuality, 'video');
await conn.sendMessage(m.chat, { [sendType]: { url: res.result.download }, mimetype: 'video/mp4', caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n「🎬」 ${await tr("العنوان")} ➫ ${yt_play[0].title} (${selectedQuality}p)` }, { quoted: m });
} catch {
try { 
const format = args[1] || '720p';
const response = await amdl.download(args[0], format);
const { title, type, download, thumbnail } = response.result;
if (type === 'video') {
await conn.sendMessage(m.chat, { [sendType]: { url: download }, caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n🔥 ${await tr("العنوان")} ➫ ${yt_play[0].title}`, thumbnail: thumbnail }, { quoted: m });
}
} catch {
try {    
const format = args[1] || 'mp4';
const response = await ytdown.download(args[0], format);
const { title, type, download, thumbnail } = response;
if (type === 'video') {
await conn.sendMessage(m.chat, { [sendType]: { url: download }, caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n🔥 ${await tr("العنوان")} ➫ ${yt_play[0].title}`, thumbnail: thumbnail }, { quoted: m })
}
} catch {
try {        
const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${args}`);
let { data } = await res.json();
await conn.sendMessage(m.chat, { [sendType]: { url: data.dl }, fileName: `video.mp4`, mimetype: 'video/mp4', caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n🔥 ${await tr("العنوان")} ➫ ${yt_play[0].title}`}, { quoted: m })
} catch {
try {  
const res = await fetch(`https://api.agatz.xyz/api/ytmp4?url=${args}`)
let data = await res.json();
await conn.sendMessage(m.chat, { [sendType]: { url: data.data.downloadUrl }, fileName: `video.mp4`, caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n🔥 ${await tr("العنوان")} ➫ ${yt_play[0].title}` }, { quoted: m }) 
} catch {
try {
const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${args}`)
let { result } = await res.json()
await conn.sendMessage(m.chat, { [sendType]: { url: result.download.url }, fileName: `video.mp4`, caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n🔥 ${await tr("العنوان")} ➫${yt_play[0].title}` }, { quoted: m }) 
} catch {
try {
const axeelApi = `https://axeel.my.id/api/download/video?url=${args}`;
const axeelRes = await fetch(axeelApi);
const axeelJson = await axeelRes.json();
if (axeelJson && axeelJson.downloads?.url) {
const videoUrl = axeelJson.downloads.url;
await conn.sendMessage(m.chat, { [sendType]: { url: videoUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n🔥 ${await tr("العنوان")} ➫ ${yt_play[0].title}` }, { quoted: m }) 
}} catch {
try {              
let qu = args[1] || '360'
let q = qu + 'p'
let v = youtubeLink
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const dl_url = await yt.video[q].download()
const ttl = await yt.title
const size = await yt.video[q].fileSizeH
await await conn.sendMessage(m.chat, { [sendType]: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `「🍷」 ${await tr("➫ حملت طلبك اهو يقلب اخوك🥷")}\n🔥 ${await tr("العنوان")} ➫ ${ttl}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
} catch {
try {  
let mediaa = await ytMp4(youtubeLink)
await conn.sendMessage(m.chat, { [sendType]: { url: mediaa.result }, fileName: `error.mp4`, caption: `_${wm}_`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: m })     
} catch (e) {
console.log(e)   
}}}}}}}}}}}}

} catch (error) {
console.error(error);
m.react("❌️")
} finally {
delete userRequests[m.sender];
}}
handler.help = ['فيديو', 'ytmp3'];
handler.tags = ['downloader'];
handler.command = /^ytmp3|فيديو|فديو|audio|fgmp3|dlmp3|فيد|ytmp3doc?$/i
export default handler

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function bytesToSize(bytes) {
return new Promise((resolve, reject) => {
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
if (bytes === 0) return 'n/a';
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
if (i === 0) resolve(`${bytes} ${sizes[i]}`);
resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`)})};

async function ytMp3(url) {
return new Promise((resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
let { contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { audio: item.url, size: bytes }}};
let resultFix = result.filter(x => x.audio != undefined && x.size != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, result2: resultFix, thumb })}).catch(reject)})}

async function ytMp4(url) {
return new Promise(async(resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
let { qualityLabel, contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { video: item.url, quality: qualityLabel, size: bytes }}};
let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, rersult2: resultFix[0].video, thumb })}).catch(reject)})};

async function ytPlay(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getAudio = await ytMp3(random);
resolve(getAudio)}).catch(reject)})};

async function ytPlayVid(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getVideo = await ytMp4(random);
resolve(getVideo)}).catch(reject)})};