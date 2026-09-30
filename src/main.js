import "./styles.css";

const page = document.body.dataset.page || "home";
const app = document.querySelector("#app");

const navItems = [
  ["home", "/", "Trang chủ"],
  ["pricing", "/len-gold/", "Lên Gold"],
  ["trust", "/uy-tin/", "Uy tín"],
  ["posts", "/bai-viet/", "Bài viết"],
  ["guide", "/huong-dan/", "Hướng dẫn"],
  ["ctv", "/cong-tac-vien/", "Cộng tác viên"],
  ["contact", "/lien-he/", "Liên hệ"],
];

const fallbackPlans = [
  { id: "ios-month", name: "Gói 1 tháng", platform: "iOS", price: 29000, period: "1 tháng", featured: false },
  { id: "ios-year", name: "Gói 1 năm", platform: "iOS", price: 60000, period: "1 năm", featured: false },
  { id: "ios-lifetime", name: "Gói vĩnh viễn", platform: "iOS", price: 149000, period: "trọn đời", featured: true },
  { id: "android-lifetime", name: "Gói vĩnh viễn", platform: "Android", price: 180000, period: "trọn đời", featured: false },
];

const fallbackPosts = [
  { slug: "bao-ve-tai-khoan", title: "Ba nguyên tắc bảo vệ tài khoản Locket", excerpt: "Không chia sẻ mật khẩu, OTP và luôn kiểm tra đúng Username trước khi xác nhận.", published_at: "2026-09-30" },
  { slug: "kiem-tra-sau-nang-cap", title: "Cách kiểm tra sau khi nâng cấp Gold", excerpt: "Các bước ngắn gọn giúp bạn xác nhận trạng thái trên ứng dụng một cách an toàn.", published_at: "2026-09-29" },
  { slug: "chon-goi-phu-hop", title: "Nên chọn gói Gold nào?", excerpt: "So sánh thời hạn và nền tảng để chọn đúng gói cho thiết bị đang sử dụng.", published_at: "2026-09-28" },
];

const money = (value) => `${new Intl.NumberFormat("vi-VN").format(Number(value || 0))}đ`;
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

function brand() {
  return `<a class="brand" href="/" aria-label="Locket Gold - Trang chủ">
    <span class="brand-mark" aria-hidden="true">♡</span>
    <span><strong>Locket Gold</strong><small>locketgold.info</small></span>
  </a>`;
}

function header() {
  const links = navItems.map(([key, href, label]) => `<a href="${href}" class="${page === key ? "is-active" : ""}">${label}${key === "pricing" ? '<em>HOT</em>' : ""}</a>`).join("");
  return `<header class="site-header"><div class="container nav-wrap">${brand()}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Mở menu"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="main-nav" aria-label="Điều hướng chính">${links}</nav>
    <a class="button button--dns" href="/tai-dns/">↓ Tải DNS</a>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid">
    <div>${brand()}<p>Dịch vụ độc lập, giao diện thân thiện và quy trình không yêu cầu mật khẩu hay OTP.</p></div>
    <div><strong>Khám phá</strong><a href="/len-gold/">Bảng giá</a><a href="/huong-dan/">Hướng dẫn</a><a href="/bai-viet/">Bài viết</a></div>
    <div><strong>Hỗ trợ</strong><a href="/tai-dns/">Tải DNS</a><a href="/lien-he/">Liên hệ</a><a href="/uy-tin/">Chính sách an toàn</a></div>
  </div><div class="container footer-bottom"><span>© <span id="current-year"></span> Locket Gold</span><span>Không liên kết hoặc đại diện cho Locket Labs, Inc.</span></div></footer>`;
}

function publicShell(content) {
  return `<a class="skip-link" href="#noi-dung">Chuyển đến nội dung chính</a>${header()}<main id="noi-dung">${content}</main>${footer()}<div id="activity-toast" class="activity-toast" hidden></div>`;
}

function pageHero(kicker, title, description) {
  return `<section class="page-hero"><div class="container"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${description}</p></div></section>`;
}

function planCards(plans = fallbackPlans) {
  return `<div class="pricing-grid pricing-grid--four">${plans.map((plan) => `<article class="price-card ${plan.featured ? "price-card--featured" : ""}">
    ${plan.featured ? '<span class="popular-ribbon">Khuyên dùng</span>' : ""}
    <span class="plan-platform">${escapeHtml(plan.platform)}</span><h2>${escapeHtml(plan.name)}</h2>
    <p class="price"><strong>${money(plan.price)}</strong><span>/ ${escapeHtml(plan.period)}</span></p>
    <ul><li>✓ Không cần mật khẩu hoặc OTP</li><li>✓ Kiểm tra bằng Username</li><li>✓ Hướng dẫn sau thanh toán</li><li>✓ Hỗ trợ khi phát sinh lỗi</li></ul>
    <a class="button ${plan.featured ? "" : "button--outline"}" href="/thanh-toan/?plan=${encodeURIComponent(plan.id)}">Chọn gói này</a>
  </article>`).join("")}</div>`;
}

