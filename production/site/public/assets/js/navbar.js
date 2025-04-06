document.addEventListener("DOMContentLoaded", function () {
    // ==================== Hamburger Menu ====================
    const initHamburgerMenu = () => {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        if (hamburger && navMenu) {
            hamburger.addEventListener("click", () => {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
            });
        }
    };

    // ==================== Language Switcher ====================
    const initLanguageSwitcher = () => {
        const languageSelector = document.querySelector(".language-selector");
        const selectedLanguage = document.querySelector(".selected-language");
        const languageDropdown = document.querySelector(".language-dropdown");
        const languageOptions = document.querySelectorAll(".language-dropdown li");

        if (
            !languageSelector ||
            !selectedLanguage ||
            !languageDropdown ||
            !languageOptions.length
        ) {
            return;
        }

        // Toggle dropdown
        languageSelector.addEventListener("click", (e) => {
            e.stopPropagation();
            languageSelector.classList.toggle("active");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", () => {
            languageSelector.classList.remove("active");
        });

        // Language switching function
        const switchLanguage = (lang) => {
            // Hide all language-specific content
            document
                .querySelectorAll('[class*="En"], [class*="Ar"], [class*="Ro"]')
                .forEach((el) => {
                    // Skip elements that are part of the language switcher itself
                    if (
                        !el.closest(".language-switcher") &&
                        !el.closest(".language-selector")
                    ) {
                        el.style.display = "none";
                    }
                });

            // Show elements for selected language
            document.querySelectorAll(`.${lang}`).forEach((el) => {
                // Skip elements that are part of the language switcher itself
                if (
                    !el.closest(".language-switcher") &&
                    !el.closest(".language-selector")
                ) {
                    el.style.display = "";
                }
            });

            // Update selected language display
            const selectedOption = document.querySelector(
                `.language-dropdown li[data-lang="${lang}"]`
            );
            if (selectedOption) {
                const selectedImg = selectedOption.querySelector("img").cloneNode(true);
                const selectedText = selectedOption.querySelector("span").textContent;

                // Clear and update selected language display
                selectedLanguage.innerHTML = "";
                selectedLanguage.appendChild(selectedImg);

                const textSpan = document.createElement("span");
                textSpan.textContent = selectedText;
                textSpan.className = lang;
                selectedLanguage.appendChild(textSpan);

                const chevron = document.createElement("i");
                chevron.className = "fas fa-chevron-down";
                selectedLanguage.appendChild(chevron);
            }

            // Set direction for RTL languages
            document.body.classList.toggle("rtl", lang === "Ar");
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === "Ar" ? "rtl" : "ltr";

            // Update logo text visibility
            document.querySelector(".logo h1.En").style.display =
                lang === "En" ? "" : "none";
            document.querySelector(".logo h1.Ar").style.display =
                lang === "Ar" ? "" : "none";
            document.querySelector(".logo h1.Ro").style.display =
                lang === "Ro" ? "" : "none";
        };

        // Handle language option clicks
        languageOptions.forEach((option) => {
            option.addEventListener("click", (e) => {
                e.stopPropagation();
                const lang = option.getAttribute("data-lang");
                switchLanguage(lang);
                languageSelector.classList.remove("active");
            });
        });

        // Initialize with English
        switchLanguage("En");
    };

    // ==================== Back to Top Button ====================
    const initBackToTop = () => {
        const backToTopButton = document.querySelector(".back-to-top");
        const progressFill = document.querySelector(".progress-circle-fill");

        if (!backToTopButton || !progressFill) return;

        window.addEventListener("scroll", () => {
            const scrollTotal =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            const scrollPercentage = (scrollPosition / scrollTotal) * 125.6;

            if (scrollPosition > 300) {
                backToTopButton.classList.add("visible");
                progressFill.style.strokeDashoffset = 125.6 - scrollPercentage;
            } else {
                backToTopButton.classList.remove("visible");
            }
        });

        backToTopButton.addEventListener("click", () => {
            // Add charging animation
            backToTopButton.classList.add("charging");
            progressFill.style.transition = "stroke-dashoffset 1.5s linear";
            progressFill.style.strokeDashoffset = "0";

            // Scroll to top after animation
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });

                // Reset animation
                setTimeout(() => {
                    backToTopButton.classList.remove("charging");
                    progressFill.style.transition = "none";
                    progressFill.style.strokeDashoffset = "125.6";
                }, 1500);
            }, 100);
        });
    };

    // ==================== Hero Slider ====================
    const initHeroSlider = () => {
        const slides = document.querySelectorAll(".hero-slide");
        const controls = document.querySelectorAll(".hero-control");

        if (!slides.length || !controls.length) return;

        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide) => slide.classList.remove("active"));
            controls.forEach((control) => control.classList.remove("active"));

            slides[index].classList.add("active");
            controls[index].classList.add("active");
            currentSlide = index;
        };

        const nextSlide = () => {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            showSlide(next);
        };

        // Add click events to controls
        controls.forEach((control, index) => {
            control.addEventListener("click", () => showSlide(index));
        });

        // Auto slide change every 5 seconds
        setInterval(nextSlide, 5000);

        // Initialize first slide
        showSlide(0);
    };

    // ==================== FAQ Accordion ====================
    const initFAQAccordion = () => {
        const faqItems = document.querySelectorAll(".faq-item");

        if (!faqItems.length) return;

        faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");

            question.addEventListener("click", () => {
                // Close all other items
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                    }
                });

                // Toggle current item
                item.classList.toggle("active");
            });
        });
    };

    // Initialize all components
    initHamburgerMenu();
    initLanguageSwitcher();
    initBackToTop();
    initHeroSlider();
    initFAQAccordion();
});