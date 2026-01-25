# Translation Document Audit - COMPLETED

## Status: UPDATED 2026-01-25

The translation editor (`translation-editor.html`) has been updated to match the actual English website content.

---

## What Was Done

### 1. Translation Editor Updated
- Replaced all outdated/alternate copy with actual website text
- Added ~50 new strings that were missing
- Organized strings by page and section
- Added Greek translations for all homepage strings

### 2. Created translations.json
- Created `/Users/yt/Documents/GitHub/WU/_internal/translations/translations.json`
- Contains all Greek translations in a flat key-value format
- Includes "do not translate" terms list

---

## Strings Now Included

### Homepage Sections
- META & SEO (title, description, og tags)
- HERO (badge, headline 1 & 2, subhead, CTA, bridge, quiz link)
- SYMPTOMS (title, subtitle, 8 checklist items)
- CRISIS BOX (title, subtitle, 3 items, CTA)
- STEPS (title, subtitle, step 1-3 with numbers/titles/descriptions, whisper text)
- PULL QUOTE (text, author)
- MANIFESTO (text)
- FEATURES (title, 3 features with titles/descriptions)
- QUIZ CTA (title, subtext, button)
- TESTIMONIALS (title, subtitle, 3 testimonials with name/role/quote)
- FINAL CTA (title, subtext, CTA, footer)

### Common Elements
- NAVIGATION (all menu items)
- FOOTER (tagline, services, company, contact, security, copyright, privacy, terms)
- CONTACT MODAL (all form fields and messages)
- LANGUAGE SWITCHER
- UI ELEMENTS
- OG IMAGE TEXT (headline, subhead, tagline)
- EASTER EGG (fish message, coupon, exit button, hint)

---

## Languages

The translation editor supports 6 languages:
1. **GR** - Greek (translations added)
2. **BR** - Portuguese (Brazil) - needs translations
3. **FR** - French - needs translations
4. **ES** - Spanish - needs translations
5. **DE** - German - needs translations
6. **KM** - Khmer - needs translations

---

## Do Not Translate (DNT) Terms

These terms should remain in English across all languages:
- Review My Emails (brand name)
- SOS Hotline
- Keep / Monitor / Suppress (technical labels)
- Validation / Deliverability / Inboxing
- ESP
- DMARC / SPF / DKIM
- RME
- Yanna-Torry (name)
- DEEPDIVE20 (coupon code)

---

## Next Steps

1. User to translate the missing strings for other languages (BR, FR, ES, DE, KM)
2. User to create OG images for each language using the og-image-generator.html tool
3. Apply translations to other language pages as they become available
