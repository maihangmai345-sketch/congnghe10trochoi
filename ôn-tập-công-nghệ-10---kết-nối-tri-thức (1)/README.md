# Ứng Dụng Ôn Tập Công Nghệ 10 - Cô Mai Hằng
### Bộ sách Kết Nối Tri Thức Với Cuộc Sống (Lớp 10C05 & 10C06)

Ứng dụng web ôn tập tương tác đa dạng, sinh động môn Công nghệ 10, tích hợp đồng bộ điểm trực tiếp vào Google Sheets và hỗ trợ tính năng đặc biệt: **Học sinh làm lại các câu bị sai** với cơ chế giữ nguyên mã lượt chơi (Session ID) và cập nhật cột M-O trên Google Sheet.

---

## 🌟 Tính Năng Nổi Bật

1. **5 Dạng Trò Chơi Tương Tác Sôi Động:**
   - 🧩 **Ghép đôi:** Nối hình ảnh công nghệ với tên gọi và ứng dụng.
   - 🎯 **Kéo thả:** Điền khuyết các khái niệm, quy trình kỹ thuật.
   - 📂 **Phân loại:** Phân nhóm các công nghệ theo lĩnh vực (luyện kim, cơ khí, điện tử, hạt nhân, nano...).
   - 🔢 **Sắp xếp:** Thứ tự 4 cuộc Cách mạng công nghiệp hoặc các bước quy trình thiết kế kỹ thuật.
   - 👷 **Nhà Kĩ Sư Tương Lai:** Giải quyết tình huống thực tế đời sống và sản xuất.

2. **Chế Độ Ôn Lại Câu Sai Thông Minh:**
   - Học sinh biết ngay câu làm sai, giải thích chuẩn kiến thức SGK.
   - Nhấn "Ôn lại các câu sai" để thử thách lại chính những câu đó.
   - Điểm số mới được cập nhật vào **Cột M** (Điểm sau ôn lại) và **Cột N** (Số câu đúng sau ôn lại) của dòng học sinh đó trên Google Sheet!

3. **Cổng Dành Cho Giáo Viên (Cô Mai Hằng):**
   - Đăng nhập bảo mật (Tài khoản: `GVMaiHang`, Mật khẩu: `maihang2024` hoặc `maihang10c05`).
   - Theo dõi bảng điểm trực tiếp, lọc theo lớp 10C05 / 10C06, xuất file CSV.
   - **Tải về Ngân Hàng Câu Hỏi:** File Word (.doc) và dữ liệu JSON đầy đủ đáp án & giải thích.
   - **Tải trọn bộ mã nguồn:** Tải file ZIP sẵn sàng đưa lên GitHub và Cloudflare Pages.
   - Trợ lý sư phạm AI (Gemini) phân tích tình hình học tập và đề xuất giải pháp giảng dạy.

---

## 🚀 HƯỚNG DẪN ĐƯA CODE LÊN GITHUB

### Bước 1: Chuẩn bị mã nguồn
Tải file mã nguồn ZIP từ **Cổng Giáo Viên -> Tab Tải Về Mã Nguồn & Triển Khai**, sau đó giải nén trên máy tính của bạn.

### Bước 2: Tạo Repository trên GitHub
1. Đăng nhập vào [GitHub](https://github.com/).
2. Nhấn nút **New** (Tạo mới repository).
3. Đặt tên kho lưu trữ, ví dụ: `on-tap-cong-nghe-10`.
4. Chọn chế độ **Public** hoặc **Private** tùy ý, sau đó nhấn **Create repository**.

### Bước 3: Đẩy code lên GitHub
Mở phần mềm Terminal (trên macOS/Linux) hoặc Command Prompt / Git Bash (trên Windows) tại thư mục vừa giải nén:

```bash
# 1. Khởi tạo Git
git init

# 2. Thêm toàn bộ file vào danh sách commit
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: Khoi tao du an On tap Cong nghe 10 - Co Mai Hang"

# 4. Đổi tên nhánh chính thành main
git branch -M main

# 5. Liên kết tới repository GitHub của bạn (thay bằng link GitHub của bạn)
git remote add origin https://github.com/TENTAIKHOAN/on-tap-cong-nghe-10.git

# 6. Đẩy code lên GitHub
git push -u origin main
```

---

## ⚡ HƯỚNG DẪN TRIỂN KHAI TRÊN CLOUDFLARE PAGES (MIỄN PHÍ 100%)

Cloudflare Pages là nền tảng máy chủ biên (Edge Network) hàng đầu thế giới, hoàn toàn miễn phí, tốc độ tải cực nhanh tại Việt Nam và có sẵn chứng chỉ bảo mật SSL (HTTPS).

### Bước 1: Đăng nhập Cloudflare
1. Truy cập [Cloudflare Dashboard](https://dash.cloudflare.com/) và đăng nhập (hoặc đăng ký tài khoản miễn phí).
2. Ở thanh menu bên trái, chọn **Compute (Workers & Pages)** -> chọn mục **Pages**.

### Bước 2: Kết nối với GitHub
1. Nhấp nút **Connect to Git** (Kết nối tới Git).
2. Chọn tài khoản GitHub của bạn và chọn repository `on-tap-cong-nghe-10` vừa tạo ở trên.
3. Nhấn **Begin setup** (Bắt đầu cài đặt).

### Bước 3: Cấu hình Build Settings
Điền các thông số chính xác như sau:
- **Project name:** `on-tap-cong-nghe-10` (hoặc tên tùy chọn)
- **Production branch:** `main`
- **Framework preset:** Chọn `Vite` (hoặc `None`)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** Để trống (mặc định là `/`)

*(Tùy chọn - Biến môi trường)*: Trong mục **Environment variables**:
- Thêm `NODE_VERSION` = `20`

### Bước 4: Nhấn Save and Deploy
Nhấp nút **Save and Deploy**. Cloudflare sẽ tự động cài đặt gói, biên dịch mã nguồn và xuất bản trang web trong khoảng 1–2 phút.

Sau khi hoàn tất, bạn sẽ nhận được một địa chỉ web trực tuyến dạng:
👉 `https://on-tap-cong-nghe-10.pages.dev`

Học sinh có thể truy cập ngay lập tức trên máy tính hoặc điện thoại thông minh!

---

## 📊 KẾT NỐI GOOGLE SHEETS & APPS SCRIPT

- **Mã Bảng Tính (Sheet ID):** `16bPIYS-Wbffwjef2b-bcj2SPiqz_eepsWnDlID7bUrY`
- **Mã nguồn Apps Script:** Đã có sẵn trong file `Code.gs` (hoặc copy từ tab "Mã Code Apps Script" trong Cổng giáo viên).
- Sau khi triển khai Web App trên Google Apps Script (Quyền truy cập: *Bất kỳ ai / Anyone*), dán URL Web App vào Cổng giáo viên để hoàn tất kết nối.

---

## 💻 CHẠY THỬ NGHIỆM TRÊN MÁY CỤC BỘ (LOCAL)

Nếu muốn chạy trên máy tính cá nhân:
```bash
# Cài đặt thư viện
npm install

# Chạy server phát triển (Port 3000)
npm run dev

# Hoặc build bản phát hành
npm run build
```

---
*Chúc Cô Mai Hằng và các em học sinh lớp 10C05 – 10C06 có những giờ học Công nghệ thật hào hứng và hiệu quả!*
