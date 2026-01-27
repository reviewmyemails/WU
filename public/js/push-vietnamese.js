const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'vietnamese.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

function parseCSV(text) {
    const lines = text.split('\n');
    const headers = parseCSVLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = parseCSVLine(lines[i]);
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            rows.push(row);
        }
    }
    return rows;
}

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

const translations = parseCSV(csvContent);

const apiPayload = translations.map(row => ({
    key: row.Key,
    page: row.Page,
    language: 'vi',
    value: row.Vietnamese
})).filter(t => t.value && t.value.trim() !== '');

console.log(`Found ${apiPayload.length} Vietnamese translations to push`);
console.log('Sample:', JSON.stringify(apiPayload[0], null, 2));

async function pushTranslations() {
    const API_URL = 'https://www.reviewmyemails.com/api/translations';
    console.log(`\nPushing ${apiPayload.length} translations to ${API_URL}...`);
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ translations: apiPayload })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        const result = await response.json();
        console.log('Success!', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

pushTranslations();
