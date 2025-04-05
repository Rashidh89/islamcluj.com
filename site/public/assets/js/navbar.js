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

    // need improvement 

    // // Add menu close on outside click
    // document.addEventListener("click", (e) => {
    //     if (!e.target.closest(".nav-menu") && !e.target.closest(".hamburger")) {
    //         hamburger.classList.remove("active");
    //         navMenu.classList.remove("active");
    //     }
    // });

    // // Add keyboard navigation
    // navMenu.addEventListener("keydown", (e) => {
    //     if (e.key === "Escape") {
    //         hamburger.classList.remove("active");
    //         navMenu.classList.remove("active");
    //     }
    // });

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
                    if (!el.closest(".language-switcher") && !el.closest(".language-selector")) {
                        el.style.display = "none";
                    }
                });

            // Show elements for selected language
            document.querySelectorAll(`.${lang}`).forEach((el) => {
                // Skip elements that are part of the language switcher itself
                if (!el.closest(".language-switcher") && !el.closest(".language-selector")) {
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
            document.querySelector(".logo h1.En").style.display = lang === "En" ? "" : "none";
            document.querySelector(".logo h1.Ar").style.display = lang === "Ar" ? "" : "none";
            document.querySelector(".logo h1.Ro").style.display = lang === "Ro" ? "" : "none";
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

    // Initialize all components
    initHamburgerMenu();
    initLanguageSwitcher();
});
