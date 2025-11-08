const fs = require("fs");
const path = require("path");

const target = path.join(__dirname, "src/data/product.js");

let content = fs.readFileSync(target, "utf-8");

// ✅ panel-img.* → panel-img-min.jpg
content = content.replace(/panel-img\.(jpg|png|jpeg)/g, "panel-img-min.jpg");

// ✅ product-img.* → product-img.jpg
content = content.replace(/product-img\.(jpg|png|jpeg)/g, "product-img.jpg");

fs.writeFileSync(target, content, "utf-8");

console.log("✅ members.js 경로 자동 변환 완료!");