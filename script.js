// Carrinho de Compras
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    
    updateCartUI();
    openCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(name);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartCountEl = document.querySelector('.cart-count');
    const cartTotalEl = document.getElementById('cart-total');
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    // Update cart count
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    // Render cart items
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-qty-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="cart-item-qty">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">🗑️</button>
                </div>
            </div>
        `).join('');
    }
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

function finalizarPedido() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    let message = '🍕 *Novo Pedido - Oak Pizzaria* %0A%0A';
    
    cart.forEach(item => {
        message += `• ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}%0A`;
    });
    
    message += `%0A*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    window.open(`https://wa.me/5521993107485?text=${message}`, '_blank');
    
    // Phone link for direct call
    window.open(`tel:+5521993107485`, '_self');
    
    closeCart();
}

// Replace button clicks with addToCart
document.querySelectorAll('.menu-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.menu-card');
        const name = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.menu-card-price').textContent;
        const price = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));
        
        addToCart(name, price);
    });
});

// Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
}

// Parallax effect for hero
function initParallax() {
    const hero = document.querySelector('.hero');
    const video = document.querySelector('#hero-video');
    
    if (hero && video) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            video.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Add loading animation
function initPageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallax();
    initSmoothScroll();
    initNavbarScroll();
    initPageLoad();
    animateCounters();
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                group.classList.remove('focused');
            });
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = contactForm.querySelector('input[name="nome"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const mensagem = contactForm.querySelector('textarea[name="mensagem"]').value;

            console.log('Formulário enviado:', { nome, email, mensagem });

            alert('Obrigado! Sua mensagem foi enviada com sucesso. Retornaremos em breve.');

            contactForm.reset();
        });
    }

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .stat, .about-text');

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            animationObserver.observe(element);
        });
    };

    // Carousel functionality
    const initCarousel = () => {
        const carouselTrack = document.querySelector('.carousel-track');
        const slides = Array.from(carouselTrack.children);
        const prevButton = document.querySelector('.carousel-btn.prev');
        const nextButton = document.querySelector('.carousel-btn.next');
        const dotsContainer = document.querySelector('.carousel-dots');

        let currentIndex = 0;
        const slideCount = slides.length;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateCarousel = () => {
            // Update slide position
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Update button states (optional - for infinite loop you'd remove these)
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slideCount - 1;
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };

        // Event listeners
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex === 0 ? slideCount - 1 : currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex === slideCount - 1 ? 0 : currentIndex + 1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Initialize
        updateCarousel();
    };

    animateOnScroll();
    initCarousel();
});