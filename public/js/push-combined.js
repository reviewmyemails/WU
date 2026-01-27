const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'missing combined.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

// Parse combined CSV with multiple language sections
function parseCombinedCSV(text) {
    const lines = text.split('\n');
    const allTranslations = [];
    let currentLang = null;
    let langColumn = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = parseCSVLine(line);

        // Check if this is a header row (starts with "Key,Page,English")
        if (values[0] === 'Key' && values[1] === 'Page' && values[2] === 'English') {
            // Detect language from 4th column header
            const langHeader = values[3];
            if (langHeader) {
                const langMap = {
                    'Arabic': 'ar',
                    'Indonesian': 'id',
                    'Khmer': 'km',
                    'Thai': 'th',
                    'Turkish': 'tr',
                    'Vietnamese': 'vi'
                };
                currentLang = langMap[langHeader] || langHeader.toLowerCase();
                langColumn = 3;
                console.log(`Found section: ${langHeader} (${currentLang})`);
            }
            continue;
        }

        // Regular data row
        if (currentLang && values[0] && values[langColumn]) {
            const translation = values[langColumn].trim();
            if (translation) {
                allTranslations.push({
                    key: values[0],
                    page: values[1] || '',
                    language: currentLang,
                    value: translation
                });
            }
        }
    }

    return allTranslations;
}

const translations = parseCombinedCSV(csvContent);

// Group by language for summary
const byLang = {};
translations.forEach(t => {
    byLang[t.language] = (byLang[t.language] || 0) + 1;
});

console.log('\nTranslations found:');
Object.entries(byLang).forEach(([lang, count]) => {
    console.log(`  ${lang}: ${count}`);
});
console.log(`  Total: ${translations.length}`);

async function pushTranslations() {
    const API_URL = 'https://www.reviewmyemails.com/api/translations';
    console.log(`\nPushing ${translations.length} translations to ${API_URL}...`);
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ translations })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        const result = await response.json();
        console.log('Success!', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

pushTranslations();
