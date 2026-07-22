// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
    initPreloader();
    initNavbar();
    initMobileMenu();
    initScrollProgress();
    initScrollAnimations();
    initTypingEffect();
    initCounters();
    initParticleCanvas();
    initFAQ();
    initTestimonialCarousel();
    initBookingForm();
    initLightbox();
    initBackToTop();
    setMinBookingDate();
});

// ========================================
// PRELOADER
// ========================================
function initPreloader() {
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.getElementById('preloader').classList.add('hidden');
        }, 2000);
    });
}

// ========================================
// NAVBAR
// ========================================
function initNavbar() {
    var navbar = document.getElementById('navbar');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        // Scrolled state
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link
        var scrollPos = window.scrollY + 150;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    var menu = document.getElementById('mobileMenu');
    var openBtn = document.getElementById('mobileToggle');
    var closeBtn = document.getElementById('mobileClose');
    var links = document.querySelectorAll('.mobile-link');

    function openMenu() {
        menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('open');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    links.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });
}

// ========================================
// SCROLL PROGRESS
// ========================================
function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll, .divider-line');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function (el) {
        observer.observe(el);
    });
}

// ========================================
// TYPING EFFECT
// ========================================
function initTypingEffect() {
    var texts = [
        'Servis motor Yamaha terpercaya dengan mekanik bersertifikat dan peralatan modern.',
        'Pelayanan ramah, harga transparan, dan garansi servis 30 hari untuk setiap pekerjaan.',
        'Booking online mudah, antri teratur, motor Anda selesai tepat waktu.'
    ];
    var element = document.getElementById('typingText');
    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var speed = 40;

    function type() {
        var currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            speed = 20;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            speed = 40;
        }

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

// ========================================
// COUNTER ANIMATION
// ========================================
function initCounters() {
    var counters = document.querySelectorAll('.counter');
    var decimalCounters = document.querySelectorAll('.counter-decimal');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                if (el.classList.contains('counter')) {
                    animateCounter(el, parseInt(el.getAttribute('data-target')), false);
                } else {
                    animateCounter(el, parseFloat(el.getAttribute('data-target')), true);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
    decimalCounters.forEach(function (c) { observer.observe(c); });
}

function animateCounter(el, target, isDecimal) {
    var start = 0;
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = start + (target - start) * eased;

        if (isDecimal) {
            el.textContent = current.toFixed(1);
        } else {
            el.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// ========================================
// PARTICLE CANVAS
// ========================================
function initParticleCanvas() {
    var canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p, i) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')';
            ctx.fill();

            // Draw connections
            for (var j = i + 1; j < particles.length; j++) {
                var dx = p.x - particles[j].x;
                var dy = p.y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.08 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
    var items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
        var toggle = item.querySelector('.faq-toggle');
        toggle.addEventListener('click', function () {
            var isActive = item.classList.contains('active');

            // Close all
            items.forEach(function (i) {
                i.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// TESTIMONIAL CAROUSEL
// ========================================
function initTestimonialCarousel() {
    var track = document.getElementById('testimonialTrack');
    var slides = track.querySelectorAll('.testimonial-slide');
    var prevBtn = document.getElementById('prevTestimonial');
    var nextBtn = document.getElementById('nextTestimonial');
    var dotsContainer = document.getElementById('testimonialDots');

    var currentIndex = 0;
    var slidesPerView = getSlidesPerView();
    var maxIndex = Math.max(0, slides.length - slidesPerView);

    function getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        var dotCount = maxIndex + 1;
        for (var i = 0; i < dotCount; i++) {
            var dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function () {
                goToSlide(parseInt(this.getAttribute('data-index')));
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        var dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        var slideWidth = 100 / slidesPerView;
        track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + '%)';
        updateDots();
    }

    prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
    });

    window.addEventListener('resize', function () {
        slidesPerView = getSlidesPerView();
        maxIndex = Math.max(0, slides.length - slidesPerView);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        goToSlide(currentIndex);
        createDots();
    });

    createDots();

    // Auto-play
    var autoplay = setInterval(function () {
        if (currentIndex >= maxIndex) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + 1);
        }
    }, 5000);

    track.addEventListener('mouseenter', function () {
        clearInterval(autoplay);
    });

    track.addEventListener('mouseleave', function () {
        autoplay = setInterval(function () {
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + 1);
            }
        }, 5000);
    });
}

// ========================================
// BOOKING FORM
// ========================================
function initBookingForm() {
    var form = document.getElementById('bookingForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData(form);
        var nama = formData.get('nama');
        var whatsapp = formData.get('whatsapp');
        var tipeMotor = formData.get('tipeMotor');
        var layanan = formData.get('layanan');
        var tanggal = formData.get('tanggal');
        var waktu = formData.get('waktu') || 'Tidak ditentukan';
        var catatan = formData.get('catatan') || 'Tidak ada';

        // Format tanggal
        var tanggalFormatted = new Date(tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Build WhatsApp message
        var message = 'Halo Yamaha Prihatin Motor! Saya ingin booking servis.%0A%0A';
        message += '📋 *Detail Booking*%0A';
        message += '━━━━━━━━━━━━━━%0A';
        message += '👤 Nama: ' + nama + '%0A';
        message += '📱 WhatsApp: ' + whatsapp + '%0A';
        message += '🏍️ Motor: ' + tipeMotor + '%0A';
        message += '🔧 Layanan: ' + layanan + '%0A';
        message += '📅 Tanggal: ' + tanggalFormatted + '%0A';
        message += '⏰ Waktu: ' + waktu + '%0A';
        message += '📝 Catatan: ' + catatan + '%0A';
        message += '━━━━━━━━━━━━━━%0A';
        message += 'Terima kasih! 🙏';

        var waUrl = 'https://wa.me/6281234567890?text=' + message;

        showSuccessModal(nama);
        setTimeout(function () {
            window.open(waUrl, '_blank');
        }, 900);
        form.reset();
    });
}

function setMinBookingDate() {
    var dateInput = document.querySelector('input[name="tanggal"]');
    if (dateInput) {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
    }
}

// ========================================
// LIGHTBOX
// ========================================
function initLightbox() {
    // Lightbox is handled via global functions
}

function openLightbox(el) {
    var img = el.querySelector('img');
    var src = img.getAttribute('data-src') || img.src;
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ========================================
// BACK TO TOP
// ========================================
function initBackToTop() {
    var btn = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 600) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
}

// ========================================
// TOAST NOTIFICATION
// ========================================
function showToast(message, type) {
    var container = document.getElementById('toastContainer');
    var toast = document.createElement('div');

    var bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yamaha-blue';
    var icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';

    toast.className = 'toast flex items-center gap-3 ' + bgColor + ' text-white px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium';
    toast.innerHTML = '<i data-lucide="' + icon + '" class="w-5 h-5 flex-shrink-0"></i><span>' + message + '</span>';

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(function () {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3500);
}
// ========================================
// 3D UPGRADE PACK
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initCustomCursor();
    initTiltCards();
    initMagneticButtons();
    initRippleButtons();
    initHeroParallax();
    initSpotlightSections();
    initNavPill();
    initQuickDock();
    initBeforeAfterSliders();
    upgradeScrollAnimations();
});

// ----------------------------------------
// CUSTOM CURSOR
// ----------------------------------------
function initCustomCursor() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    var dot = document.createElement('div');
    dot.id = 'cursorDot';
    var ring = document.createElement('div');
    ring.id = 'cursorRing';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;

    window.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    var hoverTargets = 'a, button, .tilt-card, input, select, textarea, .gallery-item, .dock-item, .ba-slider';
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest(hoverTargets)) {
            document.body.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', function (e) {
        if (e.target.closest(hoverTargets)) {
            document.body.classList.remove('cursor-hover');
        }
    });
}

