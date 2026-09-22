/* =====================================================
   RAJEEV PORTFOLIO
   INTERACTIVE JAVASCRIPT
===================================================== */


/* =====================================================
   1. ELEMENTS
===================================================== */

const body = document.body;

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

const progressBar = document.querySelector(".scroll-progress");

const backToTop = document.querySelector(".back-to-top");


/* =====================================================
   2. CUSTOM CURSOR
===================================================== */

if (cursorDot && cursorRing) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .skill-card, .project-card, .mini-card"
        );


    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            cursorRing.style.width = "55px";
            cursorRing.style.height = "55px";

            cursorRing.style.borderColor =
                "rgba(90,180,255,.9)";

        });


        element.addEventListener("mouseleave", () => {

            cursorRing.style.width = "35px";
            cursorRing.style.height = "35px";

            cursorRing.style.borderColor =
                "rgba(103,178,255,.6)";

        });

    });

}


/* =====================================================
   3. MOBILE MENU
===================================================== */

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });


    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuToggle.classList.remove("active");

        });

    });

}


/* =====================================================
   4. SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   5. SCROLL PROGRESS
===================================================== */

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (pageHeight <= 0) {
        return;
    }


    const progress =
        (scrollTop / pageHeight) * 100;


    if (progressBar) {

        progressBar.style.width =
            progress + "%";

    }

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


/* =====================================================
   6. ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");


function updateActiveNavigation() {

    let currentSection = "home";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =====================================================
   7. SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".content-section, .skill-card, .project-card, " +
        ".mini-card, .timeline-item, .goal-card, " +
        ".contact-box"
    );


revealElements.forEach((element, index) => {

    element.classList.add("reveal");

    element.style.transitionDelay =
        `${(index % 4) * 0.08}s`;

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

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


/* =====================================================
   8. MOUSE BACKGROUND PARALLAX
===================================================== */

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 25;


        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 25;


        document.documentElement.style
            .setProperty(
                "--mouse-x",
                x + "px"
            );


        document.documentElement.style
            .setProperty(
                "--mouse-y",
                y + "px"
            );

    }
);


/* =====================================================
   9. CARD 3D TILT
===================================================== */

const tiltCards =
    document.querySelectorAll(
        ".skill-card, .project-card, .mini-card"
    );


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) * -4;


            const rotateY =
                ((x - centerX) /
                    centerX) * 4;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =====================================================
   10. PHOTO PARALLAX
===================================================== */

const photo =
    document.querySelector(".photo-circle");


if (photo) {

    document.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 700
            ) {
                return;
            }


            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 10;


            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 10;


            photo.style.marginLeft =
                x + "px";


            photo.style.marginTop =
                y + "px";

        }
    );


    photo.addEventListener(
        "mouseenter",
        () => {

            photo.style.filter =
                "brightness(1.08) saturate(1.15)";

        }
    );


    photo.addEventListener(
        "mouseleave",
        () => {

            photo.style.filter =
                "brightness(1) saturate(1)";

        }
    );

}
/* =====================================================
   11. TYPING EFFECT
===================================================== */

const heroTitle =
    document.querySelector(".hero h1");


if (heroTitle) {

    heroTitle.innerHTML =
        `Hi, I'm
        <span class="gradient-text"></span>`;


    const nameElement =
        heroTitle.querySelector(".gradient-text");


    const name = "Rajeev";

    let character = 0;


    function typeName() {

        if (
            character < name.length
        ) {

            nameElement.textContent +=
                name.charAt(character);

            character++;

            setTimeout(
                typeName,
                120
            );

        }

    }


    setTimeout(
        typeName,
        300
    );

}
/* =====================================================
   12. BUTTON RIPPLE
===================================================== */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(button => {

    button.addEventListener(
        "click",
        function (event) {

            const ripple =
                document.createElement("span");


            ripple.classList.add(
                "ripple"
            );


            const rect =
                this.getBoundingClientRect();


            ripple.style.left =
                (event.clientX -
                    rect.left) + "px";


            ripple.style.top =
                (event.clientY -
                    rect.top) + "px";


            this.appendChild(
                ripple
            );


            setTimeout(
                () => ripple.remove(),
                600
            );

        }
    );

});


/* =====================================================
   13. MAGNETIC BUTTON
===================================================== */

buttons.forEach(button => {

    button.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                button.getBoundingClientRect();


            const x =
                (event.clientX -
                    rect.left -
                    rect.width / 2) *
                0.12;


            const y =
                (event.clientY -
                    rect.top -
                    rect.height / 2) *
                0.12;


            button.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "";

        }
    );

});


/* =====================================================
   14. BACK TO TOP
===================================================== */

if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 600
            ) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        },
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   15. CREATE BACK TO TOP BUTTON
===================================================== */

if (!backToTop) {

    const button =
        document.createElement("button");


    button.className =
        "back-to-top";


    button.innerHTML = "↑";


    button.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(
        button
    );


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 600
            ) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   16. SKILL CARD STAGGER
===================================================== */

document
    .querySelectorAll(".skill-card")
    .forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.05}s`;

    });


/* =====================================================
   17. PROJECT CARD HOVER GLOW
===================================================== */

document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.background =
                    `radial-gradient(
                        circle at
                        ${x}px ${y}px,
                        rgba(90,90,255,.12),
                        rgba(8,13,29,.72) 55%
                    )`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    });


/* =====================================================
   18. KEYBOARD ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            if (nav) {
                nav.classList.remove(
                    "active"
                );
            }

            if (menuToggle) {
                menuToggle.classList.remove(
                    "active"
                );
            }

        }

    }
);


/* =====================================================
   19. PAGE LOADED
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );


        updateScrollProgress();

        updateActiveNavigation();

    }
);


/* =====================================================
   20. CONSOLE
===================================================== */

console.log(
    "%c🚀 Rajeev's Portfolio",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "%cCSE Student • Learner • Builder",
    "font-size:13px;color:#6da8ff;"
);

console.log(
    "%cPortfolio loaded successfully ✅",
    "font-size:12px;"
);