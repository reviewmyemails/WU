# Translation Key Analysis Report
Generated: 2026-01-26

## Summary
- **HTML Keys:** 484 unique keys used across all pages
- **Database Keys:** 529 keys in translation editor sourceStrings
- **Keys in HTML but NOT in DB:** 267 (need mapping or adding)
- **Keys in DB but NOT in HTML:** ~180 (may be renamed or SEO/meta)
- **Keys with Greek translations:** 114 (should preserve these)

**Status:** English still works because HTML contains fallback text. Translations won't apply until keys are aligned.

---

## SECTION 1: Keys That Need Mapping (HTML → Database)

These keys exist in HTML with slightly different names than the database.
**Action:** Update HTML to use database key names to preserve existing Greek translations.

### About Page Mappings
```
HTML Key              →  Database Key
about.p1              →  about.bio_p1
about.p2              →  about.bio_p2
about.p3              →  about.bio_p3
about.p4              →  about.bio_p4
about.p5              →  about.bio_p5
about.p6              →  about.bio_p6
about.founder_title   →  (NEW - add to DB)
about.email_link      →  (NEW - add to DB)
about.team_members    →  (NEW - add to DB)
```

### Audit Page Mappings
```
HTML Key                →  Database Key
audit.sec_automation    →  audit.section_automation
audit.sec_header        →  audit.section_header
audit.sec_tracking      →  audit.section_tracking
audit.sec_engagement    →  audit.section_engagement
audit.sec_layout        →  audit.section_layout
audit.sec_sendtime      →  audit.section_sendtime
audit.sec_esp           →  audit.section_migration
audit.sec_subject       →  audit.section_subject
audit.sec_spam          →  audit.section_spam
audit.sec_validation    →  audit.section_validation
audit.sections_count    →  audit.meta_sections
audit.duration          →  audit.meta_time
audit.personalized_tips →  audit.meta_tips
audit.start_btn         →  audit.start_button
audit.what_cover        →  (NEW - add to DB)
audit.back              →  (NEW - add to DB)
audit.built_by          →  (NEW - add to DB)
audit.get_cleaned       →  (NEW - add to DB)
audit.important         →  (NEW - add to DB)
```

### Homepage Mappings
```
HTML Key                →  Database Key
home.badge              →  home.hero_badge
home.headline1          →  home.hero_headline_1
home.headline2          →  home.hero_headline_2
home.subhead            →  home.hero_subhead
home.bridge             →  home.hero_bridge
home.not_sure           →  home.hero_quiz_prefix
home.quiz_link          →  home.hero_quiz_link
home.symptom1           →  home.symptom_1
home.symptom2           →  home.symptom_2
home.symptom3           →  home.symptom_3
home.symptom4           →  home.symptom_4
home.symptom5           →  home.symptom_5
home.symptom6           →  home.symptom_6
home.symptom7           →  home.symptom_7
home.symptom8           →  home.symptom_8
home.crisis1            →  home.crisis_item_1
home.crisis2            →  home.crisis_item_2
home.crisis3            →  home.crisis_item_3
home.testimonial1_location → home.testimonial1_role
home.testimonial2_location → home.testimonial2_role
home.testimonial3_location → home.testimonial3_role
home.final_cta_title    →  home.final_title
home.final_cta_desc     →  home.final_subtext
home.final_cta_footer   →  home.final_footer
```

### Done-For-You Page Mappings
```
HTML Key                →  Database Key
dfy.headline1           →  dfy.hero_headline (needs split)
dfy.headline2           →  dfy.hero_subtitle
dfy.subhead             →  dfy.hero_subtitle
dfy.keep_title          →  dfy.label_keep_title
dfy.keep_desc           →  dfy.label_keep_desc
dfy.monitor_title       →  dfy.label_monitor_title
dfy.monitor_desc        →  dfy.label_monitor_desc
dfy.suppress_title      →  dfy.label_suppress_title
dfy.suppress_desc       →  dfy.label_suppress_desc
dfy.consult_desc        →  dfy.consult_card_desc
dfy.final_cta_title     →  dfy.cta_title
dfy.final_cta_desc      →  dfy.cta_subtitle
dfy.final_cta_footer    →  dfy.cta_footer
```

### SOS Hotline Page Mappings
```
HTML Key                →  Database Key
sos.headline            →  sos.hero_title
sos.subhead             →  sos.hero_subtitle
sos.pill_*              →  sos.topic_* (various topic pills)
sos.step1_title         →  sos.how_step1_title
sos.step2_title         →  sos.how_step2_title
sos.step3_title         →  sos.how_step3_title
```

### Pricing Page Mappings
```
HTML Key                →  Database Key
pricing.hero_headline1  →  pricing.hero_title (combine)
pricing.hero_headline2  →  pricing.hero_subtitle
pricing.keep_title      →  pricing.output_keep_title
pricing.monitor_title   →  pricing.output_monitor_title
pricing.suppress_title  →  pricing.output_suppress_title
```

### Quiz Page Mappings
```
HTML Key                →  Database Key
quiz.title              →  quiz.diag_title
quiz.q1_text            →  quiz.q1_question
quiz.q1_a1              →  quiz.q1_opt1
quiz.res_*              →  quiz.result_* (various result keys)
```

