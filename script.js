
// WAIT FOR WEBSITE TO LOAD

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. PAGE NAVIGATION
    // ==========================================

    const navLinks = document.querySelectorAll(".nav-links a, .hero-buttons a");
    const sections = document.querySelectorAll(".page-section");
    // Open the section specified in the URL hash

const sectionId = window.location.hash.substring(1);

if (sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (targetSection && targetSection.classList.contains("page-section")) {
        sections.forEach(section => {
            section.classList.remove("active");
        });

        targetSection.classList.add("active");
    }
}

    navLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (!targetSection) return;

            sections.forEach(section => {
                section.classList.remove("active");
            });

            targetSection.classList.add("active");

            // Close mobile menu after selecting a section

            const navMenu = document.querySelector(".nav-links");
            const menuToggle = document.querySelector(".menu-toggle");

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }

        });

    });


    // ==========================================
    // 2. MOBILE NAVIGATION MENU
    // ==========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-links");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        document.addEventListener("click", (event) => {

            if (
                !menuToggle.contains(event.target) &&
                !navMenu.contains(event.target)
            ) {

                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    // ==========================================
    // 3. AUTOMATIC FOOTER YEAR
    // ==========================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 4. CONSOLE MESSAGE
    // ==========================================

    console.log("Portfolio website loaded successfully!");

});
