var mainNav = document.querySelector('.navbar');
var mobileNavIcon = document.querySelector('.menu-icon');

mobileNavIcon.addEventListener('click', function () {
    mainNav.classList.toggle('show');
});

/* Header Scroll */
var header = document.querySelector('.header');
if (header) {
    const isScrolled = () => {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    document.addEventListener('scroll', isScrolled);
    document.addEventListener('DOMContentLoaded', isScrolled);
}


/* Parallax Effect */
const parallax_el = document.querySelectorAll('.parallax');
let xValue = 0, yValue = 0, rotateDegree = 0;

document.querySelector('.hero').addEventListener('mousemove', (e) => {
    if(timeline.isActive()) return;
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.05;
        el.style.transform = `
            translateX(calc(-50% + ${-xValue * speedx}px)) 
            translateY(calc(-50% + ${yValue * speedy}px)) 
            rotateY(${rotateDegree * rotateSpeed}deg)
            perspective(2300px) translateZ(${zValue * speedz}px)
        `;
    });
});

/* GSAP Animation */
let timeline = gsap.timeline();

timeline.eventCallback("onComplete", function() {
    document.body.style.overflowY = 'auto';
});

timeline.to('.image-background, .image-left, .image-right, .image-clouds, .hero-content, .header', {
    opacity: 1,
    duration: 0,
});


if (window.innerWidth > 768) {
    timeline.from('.image-background', {
        top: `500px`,
        scale: 1.5,
        transformOrigin: "top center",
        duration: 3.5,
        ease: "power3.out",
    }, "0");
}else{
    timeline.from('.image-background', {
        top: `200px`,
        scale: 1.5,
        transformOrigin: "top center",
        duration: 3.5,
        ease: "power3.out",
    }, "0");
}

timeline.from('.image-left', {
    opacity: 0,
    y: 500,
    scale: 0.8,
    transformOrigin: "bottom center",
    duration: 2.7,
    ease: "power3.out",
}, "0");

timeline.from('.image-right', {
    opacity: 0,
    y: 500,
    scale: 0.8,
    transformOrigin: "bottom center",
    duration: 2.7,
    ease: "power3.out",
}, "0");

timeline.from('.image-clouds', {
    opacity: 0,
    y: 800,
    duration: 3,
    ease: "power3.out",
}, "0");

timeline.from('.hero-content h1', {
    y: 250,
    opacity: 0,
    duration: 1.5,
    ease: "power3.Out"
}, "1");

timeline.from('.header', {
    opacity: 0,
    duration: 1,
    ease: "power3.Out"
}, "0");


/* Initial Lax Js */

window.onload = function () {
    lax.init();

    lax.addDriver('scrollY', function () {
        return window.scrollY
    });

    lax.addElements('.hero', {
        scrollY: {
            translateY: [
                ["elInY", "elCenterY", "elOutY"],
                [0, 0, -200]
            ],
            opacity: [
                ["elInY", "elCenterY", "elOutY"],
                [1, 1, 0],
            ],
            scale: [
                ["elInY", "elCenterY", "elOutY"],
                [1, 1, 1.2]
            ],
        }
    });
}

/* Initial GLightbox */
const videoPlayerGlightbox = GLightbox({
    selector: '.video-glightbox'
});

/* Initial AOS */
window.addEventListener('load', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

/* Scroll to Top Button */
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop) {
    const togglescrollTop = function () {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }));
}