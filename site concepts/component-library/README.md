# Review My Emails - Component Library

A collection of reusable HTML/CSS components extracted from the RME brand design system. Use these to build consistent landing pages.

## Brand Foundation

### Colors
```css
:root {
    --rme-primary: #0C92E1;      /* Primary blue */
    --rme-text-dark: #182C33;    /* Dark text / dark backgrounds */
    --rme-text-light: #3D4F56;   /* Secondary text */
    --rme-bg-light: #D4E2F9;     /* Light blue background */
    --rme-bg-white: #F9FCFC;     /* Off-white background */
    --rme-green: #1fa95c;        /* Success / positive */
    --rme-orange: #f9943b;       /* Warning / attention */
    --rme-red: #f33144;          /* Error / negative */
}
```

### Typography
- **Headings:** Baloo 2 (weight: 600-700)
- **Body:** Raleway (weight: 400-600)
- **Base size:** 18px minimum for body text

### CSS Classes
```css
.bg-rme-primary { background-color: var(--rme-primary); }
.bg-rme-bg-light { background-color: var(--rme-bg-light); }
.bg-rme-text-dark { background-color: var(--rme-text-dark); }
.text-rme-primary { color: var(--rme-primary); }
.text-rme-text-dark { color: var(--rme-text-dark); }
.text-rme-text-light { color: #3D4F56; }
.border-rme-primary { border-color: var(--rme-primary); }
```

---

## Directory Structure

```
component-library/
├── core/
│   ├── base-styles.html      # CSS variables, fonts, base styles
│   └── tailwind-config.html  # Tailwind extensions
├── layouts/
│   ├── header-dark.html      # Dark header with trust strip
│   ├── header-minimal.html   # Minimal header
│   ├── hero-floating-card.html
│   ├── hero-fullscreen.html
│   ├── hero-split.html
│   └── footer-dark.html
├── sections/
│   ├── cta-blue-strip.html   # Blue consultation strip
│   ├── cta-dark-section.html
│   ├── cards-grid-3col.html
│   ├── cards-grid-2col.html
│   ├── timeline-vertical.html
│   ├── features-with-icons.html
│   ├── what-we-never-do.html # Dark section with X icons
│   └── trust-badges.html
├── elements/
│   ├── buttons.html
│   ├── cards.html
│   ├── forms.html
│   ├── icons.html
│   ├── badges.html
│   └── animations.html
└── README.md
```

---

## Page Variations

Each page type has multiple design variations in `/html/{page-type}/`:

### About Page (`/html/about/`)
- `v1-clean.html` - Simple, professional layout
- `v2-animated.html` - Animated sections, gradient hero
- `v3-cards-heavy.html` - Card-based layout
- `v4-minimal.html` - Minimal, text-focused
- `v5-bold.html` - Large typography, strong CTAs

### Form Page (`/html/form/`)
- `v1-standard.html` - Standard form layout
- `v2-guided.html` - Step-by-step guided form
- `v3-compact.html` - Compact single-column

### What to Expect (`/html/what-to-expect/`)
- `v1-standard.html` - Standard checklist style
- `v2-timeline.html` - Timeline-based layout
- `v3-cards.html` - Card-based sections

### Recording Guidelines (`/html/recording-guidelines/`)
- `v1-standard.html` - Standard checklist
- `v2-visual.html` - More visual with icons
- `v3-compact.html` - Compact reference

---

## Usage

1. Copy the base styles from `core/base-styles.html`
2. Choose a layout from `layouts/`
3. Add sections from `sections/`
4. Customize elements from `elements/`

All components use Tailwind CSS + custom RME classes.

---

## Source Reference

Components extracted from:
- `/credit-purchase-system/public/index.html` (main pricing page)
- `/credit-purchase-system/public/security-page.html`
- `/credit-purchase-system/public/success-page.html`
- `/credit-purchase-system/public/headeroptions/*.html`

**Note:** This library is VIEW ONLY from source files. Do not modify credit-purchase-system.
