#!/bin/bash
echo "=========================================================="
echo "   HƯỚNG DẪN ĐẨY CODE LÊN GITHUB CHO CÔ MAI HẰNG"
echo "=========================================================="
git init
git add .
git commit -m "feat: On tap Cong nghe 10 - Co Mai Hang"
git branch -M main
echo ""
echo "Đã khởi tạo Git và commit toàn bộ tệp!"
echo "Bước tiếp theo:"
echo "1. Tạo repository mới trên GitHub (https://github.com)"
echo "2. Chạy lệnh:"
echo "   git remote add origin <LINK_REPO_GITHUB>"
echo "   git push -u origin main"
echo "3. Vào Cloudflare Pages -> Connect to Git -> Build command: npm run build, Output: dist"
echo "=========================================================="
