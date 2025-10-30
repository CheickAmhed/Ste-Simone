// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initNavigation();
    initGallery();
    initCopyButtons();
    initContactForm();
    initSmoothScroll();
    setCurrentYear();
});

// Navigation functionality
function initNavigation() {
    const nav = document.getElementById('navigation');
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const mobileLinks = document.querySelectorAll('.nav-link.mobile');
    
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (href === "index.html" && currentPage === "")) {
            link.classList.add("active");
        }
    });
    
    // Handle scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                mobileMenu.classList.remove('active');
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            } else {
                mobileMenu.classList.add('active');
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            }
        });
    }
    
    // Close mobile menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
}

// Gallery functionality
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    
    const images = [
        {
            url: 'imgs/education.jpeg',
            title: 'Éducation et Apprentissage',
            category: 'Éducation',
        },
        {
            url: 'imgs/img1.jpeg',
            title: 'Activités en Groupe',
            category: 'Vie Quotidienne',
        },
        {
            url: 'imgs/img4.jpeg',
            title: 'Prise de Repas',
            category: 'Vie Quotidienne',
        },
        {
            url: 'imgs/img2.jpeg',
            title: 'Moments de Joie',
            category: 'Vie Quotidienne',
        },
        {
            url: 'imgs/jardin.jpeg',
            title: 'Activités Créatives',
            category: 'Activités',
        },
        {
            url: 'imgs/care2.jpeg',
            title: 'Soins et Attention',
            category: 'Vie Quotidienne',
        },
    ];
    
    // Generate gallery items
    if (galleryGrid) {
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <div class="gallery-overlay"></div>
                <div class="gallery-info">
                    <div class="gallery-category">${image.category}</div>
                    <div class="gallery-title">${image.title}</div>
                </div>
            `;
            
            item.addEventListener('click', function() {
                openLightbox(image);
            });
            
            galleryGrid.appendChild(item);
        });
        
        // Reinitialize Lucide icons for dynamically added content
        lucide.createIcons();
    }
    
    // Open lightbox
    function openLightbox(image) {
        lightboxImage.src = image.url;
        lightboxImage.alt = image.title;
        lightboxCategory.textContent = image.category;
        lightboxTitle.textContent = image.title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Copy to clipboard functionality
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show toast notification
                showToast('Copié dans le presse-papiers!');
                
                // Change icon temporarily
                const icon = this.querySelector('i');
                const originalIcon = icon.getAttribute('data-lucide');
                icon.setAttribute('data-lucide', 'check');
                lucide.createIcons();
                
                setTimeout(() => {
                    icon.setAttribute('data-lucide', originalIcon || 'copy');
                    lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                showToast('Erreur lors de la copie');
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                showToast('Veuillez remplir tous les champs obligatoires');
                return;
            }
            
            // Simulate form submission
            // In a real application, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            showToast('Message envoyé avec succès! Nous vous répondrons bientôt.');
            
            // Reset form
            form.reset();
        });
    }
}

// Smooth scroll functionality
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const navHeight = document.getElementById('navigation').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Reinitialize icons in toast
        lucide.createIcons();
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Scroll reveal animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation class
    const animatedElements = document.querySelectorAll('.card, .value-card, .program-card, .impact-stat');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll reveal after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initScrollReveal, 100);
});