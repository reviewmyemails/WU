const https = require('https');

const API_URL = 'https://www.reviewmyemails.com/api/translations';

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
            res.on('error', reject);
        });
    });
}

async function audit() {
    console.log('Fetching all translations...\n');
    const response = await fetch(API_URL);
    const data = response.translations || response;

    const languages = ['en', 'gr', 'br', 'fr', 'es', 'de', 'km', 'ar', 'tr', 'th', 'id', 'vi'];

    // Group translations by key
    const byKey = {};
    for (const t of data) {
        if (!byKey[t.key]) byKey[t.key] = {};
        byKey[t.key][t.language] = t.value;
    }

    // Get English values for reference
    const englishValues = {};
    for (const t of data) {
        if (t.language === 'en') {
            englishValues[t.key] = t.value;
        }
    }

    // Create a reverse lookup: English value -> key(s)
    const valueToKeys = {};
    for (const [key, value] of Object.entries(englishValues)) {
        if (!valueToKeys[value]) valueToKeys[value] = [];
        valueToKeys[value].push(key);
    }

    console.log('=== AUDIT CHECKS ===\n');

    // Check 1: Translations that match a DIFFERENT English key's value
    console.log('1. CROSS-KEY VALUE MATCHES (translation equals wrong English value):');
    console.log('   This catches cases like hero_badge having hero_title value\n');

    let crossKeyIssues = 0;
    for (const [key, translations] of Object.entries(byKey)) {
        const englishValue = englishValues[key];

        for (const [lang, value] of Object.entries(translations)) {
            if (lang === 'en') continue;

            // Check if this translation matches a different English key's value
            const matchingKeys = valueToKeys[value];
            if (matchingKeys && !matchingKeys.includes(key)) {
                console.log('   ⚠️  ' + key + ' [' + lang + ']');
                console.log('      Has: "' + value.substring(0, 60) + (value.length > 60 ? '...' : '') + '"');
                console.log('      This matches English value of: ' + matchingKeys.join(', '));
                const engVal = englishValue || 'N/A';
                console.log('      Expected translation of: "' + engVal.substring(0, 60) + (engVal.length > 60 ? '...' : '') + '"\n');
                crossKeyIssues++;
            }
        }
    }
    if (crossKeyIssues === 0) console.log('   ✅ No cross-key value issues found\n');

    // Check 2: Identical translations across all non-English languages (suspicious)
    console.log('2. UNTRANSLATED STRINGS (same as English in 3+ languages):');
    console.log('   This catches strings that may have been skipped\n');

    let untranslatedIssues = 0;
    for (const [key, translations] of Object.entries(byKey)) {
        const englishValue = englishValues[key];
        if (!englishValue) continue;

        // Skip short values (likely proper nouns, numbers, etc)
        if (englishValue.length < 10) continue;

        const matchingLangs = [];
        for (const lang of languages) {
            if (lang === 'en') continue;
            if (translations[lang] === englishValue) {
                matchingLangs.push(lang);
            }
        }

        if (matchingLangs.length >= 3) {
            console.log('   ⚠️  ' + key);
            console.log('      English: "' + englishValue.substring(0, 60) + (englishValue.length > 60 ? '...' : '') + '"');
            console.log('      Same in: ' + matchingLangs.join(', ') + '\n');
            untranslatedIssues++;
        }
    }
    if (untranslatedIssues === 0) console.log('   ✅ No untranslated strings found\n');

    // Check 3: Inconsistent lengths (translation way shorter/longer than expected)
    console.log('3. LENGTH ANOMALIES (translation <20% or >300% of English length):');
    console.log('   This catches truncated or duplicated content\n');

    let lengthIssues = 0;
    for (const [key, translations] of Object.entries(byKey)) {
        const englishValue = englishValues[key];
        if (!englishValue || englishValue.length < 20) continue;

        for (const [lang, value] of Object.entries(translations)) {
            if (lang === 'en') continue;

            const ratio = value.length / englishValue.length;
            if (ratio < 0.2 || ratio > 3) {
                console.log('   ⚠️  ' + key + ' [' + lang + ']');
                console.log('      English (' + englishValue.length + ' chars): "' + englishValue.substring(0, 50) + '..."');
                console.log('      Translation (' + value.length + ' chars): "' + value.substring(0, 50) + (value.length > 50 ? '...' : '') + '"');
                console.log('      Ratio: ' + (ratio * 100).toFixed(0) + '%\n');
                lengthIssues++;
            }
        }
    }
    if (lengthIssues === 0) console.log('   ✅ No length anomalies found\n');

    // Check 4: Duplicate values within same language (different keys, same translation)
    console.log('4. DUPLICATE TRANSLATIONS (different keys with identical translation):');
    console.log('   This catches copy-paste errors\n');

    let dupeIssues = 0;
    for (const lang of languages) {
        if (lang === 'en') continue;

        const valueToKey = {};
        for (const [key, translations] of Object.entries(byKey)) {
            const value = translations[lang];
            if (!value || value.length < 30) continue; // Skip short values

            if (valueToKey[value] && valueToKey[value] !== key) {
                // Check if English values are also the same (then it's expected)
                const eng1 = englishValues[key];
                const eng2 = englishValues[valueToKey[value]];
                if (eng1 !== eng2) {
                    console.log('   ⚠️  [' + lang + '] Same translation for different keys:');
                    console.log('      Key 1: ' + valueToKey[value]);
                    console.log('      Key 2: ' + key);
                    console.log('      Value: "' + value.substring(0, 60) + (value.length > 60 ? '...' : '') + '"\n');
                    dupeIssues++;
                }
            }
            valueToKey[value] = key;
        }
    }
    if (dupeIssues === 0) console.log('   ✅ No duplicate translation issues found\n');

    // Check 5: Cross-language length comparison (new langs much shorter than established ones)
    console.log('5. CROSS-LANGUAGE LENGTH MISMATCH (ar/tr/th/id/vi much shorter than gr/br/fr/es/de):');
    console.log('   This catches incomplete/simplified translations in newer languages\n');

    const establishedLangs = ['gr', 'br', 'fr', 'es', 'de'];
    const newLangs = ['ar', 'tr', 'th', 'id', 'vi'];
    let crossLangIssues = 0;

    for (const [key, translations] of Object.entries(byKey)) {
        // Get average length of established language translations
        const establishedLengths = establishedLangs
            .map(l => translations[l]?.length || 0)
            .filter(len => len > 0);

        if (establishedLengths.length < 3) continue; // Need at least 3 established translations

        const avgEstablished = establishedLengths.reduce((a, b) => a + b, 0) / establishedLengths.length;
        if (avgEstablished < 30) continue; // Skip short strings

        for (const lang of newLangs) {
            const value = translations[lang];
            if (!value) continue;

            const ratio = value.length / avgEstablished;
            if (ratio < 0.4) { // New lang translation is less than 40% of established average
                console.log('   ⚠️  ' + key + ' [' + lang + ']');
                console.log('      Established avg: ' + Math.round(avgEstablished) + ' chars');
                console.log('      This translation: ' + value.length + ' chars (' + Math.round(ratio * 100) + '%)');
                console.log('      Value: "' + value.substring(0, 50) + (value.length > 50 ? '...' : '') + '"');
                // Show one established example
                const exampleLang = establishedLangs.find(l => translations[l]);
                if (exampleLang) {
                    console.log('      Example [' + exampleLang + ']: "' + translations[exampleLang].substring(0, 50) + '..."\n');
                }
                crossLangIssues++;
            }
        }
    }
    if (crossLangIssues === 0) console.log('   ✅ No cross-language length mismatches found\n');

    // Summary
    const totalIssues = crossKeyIssues + untranslatedIssues + lengthIssues + dupeIssues + crossLangIssues;
    console.log('=== SUMMARY ===');
    console.log('Cross-key value matches: ' + crossKeyIssues);
    console.log('Untranslated strings: ' + untranslatedIssues);
    console.log('Length anomalies: ' + lengthIssues);
    console.log('Duplicate translations: ' + dupeIssues);
    console.log('Cross-language length mismatches: ' + crossLangIssues);
    console.log('Total issues: ' + totalIssues);
}

audit().catch(console.error);
