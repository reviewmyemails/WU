# RME Editorial Layout Specification

Date: 2026-01-17

Status: LOCKED

Purpose: Define the spatial and compositional rules for the editorial design system. No decoration. Pure composition.

---

## Core Principle

**Confidence through restraint. Tension through asymmetry.**

Every layout decision answers: "Does this make the visitor trust us more?"

---

## Grid System

### Base Grid

```
Container max-width: 1200px
Content max-width: 720px (for reading)
Wide max-width: 960px (for mixed content)

Left margin: 120px (desktop) — creates intentional asymmetry
Right margin: Flexible — absorbs remaining space

Mobile: Full-width with 24px padding, left-align maintained
```

### The Asymmetric Principle

Content does NOT center by default. It sits left of center, creating:
- Intentional empty space on the right
- Room for margin notes and whispers
- Editorial magazine feel

```
|----120px----|--------720px content--------|----flex----|
              ^                              ^
         Left anchor                    Breathing room
```

### Column Ratios

| Layout | Left | Right | Use Case |
|--------|------|-------|----------|
| Content | 100% | — | Body text, single column |
| Split | 35% | 65% | Testimonial (name left, quote right) |
| Stagger | Varies | — | Broken grid sections |
| Whisper | 70% | 30% | Content + margin note |

---

## Vertical Rhythm

### Base Unit: 8px

All vertical spacing is a multiple of 8.

### Section Spacing

| Between | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Major sections | 160px | 120px | 80px |
| Sub-sections | 80px | 64px | 48px |
| Content blocks | 48px | 40px | 32px |
| Paragraphs | 24px | 24px | 20px |
| Tight elements | 16px | 16px | 12px |

### The Breathing Rule

After every major statement (headline, pull quote, CTA), add 1.5x normal spacing. Let it breathe before continuing.

---

## Typography Scale (Refined)

### Headlines

| Level | Desktop | Tablet | Mobile | Weight | Line Height |
|-------|---------|--------|--------|--------|-------------|
| Hero H1 | 64px | 48px | 36px | 700 | 1.1 |
| Section H2 | 40px | 32px | 28px | 700 | 1.2 |
| Subsection H3 | 28px | 24px | 22px | 600 | 1.3 |

### Body

| Type | Size | Line Height | Max Width |
|------|------|-------------|-----------|
| Body | 20px | 1.6 | 680px |
| Body small | 17px | 1.6 | 600px |
| Caption/meta | 14px | 1.5 | — |

### Special Typography

| Element | Size | Weight | Style |
|---------|------|--------|-------|
| Pull quote | 32px | 400 | Normal, centered narrow |
| Margin whisper | 15px | 400 | Italic, muted color |
| Testimonial quote | 24px | 400 | Normal |
| Attribution | 14px | 600 | Uppercase, letter-spaced |

---

## Color Usage (Refined)

### The Punctuation Rule

Color is punctuation, not decoration.

| Element | Color | When |
|---------|-------|------|
| Headlines | --color-dark-base | Always |
| Body text | --color-dark-base | Always |
| Secondary text | --color-muted | Captions, meta, attributions |
| Links | --color-accent | Inline links only |
| Buttons | --color-accent bg | Primary CTA only |
| Whispers | --color-accent | Margin notes, interruptions |
| Backgrounds | --color-white | Default |
| Backgrounds | --color-light | Pull quote sections only |

### Accent Frequency

