# Website nhiếp ảnh

Website tĩnh viết bằng HTML, CSS và JavaScript thuần, không cần cài đặt hay build.

## Chạy thử

Mở trực tiếp `index.html`, hoặc chạy máy chủ cục bộ rồi vào http://localhost:5173:

```bash
python -m http.server 5173
```

## Thay nội dung

Mọi nội dung nằm trong [js/data.js](js/data.js): tên studio, liên hệ, số liệu, bảng giá, cảm nhận khách hàng và danh sách ảnh. Phần giới thiệu và quy trình được viết trực tiếp trong [index.html](index.html).

Toàn bộ thông tin hiện tại là dữ liệu mẫu, kể cả cảm nhận khách hàng và số liệu. Cần thay trước khi đưa website lên mạng.

## Thay ảnh

1. Chép ảnh vào thư mục `images/`. Nên để cạnh dài khoảng 2000px để trang tải nhanh.
2. Thêm một dòng vào `PHOTOS` trong `js/data.js`:

   ```js
   { file: "images/ten-anh.jpg", cat: "cuoi", title: "Chú thích", alt: "Mô tả ảnh", w: 3, h: 2 },
   ```

3. Xoá các dòng ảnh mẫu có `id`, và đặt `showUnsplashCredit: false` khi không còn dùng ảnh Unsplash.

Ảnh trong phần giới thiệu nằm trong `index.html`, cần thay riêng.

## Biểu mẫu liên hệ

Website không có máy chủ, nên nút gửi sẽ mở ứng dụng email của khách với nội dung đã soạn sẵn. Muốn nhận tin trực tiếp trên web, cần nối biểu mẫu với một dịch vụ như Formspree hoặc tự viết API.

## Đưa lên mạng

Tải toàn bộ thư mục lên một dịch vụ hosting tĩnh như Netlify, Vercel, Cloudflare Pages hoặc GitHub Pages.
