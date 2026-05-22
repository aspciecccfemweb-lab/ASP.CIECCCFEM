/* ============================================
   CIECCCFEM - LANGUAGE SWITCHER
   ============================================ */

let currentLanguage = localStorage.getItem('ciecccfem-lang') || 'es';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    localStorage.setItem('ciecccfem-lang', currentLanguage);
    applyLanguage();
    updateLangButton();
}

function applyLanguage() {
    const elements = document.querySelectorAll('[data-es][data-en]');

    elements.forEach(el => {
        const text = el.getAttribute('data-' + currentLanguage);
        if (text) {
            // Check if element has child elements (like icons)
            if (el.children.length > 0 && el.tagName !== 'OPTION') {
                // Find text nodes and update them
                const textNodes = Array.from(el.childNodes).filter(
                    node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
                );
                if (textNodes.length > 0) {
                    textNodes[0].textContent = ' ' + text + ' ';
                } else {
                    // If no text node found, check for specific structure
                    const span = el.querySelector('span');
                    if (span && span.hasAttribute('data-es')) {
                        // Already handled by the span itself
                    }
                }
            } else if (el.tagName === 'OPTION') {
                el.textContent = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Update page title if data attributes exist
    const titleEl = document.querySelector('title[data-es][data-en]');
    if (titleEl) {
        document.title = titleEl.getAttribute('data-' + currentLanguage);
    }
}

function updateLangButton() {
    const langBtn = document.getElementById('currentLang');
    if (langBtn) {
        langBtn.textContent = currentLanguage.toUpperCase();
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage();
    updateLangButton();
});
