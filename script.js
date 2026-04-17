document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
    });

    // 2. Footer Year
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 3. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const closeBtn = document.getElementById('close-lightbox');

    // Select all images and future iframes within the projects section
    const targets = document.querySelectorAll('#projects img, #projects iframe');

    targets.forEach(el => {
        el.classList.add('project-media');
        
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxContent.innerHTML = ''; // Clear previous
            
            let clone;
            if (el.tagName === 'IMG') {
                clone = document.createElement('img');
                clone.src = el.src;
                clone.className = 'max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl';
            } else if (el.tagName === 'IFRAME') {
                clone = el.cloneNode(true);
                clone.className = 'w-full aspect-video max-w-5xl rounded-lg shadow-2xl';
            }

            lightboxContent.appendChild(clone);
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Functions to close Lightbox
    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        lightboxContent.innerHTML = ''; 
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', closeLightbox); // Close when clicking background
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});