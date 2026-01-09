const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressImage(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .resize(1200, null, { // 최대 너비 1200px
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 85, // 품질 85%
        progressive: true
      })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = info.size;
    console.log(`✓ ${path.basename(inputPath)}: ${(inputSize/1024/1024).toFixed(2)}MB → ${(outputSize/1024).toFixed(2)}KB`);
  } catch (error) {
    console.error(`✗ ${path.basename(inputPath)}: ${error.message}`);
  }
}

async function main() {
  const imagesDir = path.join(__dirname, 'public/images');
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

  console.log('이미지 압축 시작...\n');

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace('.png', '.jpg'));
    await compressImage(inputPath, outputPath);
  }

  console.log('\n압축 완료!');
}

main();
