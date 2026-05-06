document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Прибираємо активний клас у всіх
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        // Додаємо тому, на який клікнули
        dot.classList.add('active');
        
        console.log(`Перехід до сторінки ${index + 1}`);
        // Тут можна додати логіку перемикання товарів (якщо це слайдер)
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. "Липкий" хедер (зміна прозорості при скролі)
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.transition = '0.4s';
        } else {
            header.style.background = 'transparent';
        }
    });

    // 2. Плавна поява елементів при прокрутці (Scroll Reveal)
    const revealElements = document.querySelectorAll('.product-item, .cat-card, .section-title');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = '0.6s ease-out';
            }
        });
    };

    // Початкові налаштування для анімації появи
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Запуск для першого екрану

    // 3. Інтерактивне меню (Dropdown)
    const navItems = document.querySelectorAll('.navigation ul li');
    navItems.forEach(item => {
        if (item.innerText.includes('⌵')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                console.log('Відкриття категорій для: ' + item.innerText);
                // Тут можна додати логіку показу випадаючого списку
            });
        }
    });

    // 4. Валідація та анімація форми підписки у футері
    const subscribeBtn = document.querySelector('.subscribe-form button');
    const subscribeInput = document.querySelector('.subscribe-form input');

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const email = subscribeInput.value.trim();
            
            if (validateEmail(email)) {
                subscribeBtn.innerText = 'DONE!';
                subscribeBtn.style.backgroundColor = '#4CAF50';
                subscribeBtn.style.color = 'white';
                subscribeInput.value = '';
                
                setTimeout(() => {
                    subscribeBtn.innerText = 'Subscribe';
                    subscribeBtn.style.backgroundColor = '#FFB7A1';
                    subscribeBtn.style.color = '#FF6B6B';
                }, 3000);
            } else {
                subscribeInput.style.border = '1px solid red';
                setTimeout(() => { subscribeInput.style.border = 'none'; }, 2000);
            }
        });
    }

    // 5. Ефект паралаксу для Hero секції
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-section');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    });

    // Допоміжна функція перевірки Email
    function validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
});