// ----------------------------------------
// 3D TILT CARDS
// ----------------------------------------
function initTiltCards() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    var cards = document.querySelectorAll('.tilt-card');

    cards.forEach(function (card) {
        var maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 10;

        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cx = rect.width / 2;
            var cy = rect.height / 2;
            var rotateX = ((y - cy) / cy) * -maxTilt;
            var rotateY = ((x - cx) / cx) * maxTilt;

            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
            card.style.setProperty('--mx', (x / rect.width * 100) + '%');
            card.style.setProperty('--my', (y / rect.height * 100) + '%');
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// ----------------------------------------
// MAGNETIC BUTTONS
// ----------------------------------------
function initMagneticButtons() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    var buttons = document.querySelectorAll('.magnetic');

    buttons.forEach(function (btn) {
        var inner = btn.querySelector('.magnetic-inner') || btn;

        btn.addEventListener('mousemove', function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            var strength = 0.35;
            btn.style.transform = 'translate(' + (x * strength) + 'px, ' + (y * strength) + 'px)';
            inner.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translate(0px, 0px)';
            inner.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ----------------------------------------
// RIPPLE EFFECT ON BUTTONS
// ----------------------------------------
function initRippleButtons() {
    var buttons = document.querySelectorAll('.ripple');

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var rect = btn.getBoundingClientRect();
            var circle = document.createElement('span');
            var size = Math.max(rect.width, rect.height);
            circle.className = 'ripple-effect';
            circle.style.width = circle.style.height = size + 'px';
            circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
            circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(circle);
            setTimeout(function () {
                if (circle.parentNode) circle.parentNode.removeChild(circle);
            }, 700);
        });
    });
}

// ----------------------------------------
// HERO 3D PARALLAX
// ----------------------------------------
function initHeroParallax() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    var hero = document.getElementById('home');
    var imgWrap = document.getElementById('heroImgWrap');
    var layers = document.querySelectorAll('.hero-layer');
    if (!hero) return;

    hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        if (imgWrap) {
            imgWrap.style.transform = 'perspective(1200px) rotateY(' + (x * 12) + 'deg) rotateX(' + (-y * 12) + 'deg)';
        }
        layers.forEach(function (layer) {
            var depth = parseFloat(layer.getAttribute('data-depth')) || 20;
            layer.style.transform = 'translate(' + (x * depth) + 'px, ' + (y * depth) + 'px)';
        });
    });

    hero.addEventListener('mouseleave', function () {
        if (imgWrap) imgWrap.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
        layers.forEach(function (layer) {
            layer.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ----------------------------------------
// SPOTLIGHT ON DARK SECTIONS
// ----------------------------------------
function initSpotlightSections() {
    var sections = document.querySelectorAll('.spotlight-section');
    sections.forEach(function (sec) {
        sec.addEventListener('mousemove', function (e) {
            var rect = sec.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            sec.style.setProperty('--sx', x + '%');
            sec.style.setProperty('--sy', y + '%');
        });
    });
}

// ----------------------------------------
// NAV PILL (sliding active indicator)
// ----------------------------------------
function initNavPill() {
    var container = document.querySelector('#navbar .hidden.lg\\:flex');
    if (!container) return;
    var pill = document.createElement('div');
    pill.id = 'navPill';
    container.style.position = 'relative';
    container.insertBefore(pill, container.firstChild);

    function movePill(link) {
        if (!link) { pill.style.opacity = '0'; return; }
        pill.style.opacity = '1';
        pill.style.width = link.offsetWidth + 'px';
        pill.style.transform = 'translateX(' + link.offsetLeft + 'px)';
    }

    var links = container.querySelectorAll('.nav-link');
    links.forEach(function (link) {
        link.addEventListener('mouseenter', function () { movePill(link); });
    });
    container.addEventListener('mouseleave', function () {
        var active = container.querySelector('.nav-link.active');
        movePill(active);
    });

    // Observe class changes to follow active link when scroll updates it
    var observer = new MutationObserver(function () {
        if (!container.matches(':hover')) {
            var active = container.querySelector('.nav-link.active');
            movePill(active);
        }
    });
    links.forEach(function (link) {
        observer.observe(link, { attributes: true, attributeFilter: ['class'] });
    });
}

// ----------------------------------------
// QUICK DOCK (floating mac-style dock)
// ----------------------------------------
function initQuickDock() {
    var dock = document.getElementById('quickDock');
    if (!dock) return;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            dock.classList.add('show');
        } else {
            dock.classList.remove('show');
        }
    });
}

// ----------------------------------------
// BEFORE / AFTER SLIDER
// ----------------------------------------
function initBeforeAfterSliders() {
    var sliders = document.querySelectorAll('.ba-slider');

    sliders.forEach(function (slider) {
        var after = slider.querySelector('.ba-after');
        var handle = slider.querySelector('.ba-handle');
        var afterImg = after.querySelector('img');
        var dragging = false;

        function setPosition(clientX) {
            var rect = slider.getBoundingClientRect();
            var x = clientX - rect.left;
            var pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
            after.style.width = pct + '%';
            handle.style.left = pct + '%';
            afterImg.style.width = (rect.width) + 'px';
        }

        function syncImgWidth() {
            var rect = slider.getBoundingClientRect();
            afterImg.style.width = rect.width + 'px';
        }
        syncImgWidth();
        window.addEventListener('resize', syncImgWidth);

        slider.addEventListener('mousedown', function (e) { dragging = true; setPosition(e.clientX); });
        window.addEventListener('mousemove', function (e) { if (dragging) setPosition(e.clientX); });
        window.addEventListener('mouseup', function () { dragging = false; });

        slider.addEventListener('touchstart', function (e) { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
        slider.addEventListener('touchmove', function (e) { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
        slider.addEventListener('touchend', function () { dragging = false; });

        // Auto demo sweep on first view
        var demoObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var t = 0;
                    var demo = setInterval(function () {
                        t += 2;
                        var rect = slider.getBoundingClientRect();
                        setPosition(rect.left + (rect.width * (30 + t) / 100));
                        if (t >= 40) clearInterval(demo);
                    }, 25);
                    demoObserver.unobserve(slider);
                }
            });
        }, { threshold: 0.6 });
        demoObserver.observe(slider);
    });
}

