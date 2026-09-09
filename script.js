// ==================== PORTFOLIO JAVASCRIPT ====================
// Bongani Xolani Macu - Data Analyst & RPA Developer Portfolio

(function() {
    'use strict';

    // ==================== DOM ELEMENTS ====================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const weatherWidget = document.getElementById('weatherWidget');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherText = document.getElementById('weatherText');
    const timeWidget = document.getElementById('timeWidget');
    const timeText = document.getElementById('timeText');
    const typingText = document.getElementById('typingText');

    // ==================== TYPING ANIMATION ====================
    const roles = [
        'Data Analyst',
        'RPA Developer',
        'BI Specialist',
        'Python Developer',
        'Cloud Enthusiast',
        'Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // ==================== WEATHER DETECTION ====================
    const weatherIcons = {
        0: 'fa-sun',           // Clear sky
        1: 'fa-cloud-sun',     // Mainly clear
        2: 'fa-cloud',         // Partly cloudy
        3: 'fa-cloud',         // Overcast
        45: 'fa-smog',         // Fog
        48: 'fa-smog',         // Depositing rime fog
        51: 'fa-cloud-rain',   // Light drizzle
        53: 'fa-cloud-rain',   // Moderate drizzle
        55: 'fa-cloud-showers-heavy', // Dense drizzle
        61: 'fa-cloud-rain',   // Slight rain
        63: 'fa-cloud-rain',   // Moderate rain
        65: 'fa-cloud-showers-heavy', // Heavy rain
        71: 'fa-snowflake',    // Slight snow
        73: 'fa-snowflake',    // Moderate snow
        75: 'fa-snowflake',    // Heavy snow
        95: 'fa-bolt',         // Thunderstorm
        96: 'fa-bolt',         // Thunderstorm with hail
        99: 'fa-bolt'          // Thunderstorm with heavy hail
    };

    async function fetchWeather(lat, lon, cityName) {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
            );
            const data = await response.json();

            if (data.current_weather) {
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                const iconClass = weatherIcons[code] || 'fa-cloud';

                weatherIcon.className = `fas ${iconClass}`;
                weatherText.textContent = `${temp}°C ${cityName || ''}`;
            }
        } catch (error) {
            console.error('Weather fetch error:', error);
            weatherIcon.className = 'fas fa-cloud';
            weatherText.textContent = 'Weather unavailable';
        }
    }

    async function getLocationAndWeather() {
        // Try browser geolocation first
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // Try to get city name from coordinates
                    try {
                        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                        const geoData = await geoRes.json();
                        const cityName = geoData.city || geoData.locality || '';
                        await fetchWeather(lat, lon, cityName);
                    } catch {
                        await fetchWeather(lat, lon, '');
                    }
                },
                async () => {
                    // Fallback: Use IP-based location
                    await getWeatherByIP();
                },
                { timeout: 10000, enableHighAccuracy: false }
            );
        } else {
            await getWeatherByIP();
        }
    }

    async function getWeatherByIP() {
        try {
            const ipRes = await fetch('https://ipapi.co/json/');
            const ipData = await ipRes.json();

            if (ipData.latitude && ipData.longitude) {
                const cityName = ipData.city || '';
                await fetchWeather(ipData.latitude, ipData.longitude, cityName);
            } else {
                throw new Error('No location data');
            }
        } catch (error) {
            console.error('IP location error:', error);
            weatherIcon.className = 'fas fa-cloud';
            weatherText.textContent = 'Weather unavailable';
        }
    }

    // ==================== TIME DISPLAY ====================
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeText.textContent = `${hours}:${minutes}`;
    }

    // ==================== DARK/LIGHT MODE ====================
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ==================== MOBILE MENU ====================
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==================== SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate skill bars
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        if (width) {
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 200);
                        }
                    });

                    // Animate counters
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-count'));
                        if (target && !counter.classList.contains('counted')) {
                            counter.classList.add('counted');
                            animateCounter(counter, target);
                        }
                    });
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.fade-in, .skill-category, .project-card, .cert-card, .edu-card, .timeline-item, .stat').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // ==================== SMOOTH SCROLL ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }

    // ==================== CONTACT FORM ====================
    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link
        const mailtoLink = `mailto:bonganimacu11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailtoLink;

        // Show toast
        showToast('Opening your email client...');

        // Reset form
        contactForm.reset();
    }

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ==================== BACK TO TOP ====================
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ==================== DEMO LINK HANDLER ====================
    function initDemoLinks() {
        document.querySelectorAll('.demo-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Live demo coming soon! Check GitHub for the code.');
            });
        });
    }

    // ==================== PARALLAX EFFECT ====================
    function initParallax() {
        const orbs = document.querySelectorAll('.gradient-orb');

        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }

    // ==================== CERTIFICATE DOWNLOAD HANDLER ====================
    function initCertificateDownloads() {
        document.querySelectorAll('.cert-btn[download]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Check if file exists (in production, this would be a real check)
                // For now, show a helpful message if the file isn't available yet
                const href = this.getAttribute('href');
                // This is a placeholder - in production, the actual PDFs should be placed in assets/certificates/
            });
        });
    }

    // ==================== INITIALIZATION ====================
    function init() {
        // Start typing animation
        if (typingText) {
            setTimeout(typeWriter, 1000);
        }

        // Initialize weather
        getLocationAndWeather();

        // Start clock
        updateTime();
        setInterval(updateTime, 1000);

        // Initialize theme
        initTheme();

        // Event listeners
        themeToggle.addEventListener('click', toggleTheme);
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        backToTop.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', handleScroll);

        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Initialize animations
        initScrollAnimations();
        initSmoothScroll();
        initDemoLinks();
        initParallax();
        initCertificateDownloads();

        // Initial scroll check
        handleScroll();

        console.log('\n%c👋 Welcome to Bongani Macu\'s Portfolio!', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
        console.log('%cBuilt with passion using HTML, CSS & JavaScript', 'color: #64748B; font-size: 12px;');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
