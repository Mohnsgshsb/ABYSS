import { createCanvas, loadImage } from 'canvas';
import axios from 'axios';

let TerboPuzzles = {};
const TerboImages = [
  'https://qu.ax/zTjNk.jpg',
  'https://qu.ax/snPpR.jpg',
  'https://qu.ax/kDfNE.jpg',
  'https://qu.ax/fdRzQ.png',
  'https://qu.ax/JQfxy.jpg'
];

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const TerboID = m.sender;

  if (command === 'بازل' || command === 'puzzle') {
    try {
      const TerboRandomImage = TerboImages[Math.floor(Math.random() * TerboImages.length)];
      const TerboResponse = await axios.get(TerboRandomImage, { responseType: 'arraybuffer' });
      const TerboImg = await loadImage(Buffer.from(TerboResponse.data));
      
      const TerboBoard = TerboGeneratePuzzle();
      TerboPuzzles[TerboID] = {
        board: TerboBoard,
        empty: TerboFindEmpty(TerboBoard),
        image: TerboImg,
        moves: 0,
        imageUrl: TerboRandomImage,
        startTime: new Date()
      };

      const TerboPuzzleImg = await TerboDrawPuzzle(TerboPuzzles[TerboID]);
      const TerboMoves = TerboAvailableMoves(TerboPuzzles[TerboID].board, TerboPuzzles[TerboID].empty);
      const buttons = TerboMoves.slice(0, 3).map(move => ({
        buttonId: `${usedPrefix}تحرك ${move.id}`,
        buttonText: { displayText: move.label },
        type: 1
      }));

      await conn.sendMessage(m.chat, {
        image: TerboPuzzleImg,
        caption: `🧁 | *لعبة بازل جديدة!*\n\nاستخدم الأزرار للتحكم\nالصورة: ${TerboImages.indexOf(TerboRandomImage) + 1}/${TerboImages.length}`,
        buttons,
        headerType: 4
      }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply('🧚 *| حدث خطأ أثناء تحميل الصورة، يرجى المحاولة لاحقاً*');
    }
    return;
  }

  if (command === 'تحرك' || command === 'move') {
    if (!TerboPuzzles[TerboID]) return m.reply('🍡 لم تبدأ اللعبة بعد. اكتب *' + usedPrefix + 'بازل* لبدء لعبة جديدة.');

    const TerboMove = args[0];
    const TerboDirections = ['فوق', 'تحت', 'يمين', 'يسار', 'up', 'down', 'right', 'left'];
    if (!TerboDirections.includes(TerboMove)) return m.reply('🍷 الاتجاه غير صحيح. اختر من: فوق، تحت، يمين، يسار');

    const moved = TerboMovePuzzle(TerboPuzzles[TerboID], TerboMove);
    if (!moved) return m.reply('🌸 *| لا يمكن التحريك بهذا الاتجاه.*');

    TerboPuzzles[TerboID].moves++;
    const TerboPuzzleImg = await TerboDrawPuzzle(TerboPuzzles[TerboID]);
    const win = TerboIsSolved(TerboPuzzles[TerboID].board);

    if (win) {
      const endTime = new Date();
      const timeDiff = (endTime - TerboPuzzles[TerboID].startTime) / 1000;
      const minutes = Math.floor(timeDiff / 60);
      const seconds = Math.floor(timeDiff % 60);
      
      const TerboWinMsg = `🍯 *مبروك! لقد حللت البازل بنجاح!*\n\n`
        + `🍡 الوقت: ${minutes} دقائق و ${seconds} ثانية\n`
        + `🍡 عدد الحركات: ${TerboPuzzles[TerboID].moves}\n`
        + `🍡 الصورة: ${TerboImages.indexOf(TerboPuzzles[TerboID].imageUrl) + 1}/${TerboImages.length}`;
      
      delete TerboPuzzles[TerboID];
      return conn.sendMessage(m.chat, { 
        image: TerboPuzzleImg, 
        caption: TerboWinMsg,
        buttons: [{buttonId: `${usedPrefix}بازل`, buttonText: {displayText: '↬⌯الـمـ🌸ـزيـد‹◝'}, type: 1}],
        headerType: 4 
      }, { quoted: m });
    } else {
      const TerboMoves = TerboAvailableMoves(TerboPuzzles[TerboID].board, TerboPuzzles[TerboID].empty);
      const buttons = TerboMoves.slice(0, 3).map(move => ({
        buttonId: `${usedPrefix}تحرك ${move.id}`,
        buttonText: { displayText: move.label },
        type: 1
      }));

      return conn.sendMessage(m.chat, {
        image: TerboPuzzleImg,
        caption: `🧚 تم التحريك: *${TerboMove}*\n🍡 عدد الحركات: ${TerboPuzzles[TerboID].moves}`,
        buttons,
        headerType: 4
      }, { quoted: m });
    }
  }
};

handler.command = /^(بازل|puzzle|تحرك|move)$/i;
handler.help = ['بازل', 'تحرك <اتجاه>'];
handler.tags = ['games'];
export default handler;

// ====== دوال Terbo ======

function TerboGeneratePuzzle(size = 3) {
  let nums = Array.from({ length: size * size }, (_, i) => i);
  TerboShuffle(nums);

  const board = [];
  while (nums.length) board.push(nums.splice(0, size));
  return board;
}

function TerboShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function TerboFindEmpty(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) return { row: r, col: c };
    }
  }
}

function TerboMovePuzzle(game, dir) {
  const { board, empty } = game;
  const [r, c] = [empty.row, empty.col];
  let target = null;

  if (dir === 'فوق' || dir === 'up') target = r > 0 ? { row: r - 1, col: c } : null;
  if (dir === 'تحت' || dir === 'down') target = r < board.length - 1 ? { row: r + 1, col: c } : null;
  if (dir === 'يسار' || dir === 'left') target = c > 0 ? { row: r, col: c - 1 } : null;
  if (dir === 'يمين' || dir === 'right') target = c < board.length - 1 ? { row: r, col: c + 1 } : null;

  if (target) {
    [board[r][c], board[target.row][target.col]] = [board[target.row][target.col], board[r][c]];
    game.empty = { row: target.row, col: target.col };
    return true;
  }
  return false;
}

function TerboIsSolved(board) {
  let count = 1;
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (r === size - 1 && c === size - 1) return board[r][c] === 0;
      if (board[r][c] !== count++) return false;
    }
  }
  return true;
}

function TerboAvailableMoves(board, empty) {
  const moves = [];
  const size = board.length;
  const { row, col } = empty;

  if (row > 0) moves.push({ id: 'فوق', label: '⬆️ فوق' });
  if (row < size - 1) moves.push({ id: 'تحت', label: '⬇️ تحت' });
  if (col < size - 1) moves.push({ id: 'يمين', label: '➡️ يمين' });
  if (col > 0) moves.push({ id: 'يسار', label: '⬅️ يسار' });

  return moves;
}

async function TerboDrawPuzzle(game) {
  const { board, image } = game;
  const size = board.length;
  const tileSize = Math.floor(image.width / size);
  
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = board[r][c];
      if (val !== 0) {
        const originalRow = Math.floor((val - 1) / size);
        const originalCol = (val - 1) % size;
        ctx.drawImage(
          image,
          originalCol * tileSize, originalRow * tileSize, tileSize, tileSize,
          c * tileSize, r * tileSize, tileSize, tileSize
        );

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(c * tileSize, r * tileSize, tileSize, tileSize);
      }
    }
  }

  return canvas.toBuffer();
}