// ----------------------------------------
// UPGRADE SCROLL ANIMATIONS (3D reveal)
// ----------------------------------------
function upgradeScrollAnimations() {
    var elements = document.querySelectorAll('.reveal-3d');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
}

// ----------------------------------------
// CONFETTI BURST
// ----------------------------------------
function fireConfetti() {
    var canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var colors = ['#003DA5', '#0066E0', '#E60012', '#FF1A2E', '#FFFFFF', '#FFD700'];
    var pieces = [];
    var count = 140;

    for (var i = 0; i < count; i++) {
        pieces.push({
            x: canvas.width / 2,
            y: canvas.height * 0.35,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() * -14) - 4,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 12,
            gravity: 0.35,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }

    var frame = 0;
    function draw() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var alive = false;

        pieces.forEach(function (p) {
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.vx *= 0.99;

            if (p.y < canvas.height + 50) alive = true;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, 1 - frame / 160);
            if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        if (alive && frame < 160) {
            requestAnimationFrame(draw);
        } else {
            canvas.remove();
        }
    }
    draw();
}

// ----------------------------------------
// SUCCESS MODAL
// ----------------------------------------
function showSuccessModal(nama) {
    var modal = document.getElementById('successModal');
    if (!modal) return;
    var nameEl = modal.querySelector('#successName');
    if (nameEl && nama) nameEl.textContent = nama;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fireConfetti();

    var closeBtn = modal.querySelector('#successClose');
    var closeFn = function () {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };
    closeBtn.onclick = closeFn;
    modal.onclick = function (e) {
        if (e.target === modal) closeFn();
    };
}

// ========================================
// 3D UPGRADE PACK v2 — Mobile Gyro, Coverflow, Depth Parallax
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initGyroTilt();
    initCoverflowTestimonials();
    initSectionParallaxBlobs();
    initTapFlipTouchCards();
    initCounterFlipClass();
    initDockTapFeedback();
});

// ----------------------------------------
// GYROSCOPE TILT FOR MOBILE / TABLET
// ----------------------------------------
function initGyroTilt() {
    var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!isTouch) return;

    var cards = document.querySelectorAll('.tilt-card');
    if (!cards.length) return;

    function applyTilt(beta, gamma) {
        var gx = Math.max(-12, Math.min(12, (beta - 45) / 4));
        var gy = Math.max(-12, Math.min(12, gamma / 4));
        cards.forEach(function (card) {
            var rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.classList.add('gyro-tilt');
                card.style.setProperty('--gx', (-gx) + 'deg');
                card.style.setProperty('--gy', gy + 'deg');
            }
        });
    }

    function handleOrientation(e) {
        if (e.beta === null || e.gamma === null) return;
        applyTilt(e.beta, e.gamma);
    }

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ needs explicit permission via user gesture
        var btn = document.createElement('button');
        btn.id = 'motionPermBtn';
        btn.textContent = '✨ Aktifkan Efek 3D Gerak';
        btn.style.display = 'block';
        document.body.appendChild(btn);

        btn.addEventListener('click', function () {
            DeviceOrientationEvent.requestPermission().then(function (state) {
                if (state === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                }
                btn.remove();
            }).catch(function () {
                btn.remove();
            });
        });

        setTimeout(function () {
            if (btn.parentNode) btn.style.display = 'none';
        }, 8000);
    } else if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

