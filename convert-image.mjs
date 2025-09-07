import fs from 'fs';
import path from 'path';

// Kép beolvasása és base64 konvertálás
const imagePath = path.join(process.cwd(), 'public', 'images', 'codexatxt.png');
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = imageBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64Image}`;

console.log('Base64 Data URI:');
console.log(dataUri);
