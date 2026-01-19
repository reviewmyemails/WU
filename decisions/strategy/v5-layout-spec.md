# V5 Layout Specification

*Date: January 2026*
*Status: LOCKED*

---

## Philosophy

**Editorial confidence.** The page should feel like opening a well-designed business proposal, not clicking into a SaaS landing page.

**Core principle:** Empty space is content. Restraint signals competence.

---

## Typography

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Scale (Desktop)
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Hero headline | 72px | 600 | 1.0 | -0.03em |
| Section headline | 40px | 600 | 1.15 | -0.02em |
| Body large | 20px | 400 | 1.6 | 0 |
| Body | 17px | 400 | 1.7 | 0 |
| Whisper text | 13px | 400 | 1.5 | 0.02em |
| Pull quote | 32px | 400 | 1.4 | -0.01em |
| CTA button | 16px | 500 | 1 | 0.01em |

### Scale (Mobile < 768px)
| Element | Size |
|---------|------|
| Hero headline | 44px |
| Section headline | 28px |
| Body large | 18px |
| Body | 16px |
| Pull quote | 24px |

---

## Color Palette

```css
--color-dark: #134e4a;      /* Primary text, accents */
--color-text: #1a1a1a;      /* Body text */
--color-muted: #6b7280;     /* Secondary text */
--color-whisper: #9ca3af;   /* Margin notes, subtle elements */
--color-border: #e5e7eb;    /* Lines, separators */
--color-light: #f9fafb;     /* Backgrounds */
--color-white: #ffffff;     /* Page background */
--color-accent: #134e4a;    /* CTAs, links */
```

---

## Grid System

### Desktop (≥1200px)
```
Total width: 1200px max
Left margin: 200px (whisper zone)
Content: 800px
Right margin: 200px (breathing room)

| 200px | 800px | 200px |
| whisper | content | air |
```

### Tablet (768px - 1199px)
```
Total width: 100%
Left margin: 80px
Content: calc(100% - 160px)
Right margin: 80px
```

### Mobile (<768px)
```
Total width: 100%
Left/right padding: 24px
Content: calc(100% - 48px)
Whisper elements: hidden or integrated
```

---

## Vertical Rhythm

### Base Unit
```css
--space-unit: 8px;
```

### Spacing Scale
| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 8px | Inline elements |
| `--space-sm` | 16px | Related elements |
| `--space-md` | 32px | Section sub-gaps |
| `--space-lg` | 64px | Section separators |
| `--space-xl` | 120px | Major section breaks |
| `--space-2xl` | 180px | Hero breathing room |

### Section Rhythm
- Hero → First section: 180px
- Between major sections: 120px
- Within sections: 64px
- Between related paragraphs: 32px

---

## Layout Components

### 1. Asymmetric Hero

**Structure:**
```
|-------- 200px --------|-------- 800px --------|-------- 200px --------|
|                       |                        |                       |
| (whisper zone)        | Headline               | (empty - intentional) |
|                       |                        |                       |
|                       | Subhead                |                       |
|                       |                        |                       |
|                       | CTA                    |                       |
|                       |                        |                       |
```

