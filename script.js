document.addEventListener('DOMContentLoaded', () => {
    // --- Логіка Мобільного меню ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileCloseBtn = document.querySelector('.mobile-menu-close');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileBtn && mobileCloseBtn && mobileNavOverlay) {
        // Відкриття/Закриття меню
        const toggleMenu = () => {
            mobileNavOverlay.classList.toggle('active');
            // Блокуємо скрол фону, коли меню відкрите
            document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
        };

        mobileBtn.addEventListener('click', toggleMenu);
        mobileCloseBtn.addEventListener('click', toggleMenu);

        // Закриття меню при кліку на будь-яке посилання
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закриття меню при кліку на затемнений фон поза меню
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    // 1. Логіка перемикання Прайсу (Таби)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 2. Анімація появи елементів при скролі (робить сайт дорогим і плавним)
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
        })
    }
    
    // Запускаємо відразу для елементів на першому екрані
    handleScrollAnimation();
    
    // Вішаємо слухач на прокрутку
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});

// Плавний скрол для навігаційного меню
    document.querySelectorAll('.header-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Віднімаємо 80px (висота шапки), щоб меню не перекривало заголовок секції
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });