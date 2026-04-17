document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });
    }

    // 2. Lightbox Core Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const closeBtn = document.getElementById('close-lightbox');

    // Select all images and future iframes in the projects section
    const mediaElements = document.querySelectorAll('#projects img, #projects iframe');

    mediaElements.forEach(el => {
        // Ensure the CSS hover class is present
        el.classList.add('project-media');
        
        el.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop background click from firing immediately
            lightboxContent.innerHTML = ''; // Clear previous content
            
            let clone;
            if (el.tagName === 'IMG') {
                clone = document.createElement('img');
                clone.src = el.src;
                clone.className = 'max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border-2 border-white/10';
            } else if (el.tagName === 'IFRAME') {
                clone = el.cloneNode(true);
                clone.className = 'w-full aspect-video max-w-5xl rounded-lg shadow-2xl';
            }

            lightboxContent.appendChild(clone);
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Stop background scroll
        });
    });

    // Close Functions
    const hideLightbox = () => {
        lightbox.classList.add('hidden');
        lightboxContent.innerHTML = ''; 
        document.body.style.overflow = 'auto'; // Re-enable scroll
    };

    if (closeBtn) closeBtn.addEventListener('click', hideLightbox);
    if (lightbox) lightbox.addEventListener('click', hideLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideLightbox();
    });

    // 3. Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});