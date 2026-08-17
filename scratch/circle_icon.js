const sharp = require('sharp');
const path = require('path');

async function makeCircle() {
  const inputPath = path.join(__dirname, '..', 'public', 'logo', 'icon.png');
  const outputPath = path.join(__dirname, '..', 'src', 'app', 'icon.png');
  
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  const size = Math.min(width, height);
  const r = size / 2;
  
  const circleSvg = `<svg width="${size}" height="${size}">
    <circle cx="${r}" cy="${r}" r="${r}" fill="white"/>
  </svg>`;
  
  await sharp(inputPath)
    .resize(size, size, { fit: 'cover' })
    .composite([{
      input: Buffer.from(circleSvg),
      blend: 'dest-in'
    }])
    .png()
    .toFile(outputPath);
    
  console.log('Icon successfully cropped to circle!');
}

makeCircle().catch(console.error);
