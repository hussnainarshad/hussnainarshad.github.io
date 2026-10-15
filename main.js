(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const reveals = document.querySelectorAll("[data-reveal]");

  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => {
      if (el.closest(".hero")) return;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const mark = document.querySelector("[data-parallax]");
  if (mark && !reduceMotion) {
    let ticking = false;
    let tiltX = 0;
    let tiltY = 0;
    let scrollY = 0;

    const paint = () => {
      mark.style.transform = `translate3d(0, ${scrollY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        scrollY = Math.min(window.scrollY, 520) * 0.08;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(paint);
        }
      },
      { passive: true }
    );

    const tiltTarget = document.querySelector("[data-tilt]");
    if (tiltTarget) {
      tiltTarget.style.transformStyle = "preserve-3d";
      tiltTarget.addEventListener("pointermove", (e) => {
        const rect = tiltTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        tiltY = px * 8;
        tiltX = -py * 8;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(paint);
        }
      });
      tiltTarget.addEventListener("pointerleave", () => {
        tiltX = 0;
        tiltY = 0;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(paint);
        }
      });
    }
  }

  // Active nav highlight
  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = sections.find((s) => s.el === entry.target);
          if (!match) return;
          navLinks.forEach((l) => l.classList.remove("is-active"));
          match.link.classList.add("is-active");
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(({ el }) => spy.observe(el));
  }
})();
