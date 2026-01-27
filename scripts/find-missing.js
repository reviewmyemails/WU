const fs = require('fs');
const path = require('path');

async function findMissing() {
    const API_URL = 'https://www.reviewmyemails.com/api/translations';

    console.log('Fetching all translations from API...');
    const response = await fetch(API_URL);
    const data = await response.json();
    const arr = data.translations || data;

    // Get all unique keys (from English/existing translations)
    const allKeys = new Set();
    const langKeys = {
        ar: new Set(),
        tr: new Set(),
        th: new Set(),
        id: new Set(),
        vi: new Set(),
        km: new Set(),
        gr: new Set(),
        br: new Set(),
        fr: new Set(),
        es: new Set(),
        de: new Set()
    };

    arr.forEach(t => {
        allKeys.add(t.key);
        if (langKeys[t.language]) {
            langKeys[t.language].add(t.key);
        }
    });

    console.log(`\nTotal unique keys: ${allKeys.size}`);

    // Find missing per language
    const report = {};
    const newLangs = ['ar', 'tr', 'th', 'id', 'vi', 'km'];

    newLangs.forEach(lang => {
        const missing = [...allKeys].filter(k => !langKeys[lang].has(k));
        report[lang] = {
            total: allKeys.size,
            translated: langKeys[lang].size,
            missing: missing.length,
            missingKeys: missing
        };
        console.log(`${lang.toUpperCase()}: ${langKeys[lang].size}/${allKeys.size} (${missing.length} missing)`);
    });

    // Write missing keys to file
    const outputPath = path.join(__dirname, '..', 'public', '_internal', 'translations', 'missing-translations.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`\nMissing keys saved to: ${outputPath}`);

    // Load English strings from translation editor
    const editorPath = path.join(__dirname, '..', 'public', '_internal', 'translations', 'translation-editor.html');
    const editorContent = fs.readFileSync(editorPath, 'utf-8');

    // Extract English text from sourceStrings - match both single and double quotes
    const englishMap = {};
    const sourceStrings = editorContent.match(/\{ page:[\s\S]*?translations:[\s\S]*?\} \}/g) || [];
    sourceStrings.forEach(block => {
        const keyMatch = block.match(/key:\s*'([^']+)'/);
        const englishMatch = block.match(/english:\s*'([^']*)'/) || block.match(/english:\s*"([^"]*)"/);
        if (keyMatch && englishMatch) {
            englishMap[keyMatch[1]] = englishMatch[1];
        }
    });

    console.log(`Loaded ${Object.keys(englishMap).length} English strings from editor`);

    // Create one combined CSV file with all languages separated by header rows
    const langNames = {
        ar: 'Arabic',
        tr: 'Turkish',
        th: 'Thai',
        id: 'Indonesian',
        vi: 'Vietnamese',
        km: 'Khmer'
    };

    const combinedLines = [];

    for (const lang of newLangs) {
        if (report[lang].missingKeys.length > 0) {
            // Add header row for this language
            combinedLines.push(`Key,Page,English,${langNames[lang]}`);

            // Add data rows
            report[lang].missingKeys.forEach(key => {
                const entry = arr.find(t => t.key === key);
                const page = entry?.page || '';
                const english = englishMap[key] || '';
                // Escape commas and quotes in English text for CSV
                const escapedEnglish = english.includes(',') || english.includes('"')
                    ? `"${english.replace(/"/g, '""')}"`
                    : english;
                combinedLines.push(`${key},${page},${escapedEnglish},`);
            });
        }
    }

    const combinedPath = path.join(__dirname, '..', 'public', '_internal', 'translations', 'missing-all.csv');
    fs.writeFileSync(combinedPath, combinedLines.join('\n'));
    console.log(`\nCreated: missing-all.csv (combined file with all languages)`);
}

findMissing().catch(console.error);
