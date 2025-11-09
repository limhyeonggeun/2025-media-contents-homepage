const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// ✅ 압축할 단일 파일 경로
const TARGET_FILE = path.join(
  __dirname,
  "src/assets/images/productmanager/choieunbin/panel-img-min.jpg"
);

// ✅ 임시 출력 파일(.tmp)
const TEMP_FILE = TARGET_FILE + ".tmp";

// ✅ JPG 옵션 (700KB대 목표)
const jpgOptions = {
  quality: 70,
  mozjpeg: true,
};

async function compressPanel() {
  if (!fs.existsSync(TARGET_FILE)) {
    console.log("❌ 파일이 존재하지 않습니다:", TARGET_FILE);
    return;
  }

  try {
    console.log("🔧 압축 시작:", TARGET_FILE);

    // ✅ 재압축
    await sharp(TARGET_FILE)
      .jpeg(jpgOptions)
      .toFile(TEMP_FILE);

    // ✅ 기존 파일 삭제 & 교체
    fs.unlinkSync(TARGET_FILE);
    fs.renameSync(TEMP_FILE, TARGET_FILE);

    console.log("✅ panel-img-min.jpg 재압축 완료!");
  } catch (err) {
    console.log("❌ 압축 실패:", err.message);
  }
}

compressPanel();