**Rules:**
- Headline sits in the content column, NOT centered
- Right side stays empty — this is the confidence
- Subhead max-width: 600px (doesn't fill content area)
- Vertical padding: 180px top, 120px bottom
- NO background color, NO images, NO decoration

**Bold push:** Consider pushing headline partially into the left whisper zone on desktop.

---

### 2. Broken Grid Section

**Structure:**
```
Row 1:
|-------- 200px --------|-------- 500px --------|-------- 300px --------|-------- 200px --------|
| whisper label         | Content block 1        | (empty)               |                       |

Row 2:
|-------- 200px --------|-------- 200px --------|-------- 600px --------|-------- 200px --------|
|                       | (empty)                | Content block 2       |                       |

Row 3:
|-------- 200px --------|-------- 400px --------|-------- 400px --------|-------- 200px --------|
|                       | Content block 3        | (empty or small       |                       |
|                       |                        | supporting element)   |                       |
```

**Rules:**
- Content blocks vary in width (400-700px)
- Horizontal offset varies per row (creates diagonal energy)
- Minimum 64px vertical gap between rows
- Left whisper zone can hold section labels
- Never align all blocks to the same edge

**Bold push:** Let one block hang unusually far left or right. Create tension.

---

### 3. Margin Whisper Line

**Structure:**
```
|-------- 200px --------|-------- 800px --------|-------- 200px --------|
|                       |                        |                       |
| small label           | Main content           |                       |
| (rotated -90deg       |                        |                       |
| or horizontal)        |                        |                       |
|                       |                        |                       |
```

**Rules:**
- Font: 13px, color: `--color-whisper`
- Can be horizontal (at top of section) or vertical (running down the side)
- Vertical version: `writing-mode: vertical-rl; transform: rotate(180deg);`
- Content: section labels like "01 — The Problem" or single words like "Clarity"
- Subtle — if you notice it immediately, it's too loud

**Bold push:** One whisper that's a full sentence running vertically.

---

### 4. Pull Quote Interruption

**Structure:**
```
|-------- 200px --------|-------- 800px --------|-------- 200px --------|
|                       |                        |                       |
|                       |    (64px gap)          |                       |
|                       |                        |                       |
| "                     | The question isn't     |                       |
|                       | whether your list has  |                       |
|                       | problems. It's whether |                       |
|                       | you know which ones.   |                       |
|                       |                        |                       |
|                       |    (64px gap)          |                       |
|                       |                        |                       |
```

**Rules:**
- Font: 32px, weight 400, color `--color-dark`
- Max-width: 700px
- Opening quote mark in whisper zone (oversized, faded)
- NOT a testimonial — this is reflective, internal
- Interrupts the reading flow intentionally
- Vertical padding: 64px above and below

**Bold push:** Quote mark in whisper zone at 120px, opacity 0.08.

---

### 5. Editorial Testimonial

**Structure:**
```
|-------- 200px --------|-------- 800px --------|-------- 200px --------|
|                       |                        |                       |
| Name                  | "Full testimonial      |                       |
| Title                 | text runs here as      |                       |
| Location              | flowing prose, not     |                       |
|                       | boxed or carded."      |                       |
|                       |                        |                       |
```

**Rules:**
- NO card background
- NO border
- NO quote icons (except maybe subtle opening mark)
- Attribution sits in the left whisper zone
- Testimonial text flows as body copy
- If multiple testimonials: stack vertically with 120px gap, NOT carousel

**Bold push:** Attribution so far left it almost touches the page edge on desktop.

---

### 6. Quiet CTA Block

**Structure:**
```
|-------- 200px --------|-------- 800px --------|-------- 200px --------|
|                       |                        |                       |
|                       | Ready when you are.    |                       |
|                       |                        |                       |
|                       | [ Get answers ]        |                       |
|                       |                        |                       |
```

**Rules:**
- Simple headline (not "ACT NOW" energy)
- Single button, left-aligned (not centered)
- Button style: solid background, no gradients, no shadows
- Padding: `16px 32px`
- Border-radius: 4px max (subtle, not pill)
- No secondary CTA competing
- Surrounding space: 120px above, 80px below

**Bold push:** Almost no supporting text. Let the button stand alone.

---

## Breakpoint Behavior

### Desktop (≥1200px)
- Full asymmetric layout
- Whisper zone visible
- Broken grid active
- All spacing at full values

### Tablet (768px - 1199px)
- Whisper zone collapses to inline labels
- Grid becomes single-column with varied widths
- Spacing reduced by ~25%
- Pull quote full-width

### Mobile (<768px)
- Single column, centered
- Whisper labels become section headers
- All spacing reduced by ~40%
- Testimonial attribution moves above quote
- Hero headline at 44px

---

## Forbidden Patterns

❌ Centered hero text
❌ Full-width colored sections
❌ Card grids
❌ Icon + text blocks
❌ Wave/curve dividers
❌ Background images
❌ Gradients
❌ Drop shadows
❌ Rounded corners > 8px
❌ Carousels
❌ Sticky headers (during scroll)
❌ Floating action buttons
❌ Badge/pill UI elements
❌ Loading spinners as decoration

---

## Implementation Notes

### CSS Variables Block
```css
:root {
    /* Typography */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

    /* Colors */
    --color-dark: #134e4a;
    --color-text: #1a1a1a;
    --color-muted: #6b7280;
    --color-whisper: #9ca3af;
    --color-border: #e5e7eb;
    --color-light: #f9fafb;
    --color-white: #ffffff;
    --color-accent: #134e4a;

    /* Spacing */
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 32px;
    --space-lg: 64px;
    --space-xl: 120px;
    --space-2xl: 180px;

    /* Layout */
    --content-max: 800px;
    --whisper-width: 200px;
    --page-max: 1200px;
}
```

---

*Locked: January 2026*
