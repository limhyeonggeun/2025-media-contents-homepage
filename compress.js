const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MEMBERS_DIR = path.join(__dirname, "src/assets/images/members");

const jpgOptions = {
  quality: 70,
  mozjpeg: true,
};

async function compressAndRenameMembers() {
  if (!fs.existsSync(MEMBERS_DIR)) {
    console.log("❌ members 폴더가 존재하지 않습니다:", MEMBERS_DIR);
    return;
  }

  let files = fs
    .readdirSync(MEMBERS_DIR)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .sort(); // 문자 정렬

  if (files.length === 0) {
    console.log("❌ 변환할 멤버 이미지가 없습니다.");
    return;
  }

  console.log(`총 ${files.length}개의 멤버 이미지 변환 시작…`);

  let index = 1;

  for (const file of files) {
    const inputFile = path.join(MEMBERS_DIR, file);
    const outputFile = path.join(MEMBERS_DIR, `${index}.jpg`);

    try {
      await sharp(inputFile).jpeg(jpgOptions).toFile(outputFile);

      console.log(`✅ ${file} → ${index}.jpg 완료`);

      // 기존 파일 삭제
      fs.unlinkSync(inputFile);
    } catch (err) {
      console.log(`❌ 변환 실패: ${file}`, err.message);
    }

    index++;
  }

  console.log("🎉 members 폴더 JPG 압축 + 재정렬 완료!");
}

compressAndRenameMembers();