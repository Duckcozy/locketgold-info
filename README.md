# Locket Gold — locketgold.info

Landing page tĩnh dành cho `locketgold.info`, xây dựng bằng Vite và tối ưu để triển khai trên Cloudflare Pages.

## Công nghệ

- HTML semantic
- CSS thuần, responsive, không phụ thuộc UI framework
- JavaScript thuần cho menu, animation, chọn gói và FAQ
- Vite để chạy local và tạo production bundle

## Chạy local

```powershell
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định là `http://localhost:5173`.

## Kiểm tra production build

```powershell
npm run build
npm run preview
```

Thư mục đầu ra là `dist/`.

## Deploy Cloudflare Pages

1. Vào **Workers & Pages** trong Cloudflare Dashboard.
2. Chọn **Create application → Pages → Connect to Git**.
3. Chọn repo GitHub này và nhánh `main`.
4. Thiết lập:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: `22`
5. Sau khi deploy thành công, vào **Custom domains** và thêm `locketgold.info` cùng `www.locketgold.info`.

File `public/_headers` sẽ được Cloudflare Pages dùng để bổ sung security headers.

## Cấu trúc

```text
├── index.html
├── package.json
├── public/
│   ├── _headers
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       └── hero-kawaii-cat.webp
├── src/
│   ├── main.js
│   └── styles.css
└── vite.config.js
```

## Lưu ý chức năng

Phiên bản này là frontend tĩnh. Luồng thanh toán, webhook SePay, quản trị đơn hàng và API kích hoạt chưa được kết nối. Không đưa API key hoặc secret vào mã frontend/public repo; các phần đó cần Cloudflare Workers Secrets và database riêng.

Asset mascot là ảnh tạo riêng cho dự án, không phải tài sản chính thức của Sanrio hoặc Locket.
