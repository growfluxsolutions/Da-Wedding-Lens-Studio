/* =====================================================
   DA WEDDING LENS STUDIO
   JAVASCRIPT
===================================================== */


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");
    document.body.classList.toggle("no-scroll");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");
        document.body.classList.remove("no-scroll");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});


/* ================= FAQ ================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");


        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= GALLERY LIGHTBOX ================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


let currentImageIndex = 0;

const galleryImages = [];


galleryItems.forEach((item, index) => {

    const image = item.querySelector("img");

    galleryImages.push(image.src);


    item.addEventListener("click", () => {

        currentImageIndex = index;

        openLightbox();

    });

});


function openLightbox() {

    lightboxImage.src =
        galleryImages[currentImageIndex];

    lightbox.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


function showNextImage() {

    currentImageIndex++;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    lightboxImage.src =
        galleryImages[currentImageIndex];

}


function showPreviousImage() {

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    lightboxImage.src =
        galleryImages[currentImageIndex];

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);

lightboxNext.addEventListener(
    "click",
    showNextImage
);

lightboxPrev.addEventListener(
    "click",
    showPreviousImage
);


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* ================= KEYBOARD LIGHTBOX ================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }


    if (event.key === "Escape") {
        closeLightbox();
    }


    if (event.key === "ArrowRight") {
        showNextImage();
    }


    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

});


/* ================= BACK TO TOP ================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ================= IMAGE LOADING ================= */

const allImages =
    document.querySelectorAll("img");


allImages.forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("loaded");

    });

});


/* ================= SMOOTH ANCHOR LINKS ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});