# Locket Gold — locketgold.info

Website nhiều trang cho `locketgold.info`, gồm giao diện bán gói, tải DNS, hướng dẫn, bài viết, cổng cộng tác viên, quản trị và API chạy trên Cloudflare Workers.

## Chạy local

```powershell
npm install
npm run dev
```

Kiểm tra bản production:

```powershell
npm run build
npm run preview
```

Nếu chưa gắn D1, toàn bộ trang công khai vẫn chạy; các thao tác tạo đơn, admin và CTV sẽ báo hệ thống chưa được cấu hình.

## Khởi tạo Cloudflare D1

```powershell
npx wrangler d1 create locketgold-db
```

Cloudflare trả về `database_id`. Mở `wrangler.jsonc`, bỏ chú thích khối `d1_databases` và dán đúng ID, sau đó chạy:

```powershell
npx wrangler d1 migrations apply locketgold-db --remote
```

## Secrets và biến môi trường

Không ghi khóa bí mật vào repo. Cấu hình bằng Wrangler hoặc Cloudflare Dashboard:

```powershell
npx wrangler secret put ADMIN_PASSWORD_SHA256
npx wrangler secret put SESSION_SECRET
npx wrangler secret put SEPAY_WEBHOOK_API_KEY
npx wrangler secret put UPSTREAM_API_KEY
npx wrangler secret put BANK_NAME
npx wrangler secret put BANK_ACCOUNT
npx wrangler secret put BANK_ACCOUNT_NAME
```

- `ADMIN_PASSWORD_SHA256`: SHA-256 dạng hex của mật khẩu admin.
- `SESSION_SECRET`: chuỗi ngẫu nhiên dài tối thiểu 32 byte.
- `SEPAY_WEBHOOK_API_KEY`: API Key riêng dùng để SePay gọi webhook.
- `UPSTREAM_API_KEY`: khóa API kích hoạt Gold phía máy chủ; có thể bỏ qua cho tới khi có API.
- Thêm `UPSTREAM_API_URL` bằng secret hoặc nhập URL trong admin. API key không hiển thị trong admin.

Tạo SHA-256 trên Windows mà không gửi mật khẩu lên mạng:

```powershell
$securePassword = Read-Host "Mật khẩu admin" -AsSecureString
$passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
try {
  $plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
  $sha256 = [Security.Cryptography.SHA256]::Create()
  try {
    $hashBytes = $sha256.ComputeHash([Text.Encoding]::UTF8.GetBytes($plainPassword))
    ($hashBytes | ForEach-Object { $_.ToString("x2") }) -join ""
  } finally {
    $sha256.Dispose()
  }
} finally {
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
  $plainPassword = $null
}
```

## Cấu hình SePay

Trong SePay, tạo webhook cho giao dịch tiền vào:

- URL: `https://locketgold.info/api/sepay/webhook`
- Kiểu xác thực: `API Key`
- API key: cùng giá trị với secret `SEPAY_WEBHOOK_API_KEY`
- Content-Type: `application/json`

Worker xác thực header, chỉ nhận giao dịch tiền vào, kiểm tra số tiền, chống xử lý trùng bằng transaction ID và mới gọi API kích hoạt sau khi đơn được đánh dấu đã thanh toán.

## DNS, APK và API kích hoạt

Đăng nhập `/admin/` để cấu hình đường dẫn HTTPS tải DNS, đường dẫn APK Android và URL API kích hoạt. Các nút tải bị vô hiệu hóa cho tới khi có đường dẫn thật. Khóa API và cấu hình bí mật của SePay chỉ tồn tại trong Cloudflare Secrets.

## Deploy

Cloudflare Git integration dùng:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

Deploy thủ công:

```powershell
npm run deploy
```

Sau khi build thành công, vào **Workers & Pages → locketgold-info → Domains & Routes** để gắn `locketgold.info` và `www.locketgold.info`.

## Cấu trúc chính

```text
├── admin/                 # trang quản trị
├── bai-viet/              # blog
├── cong-tac-vien/         # cổng CTV
├── huong-dan/             # hướng dẫn
├── len-gold/              # bảng giá
├── lien-he/               # liên hệ
├── tai-dns/               # tải và cài DNS
├── thanh-toan/            # tạo/tra cứu đơn
├── migrations/            # schema D1
├── public/                # asset tĩnh
├── src/                   # giao diện dùng chung
└── worker/                # API Worker
```

Ảnh mascot hiện tại là asset tạo riêng cho dự án, không phải tài sản chính thức của Sanrio hoặc Locket. Có thể thay bằng ảnh do chủ dự án cung cấp sau này.
