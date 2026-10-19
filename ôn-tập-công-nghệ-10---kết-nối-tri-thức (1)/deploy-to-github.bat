@echo off
echo ==========================================================
echo    HUONG DAN DAY CODE LEN GITHUB CHO CO MAI HANG
echo ==========================================================
echo 1. Dang khoi tao Git va dong goi ma nguon...
git init
git add .
git commit -m "feat: On tap Cong nghe 10 - Co Mai Hang"
git branch -M main
echo.
echo ==========================================================
echo [THANH CONG] Da chuan bi xong ma nguon!
echo Tiep theo, Co Mai Hang chi can:
echo 1. Vao https://github.com/ tao mot Repository moi (vi du: on-tap-cong-nghe-10)
echo 2. Sao chep link HTTPS cua Repository do va chay 2 dong lenh sau:
echo.
echo    git remote add origin ^<LINK_GITHUB_CUA_CO^>
echo    git push -u origin main
echo.
echo 3. Sau do vao Cloudflare Pages:
echo    - Chon 'Connect to Git' -> Chon repo vua day len
echo    - Build command: npm run build
echo    - Output directory: dist
echo    - Nhan 'Save and Deploy' la hoan tat!
echo ==========================================================
pause
