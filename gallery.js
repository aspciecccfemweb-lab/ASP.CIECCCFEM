/* ============================================
   CIECCCFEM - GALLERY JAVASCRIPT
   ============================================ */

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInScale 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentImageIndex = 0;
let visibleItems = [];

function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => 
        item.style.display !== 'none'
    );
}

function openLightbox(btn) {
    updateVisibleItems();

    const galleryItem = btn.closest('.gallery-item');
    currentImageIndex = visibleItems.indexOf(galleryItem);

    const img = galleryItem.querySelector('img');
    const caption = galleryItem.querySelector('h4').textContent;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    updateVisibleItems();

    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = visibleItems.length - 1;
    } else if (currentImageIndex >= visibleItems.length) {
        currentImageIndex = 0;
    }

    const item = visibleItems[currentImageIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('h4').textContent;

    // Fade effect
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = caption;
        lightboxImage.style.opacity = '1';
    }, 200);
}

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});
