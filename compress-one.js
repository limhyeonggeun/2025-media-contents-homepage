const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// ✅ 압축할 폴더 경로
const DIR = path.join(
  __dirname,
  "src/assets/images/productmanager/bakwonbin"
);

// ✅ panel-img 파일 이름
const INPUT = path.join(DIR, "panel-img.jpg");
const OUTPUT = path.join(DIR, "panel-img-min.jpg");

// ✅ 압축 옵션 (품질 50)
const jpgOptions = {
  quality: 30,
  mozjpeg: true,
};

(async () => {
  if (!fs.existsSync(INPUT)) {
    console.log("❌ 원본 파일 없음:", INPUT);
    return;
  }

  try {
    await sharp(INPUT)
      .jpeg(jpgOptions)
      .toFile(OUTPUT);

    console.log("✅ 압축 완료:", OUTPUT);

    // ✅ 원본 삭제하려면 아래 줄 주석 해제
    // fs.unlinkSync(INPUT);

  } catch (err) {
    console.log("❌ 압축 실패:", err.message);
  }
})();