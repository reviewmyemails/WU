const https = require('https');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://www.reviewmyemails.com/api/translations';

function pushTranslations(translations) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ translations });

        const options = {
            hostname: 'www.reviewmyemails.com',
            port: 443,
            path: '/api/translations',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve({ raw: body });
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function processBatch(batchFile) {
    console.log('\n📦 Processing: ' + batchFile);

    const batchPath = path.join(__dirname, '../public/_internal/translations', batchFile);
    const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

    console.log('   ' + batch.description);

    // Flatten all fixes into a single array
    const allFixes = [];
    for (const item of batch.translations) {
        for (const fix of item.fixes) {
            allFixes.push({
                key: item.key,
                page: item.page,
                language: fix.language,
                value: fix.value
            });
        }
    }

    console.log('   Pushing ' + allFixes.length + ' translations...');

    const result = await pushTranslations(allFixes);
    console.log('   Result: ' + JSON.stringify(result));

    // Update batch status
    batch.status = 'completed';
    batch.pushedAt = new Date().toISOString();
    batch.result = result;
    fs.writeFileSync(batchPath, JSON.stringify(batch, null, 2));

    return allFixes.length;
}

async function main() {
    console.log('=== PUSHING TRANSLATION FIXES ===');

    const batches = ['fix-batch-1.json', 'fix-batch-2.json', 'fix-batch-3.json'];
    let totalFixed = 0;

    for (const batch of batches) {
        const count = await processBatch(batch);
        totalFixed += count;
    }

    console.log('\n=== COMPLETE ===');
    console.log('Total translations fixed: ' + totalFixed);
}

main().catch(console.error);