// ----------------------------------------
// COVERFLOW 3D TESTIMONIAL EFFECT
// ----------------------------------------
function initCoverflowTestimonials() {
    var track = document.getElementById('testimonialTrack');
    if (!track) return;
    var slides = track.querySelectorAll('.testimonial-slide');

    function updateDepth() {
        var trackRect = track.getBoundingClientRect();
        var centerX = trackRect.left + trackRect.width / 2;

        slides.forEach(function (slide) {
            var rect = slide.getBoundingClientRect();
            var slideCenter = rect.left + rect.width / 2;
            var distance = (slideCenter - centerX) / trackRect.width;
            var rotateY = distance * -25;
            var scale = 1 - Math.min(Math.abs(distance) * 0.15, 0.15);
            var translateZ = -Math.min(Math.abs(distance) * 120, 120);
            var opacity = 1 - Math.min(Math.abs(distance) * 0.4, 0.5);

            slide.style.transform = 'perspective(1200px) rotateY(' + rotateY + 'deg) translateZ(' + translateZ + 'px) scale(' + scale + ')';
            slide.style.opacity = opacity;
        });
    }

    updateDepth();
    window.addEventListener('resize', updateDepth);

    // Update on the carousel's own transition + observe DOM class flips
    var mo = new MutationObserver(updateDepth);
    mo.observe(track, { attributes: true, attributeFilter: ['style'] });

    setInterval(updateDepth, 350);
}

// ----------------------------------------
// SECTION PARALLAX DEPTH BLOBS (all sections, scroll + mouse)
// ----------------------------------------
function initSectionParallaxBlobs() {
    var sections = document.querySelectorAll('.spotlight-section, #services, #gallery, #info, #booking');
    var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    sections.forEach(function (sec, idx) {
        if (getComputedStyle(sec).position === 'static') {
            sec.style.position = 'relative';
        }
        var blob1 = document.createElement('div');
        blob1.className = 'depth-blob parallax-layer';
        blob1.style.width = '260px';
        blob1.style.height = '260px';
        blob1.style.background = idx % 2 === 0 ? 'rgba(0,61,165,0.12)' : 'rgba(230,0,18,0.10)';
        blob1.style.top = '10%';
        blob1.style.left = idx % 2 === 0 ? '-5%' : '85%';
        sec.insertBefore(blob1, sec.firstChild);

        var blob2 = document.createElement('div');
        blob2.className = 'depth-blob parallax-layer';
        blob2.style.width = '200px';
        blob2.style.height = '200px';
        blob2.style.background = idx % 2 === 0 ? 'rgba(230,0,18,0.08)' : 'rgba(0,102,224,0.10)';
        blob2.style.bottom = '5%';
        blob2.style.right = idx % 2 === 0 ? '-3%' : '90%';
        sec.insertBefore(blob2, sec.firstChild);

        if (!isTouch) {
            sec.addEventListener('mousemove', function (e) {
                var rect = sec.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                blob1.style.transform = 'translate(' + (x * 30) + 'px, ' + (y * 30) + 'px)';
                blob2.style.transform = 'translate(' + (x * -25) + 'px, ' + (y * -25) + 'px)';
            });
        }
    });

    window.addEventListener('scroll', function () {
        var scrolled = window.scrollY;
        document.querySelectorAll('.depth-blob').forEach(function (blob, i) {
            var speed = (i % 2 === 0) ? 0.03 : -0.02;
            blob.style.marginTop = (scrolled * speed) + 'px';
        });
    }, { passive: true });
}

// ----------------------------------------
// TAP-TO-FLIP FOR TOUCH (services/why-us cards get a subtle 3D tap response)
// ----------------------------------------
function initTapFlipTouchCards() {
    var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!isTouch) return;

    var cards = document.querySelectorAll('.tilt-card');
    cards.forEach(function (card) {
        card.classList.add('tap-flip');
        card.addEventListener('touchstart', function () {
            cards.forEach(function (c) { c.classList.remove('flipped'); });
            card.classList.add('flipped');
        }, { passive: true });
    });

    document.addEventListener('touchstart', function (e) {
        if (!e.target.closest('.tilt-card')) {
            cards.forEach(function (c) { c.classList.remove('flipped'); });
        }
    }, { passive: true });
}

// ----------------------------------------
// COUNTER FLIP-IN CLASS TRIGGER
// ----------------------------------------
function initCounterFlipClass() {
    var counters = document.querySelectorAll('.counter, .counter-decimal');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { observer.observe(c); });
}

// ----------------------------------------
// DOCK TAP FEEDBACK (mobile pop without hover)
// ----------------------------------------
function initDockTapFeedback() {
    var items = document.querySelectorAll('.dock-item');
    items.forEach(function (item) {
        item.addEventListener('touchstart', function () {
            item.classList.add('tapped');
            setTimeout(function () { item.classList.remove('tapped'); }, 300);
        }, { passive: true });
    });
}