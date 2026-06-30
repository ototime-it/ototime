// 1. Плавне прокручування для навігаційних посилань
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Закриваємо мобільне меню при кліку (якщо воно відкрите)
            document.getElementById('nav-menu').classList.remove('active');
            
            // Враховуємо висоту фіксованого хедера (~80px)
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

// 2. Мобільне меню (Toggle)
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 3. Акордеон для секції FAQ
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Закриваємо всі інші відкриті елементи (опціонально)
        document.querySelectorAll('.accordion-item').forEach(el => {
            el.classList.remove('active');
        });

        // Якщо клікнули не на активний - відкриваємо його
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// 4. Логіка модального вікна для запису (Booking)
const modal = document.getElementById('booking-modal');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокуємо скрол сторінки
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Повертаємо скрол
}

function closeModalOnOutsideClick(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// 5. Обробка форми запису (симуляція відправки)
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Запобігаємо перезавантаженню сторінки
    
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    // Анімація завантаження
    btn.textContent = 'Відправка...';
    btn.style.opacity = '0.7';

    // Симуляція запиту на сервер
    setTimeout(() => {
        alert('Дякуємо! Ваша заявка успішно надіслана. Наш адміністратор зв\'яжеться з вами найближчим часом.');
        closeModal();
        this.reset(); // Очищаємо форму
        btn.textContent = originalText;
        btn.style.opacity = '1';
    }, 1000);
});