const pages = {
  home: () => publicShell(`<section class="hero"><div class="container hero-grid">
    <div class="hero-copy"><span class="eyebrow">♡ Không cần chia sẻ mật khẩu</span><h1>Nâng trải nghiệm <span>Locket Gold</span>, giữ trọn khoảnh khắc</h1><p>Chọn gói, nhập Username và theo dõi trạng thái ngay trên web. Quy trình rõ ràng cho cả iPhone và Android.</p><div class="hero-actions"><a class="button" href="/len-gold/">Chọn gói Gold →</a><a class="button button--outline" href="/huong-dan/">Xem hướng dẫn</a></div><div class="safe-note"><b>✓</b><span><strong>Quyền riêng tư là ưu tiên</strong><small>Không nhập mật khẩu, OTP hoặc mã khôi phục.</small></span></div></div>
    <div class="hero-art"><span class="float-chip float-chip--top">✓ Chỉ cần Username</span><img src="/images/hero-kawaii-cat.webp" alt="Linh vật mèo trắng đeo nơ hồng bên điện thoại" width="1152" height="768"><span class="float-chip float-chip--bottom">♡ Hỗ trợ iOS & Android</span></div>
  </div></section>
  <section class="feature-strip"><div class="container"><span>Không yêu cầu đăng nhập để mua</span><span>Mã giảm giá theo phần trăm</span><span>Hướng dẫn sau thanh toán</span><span>Hỗ trợ nhanh chóng</span></div></section>
  <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Bảng giá minh bạch</span><h2>Bốn lựa chọn cho từng nhu cầu</h2><p>Giá hiển thị trước khi xác nhận, không có chi phí ẩn.</p></div><div id="home-plans">${planCards()}</div></div></section>
  <section class="section section--tint"><div class="container two-col"><div><span class="eyebrow">Quy trình</span><h2>Ba bước để bắt đầu</h2><p>Không cần tạo tài khoản khách hàng.</p></div><ol class="step-list"><li><b>01</b><div><strong>Chọn đúng gói</strong><span>Kiểm tra nền tảng và thời hạn.</span></div></li><li><b>02</b><div><strong>Nhập Username</strong><span>Tuyệt đối không nhập mật khẩu hay OTP.</span></div></li><li><b>03</b><div><strong>Thanh toán & theo dõi</strong><span>Nhận mã đơn và hướng dẫn sau khi xác nhận.</span></div></li></ol></div></section>
  <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Tin mới</span><h2>Mẹo dùng Locket an toàn</h2></div><div class="post-grid">${postCards(fallbackPosts)}</div><div class="center"><a class="text-link" href="/bai-viet/">Xem tất cả bài viết →</a></div></div></section>`),

  pricing: () => publicShell(`${pageHero("Lên Gold", "Chọn gói phù hợp", "Bốn gói cho iOS và Android, mua trực tiếp mà không cần đăng nhập.")}<section class="section section--compact"><div class="container"><div id="all-plans">${planCards()}</div><p class="info-note">ⓘ Gói Android sẽ mở nút tải APK sau khi quản trị viên tải tệp hoặc cấu hình đường dẫn.</p></div></section>`),

  trust: () => publicShell(`${pageHero("Uy tín & an toàn", "Rõ ràng ở từng bước", "Chúng tôi chỉ yêu cầu dữ liệu cần thiết để xử lý đơn và không bao giờ hỏi mật khẩu hoặc OTP.")}<section class="section section--compact"><div class="container trust-grid">
    <article><span>🔒</span><h2>Không thu mật khẩu</h2><p>Biểu mẫu chỉ nhận Username Locket và thông tin liên hệ bạn chủ động cung cấp.</p></article>
    <article><span>🧾</span><h2>Có mã đơn đối soát</h2><p>Mỗi yêu cầu được gắn mã riêng để tra cứu trạng thái và khớp giao dịch.</p></article>
    <article><span>⚙</span><h2>Bí mật nằm ở máy chủ</h2><p>Khóa API và cấu hình thanh toán không được đưa vào mã frontend hay màn hình quản trị.</p></article>
    <article><span>✓</span><h2>Thông báo có thật</h2><p>Thông báo hoạt động chỉ xuất hiện từ đơn đã xác nhận, đồng thời che Username.</p></article>
  </div><div class="warning-card"><strong>Lưu ý an toàn</strong><p>Nếu bất kỳ ai yêu cầu mật khẩu, OTP, mã khôi phục hoặc quyền điều khiển thiết bị, hãy dừng lại và liên hệ hỗ trợ.</p></div></div></section>`),

  posts: () => publicShell(`${pageHero("Blog & tin tức", "Kiến thức Locket dễ hiểu", "Bài viết do quản trị viên xuất bản sẽ tự động hiển thị tại đây.")}<section class="section section--compact"><div class="container"><div id="post-list" class="post-grid">${postCards(fallbackPosts)}</div></div></section>`),

  guide: () => publicShell(`${pageHero("Hướng dẫn", "Theo dõi từng bước", "Các bước cơ bản trước và sau khi nâng cấp Locket Gold.")}<section class="section section--compact"><div class="container guide-layout"><aside class="guide-nav"><a href="#before">Trước khi mua</a><a href="#payment">Thanh toán</a><a href="#after">Sau thanh toán</a><a href="#android">Android</a></aside><div class="guide-content">
    <section id="before"><span class="step-badge">1</span><h2>Trước khi mua</h2><p>Kiểm tra đúng Username và chọn đúng nền tảng. iPhone có thể cần cài DNS trước khi đặt gói.</p><a class="button button--small" href="/tai-dns/">Mở hướng dẫn DNS</a></section>
    <section id="payment"><span class="step-badge">2</span><h2>Thanh toán</h2><p>Nhập Username, áp dụng mã giảm giá nếu có, rồi chuyển khoản đúng số tiền và nội dung hiển thị trên đơn.</p></section>
    <section id="after"><span class="step-badge">3</span><h2>Sau thanh toán</h2><p>Khi hệ thống xác nhận giao dịch, trang đơn hàng sẽ hiển thị hướng dẫn kiểm tra. Video tham khảo chỉ mở ở đoạn 1:12–1:59.</p><a class="text-link" href="https://www.youtube.com/watch?v=JEEMLXXIrvE&t=72s" target="_blank" rel="noopener noreferrer">Mở video tham khảo ↗</a></section>
    <section id="android"><span class="step-badge">4</span><h2>Gói Android</h2><p>Nút tải APK chỉ bật sau khi quản trị viên cấu hình tệp chính thức. Không tải APK từ liên kết không rõ nguồn gốc.</p><a id="apk-download" class="button button--outline is-disabled" href="#" aria-disabled="true">APK chưa được cung cấp</a></section>
  </div></div></section>`),

  dns: () => publicShell(`${pageHero("Tải DNS", "Cài DNS cho iPhone", "Chỉ cần cài một lần. Sau khi hoàn tất, quay lại website để mua gói và nâng cấp Gold.")}<section class="section section--compact"><div class="container dns-panel">
    <div class="dns-download"><span class="step-badge">1</span><div><small>Liên kết tải (mở bằng Safari)</small><strong id="dns-url">Chưa được cấu hình</strong></div><a id="dns-download" class="button is-disabled" href="#" aria-disabled="true">Tải file DNS</a></div>
    <div class="browser-warning">⚠ Bắt buộc mở liên kết bằng Safari trên iPhone. Trình duyệt khác có thể không tải được hồ sơ cấu hình.</div>
    <div class="dns-step"><span class="step-badge">2</span><div><h2>Cài Profile trong Cài đặt</h2><ol><li>Mở <b>Cài đặt</b> trên iPhone.</li><li>Chọn <b>Cài đặt chung → VPN & Quản lý thiết bị</b>.</li><li>Chọn profile Locket Gold vừa tải và nhấn <b>Cài đặt</b>.</li></ol></div></div>
    <div class="dns-step"><span class="step-badge step-badge--gold">3</span><div><h2>Bật tin cậy chứng chỉ</h2><ol><li>Vào <b>Cài đặt chung → Giới thiệu</b>.</li><li>Mở <b>Cài đặt tin cậy chứng chỉ</b>.</li><li>Bật công tắc của chứng chỉ vừa cài và xác nhận.</li></ol></div></div>
    <div class="warning-card"><strong>Đừng bỏ qua bước tin cậy chứng chỉ</strong><p>Sau khi hoàn tất DNS, hãy mua gói trên website để hệ thống thực hiện nâng cấp Gold.</p></div>
    <div class="center"><a class="button" href="/len-gold/">Chọn gói Gold →</a></div>
  </div></section>`),

  contact: () => publicShell(`${pageHero("Liên hệ", "Bạn cần hỗ trợ?", "Gửi mã đơn và mô tả vấn đề; không gửi mật khẩu hoặc OTP qua bất kỳ kênh nào.")}<section class="section section--compact"><div class="container contact-grid"><article><span>✉</span><h2>Email</h2><p>Kênh hỗ trợ có thể được thay đổi trong trang quản trị.</p><a href="mailto:hotro@locketgold.info">hotro@locketgold.info</a></article><article><span>⌕</span><h2>Tra cứu đơn</h2><p>Dùng mã đơn nhận được sau khi gửi yêu cầu.</p><a href="/thanh-toan/">Mở trang đơn hàng</a></article><article><span>⏱</span><h2>Chuẩn bị thông tin</h2><p>Gửi Username, mã đơn và ảnh lỗi đã che dữ liệu riêng tư để được hỗ trợ nhanh hơn.</p></article></div></section>`),

  checkout: checkoutPage,
  ctv: ctvPage,
  admin: adminPage,
};

function postCards(posts) {
  return posts.map((post) => `<article class="post-card"><span>${escapeHtml(formatDate(post.published_at))}</span><h2>${escapeHtml(post.title)}</h2><p>${escapeHtml(post.excerpt || "")}</p><a href="/bai-viet/?bai=${encodeURIComponent(post.slug || "")}">Đọc bài →</a></article>`).join("");
}

function formatDate(value) {
  if (!value) return "Mới cập nhật";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("vi-VN").format(date);
}

function checkoutPage() {
  const selected = new URLSearchParams(location.search).get("plan") || "ios-lifetime";
  return publicShell(`${pageHero("Thanh toán", "Đặt gói không cần đăng nhập", "Nhập đúng Username. Tuyệt đối không cung cấp mật khẩu hoặc OTP.")}<section class="section section--compact"><div class="container checkout-layout">
    <form id="checkout-form" class="form-card"><h2>Thông tin đơn hàng</h2><label>Chọn gói<select name="plan_id">${fallbackPlans.map((plan) => `<option value="${plan.id}" ${plan.id === selected ? "selected" : ""}>${plan.platform} · ${plan.name} · ${money(plan.price)}</option>`).join("")}</select></label><label>Username Locket<input name="username" autocomplete="off" minlength="2" maxlength="64" required placeholder="Ví dụ: @username"></label><label>Email hoặc số điện thoại hỗ trợ<input name="contact" autocomplete="email" maxlength="120" required placeholder="Để nhận trạng thái đơn"></label><div class="promo-row"><label>Mã giảm giá<input name="promo_code" maxlength="32" placeholder="Nhập mã nếu có"></label><button class="button button--outline" type="button" id="apply-promo">Áp dụng</button></div><p id="quote-message" class="form-message" aria-live="polite"></p><label class="consent"><input type="checkbox" required> Tôi xác nhận Username và nền tảng đã đúng.</label><button class="button" type="submit">Tạo đơn thanh toán</button><p class="privacy-line">🔒 Không yêu cầu đăng nhập, mật khẩu hay OTP.</p></form>
    <aside id="order-summary" class="summary-card"><h2>Tóm tắt</h2><p>Gói đã chọn</p><strong id="summary-plan">—</strong><dl><div><dt>Tạm tính</dt><dd id="summary-price">—</dd></div><div><dt>Giảm giá</dt><dd id="summary-discount">0đ</dd></div><div class="summary-total"><dt>Thanh toán</dt><dd id="summary-total">—</dd></div></dl><p class="summary-help">Sau khi tạo đơn, thông tin chuyển khoản và mã đơn sẽ xuất hiện tại đây.</p></aside>
  </div><div id="payment-result" class="container payment-result" hidden></div></section>`);
}

