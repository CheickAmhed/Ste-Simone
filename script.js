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
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    
    const items = [
        {
            url: 'imgs/joy.mp4',
            title: 'Journée au Centre',
            category: 'Vidéo',
            type: 'video'
        },
        {
            url: 'imgs/education.jpeg',
            title: 'Éducation et Apprentissage',
            category: 'Éducation',
            type: 'image'
        },
        {
            url: 'imgs/img1.jpeg',
            title: 'Activités en Groupe',
            category: 'Vie Quotidienne',
            type: 'image'
        },
        {
            url: 'imgs/img4.jpeg',
            title: 'Prise de Repas',
            category: 'Vie Quotidienne',
            type: 'image'
        },
        {
            url: 'imgs/jardin.jpeg',
            title: 'Activités Créatives',
            category: 'Activités',
            type: 'image'
        },
        {
            url: 'imgs/care2.jpeg',
            title: 'Soins et Attention',
            category: 'Vie Quotidienne',
            type: 'image'
        },
    ];
    
    // Generate gallery items
    if (galleryGrid) {
        items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item card card-hover';
            
            if (item.type === 'video') {
                // For video items - use poster frame from video or custom thumbnail
                galleryItem.innerHTML = `
                    <div class="gallery-video-wrapper">
                        <video class="gallery-image" muted loop playsinline preload="metadata">
                            <source src="${item.url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="gallery-play-icon">
                            <i data-lucide="play-circle"></i>
                        </div>
                    </div>
                    <div class="gallery-overlay"></div>
                    <div class="gallery-info">
                        <div class="gallery-category">${item.category}</div>
                        <div class="gallery-title">${item.title}</div>
                    </div>
                `;
                
                // Add hover preview for video
                const video = galleryItem.querySelector('video');
                if (video) {
                    galleryItem.addEventListener('mouseenter', function() {
                        video.play().catch(e => {
                            console.log('Video hover play prevented:', e.message);
                        });
                    });
                    galleryItem.addEventListener('mouseleave', function() {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            } else {
                // For image items
                galleryItem.innerHTML = `
                    <img src="${item.url}" alt="${item.title}" class="gallery-image" loading="lazy">
                    <div class="gallery-overlay"></div>
                    <div class="gallery-info">
                        <div class="gallery-category">${item.category}</div>
                        <div class="gallery-title">${item.title}</div>
                    </div>
                `;
            }
            
            galleryItem.addEventListener('click', function() {
                openLightbox(item);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
        
        // Reinitialize Lucide icons for dynamically added content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Open lightbox
    function openLightbox(item) {
        // Clear previous media content
        const existingMedia = lightboxContent.querySelector('.lightbox-media');
        if (existingMedia) {
            const video = existingMedia.querySelector('video');
            if (video) {
                video.pause();
                video.src = ''; // Clear source to stop loading
            }
            existingMedia.remove();
        }
        
        // Create media container
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'lightbox-media';
        
        // Create media element
        if (item.type === 'video') {
            mediaContainer.innerHTML = `
                <video controls autoplay preload="auto" style="width: 100%; max-height: 80vh; border-radius: var(--radius-lg);">
                    <source src="${item.url}" type="video/mp4">
                    <source src="${item.url}" type="video/webm">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            mediaContainer.innerHTML = `
                <img src="${item.url}" alt="${item.title}" style="width: 100%; height: auto; border-radius: var(--radius-lg);">
            `;
        }
        
        // Insert media before lightbox-info
        const lightboxInfo = lightboxContent.querySelector('.lightbox-info');
        lightboxContent.insertBefore(mediaContainer, lightboxInfo);
        
        // Update info
        lightboxCategory.textContent = item.category;
        lightboxTitle.textContent = item.title;
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Force video to play after a short delay (helps with autoplay issues)
        if (item.type === 'video') {
            setTimeout(() => {
                const video = mediaContainer.querySelector('video');
                if (video) {
                    video.play().catch(e => {
                        console.log('Autoplay prevented, user interaction required:', e.message);
                    });
                }
            }, 100);
        }
    }
    
    // Close lightbox
    function closeLightbox() {
        // Stop and cleanup video
        const video = lightboxContent.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.src = ''; // Important: clear source to stop loading
        }
        
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