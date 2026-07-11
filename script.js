// ---------- Mobile nav toggle ----------
const togglebtn = document.querySelector(".togglebtn");
const nav = document.querySelector(".navlinks");
const navLinks = document.querySelectorAll(".nav-link");

// overlay element, created dynamically so index.html stays clean
const overlay = document.createElement("div");
overlay.className = "nav-overlay";
document.body.appendChild(overlay);

function openMenu(){
    togglebtn.classList.add("click");
    nav.classList.add("open");
    overlay.classList.add("show");
    togglebtn.setAttribute("aria-expanded", "true");
}

function closeMenu(){
    togglebtn.classList.remove("click");
    nav.classList.remove("open");
    overlay.classList.remove("show");
    togglebtn.setAttribute("aria-expanded", "false");
}

function toggleMenu(){
    const isOpen = nav.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
}

togglebtn.addEventListener("click", toggleMenu);
// keyboard support since togglebtn is a div with role="button"
togglebtn.addEventListener("keydown", function(e){
    if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        toggleMenu();
    }
});

// clicking the dark overlay behind the mobile menu closes it
overlay.addEventListener("click", closeMenu);

// close mobile menu after a link is tapped, and mark it active
navLinks.forEach(function(link){
    link.addEventListener("click", function(){
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        closeMenu();
    });
});

// close the menu automatically if the viewport is resized back to desktop
window.addEventListener("resize", function(){
    if(window.innerWidth > 930){
        closeMenu();
    }
});

// ---------- Typing effect ----------
if (window.Typed) {
    new Typed(".input", {
        strings: ["Data Analyst", "Business Intelligence Analyst", "Critical Thinker"],
        typeSpeed: 70,
        backSpeed: 55,
        backDelay: 1200,
        loop: true
    });
}

// ---------- Light / dark theme toggle ----------
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", function(){
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    themeIcon.classList.toggle("fa-moon", !isLight);
    themeIcon.classList.toggle("fa-sun", isLight);
});

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ---------- Scroll-reveal for sections (portfolio, resume, blog, contact cards) ----------
const revealTargets = document.querySelectorAll(".reveal-on-scroll");
if (revealTargets.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function(entries, observer){
        entries.forEach(function(entry){
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    revealTargets.forEach(function(target){
        revealObserver.observe(target);
    });
} else {
    // fallback: if IntersectionObserver isn't supported, just show everything
    revealTargets.forEach(el => el.classList.add("in-view"));
}

// ---------- Scroll-spy: highlight the nav link for the section in view ----------
const sections = document.querySelectorAll("section[id], .hero-header[id]");
if (sections.length && "IntersectionObserver" in window) {
    const spyObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(function(link){
                    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
                });
            }
        });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

    sections.forEach(function(section){
        spyObserver.observe(section);
    });
}