- Maximum ONE teal background section per page
- Maximum ONE teal text whisper per scroll view
- Buttons are always teal (that's their job)
- Never use teal decoratively

---

## Component Specifications

### 1. Hero (Asymmetric)

```
Structure:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌──────────────────────┐                          │
│  │                      │                          │
│  │  [HEADLINE]          │         EMPTY            │
│  │                      │                          │
│  │  [Subhead]           │                          │
│  │                      │                          │
│  │  [Button]            │                          │
│  │                      │                          │
│  └──────────────────────┘                          │
│                                                     │
└─────────────────────────────────────────────────────┘

Specs:
- Top padding: 180px (pushes content down)
- Bottom padding: 120px
- Content width: 600px max
- Left offset: 120px from container edge
- Headline: 64px, bold, dark
- Subhead: 20px, muted, max 480px width
- Button: 24px below subhead
- Right side: Intentionally empty (min 300px on desktop)
```

### 2. Broken Grid Section

```
Structure:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [SECTION TITLE - human, sharp]                    │
│                                                     │
│  ┌────────────────────┐                            │
│  │ Item 1             │                            │
│  │ Short headline     │                            │
│  │ One sentence.      │                            │
│  └────────────────────┘                            │
│                                                     │
│              ┌────────────────────┐                │
│              │ Item 2             │   [whisper     │
│              │ Short headline     │    text in     │
│              │ One sentence.      │    margin]     │
│              └────────────────────┘                │
│                                                     │
│  ┌────────────────────┐                            │
│  │ Item 3             │                            │
│  │ Short headline     │                            │
│  │ One sentence.      │                            │
│  └────────────────────┘                            │
│                                                     │
└─────────────────────────────────────────────────────┘

Specs:
- Item 1: Left-aligned to content edge
- Item 2: Indented 200px from left
- Item 3: Back to left, 40px extra top margin (tension)
- Item width: 480px max each
- Vertical gap: 64px between items
- Whisper: Right margin, aligned with Item 2, 15px italic teal
```

### 3. Pull Quote Interruption

```
Structure:
┌─────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░  ┌──────────────────────────┐  ░░░░░░░░░░░░░│
│░░░░░░░  │                          │  ░░░░░░░░░░░░░│
│░░░░░░░  │  "Quote text here,       │  ░░░░░░░░░░░░░│
│░░░░░░░  │   centered, large"       │  ░░░░░░░░░░░░░│
│░░░░░░░  │                          │  ░░░░░░░░░░░░░│
│░░░░░░░  │       — Name, Title      │  ░░░░░░░░░░░░░│
│░░░░░░░  │                          │  ░░░░░░░░░░░░░│
│░░░░░░░  └──────────────────────────┘  ░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────────┘
(░ = light teal background)

Specs:
- Full-width light background
- Vertical padding: 120px top and bottom
- Content width: 560px max, centered
- Quote: 32px, normal weight, dark, centered
- Attribution: 14px, muted, centered, 32px below quote
- No quotation marks (the layout IS the quote)
```

### 4. Editorial Testimonial

```
Structure:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  SARAH M.              "The report showed me       │
│  Marketing Director     exactly what was wrong     │
│  Acme Corp              with my list. No other     │
│                         service has done that."    │
│                                                     │
│  ───────────────────────────────────────────────   │
│                                                     │
│  JAMES T.              "I used to guess which      │
│  Founder                emails to keep. Now I      │
│  StartupCo              know."                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Specs:
- Two-column layout: 30% / 70%
- Left column: Name (14px, 600, uppercase), Title (14px, muted), Company (14px, muted)
- Right column: Quote (24px, normal weight)
- Divider: 1px line, muted color, 80% width, 48px vertical margin
- No photos unless specifically approved
- No cards, no backgrounds, no borders
```

### 5. Quiet CTA Block

```
Structure:
┌─────────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│                                                     │
│              Ready when you are.                   │
│                                                     │
│              [ Get My List Cleaned ]               │
│                                                     │
│         Most lists returned within 24 hours.       │
│                                                     │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Specs:
- White background (same as page)
- Vertical padding: 120px
- All content centered
- Headline: 28px, normal weight, dark
- Button: Standard primary, 32px below headline
- Subtext: 15px, muted, 24px below button
- No background change, no border, no decoration
- The emptiness IS the design
```

---

## Breakpoint Behavior

### Desktop (1200px+)
- Full asymmetric layout
- 120px left margin
- Broken grid active
- Side whispers visible

### Tablet (768px - 1199px)
- Reduced left margin (60px)
- Broken grid simplified (less indent)
- Whispers move inline (above or below content)
- Maintain asymmetry where possible

### Mobile (< 768px)
- Full-width with 24px padding
- Single column, left-aligned
- Broken grid becomes vertical stack
- Whispers become inline callouts
- Maintain generous vertical spacing

---

## Anti-Patterns (Never Do)

| Pattern | Why It's Wrong |
|---------|----------------|
| Centered everything | Looks like a template |
| Cards with shadows | SaaS aesthetic |
| Icon grids | Decoration, not design |
| Gradient backgrounds | Trendy, not editorial |
| Wave dividers | Theme, not composition |
| Carousels | Lazy, hides content |
| Testimonial cards | Generic, not credible |
| "Get Started Free!" urgency | Desperate, not confident |
| Decorative illustrations | Fills space, adds nothing |
| Multiple CTAs per section | Confusing, dilutes action |

---

## Quality Checklist

Before any section ships:

- [ ] Is the empty space intentional?
- [ ] Could I remove any element without losing meaning?
- [ ] Is there exactly ONE focal point?
- [ ] Does it feel calm, not busy?
- [ ] Would this work in a print magazine?
- [ ] Is the hierarchy immediately clear?
- [ ] Am I using color as punctuation, not decoration?

---

## Change Log

| Date | Change | Approved By |
|------|--------|-------------|
| 2026-01-17 | Initial editorial spec locked | Founder |
