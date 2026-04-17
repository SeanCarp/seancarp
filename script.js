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

    // 2. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const closeBtn = document.getElementById('close-lightbox');

    // Select all project media
    const mediaElements = document.querySelectorAll('.project-media');

    mediaElements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents background click issues
            lightboxContent.innerHTML = '';
            
            let content;
            if (el.tagName === 'IMG') {
                content = document.createElement('img');
                content.src = el.src;
                content.className = 'max-w-full max-h-[85vh] object-contain rounded shadow-2xl';
            } else if (el.tagName === 'IFRAME') {
                content = el.cloneNode(true);
                content.className = 'w-full aspect-video max-w-4xl rounded shadow-2xl';
            }

            lightboxContent.appendChild(content);
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    });

    // Close Lightbox functions
    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    if (closeBtn) closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    if (lightbox) lightbox.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});