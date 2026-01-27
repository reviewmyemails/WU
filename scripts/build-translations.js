#!/usr/bin/env node
/**
 * Build Translated HTML Files
 *
 * This script generates static HTML files for each language by:
 * 1. Reading English HTML templates from /public/*.html
 * 2. Fetching translations from the API
 * 3. Replacing data-i18n content with translated text
 * 4. Writing to language folders (/public/gr/, /public/br/, etc.)
 *
 * Usage: node scripts/build-translations.js [language]
 * Examples:
 *   node scripts/build-translations.js        # Build all languages
 *   node scripts/build-translations.js br     # Build only Brazilian Portuguese
 *   node scripts/build-translations.js ar     # Build only Arabic
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    apiUrl: 'https://www.reviewmyemails.com/api/translations',
    publicDir: path.join(__dirname, '..', 'public'),
    languages: {
        gr: { code: 'el', name: 'Greek', dir: 'ltr' },
        br: { code: 'pt-BR', name: 'Brazilian Portuguese', dir: 'ltr' },
        fr: { code: 'fr', name: 'French', dir: 'ltr' },
        es: { code: 'es', name: 'Spanish', dir: 'ltr' },
        de: { code: 'de', name: 'German', dir: 'ltr' },
        km: { code: 'km', name: 'Khmer', dir: 'ltr' },
        ar: { code: 'ar', name: 'Arabic', dir: 'rtl' },
        tr: { code: 'tr', name: 'Turkish', dir: 'ltr' },
        th: { code: 'th', name: 'Thai', dir: 'ltr' },
        id: { code: 'id', name: 'Indonesian', dir: 'ltr' },
        vi: { code: 'vi', name: 'Vietnamese', dir: 'ltr' }
    },
    // HTML files to translate
    htmlFiles: [
        'index.html',
        'about.html',
        'pricing.html',
        'done-for-you.html',
        'sos-hotline.html',
        'partner.html',
        'quiz.html',
        'audit.html'
    ]
};

// Fetch translations from API
async function fetchTranslations(lang) {
    console.log(`  Fetching translations for ${lang}...`);

    try {
        const response = await fetch(`${CONFIG.apiUrl}?lang=${lang}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const translations = {};

        // Transform array to key-value object, filtering by language
        const arr = data.translations || data;
        if (Array.isArray(arr)) {
            arr.forEach(t => {
                // Only include translations for the requested language
                if (t.key && t.value && t.language === lang) {
                    translations[t.key] = t.value;
                }
            });
        }

        console.log(`  Found ${Object.keys(translations).length} translations`);
        return translations;
    } catch (error) {
        console.error(`  Error fetching translations: ${error.message}`);
        return {};
    }
}

// Replace data-i18n content in HTML
function applyTranslations(html, translations, langConfig) {
    let result = html;

    // Update <html lang="...">
    result = result.replace(/<html\s+lang="[^"]*"/, `<html lang="${langConfig.code}"`);

    // Add RTL direction for Arabic
    if (langConfig.dir === 'rtl') {
        result = result.replace(/<html\s+lang="([^"]*)"/, `<html lang="$1" dir="rtl"`);
    }

    // Replace data-i18n text content
    // Matches: <tag data-i18n="key">text</tag> or <tag data-i18n="key" ...>text</tag>
    result = result.replace(
        /(<[^>]+data-i18n="([^"]+)"[^>]*>)([^<]*)(<\/[^>]+>)/g,
        (match, openTag, key, originalText, closeTag) => {
            const translation = translations[key];
            if (translation) {
                return `${openTag}${translation}${closeTag}`;
            }
            return match; // Keep original if no translation
        }
    );

    // Handle self-closing or empty tags with data-i18n
    // e.g., <span data-i18n="key"></span>
    result = result.replace(
        /(<[^>]+data-i18n="([^"]+)"[^>]*>)(<\/[^>]+>)/g,
        (match, openTag, key, closeTag) => {
            const translation = translations[key];
            if (translation) {
                return `${openTag}${translation}${closeTag}`;
            }
            return match;
        }
    );

    // Replace data-i18n-placeholder
    result = result.replace(
        /placeholder="([^"]*)"\s*data-i18n-placeholder="([^"]*)"/g,
        (match, originalPlaceholder, key) => {
            const translation = translations[key];
            if (translation) {
                return `placeholder="${translation}" data-i18n-placeholder="${key}"`;
            }
            return match;
        }
    );

    // Also handle reverse order
    result = result.replace(
        /data-i18n-placeholder="([^"]*)"\s*placeholder="([^"]*)"/g,
        (match, key, originalPlaceholder) => {
            const translation = translations[key];
            if (translation) {
                return `data-i18n-placeholder="${key}" placeholder="${translation}"`;
            }
            return match;
        }
    );

    // Update meta title
    const titleKey = 'home.title';
    if (translations[titleKey]) {
        result = result.replace(
            /<title>[^<]*<\/title>/,
            `<title>${translations[titleKey]}</title>`
        );
    }

    // Update meta description
    const descKey = 'home.meta_desc';
    if (translations[descKey]) {
        result = result.replace(
            /<meta\s+name="description"\s+content="[^"]*"/,
            `<meta name="description" content="${translations[descKey].replace(/"/g, '&quot;')}"`
        );
    }

    // Update canonical URL to point to language version
    result = result.replace(
        /<link\s+rel="canonical"\s+href="https:\/\/reviewmyemails\.com\/"/,
        `<link rel="canonical" href="https://reviewmyemails.com/${langConfig.code === 'el' ? 'gr' : langConfig.code}/"`
    );

    // Fix relative paths for assets (../ instead of ./)
    result = result.replace(/href="\.\/assets/g, 'href="../assets');
    result = result.replace(/src="\.\/assets/g, 'src="../assets');
    result = result.replace(/href="assets/g, 'href="../assets');
    result = result.replace(/src="assets/g, 'src="../assets');

    // Fix links to other pages (should stay within language folder)
    result = result.replace(/href="index\.html"/g, 'href="index.html"');
    result = result.replace(/href="about\.html"/g, 'href="about.html"');
    result = result.replace(/href="pricing\.html"/g, 'href="pricing.html"');
    result = result.replace(/href="done-for-you\.html"/g, 'href="done-for-you.html"');
    result = result.replace(/href="sos-hotline\.html"/g, 'href="sos-hotline.html"');
    result = result.replace(/href="partner\.html"/g, 'href="partner.html"');
    result = result.replace(/href="quiz\.html"/g, 'href="quiz.html"');

    return result;
}

// Build translations for a single language
async function buildLanguage(lang) {
    const langConfig = CONFIG.languages[lang];
    if (!langConfig) {
        console.error(`Unknown language: ${lang}`);
        return false;
    }

    console.log(`\nBuilding ${langConfig.name} (${lang})...`);

    // Fetch translations
    const translations = await fetchTranslations(lang);
    if (Object.keys(translations).length === 0) {
        console.log(`  Skipping - no translations found`);
        return false;
    }

    // Create language directory if needed
    const langDir = path.join(CONFIG.publicDir, lang);
    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
        console.log(`  Created directory: ${langDir}`);
    }

    // Process each HTML file
    let filesBuilt = 0;
    for (const htmlFile of CONFIG.htmlFiles) {
        const sourcePath = path.join(CONFIG.publicDir, htmlFile);
        const destPath = path.join(langDir, htmlFile);

        if (!fs.existsSync(sourcePath)) {
            console.log(`  Skipping ${htmlFile} - source not found`);
            continue;
        }

        // Read source HTML
        const sourceHtml = fs.readFileSync(sourcePath, 'utf-8');

        // Apply translations
        const translatedHtml = applyTranslations(sourceHtml, translations, langConfig);

        // Write translated HTML
        fs.writeFileSync(destPath, translatedHtml, 'utf-8');
        filesBuilt++;
    }

    console.log(`  Built ${filesBuilt} HTML files`);
    return true;
}

// Main function
async function main() {
    console.log('='.repeat(50));
    console.log('Building Translated HTML Files');
    console.log('='.repeat(50));

    const args = process.argv.slice(2);

    if (args.length > 0) {
        // Build specific language(s)
        for (const lang of args) {
            await buildLanguage(lang);
        }
    } else {
        // Build all languages
        for (const lang of Object.keys(CONFIG.languages)) {
            await buildLanguage(lang);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('Build complete!');
    console.log('='.repeat(50));
}

main().catch(console.error);