function ctvPage() {
  return publicShell(`${pageHero("Cộng tác viên", "Quản lý đơn gọn trong một nơi", "Đăng nhập tài khoản do quản trị viên cấp để xem số dư và tạo đơn CTV.")}<section class="section section--compact"><div class="container portal-wrap"><form id="ctv-login" class="form-card form-card--narrow"><h2>Đăng nhập CTV</h2><label>Tên đăng nhập<input name="username" autocomplete="username" required></label><label>Mật khẩu<input name="password" type="password" autocomplete="current-password" required></label><button class="button" type="submit">Đăng nhập</button><p id="ctv-message" class="form-message" aria-live="polite"></p></form><div id="ctv-dashboard" class="portal-dashboard" hidden></div></div></section>`);
}

function adminPage() {
  return `<main class="admin-shell"><section id="admin-login-wrap" class="admin-login"><div>${brand()}<form id="admin-login" class="form-card form-card--narrow"><span class="eyebrow">Khu vực bảo mật</span><h1>Đăng nhập quản trị</h1><label>Mật khẩu quản trị<input name="password" type="password" autocomplete="current-password" required></label><button class="button" type="submit">Đăng nhập</button><p id="admin-message" class="form-message" aria-live="polite"></p></form></div></section><section id="admin-dashboard" class="admin-dashboard" hidden></section></main>`;
}

