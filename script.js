document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- DOM Elements ---
    const html = document.documentElement;
    const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const revealElements = document.querySelectorAll('.reveal');

    // --- Populate Content from portfolioData ---
    if (typeof portfolioData !== 'undefined') {
        renderPortfolioContent(portfolioData);
    }

    // --- Theme Management ---

    // Check local storage or system preference
    const getPreferredTheme = () => {
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
        }
        localStorage.setItem('theme', theme);
    };

    // Initialize Theme
    setTheme(getPreferredTheme());

    // Toggle event listeners
    themeToggles.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            });
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
            navbar.classList.replace('py-4', 'py-2');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.replace('py-2', 'py-4');
        }
    });

    // --- Mobile Menu Toggle ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIconClose.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
            } else {
                menuIconClose.classList.remove('hidden');
                menuIconOpen.classList.add('hidden');
            }
        });

        // Close mobile menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Scroll Reveal Animations ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Initial trigger for elements already in view
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});

function renderPortfolioContent(data) {
    // Meta
    document.getElementById('page-title').textContent = data.meta.title;

    // Navbar
    document.getElementById('nav-logo').textContent = data.navbar.logo;
    const desktopLinksContainer = document.getElementById('nav-desktop-links');
    const mobileLinksContainer = document.getElementById('nav-mobile-links');

    if (desktopLinksContainer && mobileLinksContainer) {
        desktopLinksContainer.innerHTML = '';
        mobileLinksContainer.innerHTML = '';
        data.navbar.links.forEach((link, index) => {
            const dLink = document.createElement('a');
            dLink.href = `#${link.id}`;
            dLink.className = 'text-[15px] font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors';
            dLink.textContent = link.text;
            desktopLinksContainer.appendChild(dLink);

            const mLink = document.createElement('a');
            mLink.href = `#${link.id}`;
            mLink.className = `block text-2xl font-semibold border-ios-sepLight dark:border-ios-sepDark pb-4 ${index !== data.navbar.links.length - 1 ? 'border-b' : ''}`;
            mLink.textContent = link.text;
            mobileLinksContainer.appendChild(mLink);
        });
    }

    // Hero
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-title').innerHTML = data.hero.title;
    document.getElementById('hero-description').textContent = data.hero.description;

    const heroCtas = document.getElementById('hero-ctas');
    if (heroCtas) {
        heroCtas.innerHTML = '';
        [data.hero.cta1, data.hero.cta2].forEach((cta, idx) => {
            if (cta) {
                const a = document.createElement('a');
                a.href = cta.link;
                if (idx === 0) {
                    a.className = 'px-8 py-4 rounded-full bg-ios-blue dark:bg-ios-blueDark text-white font-semibold text-[17px] hover:opacity-90 transition-opacity';
                } else {
                    a.className = 'px-8 py-4 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white font-semibold text-[17px] hover:bg-black/10 dark:hover:bg-white/20 transition-colors';
                }
                a.textContent = cta.text;
                heroCtas.appendChild(a);
            }
        });
    }

    // About
    document.getElementById('about-image').src = data.about.image;
    document.getElementById('about-title').textContent = data.about.title;
    document.getElementById('about-description').textContent = data.about.description;

    const aboutStats = document.getElementById('about-stats');
    if (aboutStats) {
        aboutStats.innerHTML = '';
        data.about.stats.forEach(stat => {
            const statDiv = document.createElement('div');
            const valueP = document.createElement('p');
            valueP.className = "text-[32px] font-bold tracking-tight" + (stat.highlight ? " text-ios-blue dark:text-ios-blueDark" : "");
            valueP.textContent = stat.value;
            const labelP = document.createElement('p');
            labelP.className = "text-[13px] font-medium text-ios-grayLabel uppercase tracking-wider";
            labelP.textContent = stat.label;
            statDiv.appendChild(valueP);
            statDiv.appendChild(labelP);
            aboutStats.appendChild(statDiv);
        });
    }

    // Experience
    document.getElementById('experience-title').textContent = data.experience.title;
    const expGrid = document.getElementById('experience-grid');
    if (expGrid) {
        expGrid.innerHTML = '';
        data.experience.items.forEach(item => {
            const div = document.createElement('div');
            div.className = "bg-ios-cardLight dark:bg-ios-cardDark rounded-[24px] p-6 shadow-ios dark:shadow-none border border-ios-sepLight dark:border-ios-sepDark flex flex-col h-full hover:scale-[1.02] transition-transform";
            div.innerHTML = `
                <div class="w-12 h-12 rounded-[14px] ${item.bgHover} flex items-center justify-center ${item.iconColor} mb-5">
                    <i class="ph ${item.icon} text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold tracking-tight mb-2">${item.title}</h3>
                <p class="text-[15px] leading-relaxed text-ios-grayLabel">${item.description}</p>
            `;
            expGrid.appendChild(div);
        });
    }

    // Skills
    document.getElementById('skills-title').textContent = data.skills.title;
    const skillsGroups = document.getElementById('skills-groups');
    if (skillsGroups) {
        skillsGroups.innerHTML = '';
        data.skills.groups.forEach((group, index) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = index === 0 ? "p-8 pb-0" : "p-8 pt-10";

            let itemsHtml = '';
            group.items.forEach((item, i) => {
                const bgClass = i % 2 !== 0 ? 'bg-black/5 dark:bg-white/5' : '';
                itemsHtml += `
                    <li class="flex items-center justify-between p-4 ${bgClass}">
                        <span class="text-[17px] font-medium">${item}</span>
                        <i class="ph-fill ph-check-circle text-ios-blue dark:text-ios-blueDark text-xl"></i>
                    </li>`;
            });

            groupDiv.innerHTML = `
                <h3 class="text-[13px] font-semibold text-ios-grayLabel uppercase tracking-widest mb-4 ml-2">${group.title}</h3>
                <div class="bg-ios-bgLight dark:bg-[#2C2C2E] rounded-[20px] overflow-hidden">
                    <ul class="divide-y divide-ios-sepLight dark:divide-ios-sepDark/50">
                        ${itemsHtml}
                    </ul>
                </div>
            `;
            skillsGroups.appendChild(groupDiv);
        });
    }

    const skillsTags = document.getElementById('skills-tags');
    if (skillsTags) {
        skillsTags.innerHTML = '';
        data.skills.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = "px-4 py-2 rounded-full bg-black/5 dark:bg-ios-cardDark text-[13px] font-medium text-black dark:text-white";
            span.textContent = tag;
            skillsTags.appendChild(span);
        });
    }

    // Contact
    document.getElementById('contact-title').textContent = data.contact.title;
    document.getElementById('contact-description').textContent = data.contact.description;

    document.getElementById('contact-email').href = "mailto:" + data.contact.email;
    document.getElementById('contact-email-text').textContent = data.contact.email;

    const contactSocials = document.getElementById('contact-socials');
    if (contactSocials) {
        contactSocials.innerHTML = '';
        data.contact.socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = "text-ios-grayLabel hover:text-black dark:hover:text-white transition-colors";
            a.setAttribute('aria-label', link.label);
            a.innerHTML = `<i class="ph-fill ${link.icon} text-3xl"></i>`;
            contactSocials.appendChild(a);
        });
    }

    // Footer
    document.getElementById('footer-copyright').textContent = data.footer.copyrightName;
    document.getElementById('footer-designer').textContent = data.footer.designer;
}
