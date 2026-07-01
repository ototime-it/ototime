document.addEventListener('DOMContentLoaded', () => {
    // --- Логіка Мобільного меню ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileCloseBtn = document.querySelector('.mobile-menu-close');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileBtn && mobileCloseBtn && mobileNavOverlay) {
        const toggleMenu = () => {
            mobileNavOverlay.classList.toggle('active');
            document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
        };

        mobileBtn.addEventListener('click', toggleMenu);
        mobileCloseBtn.addEventListener('click', toggleMenu);

        // Надійне закриття мобільного меню при переході по якірних лінках
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
	
// --- Розумна поява мобільної плаваючої кнопки при скролі ---
    const mobileFloatingCta = document.querySelector('.mobile-floating-cta');
    const heroSection = document.querySelector('.hero');

    if (mobileFloatingCta && heroSection) {
        const toggleFloatingCta = () => {
            // Отримуємо нижню координату секції Hero
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            
            // Якщо верхній екран пройдено — показуємо кнопку, якщо повернулися наверх — ховаємо
            if (heroBottom < 100) {
                mobileFloatingCta.classList.add('is-visible');
            } else {
                mobileFloatingCta.classList.remove('is-visible');
            }
        };

        // Перевіряємо при завантаженні та при кожному скролі
        toggleFloatingCta();
        window.addEventListener('scroll', toggleFloatingCta);
    }
	
    // --- Логіка перемикання прайс-листа (Таби) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // --- Анімація плавного скролу та появи елементів ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        fadeElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };
    
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);

    // Плавний скрол для всіх навігаційних лінків
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Фіксована висота шапки сайту
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
	// --- Логіка акордеонів у прайс-листі ---
    const priceItems = document.querySelectorAll('.price-item');

    priceItems.forEach(item => {
        const trigger = item.querySelector('.price-item-trigger');
        const description = item.querySelector('.p-description');

        if (trigger && description) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Опціонально: якщо хочете, щоб при відкритті однієї послуги інша автоматично закривалася в межах табу:
                // const currentTab = item.closest('.tab-pane');
                // currentTab.querySelectorAll('.price-item').forEach(i => {
                //     i.classList.remove('active');
                //     i.querySelector('.p-description').style.maxHeight = null;
                // });

                if (!isActive) {
                    item.classList.add('active');
                    // Динамічно вираховуємо висоту для ідеальної плавної анімації
                    description.style.maxHeight = description.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    description.style.maxHeight = null;
                }
            });
        }
    });
// --- Логіка акордеона для секції FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const answer = item.querySelector('.faq-answer');

        if (trigger && answer) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Закриваємо інші відкриті запитання (ефект класичного акордеона)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                    }
                });

                // Перемикаємо поточний елемент
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                }
            });
        }
    });
    // Додатково: Скидання висоти акордеонів при перемиканні табів (щоб при поверненні вони були закриті)
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            priceItems.forEach(item => {
                item.classList.remove('active');
                const desc = item.querySelector('.p-description');
                if(desc) desc.style.maxHeight = null;
            });
        });
    });
});
