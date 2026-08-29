/* ============================================================
   MONALISA NXT MALL — interactions
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------- Header state ---------- */
  const header = $(".site-header");
  const toTop = $(".to-top");
  function onScroll() {
    if (!header) return;
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 24);
    if (toTop) toTop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const burger = $(".burger");
  const drawer = $(".drawer");
  if (burger && drawer) {
    const open = () => { drawer.classList.add("open"); burger.classList.add("open"); document.body.classList.add("drawer-locked"); };
    const close = () => { drawer.classList.remove("open"); burger.classList.remove("open"); document.body.classList.remove("drawer-locked"); };
    burger.addEventListener("click", () => drawer.classList.contains("open") ? close() : open());
    $(".drawer-backdrop").addEventListener("click", close);
    $$(".drawer-close").forEach(b => b.addEventListener("click", close));
    $$(".drawer a[href]").forEach(a => a.addEventListener("click", close));
    /* collapsible subsections */
    $$(".d-nav-link[data-sub]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const sub = $(link.dataset.sub);
        if (sub) sub.classList.toggle("open");
        link.classList.toggle("open");
      });
    });
  }

  /* ---------- Scroll reveal (staggered) ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(el => io.observe(el));
    /* stagger children of .stagger */
    $$(".stagger").forEach(group => {
      $$(":scope > *", group).forEach((child, i) => {
        child.style.setProperty("--d", `${(i % 6) * 90}ms`);
      });
    });
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------- Count-up stats ---------- */
  const counters = $$("[data-count]");
  if (counters.length && !prefersReduced) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        cio.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const val = target * eased;
          el.textContent = (val % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  } else {
    counters.forEach(el => { el.textContent = el.dataset.count + (el.dataset.suffix || ""); });
  }

  /* ---------- Testimonial slider ---------- */
  const slider = $(".t-slider");
  if (slider) {
    const viewport = $(".t-viewport", slider);
    const slides = $$(".t-slide", slider);
    const dotsWrap = $(".t-dots", slider);
    let idx = 0, timer = null;
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = $$("button", dotsWrap);
    function go(i, manual) {
      idx = (i + slides.length) % slides.length;
      viewport.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("active", di === idx));
      if (manual) restart();
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!prefersReduced) timer = setInterval(() => go(idx + 1), 6500);
    }
    $(".t-arrow.prev", slider).addEventListener("click", () => go(idx - 1, true));
    $(".t-arrow.next", slider).addEventListener("click", () => go(idx + 1, true));
    restart();
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach(item => {
    const q = $(".faq-q", item);
    const a = $(".faq-a", item);
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      $$(".faq-item.open").forEach(o => { o.classList.remove("open"); $(".faq-a", o).style.maxHeight = null; $(".faq-q", o).setAttribute("aria-expanded", "false"); });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
    q.setAttribute("aria-expanded", "false");
    q.setAttribute("role", "button");
    q.setAttribute("tabindex", "0");
    q.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); q.click(); } });
  });

  /* ---------- Category filter (chips → cards) ---------- */
  $$("[data-filter-group]").forEach(group => {
    const chips = $$(".chip[data-filter]", group);
    const items = $$("[data-cat]", document);
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("chip-active"));
        chip.classList.add("chip-active");
        const f = chip.dataset.filter;
        items.forEach(it => {
          const show = f === "all" || it.dataset.cat === f;
          it.style.display = show ? "" : "none";
        });
      });
    });
  });

  /* ---------- Subtle 3D tilt on product cards (pointer devices only) ---------- */
  if (!prefersReduced && window.matchMedia("(hover:hover)").matches) {
    $$(".p-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- Back to top ---------- */
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));

  /* ---------- Footer newsletter (demo) ---------- */
  $$(".footer-news").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = $("input", form);
      const btn = $("button", form);
      if (!input.value.trim()) return;
      btn.textContent = "✓ Subscribed";
      input.value = "";
      setTimeout(() => (btn.textContent = "Join"), 2600);
    });
  });

  /* ---------- Hero parallax (subtle) ---------- */
  if (!prefersReduced && window.matchMedia("(hover:hover)").matches) {
    const heroVisual = $(".hero-visual");
    if (heroVisual) {
      const frame = $(".frame", heroVisual) || heroVisual;
      document.addEventListener("mousemove", e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        frame.style.transform = `rotate(${1.6 + x * 0.18}deg) translate(${x}px, ${y}px)`;
      });
    }
  }
})();
