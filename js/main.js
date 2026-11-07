(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Đường dẫn ảnh: ảnh của bạn dùng "file", ảnh mẫu dùng "id" của Unsplash. */
  const photoUrl = (photo, width) =>
    photo.file || `https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=${width}&q=75`;

  const setImage = (img, photo, widths, sizes) => {
    img.src = photoUrl(photo, widths[Math.floor(widths.length / 2)]);
    if (!photo.file) {
      img.srcset = widths.map((w) => `${photoUrl(photo, w)} ${w}w`).join(", ");
      img.sizes = sizes;
    }
    img.alt = photo.alt;
  };

  /* Nội dung lấy từ data.js */
  function renderContent() {
    document.querySelectorAll("[data-bind]").forEach((node) => {
      node.textContent = SITE[node.dataset.bind];
    });
    document.title = `${SITE.name} | ${SITE.tagline}`;
    $("year").textContent = new Date().getFullYear();
    $("credit").hidden = !SITE.showUnsplashCredit;

    SITE.stats.forEach((stat) => {
      const row = el("div");
      row.append(el("dt", "", stat.label), el("dd", "", stat.value));
      $("stats").append(row);
    });

    SERVICES.forEach((service) => {
      const row = el("article", "price");
      const body = el("div", "price__body");
      const includes = el("ul", "price__includes");
      service.includes.forEach((item) => includes.append(el("li", "", item)));
      body.append(el("p", "price__desc", service.desc), includes);

      const side = el("div", "price__side");
      const pick = el("a", "price__pick", "Chọn gói này");
      pick.href = "#lien-he";
      pick.addEventListener("click", () => { $("f-service").value = service.name; });
      side.append(el("p", "price__amount", service.price), pick);

      row.append(el("h3", "", service.name), body, side);
      $("priceList").append(row);

      const option = el("option", "", service.name);
      $("f-service").append(option);
    });
    $("f-service").append(el("option", "", "Khác / chưa rõ"));

    TESTIMONIALS.forEach((item) => {
      const quote = el("figure", "quote");
      const caption = el("figcaption");
      caption.append(el("cite", "", item.author), el("span", "", item.context));
      quote.append(el("blockquote", "", item.quote), caption);
      $("quotes").append(quote);
    });

    const telHref = `tel:${SITE.phone.replace(/\s/g, "")}`;
    [
      ["Điện thoại", SITE.phone, telHref],
      ["Email", SITE.email, `mailto:${SITE.email}`],
      ["Khu vực", SITE.address],
      ["Instagram", "Xem trang", SITE.instagram],
      ["Facebook", "Xem trang", SITE.facebook],
      ["Zalo", "Nhắn tin", SITE.zalo],
    ].forEach(([label, value, href]) => {
      if (href === "") return;
      const row = el("li");
      row.append(el("span", "", label));
      if (href) {
        const link = el("a", "", value);
        link.href = href;
        row.append(link);
      } else {
        row.append(el("span", "", value));
      }
      $("contactList").append(row);
    });
  }

  /* Ảnh chạy ở đầu trang */
  function initHero() {
    const slides = HERO.map((photo, index) => {
      const img = el("img");
      if (index === 0) {
        img.fetchPriority = "high";
        img.className = "is-active";
      } else {
        img.loading = "lazy";
      }
      setImage(img, photo, [1000, 1600, 2400], "100vw");
      if (photo.focus) img.style.objectPosition = photo.focus;
      if (index > 0) img.setAttribute("aria-hidden", "true");
      $("heroSlides").append(img);
      return img;
    });

    let current = 0;
    const caption = (i) => {
      $("heroCaption").textContent = `${String(i + 1).padStart(2, "0")}/${String(HERO.length).padStart(2, "0")}  ${HERO[i].title}`;
    };
    caption(0);
    if (reducedMotion || HERO.length < 2) return;

    // Nạp sớm ảnh kế tiếp để không bị nháy nền đen khi chuyển.
    slides.forEach((img) => { img.loading = "eager"; });
    setInterval(() => {
      if (document.hidden) return;
      const next = (current + 1) % slides.length;
      if (!slides[next].complete) return;
      slides[current].classList.remove("is-active");
      slides[next].classList.add("is-active");
      current = next;
      caption(next);
    }, 6500);
  }

  /* Thư viện ảnh */
  const gallery = { filter: "all", visible: [], columns: 0 };

  const shots = PHOTOS.map((photo, index) => {
    const button = el("button", "shot");
    button.type = "button";
    button.setAttribute("aria-label", `Xem lớn: ${photo.title}`);

    const frame = el("span", "shot__img");
    const img = el("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.width = photo.w * 100;
    img.height = photo.h * 100;
    // Ảnh lỗi vẫn hiện ra để khách đọc được phần mô tả thay thế.
    ["load", "error"].forEach((type) => img.addEventListener(type, () => img.classList.add("is-loaded")));
    setImage(img, photo, [400, 800, 1200], "(max-width: 620px) 50vw, (max-width: 1080px) 33vw, 25vw");
    frame.append(img);

    const meta = el("span", "shot__meta");
    meta.append(
      el("span", "shot__no", `${String(index + 1).padStart(2, "0")}A`),
      el("span", "shot__title", photo.title),
    );
    button.append(frame, meta);
    button.addEventListener("click", () => openLightbox(photo));
    return { photo, button };
  });

  const columnCount = () => {
    const width = window.innerWidth;
    if (width < 620) return 2;
    return width < 1080 ? 3 : 4;
  };

  // Xếp mỗi ảnh vào cột đang thấp nhất, giữ đúng thứ tự từ trái sang phải.
  function layoutGallery() {
    const count = columnCount();
    const columns = Array.from({ length: count }, () => el("div", "gallery__col"));
    const heights = new Array(count).fill(0);
    const list = shots.filter((s) => gallery.filter === "all" || s.photo.cat === gallery.filter);

    list.forEach(({ photo, button }) => {
      const shortest = heights.indexOf(Math.min(...heights));
      columns[shortest].append(button);
      heights[shortest] += photo.h / photo.w + 0.14;
    });

    $("gallery").replaceChildren(...columns);
    gallery.columns = count;
    // Thứ tự xem ảnh lớn theo đúng thứ tự trong danh sách đang lọc.
    gallery.visible = list.map((s) => s.photo);
  }

  function initFilters() {
    const options = [{ key: "all", label: "Tất cả" }, ...CATEGORIES];
    options.forEach(({ key, label }) => {
      const total = key === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.cat === key).length;
      const button = el("button", "filter", label);
      button.type = "button";
      button.setAttribute("aria-pressed", String(key === gallery.filter));
      button.append(el("sup", "", String(total).padStart(2, "0")));
      button.addEventListener("click", () => {
        if (gallery.filter === key) return;
        gallery.filter = key;
        $("filters").querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        layoutGallery();
        if (!reducedMotion) $("gallery").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: "ease-out" });
      });
      $("filters").append(button);
    });

    layoutGallery();
    let timer;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => { if (columnCount() !== gallery.columns) layoutGallery(); }, 150);
    });
  }

  /* Xem ảnh lớn */
  const lightbox = { index: 0, opener: null };

  function showPhoto(index) {
    const list = gallery.visible;
    lightbox.index = (index + list.length) % list.length;
    const photo = list[lightbox.index];
    const img = $("lbImg");
    img.removeAttribute("srcset");
    img.src = photoUrl(photo, 2000);
    img.alt = photo.alt;
    $("lbCaption").textContent = photo.title;
    $("lbCount").textContent = `${lightbox.index + 1} / ${list.length}`;
    // Tải trước ảnh kế tiếp để bấm mũi tên thấy ngay.
    const next = list[(lightbox.index + 1) % list.length];
    new Image().src = photoUrl(next, 2000);
  }

  function openLightbox(photo) {
    lightbox.opener = document.activeElement;
    showPhoto(gallery.visible.indexOf(photo));
    $("lightbox").showModal();
    document.documentElement.style.overflow = "hidden";
  }

  function initLightbox() {
    const dialog = $("lightbox");
    $("lbClose").addEventListener("click", () => dialog.close());
    $("lbPrev").addEventListener("click", () => showPhoto(lightbox.index - 1));
    $("lbNext").addEventListener("click", () => showPhoto(lightbox.index + 1));

    dialog.addEventListener("close", () => {
      document.documentElement.style.overflow = "";
      if (lightbox.opener) lightbox.opener.focus({ preventScroll: true });
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showPhoto(lightbox.index - 1);
      if (event.key === "ArrowRight") showPhoto(lightbox.index + 1);
    });
    // Bấm vào khoảng trống quanh ảnh để đóng.
    $("lbStage").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) dialog.close();
    });

    let startX = null;
    const stage = $("lbStage");
    stage.addEventListener("touchstart", (event) => { startX = event.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", (event) => {
      if (startX === null) return;
      const distance = event.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(distance) > 50) showPhoto(lightbox.index + (distance < 0 ? 1 : -1));
    });
  }

  /* Đầu trang */
  function initHeader() {
    const header = $("header");
    const menu = $("menuBtn");
    const label = menu.querySelector(".menu-btn__label");

    const onScroll = () => header.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const setOpen = (open) => {
      header.classList.toggle("is-open", open);
      menu.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Đóng" : "Menu";
      document.documentElement.style.overflow = open ? "hidden" : "";
    };
    menu.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
    $("nav").addEventListener("click", (event) => { if (event.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setOpen(false);
        menu.focus();
      }
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => { if (event.matches) setOpen(false); });
  }

  /* Biểu mẫu: website tĩnh không có máy chủ nên nội dung được chuyển sang ứng dụng email của khách. */
  function initForm() {
    $("contactForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const lines = [
        `Họ và tên: ${data.get("name")}`,
        `Liên hệ: ${data.get("contact")}`,
        `Dịch vụ: ${data.get("service")}`,
        `Ngày dự kiến: ${data.get("date") || "Chưa chọn"}`,
        "",
        data.get("message"),
      ];
      const subject = `Đặt lịch chụp: ${data.get("service")}`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      $("formStatus").textContent = `Đang mở ứng dụng email để bạn gửi đi. Nếu không thấy gì xảy ra, hãy gửi trực tiếp tới ${SITE.email} hoặc gọi ${SITE.phone}.`;
    });
  }

  renderContent();
  initHero();
  initFilters();
  initLightbox();
  initHeader();
  initForm();
})();