app.innerHTML = (pages[page] || pages.home)();
document.querySelector("#current-year")?.replaceChildren(String(new Date().getFullYear()));

function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
}

async function api(path, options = {}) {
  const response = await fetch(path, { credentials: "same-origin", ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Không thể kết nối hệ thống.");
  return data;
}

async function loadPlans() {
  if (!document.querySelector("#all-plans, #home-plans")) return;
  try {
    const { plans } = await api("/api/plans");
    if (!plans?.length) return;
    document.querySelector("#all-plans")?.replaceChildren();
    const html = planCards(plans);
    if (document.querySelector("#all-plans")) document.querySelector("#all-plans").innerHTML = html;
    if (document.querySelector("#home-plans")) document.querySelector("#home-plans").innerHTML = html;
  } catch { /* Static fallback remains visible before backend setup. */ }
}

async function loadPosts() {
  const list = document.querySelector("#post-list");
  if (!list) return;
  try {
    const slug = new URLSearchParams(location.search).get("bai");
    if (slug) {
      const post = await api(`/api/posts/${encodeURIComponent(slug)}`);
      list.className = "article-view";
      list.innerHTML = `<article><a class="text-link" href="/bai-viet/">← Tất cả bài viết</a><span>${escapeHtml(formatDate(post.published_at))}</span><h2>${escapeHtml(post.title)}</h2><p class="article-lead">${escapeHtml(post.excerpt)}</p><div>${String(post.content || "").split(/\n+/).filter(Boolean).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></article>`;
      document.title = `${post.title} | Locket Gold`;
      return;
    }
    const { posts } = await api("/api/posts");
    if (posts?.length) list.innerHTML = postCards(posts);
  } catch { /* Keep editorial fallback. */ }
}

async function loadDownloads() {
  if (!document.querySelector("#dns-download, #apk-download")) return;
  try {
    const config = await api("/api/public-config");
    if (config.dns_url) enableDownload("#dns-download", config.dns_url, "Tải file DNS");
    if (config.dns_url && document.querySelector("#dns-url")) document.querySelector("#dns-url").textContent = config.dns_url;
    if (config.apk_url) enableDownload("#apk-download", config.apk_url, "Tải APK Android");
  } catch { /* Keep controls disabled until configured. */ }
}

function enableDownload(selector, url, label) {
  const link = document.querySelector(selector);
  if (!link) return;
  link.href = url;
  link.textContent = label;
  link.classList.remove("is-disabled");
  link.removeAttribute("aria-disabled");
}

function initCheckout() {
  const form = document.querySelector("#checkout-form");
  if (!form) return;
  const select = form.elements.plan_id;
  const promo = form.elements.promo_code;
  const quoteMessage = document.querySelector("#quote-message");
  let quote = null;

  const renderLocal = () => {
    const plan = fallbackPlans.find((item) => item.id === select.value) || fallbackPlans[0];
    document.querySelector("#summary-plan").textContent = `${plan.platform} · ${plan.name}`;
    document.querySelector("#summary-price").textContent = money(plan.price);
    document.querySelector("#summary-discount").textContent = money(quote?.discount_amount || 0);
    document.querySelector("#summary-total").textContent = money(quote?.total ?? plan.price);
  };
  select.addEventListener("change", () => { quote = null; quoteMessage.textContent = ""; renderLocal(); });
  renderLocal();

  document.querySelector("#apply-promo").addEventListener("click", async () => {
    if (!promo.value.trim()) { quoteMessage.textContent = "Nhập mã trước khi áp dụng."; return; }
    try {
      quote = await api("/api/quote", { method: "POST", body: JSON.stringify({ plan_id: select.value, promo_code: promo.value.trim() }) });
      quoteMessage.textContent = `Đã áp dụng giảm ${quote.discount_percent}%.`;
      quoteMessage.className = "form-message is-success";
      renderLocal();
    } catch (error) { quoteMessage.textContent = error.message; quoteMessage.className = "form-message is-error"; }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Đang tạo đơn…";
    try {
      const values = Object.fromEntries(new FormData(form));
      const result = await api("/api/orders", { method: "POST", body: JSON.stringify(values) });
      showPayment(result);
      form.closest(".checkout-layout").scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      quoteMessage.textContent = error.message;
      quoteMessage.className = "form-message is-error";
    } finally { button.disabled = false; button.textContent = "Tạo đơn thanh toán"; }
  });
}

function showPayment(order) {
  const result = document.querySelector("#payment-result");
  result.hidden = false;
  result.innerHTML = `<div><span class="eyebrow">Mã đơn ${escapeHtml(order.code)}</span><h2>Chuyển khoản đúng nội dung</h2><div class="bank-box"><p>${escapeHtml(order.bank_name || "Ngân hàng sẽ được cấu hình")}</p><strong>${escapeHtml(order.bank_account || "—")}</strong><span>${escapeHtml(order.account_name || "")}</span></div><dl><div><dt>Số tiền</dt><dd>${money(order.amount)}</dd></div><div><dt>Nội dung</dt><dd><code>${escapeHtml(order.transfer_content)}</code></dd></div></dl><button class="button button--outline" id="check-order" type="button">Kiểm tra thanh toán</button><p id="order-status" class="form-message">Hệ thống chỉ mở hướng dẫn sau khi giao dịch được xác nhận.</p></div>`;
  document.querySelector("#check-order").addEventListener("click", () => checkOrder(order.code));
}

async function checkOrder(code) {
  const status = document.querySelector("#order-status");
  try {
    const order = await api(`/api/orders/${encodeURIComponent(code)}`);
    if (order.status !== "paid" && order.status !== "completed") { status.textContent = "Chưa nhận được thanh toán. Vui lòng kiểm tra lại sau ít phút."; return; }
    status.className = "after-payment";
    status.innerHTML = `<strong>✓ Thanh toán đã được xác nhận</strong><p>Mở Locket, đăng xuất rồi đăng nhập lại nếu trạng thái Gold chưa cập nhật. Xem video hướng dẫn đoạn 1:12–1:59.</p><a class="button button--small" href="https://www.youtube.com/watch?v=JEEMLXXIrvE&t=72s" target="_blank" rel="noopener noreferrer">Xem hướng dẫn ↗</a>`;
  } catch (error) { status.textContent = error.message; }
}

function initCtv() {
  const form = document.querySelector("#ctv-login");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#ctv-message");
    try {
      const result = await api("/api/ctv/login", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      renderCtv(result.user);
    } catch (error) { message.textContent = error.message; message.className = "form-message is-error"; }
  });
  api("/api/ctv/me").then(({ user }) => renderCtv(user)).catch(() => {});
}

async function renderCtv(user) {
  document.querySelector("#ctv-login").hidden = true;
  const dashboard = document.querySelector("#ctv-dashboard");
  dashboard.hidden = false;
  dashboard.innerHTML = `<div class="portal-head"><div><span class="eyebrow">CTV đang hoạt động</span><h2>Xin chào, ${escapeHtml(user.username)}</h2></div><button id="ctv-logout" class="button button--outline button--small">Đăng xuất</button></div><div class="metric-grid"><article><span>Số dư</span><strong id="ctv-balance">${money(user.balance)}</strong></article><article><span>Tổng đơn</span><strong id="ctv-order-count">${Number(user.order_count || 0)}</strong></article><article><span>Đơn hoàn tất</span><strong id="ctv-completed-count">${Number(user.completed_count || 0)}</strong></article></div><div class="ctv-grid"><form id="ctv-order-form" class="form-card"><h2>Tạo đơn CTV</h2><label>Gói<select name="plan_id">${fallbackPlans.map((plan) => `<option value="${plan.id}">${plan.platform} · ${plan.name} · ${money(plan.price)}</option>`).join("")}</select></label><label>Username Locket<input name="username" required maxlength="64" autocomplete="off"></label><button class="button" type="submit">Tạo đơn từ số dư</button><p class="form-message" aria-live="polite"></p></form><section class="history-card"><h2>Lịch sử đơn</h2><div id="ctv-orders"><p>Đang tải…</p></div></section></div>`;
  document.querySelector("#ctv-logout").addEventListener("click", async () => { await api("/api/ctv/logout", { method: "POST" }); location.reload(); });
  document.querySelector("#ctv-order-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const orderForm = event.currentTarget;
    const message = orderForm.querySelector(".form-message");
    try {
      const result = await api("/api/ctv/orders", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(orderForm))) });
      message.textContent = `${result.message} Mã: ${result.code}`;
      message.className = "form-message is-success";
      orderForm.reset();
      const [{ user: freshUser }] = await Promise.all([api("/api/ctv/me"), loadCtvOrders()]);
      document.querySelector("#ctv-balance").textContent = money(freshUser.balance);
      document.querySelector("#ctv-order-count").textContent = freshUser.order_count;
      document.querySelector("#ctv-completed-count").textContent = freshUser.completed_count;
    } catch (error) { message.textContent = error.message; message.className = "form-message is-error"; }
  });
  loadCtvOrders();
}

