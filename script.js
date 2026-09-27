document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const backTop = document.getElementById("backTop");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.setAttribute(
      "aria-label",
      navLinks.classList.contains("open") ? "Close menu" : "Open menu"
    );
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 450);
  }, { passive: true });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Highlight the active navigation item while scrolling.
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...navLinks.querySelectorAll("a")];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${entry.target.id}`
          ? "var(--accent)"
          : "";
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => observer.observe(section));
});
