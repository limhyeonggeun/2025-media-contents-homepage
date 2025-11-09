const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "src/assets/videos/main_bg.mp4");
const tmpPath = filePath + ".tmp.mp4";

(async () => {
  if (!fs.existsSync(filePath)) {
    console.log("❌ 파일이 존재하지 않습니다:", filePath);
    return;
  }

  const cmd = `
    ffmpeg -i "${filePath}" -vcodec libx264 -preset fast -crf 28 -acodec aac "${tmpPath}"
  `;

  console.log("✅ 영상 압축 시작...");

  exec(cmd, (err) => {
    if (err) {
      console.log("❌ ffmpeg 오류:", err.message);
      return;
    }

    fs.unlinkSync(filePath);
    fs.renameSync(tmpPath, filePath);

    console.log("✅ main_bg.mp4 영상 압축 완료!");
  });
})();