async function loadCtvOrders() {
  const target = document.querySelector("#ctv-orders");
  if (!target) return;
  try {
    const { orders } = await api("/api/ctv/orders");
    target.innerHTML = orders.length ? `<div class="table-wrap"><table><thead><tr><th>Mã</th><th>Username</th><th>Gói</th><th>Trạng thái</th></tr></thead><tbody>${orders.map((order) => `<tr><td>${escapeHtml(order.code)}</td><td>${escapeHtml(order.username)}</td><td>${escapeHtml(order.plan_name)}</td><td><span class="status status--${escapeHtml(order.status)}">${escapeHtml(order.status)}</span></td></tr>`).join("")}</tbody></table></div>` : "<p>Chưa có đơn nào.</p>";
  } catch (error) { target.innerHTML = `<p>${escapeHtml(error.message)}</p>`; }
}

function initAdmin() {
  const form = document.querySelector("#admin-login");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#admin-message");
    try { await api("/api/admin/login", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(form))) }); await renderAdmin(); }
    catch (error) { message.textContent = error.message; message.className = "form-message is-error"; }
  });
  api("/api/admin/session").then(renderAdmin).catch(() => {});
}

async function renderAdmin() {
  const data = await api("/api/admin/overview");
  document.querySelector("#admin-login-wrap").hidden = true;
  const dash = document.querySelector("#admin-dashboard");
  dash.hidden = false;
  dash.innerHTML = `<aside class="admin-sidebar">${brand()}<nav><a href="#overview">▦ Bảng điều khiển</a><a href="#orders-admin">▤ Đơn hàng</a><a href="#plans-admin">⌑ Bảng giá</a><a href="#posts">✎ Bài viết</a><a href="#promos">％ Mã giảm giá</a><a href="#settings">⚙ Cấu hình công khai</a><a href="#ctv-admin">♙ Cộng tác viên</a></nav><button id="admin-logout">Đăng xuất</button></aside><div class="admin-main"><div class="admin-top"><div><small>SB ADMIN / Bảng điều khiển</small><h1>Quản lý Locket Gold</h1></div><a class="button button--small" href="/">Xem website ↗</a></div><section id="overview" class="metric-grid"><article><span>Đơn khách lẻ</span><strong>${Number(data.orders || 0)}</strong></article><article><span>Đã thanh toán</span><strong>${Number(data.paid_orders || 0)}</strong></article><article><span>Cộng tác viên</span><strong>${Number(data.ctv_users || 0)}</strong></article><article><span>Bài viết</span><strong>${Number(data.posts || 0)}</strong></article></section>${adminForms()}</div>`;
  document.querySelector("#admin-logout").addEventListener("click", async () => { await api("/api/admin/logout", { method: "POST" }); location.reload(); });
  bindAdminForms();
  loadAdminOrders();
}

