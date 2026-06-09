# Hướng Dẫn Khởi Động và Sử Dụng Game 2468 🎮

Tài liệu này hướng dẫn chi tiết cách tải, cài đặt và chạy ứng dụng **Game 2468** (được xây dựng bằng React Native và Expo).

---

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã được cài đặt:
1. **Node.js** (Khuyên dùng phiên bản LTS mới nhất, từ 18.x trở lên).
2. **npm** (đi kèm Node.js) hoặc **Yarn** / **pnpm**.
3. 📱 **Điện thoại di động** cài đặt sẵn ứng dụng **Expo Go** (miễn phí trên App Store cho iOS và Google Play Store cho Android) để chạy thử trực tiếp trên thiết bị thật.

---

## ⚙️ Hướng dẫn cài đặt

### Bước 1: Clone dự án về máy
Mở Terminal (hoặc Command Prompt) và chạy lệnh sau để tải mã nguồn từ GitHub:
```bash
git clone https://github.com/kh1119/game-2468.git
```

### Bước 2: Di chuyển vào thư mục dự án
```bash
cd game-2468
```

### Bước 3: Cài đặt các gói phụ thuộc (Dependencies)
Cài đặt toàn bộ thư viện cần thiết bằng lệnh:
```bash
npm install
```

---

## 🚀 Khởi động ứng dụng

Sau khi cài đặt xong các dependencies, bạn có thể khởi động Expo Development Server bằng một trong các cách sau:

```bash
npm start
```
*Hoặc sử dụng:*
```bash
npx expo start
```

Khi máy chủ khởi chạy thành công, một mã **QR Code** lớn sẽ hiển thị trên màn hình Terminal của bạn.

---

## 📱 Cách chạy và trải nghiệm game

### Cách 1: Chạy trực tiếp trên thiết bị di động thật (Khuyên dùng)
* **Đối với thiết bị Android:** 
  1. Mở ứng dụng **Expo Go** trên điện thoại.
  2. Chọn **"Scan QR Code"** và quét mã QR hiển thị trên Terminal máy tính.
* **Đối với thiết bị iOS (iPhone/iPad):**
  1. Mở ứng dụng **Camera** mặc định của điện thoại.
  2. Quét mã QR, nhấn vào liên kết gợi ý để mở ứng dụng bằng **Expo Go**.
  
> ⚠️ **Lưu ý quan trọng:** Điện thoại của bạn và máy tính đang chạy server phải kết nối chung vào một mạng Wi-Fi (cùng mạng LAN).

### Cách 2: Chạy phiên bản Web trên trình duyệt
Tại cửa sổ Terminal đang chạy máy chủ Expo, nhấn phím **`w`** để khởi chạy ứng dụng trực tiếp trên trình duyệt web mặc định của bạn.

### Cách 3: Chạy trên Trình giả lập (Emulators)
* Nhấn phím **`a`** để mở trên trình giả lập Android (yêu cầu cài đặt Android Studio & máy ảo Android).
* Nhấn phím **`i`** để mở trên trình giả lập iOS (yêu cầu máy macOS đã cài đặt Xcode Simulator).

---

## 🕹️ Các phím tắt hữu ích trong Terminal khi chạy server
- **`r`**: Tải lại ứng dụng (Reload app) trên thiết bị/trình duyệt đang kết nối.
- **`d`**: Mở menu Developer tools của Expo.
- **`c`**: Xóa lịch sử log trên màn hình terminal.
- **`Ctrl + C`**: Dừng máy chủ Expo.
