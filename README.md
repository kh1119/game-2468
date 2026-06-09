# Game 2468 🎮

Một trò chơi giải đố kết hợp các ô số thú vị dựa trên cơ chế của game **2048** kinh điển, được xây dựng bằng **React Native** và **Expo**.

## ✨ Tính năng nổi bật

- 🧠 **Chế độ chơi đa dạng**:
  - **Powers of 2 (2, 4, 8, 16...)**: Lũy thừa của 2 truyền thống.
  - **Even Steps (2, 4, 6, 8...)**: Chế độ ghép số theo chuỗi chẵn thú vị.
- 📐 **Kích thước lưới tùy chỉnh**: Hỗ trợ chơi trên các kích thước lưới `3x3`, `4x4`, và `5x5`.
- 🎨 **Chủ đề (Theme) Sáng/Tối**: Giao diện Light/Dark hiện đại, dịu mắt với các hiệu ứng chuyển đổi mượt mà.
- 🔄 **Tính năng Undo**: Quay lại bước đi trước đó để sửa sai và tối ưu hóa điểm số.
- 🏆 **Lưu điểm cao**: Tự động lưu trữ kỷ lục điểm số của bạn (HighScore) cục bộ thông qua AsyncStorage cho từng chế độ chơi và kích thước lưới.
- 📱 **Hỗ trợ đa nền tảng**: Hoạt động mượt mà trên **iOS**, **Android** và cả phiên bản **Web**.

---

## 🛠️ Cài đặt và Sử dụng

### 1. Yêu cầu hệ thống

Trước tiên, máy tính của bạn cần được cài đặt:
- **Node.js** (Phiên bản mới nhất khuyên dùng từ 18.x trở lên)
- **npm** (được cài đặt cùng Node.js) hoặc **Yarn** / **pnpm**
- Thiết bị di động đã cài ứng dụng **Expo Go** (tải trên App Store hoặc Google Play Store) để chạy thử trực tiếp trên điện thoại.

### 2. Clone dự án

Sử dụng Git để tải mã nguồn dự án về máy:

```bash
git clone https://github.com/kh1119/game-2468.git
cd game-2468
```

### 3. Cài đặt các gói phụ thuộc

Cài đặt toàn bộ các thư viện cần thiết thông qua npm:

```bash
npm install
```

### 4. Khởi động ứng dụng

Chạy lệnh sau để khởi động máy chủ Expo Development:

```bash
npm start
```
*Hoặc bạn cũng có thể dùng:*
```bash
npx expo start
```

---

## 🚀 Cách chạy ứng dụng trên các thiết bị

Khi máy chủ Expo khởi động thành công, một giao diện Terminal/Web Dashboard cùng với một mã **QR Code** sẽ hiển thị. Bạn có các lựa chọn sau để trải nghiệm game:

1. **Trên điện thoại cá nhân (Khuyên dùng)**:
   - **Android**: Mở ứng dụng **Expo Go** và chọn quét mã QR.
   - **iOS**: Mở ứng dụng **Camera** mặc định để quét mã QR và mở bằng **Expo Go**.
   - *Lưu ý: Điện thoại và máy tính của bạn cần kết nối chung một mạng Wi-Fi.*

2. **Chạy phiên bản Web**:
   - Nhấn phím `w` trong terminal để chạy trực tiếp trên trình duyệt web.

3. **Chạy trên Trình giả lập (Emulators)**:
   - Nhấn phím `a` để chạy trên trình giả lập Android (yêu cầu cài đặt Android Studio & Virtual Device).
   - Nhấn phím `i` để chạy trên trình giả lập iOS (yêu cầu máy macOS và cài đặt Xcode Simulator).

---

## 📂 Cấu trúc thư mục dự án

```text
game-2468/
├── assets/             # Chứa hình ảnh, logo và splash screen của ứng dụng
├── src/
│   ├── components/     # Chứa các component UI (Board, Controls, Header, Modals...)
│   ├── styles/         # Hệ thống màu sắc và theme (theme.js)
│   └── utils/          # Logic xử lý game chính (dịch chuyển ô số, tính điểm, gameover...)
├── App.js              # Điểm khởi đầu và quản lý state chính của ứng dụng
├── app.json            # File cấu hình ứng dụng Expo
├── package.json        # Định nghĩa các thư viện phụ thuộc và scripts chạy
└── README.md           # Hướng dẫn sử dụng
```

Chúc bạn có những giây phút giải trí thư giãn và đạt được điểm số thật cao! 🏆