function adminForms() {
  return `<section id="orders-admin" class="admin-panel"><h2>Đơn hàng mới nhất</h2><div id="admin-orders"><p>Đang tải…</p></div></section>
  <section id="plans-admin" class="admin-panel"><h2>Cập nhật bảng giá</h2><form data-admin-endpoint="/api/admin/plans"><div class="form-row"><label>Gói<select name="id">${fallbackPlans.map((plan) => `<option value="${plan.id}">${plan.platform} · ${plan.name}</option>`).join("")}</select></label><label>Giá mới (VNĐ)<input name="price" type="number" min="0" step="1000" required></label></div><button class="button" type="submit">Lưu giá</button><p class="form-message"></p></form></section>
  <section id="posts" class="admin-panel"><h2>Đăng bài viết</h2><form data-admin-endpoint="/api/admin/posts"><label>Tiêu đề<input name="title" required maxlength="140"></label><label>Đoạn giới thiệu<textarea name="excerpt" required maxlength="320"></textarea></label><label>Nội dung<textarea name="content" required rows="8"></textarea></label><button class="button" type="submit">Xuất bản</button><p class="form-message"></p></form></section>
  <section id="promos" class="admin-panel"><h2>Tạo mã giảm giá</h2><form data-admin-endpoint="/api/admin/promos"><div class="form-row"><label>Mã<input name="code" required maxlength="32"></label><label>Phần trăm<input name="percent" type="number" min="1" max="100" required></label></div><label>Ngày hết hạn<input name="expires_at" type="datetime-local"></label><button class="button" type="submit">Lưu mã</button><p class="form-message"></p></form></section>
  <section id="settings" class="admin-panel"><h2>Cấu hình đường dẫn</h2><p>Khóa API và SePay được cố ý ẩn; chỉ cấu hình bằng Cloudflare Secrets.</p><form data-admin-endpoint="/api/admin/settings"><label>Link tải DNS<input name="dns_url" type="url"></label><label>Link APK Android<input name="apk_url" type="url"></label><label>API kích hoạt (URL, không phải API key)<input name="upstream_api_url" type="url"></label><button class="button" type="submit">Lưu cấu hình</button><p class="form-message"></p></form></section>
  <section id="ctv-admin" class="admin-panel"><h2>Tạo tài khoản CTV</h2><form data-admin-endpoint="/api/admin/ctv"><div class="form-row"><label>Tên đăng nhập<input name="username" required></label><label>Mật khẩu ban đầu<input name="password" type="password" minlength="10" required></label></div><label>Số dư ban đầu<input name="initial_balance" type="number" min="0" step="1000" value="0"></label><button class="button" type="submit">Tạo CTV</button><p class="form-message"></p></form><hr><h2>Điều chỉnh số dư</h2><form data-admin-endpoint="/api/admin/ctv/balance"><div class="form-row"><label>Tên đăng nhập CTV<input name="username" required></label><label>Số tiền thay đổi<input name="delta" type="number" step="1000" required placeholder="50000 hoặc -50000"></label></div><button class="button" type="submit">Cập nhật số dư</button><p class="form-message"></p></form></section>`;
}

