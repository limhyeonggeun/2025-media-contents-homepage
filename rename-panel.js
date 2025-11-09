const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "src/assets/images");

function walk(dir) {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...walk(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

function renamePanelFiles() {
  const files = walk(ROOT);

  files.forEach((filePath) => {
    const dir = path.dirname(filePath);
    const filename = path.basename(filePath);

    // ✅ panel-img-min-min 패턴만 변경
    if (filename.includes("panel-img-min-min")) {
      const corrected = filename.replace("panel-img-min-min", "panel-img-min");
      const newPath = path.join(dir, corrected);

      try {
        fs.renameSync(filePath, newPath);
        console.log("✅ 이름 변경:", filename, "→", corrected);
      } catch (err) {
        console.log("❌ 변경 실패:", filename, err.message);
      }
    }
  });

  console.log("🎉 panel-img-min-min → panel-img-min 이름 변경 완료!");
}

renamePanelFiles();