### Modal/Contact Mappings
```
HTML Key                →  Database Key
modal.title             →  modal.contact_title
modal.subtitle          →  modal.contact_subtitle
modal.name_label        →  modal.form_name
modal.email_label       →  modal.form_email
modal.timezone_label    →  modal.form_timezone
modal.message_label     →  modal.form_message
modal.submit            →  modal.form_submit
modal.name_placeholder  →  (NEW - add to DB)
modal.message_placeholder → modal.form_message_placeholder
modal.tz_select         →  modal.form_timezone_placeholder
modal.tz_et             →  modal.timezone_et
modal.tz_ct             →  modal.timezone_ct
modal.tz_mt             →  modal.timezone_mt
modal.tz_pt             →  modal.timezone_pt
modal.tz_cet            →  modal.timezone_cet
modal.tz_london         →  modal.timezone_london
modal.tz_singapore      →  modal.timezone_singapore
modal.tz_sydney         →  modal.timezone_sydney
modal.tz_alaska         →  modal.timezone_alaska
modal.tz_hawaii         →  modal.timezone_hawaii
modal.tz_eet            →  modal.timezone_eet
modal.tz_gulf           →  modal.timezone_gulf
modal.tz_india          →  modal.timezone_india
modal.tz_japan          →  modal.timezone_japan
modal.tz_nz             →  modal.timezone_nz
```

### UI Keys
```
HTML Key                →  Database Key
ui.sending              →  modal.form_sending
ui.try_again            →  modal.form_try_again
ui.email_placeholder    →  (NEW - add to DB: "your@email.com")
ui.close                →  (NEW - add to DB: "Close")
ui.joining              →  (NEW - add to DB: "Joining...")
ui.menu_open            →  (already in DB)
ui.menu_close           →  (already in DB)
```

---

## SECTION 2: Keys Already Matching (No Changes Needed)

These keys are correctly aligned between HTML and database:

### Navigation & Footer ✓
- `nav.how_it_works`
- `nav.pricing`
- `nav.sos_hotline`
- `nav.about`
- `nav.partner`
- `nav.cta`
- `footer.tagline`
- `footer.services`
- `footer.company`
- `footer.contact`
- `footer.copyright`
- `footer.legal`
- `footer.security`

---

## SECTION 3: New Keys to Add to Database

These keys don't have any equivalent in the database:

### UI/Common Keys
```javascript
{ key: 'ui.close', english: 'Close' },
{ key: 'ui.joining', english: 'Joining...' },
{ key: 'ui.email_placeholder', english: 'your@email.com' },
{ key: 'modal.name_placeholder', english: 'Your name' },
```

### About Page New Keys
```javascript
{ key: 'about.founder_title', english: 'About the Founder' },
{ key: 'about.email_link', english: 'ahoy@reviewmyemails.com' },
{ key: 'about.team_members', english: 'Small, but mighty.' },
```

### Audit Page New Keys
```javascript
{ key: 'audit.what_cover', english: "What we'll cover" },
{ key: 'audit.back', english: 'Back' },
{ key: 'audit.built_by', english: 'Built by' },
{ key: 'audit.get_cleaned', english: 'Get Your List Cleaned' },
{ key: 'audit.important', english: 'Important:' },
{ key: 'audit.next_section', english: 'Next Section' },
```

### Pricing Page New Keys (~50 keys)
Most pricing page keys are new and need to be added to the database.

### Quiz Page New Keys (~80 keys)
Most quiz page result and capture keys are new.

---

## SECTION 4: Recommended Action Plan

### Option A: Fix HTML to Match Database (Recommended)
**Pros:** Preserves 114 existing Greek translations
**Cons:** More work, need to update ~150 key names in HTML

### Option B: Add All New Keys to Database
**Pros:** Faster, less HTML changes
**Cons:** Loses existing Greek translations, need to re-translate

### Option C: Hybrid Approach (Best)
1. Fix HTML keys where Greek translations exist (~50 changes)
2. Add truly new keys to database (~200 keys)
3. Mark new keys as "needs translation"

---

## SECTION 5: Files Affected

| File | Keys to Fix | New Keys Needed | Priority |
|------|-------------|-----------------|----------|
| index.html | ~25 | ~5 | HIGH |
| about.html | ~6 | ~3 | HIGH |
| done-for-you.html | ~15 | ~10 | HIGH |
| pricing.html | ~10 | ~50 | MEDIUM |
| quiz.html | ~5 | ~80 | MEDIUM |
| sos-hotline.html | ~5 | ~30 | MEDIUM |
| partner.html | ~5 | ~15 | LOW |
| audit.html | ~15 | ~10 | LOW |

---

## Quick Test

To verify English still works, the HTML fallback text should display correctly:
```html
<span data-i18n="nav.pricing">Pricing</span>
```
If translation not found, "Pricing" displays. ✓

To verify translations work once aligned:
1. Set language to Greek in localStorage
2. Refresh page
3. Text should change to Greek where translations exist