async function loadAdminOrders() {
  const target = document.querySelector("#admin-orders");
  if (!target) return;
  try {
    const { orders } = await api("/api/admin/orders");
    target.innerHTML = orders.length ? `<div class="table-wrap"><table><thead><tr><th>Mã</th><th>Username</th><th>Liên hệ</th><th>Gói</th><th>Số tiền</th><th>Trạng thái</th></tr></thead><tbody>${orders.map((order) => `<tr><td>${escapeHtml(order.code)}</td><td>${escapeHtml(order.username)}</td><td>${escapeHtml(order.contact)}</td><td>${escapeHtml(order.plan_name)}</td><td>${money(order.amount)}</td><td><span class="status status--${escapeHtml(order.status)}">${escapeHtml(order.status)}</span></td></tr>`).join("")}</tbody></table></div>` : "<p>Chưa có đơn hàng.</p>";
  } catch (error) { target.innerHTML = `<p>${escapeHtml(error.message)}</p>`; }
}

function bindAdminForms() {
  document.querySelectorAll("[data-admin-endpoint]").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    try {
      const result = await api(form.dataset.adminEndpoint, { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      message.textContent = result.message || "Đã lưu.";
      message.className = "form-message is-success";
      form.reset();
    } catch (error) { message.textContent = error.message; message.className = "form-message is-error"; }
  }));
}

async function showActivity() {
  const toast = document.querySelector("#activity-toast");
  if (!toast) return;
  try {
    const { activities } = await api("/api/activity");
    if (!activities?.length) return;
    const item = activities[Math.floor(Math.random() * activities.length)];
    toast.innerHTML = `<button aria-label="Đóng">×</button><span class="activity-icon">✓</span><div><strong>Giao dịch đã xác thực</strong><p><b>${escapeHtml(item.username)}</b> vừa nâng cấp ${escapeHtml(item.plan_name)}</p></div>`;
    toast.hidden = false;
    toast.querySelector("button").addEventListener("click", () => { toast.hidden = true; });
    window.setTimeout(() => { toast.hidden = true; }, 9000);
  } catch { /* Never invent activity when there are no verified orders. */ }
}

initNavigation();
loadPlans();
loadPosts();
loadDownloads();
initCheckout();
initCtv();
initAdmin();
window.setTimeout(showActivity, 3500);
