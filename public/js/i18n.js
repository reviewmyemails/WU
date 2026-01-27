/**
 * Internationalization (i18n) Translation Loader
 *
 * This script handles loading and applying translations to pages.
 * Elements with data-i18n="key" attributes will have their text replaced.
 * Elements with data-i18n-placeholder="key" will have placeholder replaced.
 * Elements with data-i18n-aria="key" will have aria-label replaced.
 *
 * Usage: Add <script src="/js/i18n.js"></script> before </body>
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        apiUrl: '/api/translations',
        defaultLang: 'en',
        storageKey: 'rme_language',
        cacheKey: 'rme_translations_cache',
        cacheDuration: 5 * 60 * 1000 // 5 minutes
    };

    // Get current language from localStorage or browser
    function getCurrentLanguage() {
        const stored = localStorage.getItem(CONFIG.storageKey);
        if (stored) return stored;

        // Check browser language
        const browserLang = navigator.language.slice(0, 2);
        const supported = ['en', 'gr', 'br', 'fr', 'es', 'de', 'km'];
        return supported.includes(browserLang) ? browserLang : CONFIG.defaultLang;
    }

    // Set language
    function setLanguage(lang) {
        localStorage.setItem(CONFIG.storageKey, lang);
        applyTranslations(lang);
    }

    // Fetch translations from API
    async function fetchTranslations(lang) {
        if (lang === 'en') return null; // English is the default, no fetch needed

        // Check cache first
        const cacheData = sessionStorage.getItem(CONFIG.cacheKey + '_' + lang);
        if (cacheData) {
            const cached = JSON.parse(cacheData);
            if (Date.now() - cached.timestamp < CONFIG.cacheDuration) {
                return cached.translations;
            }
        }

        try {
            const response = await fetch(`${CONFIG.apiUrl}?lang=${lang}`);
            if (!response.ok) throw new Error('Failed to fetch translations');

            const data = await response.json();

            // Transform array response to key-value object
            const translationsObj = {};
            const translationsArray = data.translations || data;
            if (Array.isArray(translationsArray)) {
                translationsArray.forEach(t => {
                    if (t.key && t.value) {
                        translationsObj[t.key] = t.value;
                    }
                });
            }

            // Cache the translations
            sessionStorage.setItem(CONFIG.cacheKey + '_' + lang, JSON.stringify({
                timestamp: Date.now(),
                translations: translationsObj
            }));

            return translationsObj;
        } catch (error) {
            console.warn('Translation fetch failed:', error);
            return null;
        }
    }

    // Apply translations to the page
    async function applyTranslations(lang) {
        if (lang === 'en') {
            // Reset to English (original text is already in HTML)
            document.querySelectorAll('[data-i18n]').forEach(el => {
                if (el.dataset.i18nOriginal) {
                    el.textContent = el.dataset.i18nOriginal;
                }
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                if (el.dataset.i18nOriginalPlaceholder) {
                    el.placeholder = el.dataset.i18nOriginalPlaceholder;
                }
            });
            document.documentElement.lang = 'en';
            return;
        }

        const translations = await fetchTranslations(lang);
        if (!translations) return;

        // Apply text content translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;

            // Store original text on first run
            if (!el.dataset.i18nOriginal) {
                el.dataset.i18nOriginal = el.textContent;
            }

            // Apply translation if exists
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        // Apply placeholder translations
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;

            if (!el.dataset.i18nOriginalPlaceholder) {
                el.dataset.i18nOriginalPlaceholder = el.placeholder;
            }

            if (translations[key]) {
                el.placeholder = translations[key];
            }
        });

        // Apply aria-label translations
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;

            if (!el.dataset.i18nOriginalAria) {
                el.dataset.i18nOriginalAria = el.getAttribute('aria-label');
            }

            if (translations[key]) {
                el.setAttribute('aria-label', translations[key]);
            }
        });

        // Apply title attribute translations
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;

            if (!el.dataset.i18nOriginalTitle) {
                el.dataset.i18nOriginalTitle = el.title;
            }

            if (translations[key]) {
                el.title = translations[key];
            }
        });

        // Update HTML lang attribute
        const langMap = { gr: 'el', br: 'pt-BR', fr: 'fr', es: 'es', de: 'de', km: 'km' };
        document.documentElement.lang = langMap[lang] || lang;
    }

    // Initialize on DOM ready
    function init() {
        const lang = getCurrentLanguage();
        if (lang !== 'en') {
            applyTranslations(lang);
        }

        // Expose API for language switcher
        window.RMEi18n = {
            getCurrentLanguage,
            setLanguage,
            applyTranslations
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
