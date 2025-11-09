const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "src/assets/images");

const TARGET_FILES = [
  "introduce1.png",
  "introduce2.png",
  "introduce3.png",
  "poster.png",
  "test.png",
];

const jpgOptions = {
  quality: 70,
  mozjpeg: true,
};

async function convertSpecificFiles() {
  for (const file of TARGET_FILES) {
    const inputFile = path.join(ROOT, file);

    // 파일이 없으면 패스
    if (!fs.existsSync(inputFile)) {
      console.log("❌ 파일 없음:", inputFile);
      continue;
    }

    const nameOnly = file.replace(".png", "");
    const outputFile = path.join(ROOT, `${nameOnly}.jpg`);

    try {
      await sharp(inputFile)
        .jpeg(jpgOptions)
        .toFile(outputFile);

      console.log("✅ 변환됨:", outputFile);

      // 원본 삭제
      fs.unlinkSync(inputFile);
    } catch (err) {
      console.log("❌ error:", err.message, inputFile);
    }
  }

  console.log("🎉 introduce/poster/test PNG 변환 완료!");
}

convertSpecificFiles();