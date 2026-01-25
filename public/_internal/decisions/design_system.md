# RME Design System

Date: 2026-01-16

Status: LOCKED

Purpose: Define visual architecture for Review My Emails website. Works for both service site and future app. Structure stays, only visual skin may evolve.

---

## Design Philosophy

**Tone:** Grounded editorial. Authority and clarity over decoration.

**What we are NOT:**
- SaaS trends (gradients, floating illustrations, abstract shapes)
- Playful/casual consumer brand
- Cluttered dashboard aesthetic

**What we ARE:**
- Expert service with clear value
- Premium positioning through restraint
- Confidence in simplicity

---

## Typography

### Font Decision

**Status:** LOCKED

**Decision:** Switch to Inter. One font family.

**Rationale:**
- Baloo 2 removed — weakens authority, signals consumer brand
- Raleway removed — too generic and thin for premium positioning
- Inter selected — professional credibility, excellent readability, strong weights, clean multilingual support

**Primary font:** Inter
**Fallback:** system-ui, -apple-system, sans-serif

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, paragraphs |
| 600 | Semi-bold | H3, emphasis, labels |
| 700 | Bold | H1, H2, buttons |

**Weight Rules:**
- No thin weights (300 or below)
- No decorative alternates
- Maximum 2 weights per page (Regular + Bold typical)

### Type Scale

```
H1: 48-56px — Page titles
H2: 32-36px — Section headers
H3: 24-28px — Subsection headers
Body: 18-20px — Content (line-height: 1.6)
Small: 14-16px — Labels, captions
```

### Typography Rules

- Maximum 2 font weights per page
- No ALL CAPS for body text
- Minimum 18px body text
- Generous line height (1.6 for body)
- Left-aligned text (except centered heroes)

---

## Color System

**Status:** LOCKED

**Decision:** Palette B (Bold Teal) — Ocean depth meets expertise.

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| Dark Base | #134e4a | Text, backgrounds, headers, footer |
| Primary Accent | #0d9488 | Buttons, links, key actions |
| White | #fafcfc | Backgrounds, text on dark |
| Light Neutral | #ccfbf1 | Subtle backgrounds, section alternates |
| Mid Neutral | #6b7280 | Secondary text, disabled states |

### Secondary Accent (Use Sparingly)

| Name | Hex | Usage |
|------|-----|-------|
| Warm Amber | #fbbf24 | Highlights, badges, featured tags |

**Secondary accent rules:**
- Maximum 1 use per page
- Never for primary CTAs
- Reserved for drawing attention to specific elements

### Status Colors (Unchanged)

| Name | Hex | Usage |
|------|-----|-------|
| Keep Green | #1fa95c | Success states, "Keep" classification |
| Suppress Red | #f33144 | Error states, "Suppress" classification |
| Monitor Orange | #f9943b | Caution, "Monitor" classification |

### Color Rules

- ONE accent at a time per section
- No rainbow usage
- Buttons = Primary Accent (#0d9488) only
- Dark backgrounds (#134e4a) for emphasis sections only
- Light backgrounds for content-heavy sections
- Teal palette reinforces ocean/octopus brand connection

---

## Spacing System

### Base Unit: 8px

| Token | Value | Usage |
|-------|-------|-------|
| XS | 8px | Between related elements |
| S | 16px | Between list items |
| M | 24px | Between paragraphs |
| L | 48px | Between sections |
| XL | 80px | Between major page zones |
| XXL | 120px | Hero breathing room |

### Spacing Rules

- Consistent vertical rhythm
- Generous whitespace signals premium
- No cramped sections
- Mobile: reduce spacing by ~30%

---

## Layout Grid

### Desktop (1200px+)

- Max content width: 1200px
- Content padding: 80px horizontal
- Column gutter: 24px

### Tablet (768px - 1199px)

- Content padding: 48px horizontal
- Stack two-column layouts

### Mobile (< 768px)

- Content padding: 24px horizontal
- Single column only
- Reduce spacing by 30%

---

## Button Hierarchy

### Primary Button

- Background: #0d9488
- Text: #fafcfc
- Padding: 16px 32px
- Border-radius: 8px
- Used ONCE per viewport
- Example: "Get My List Cleaned"

### Secondary Button

- Background: transparent
- Border: 2px solid #0d9488
- Text: #0d9488
- Same padding/radius as primary
- Example: "Join the Waitlist"

### Tertiary / Link

- Text link with arrow (→)
- Color: #0d9488
- Underline on hover
- Example: "Learn more about SOS →"

### Button Rules

- Maximum 2 buttons visible at once
- Primary always dominant or alone
- No button clusters
- Minimum touch target: 44px

---

## Section Patterns

### Pattern A: Hero
Full-width, centered content, single CTA focus

### Pattern B: Two-Column Split
60/40 or 50/50, content left, supporting element right

### Pattern C: Centered Content
Max-width 720px, centered, for focused reading

### Pattern D: Card Grid
3-column (desktop), 2-column (tablet), 1-column (mobile)

### Pattern E: Testimonial Strip
Full-width, light background, single quote focus

### Pattern F: CTA Block
Centered, contrasting background, single action

---

## Trust Signal Placement

### Placement Hierarchy

1. Above fold: Award badges (small, subtle)
2. After problem section: Social proof
3. Before CTA: Reassurance line
4. Footer: Awards, contact, credentials

### Trust Rules

- Trust signals support, never dominate
- Place near decision points
- Credibility, not persuasion
- No fake urgency or countdown timers

---

## Responsive Behavior

### Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Desktop | 1200px+ | Full layout, max features |
| Tablet | 768px - 1199px | Stack columns, reduce spacing |
| Mobile | < 768px | Single column, touch-optimized |

### Mobile Rules

- Single column layouts
- Larger touch targets (44px minimum)
- Reduced spacing (30% less)
- Sticky header with hamburger menu
- Primary CTA always visible

---

## Imagery

### Photo Rules

- High quality only
- No stock photos with fake smiles
- YT photo: professional, approachable
- No illustrations or abstract graphics
- No mascot (Delphi) in prominent positions

### Icon Rules

- Simple, outlined style
- Consistent stroke weight
- Use sparingly (navigation, lists)
- No decorative icons

---

## Animation

### Rules

- Subtle only
- No distracting motion
- Fade transitions (200-300ms)
- No bounce, slide, or complex easing
- Respect prefers-reduced-motion

---

## Accessibility

### Requirements

- Color contrast: WCAG AA minimum (4.5:1 for text)
- Focus states: visible on all interactive elements
- Alt text: required for all images
- Heading hierarchy: logical (H1 → H2 → H3)
- Touch targets: 44px minimum

---

## Change Log

| Date | Change | Approved By |
|------|--------|-------------|
| 2026-01-16 | Initial system locked | Founder |
| 2026-01-16 | Typography locked: Inter (Regular 400, Semi-bold 600, Bold 700) | Founder |
| 2026-01-16 | Color locked: Palette B (Bold Teal) — #134e4a dark, #0d9488 accent, #fbbf24 secondary | Founder |

---
