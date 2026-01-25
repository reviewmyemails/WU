# RME Component Architecture

Date: 2026-01-16

Status: LOCKED

Purpose: Define reusable components for code rebuild. Architecture only, no visuals.

---

## Design Tokens Reference

### Typography (Inter)

| Element | Desktop | Tablet | Mobile | Weight |
|---------|---------|--------|--------|--------|
| H1 | 56px | 48px | 36px | 700 (Bold) |
| H2 | 36px | 32px | 28px | 700 (Bold) |
| H3 | 28px | 24px | 22px | 600 (Semi-bold) |
| Body | 20px | 18px | 18px | 400 (Regular) |
| Small | 16px | 14px | 14px | 400 (Regular) |
| Button | 18px | 16px | 16px | 600 (Semi-bold) |

**Line heights:**
- Headings: 1.2
- Body: 1.6
- Small: 1.4

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| --color-dark | #182d33 | Text, dark backgrounds |
| --color-accent | #0b93e2 | Buttons, links |
| --color-white | #fafcfc | Light backgrounds, text on dark |
| --color-light | #d4e3f9 | Subtle backgrounds |
| --color-muted | #899598 | Secondary text |
| --color-success | #1fa95c | Keep status |
| --color-warning | #f9943b | Monitor status |
| --color-danger | #f33144 | Suppress status |

### Spacing

| Token | Value |
|-------|-------|
| --space-xs | 8px |
| --space-s | 16px |
| --space-m | 24px |
| --space-l | 48px |
| --space-xl | 80px |
| --space-xxl | 120px |

### Breakpoints

| Token | Value |
|-------|-------|
| --breakpoint-mobile | 767px |
| --breakpoint-tablet | 1199px |
| --breakpoint-desktop | 1200px |

---

## Component Index

1. Header
2. Hero
3. Two-Column Section
4. Card Grid
5. Testimonial Block
6. CTA Block
7. Footer

---

## 1. Header

### Purpose

Global navigation. Appears on every page. Provides primary navigation and main CTA access.

### When to Use

Every page. Always visible at top.

### Structure

```
┌─────────────────────────────────────────────────────┐
│ [Logo]     [Nav Items]              [Primary CTA]   │
└─────────────────────────────────────────────────────┘
```

### Content Slots

| Slot | Content | Required |
|------|---------|----------|
| Logo | RME logo (links to Home) | Yes |
| Nav Items | Text links: Pricing, SOS Hotline | Yes |
| Primary CTA | Button: "Get My List Cleaned" | Yes |

### Rules

- Logo always links to Home
- Maximum 3 nav items (excluding CTA)
- Primary CTA is always a button, not a link
- No dropdowns
- No search bar

### Mobile Behavior

- Logo left, hamburger menu right
- Nav items collapse into hamburger
- Primary CTA moves inside hamburger OR stays visible (sticky bottom bar option)
- Hamburger opens full-screen overlay

### Variants

| Variant | Use Case |
|---------|----------|
| Default | Light background, dark text |
| Inverted | Dark background (hero overlay), light text |

### Props (for code)

```
logo: string (image path)
navItems: Array<{ label: string, href: string }>
ctaLabel: string
ctaHref: string
variant: 'default' | 'inverted'
```

---

## 2. Hero

### Purpose

First impression. Establishes page purpose and primary action. Captures attention without overwhelming.

### When to Use

Top of every primary page (Home, Pricing, SOS, About).

### Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              [Headline]                             │
│              [Subheadline]                          │
│                                                     │
│              [Primary CTA]                          │
│              [Secondary CTA] (optional)             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Content Slots

| Slot | Content | Required |
|------|---------|----------|
| Headline | H1, single line or two lines max | Yes |
| Subheadline | 1-2 sentences, supporting context | Yes |
| Primary CTA | Button | Yes |
| Secondary CTA | Text link with arrow | No |

### Rules

- ONE headline only
- Subheadline must fit in 2 lines on desktop
- Primary CTA always a button
- Secondary CTA always a text link (never a second button)
- No images in hero (keep focus on message)
- No background images (clean, not cluttered)
- Centered alignment

### Mobile Behavior

- Stack vertically
- Reduce headline size (32-40px)
- Subheadline wraps naturally
- CTAs stack (primary above secondary)
- Generous vertical padding maintained

### Variants

| Variant | Use Case |
|---------|----------|
| Default | Light background, dark text |
| Dark | Dark background (#182d33), light text, accent CTA |
| Minimal | No subheadline, just headline + CTA (About page) |

### Props (for code)

```
headline: string
subheadline?: string
primaryCTA: { label: string, href: string }
secondaryCTA?: { label: string, href: string }
variant: 'default' | 'dark' | 'minimal'
alignment: 'center' | 'left'
```

---

## 3. Two-Column Section

### Purpose

Present content with supporting context. Balances information with visual interest.

### When to Use

- "Who This Is For" sections
- "How It Works" explanations
- Content that benefits from structure
- Breaking up long-form content

### Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [Section Header]                                   │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐          │
│  │                 │  │                 │          │
│  │  Content        │  │  Supporting     │          │
│  │  (text, list)   │  │  (image, quote, │          │
│  │                 │  │   or secondary  │          │
│  │                 │  │   content)      │          │
│  └─────────────────┘  └─────────────────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Content Slots

| Slot | Content | Required |
|------|---------|----------|
| Section Header | H2 | Yes |
| Left Column | Text, bullet list, or sub-blocks | Yes |
| Right Column | Supporting content (optional) | No |

### Rules

- Section header always spans full width above columns
- Left column: 60% width (content-heavy)
- Right column: 40% width (supporting)
- If no right column content, use centered single-column instead
- Never put primary CTA in this component (use CTA Block)

### Mobile Behavior

- Columns stack vertically
- Left column content first
- Right column content below
- Full width for both

### Variants

| Variant | Use Case |
|---------|----------|
| Text + Image | Content left, image right |
| Text + Quote | Content left, testimonial right |
| Text + Text | Two equal content blocks |
| Reversed | Supporting content left, main content right |

### Props (for code)

```
header: string
leftContent: ReactNode
rightContent?: ReactNode
variant: 'default' | 'reversed'
backgroundColor: 'light' | 'dark' | 'accent-light'
```

---

## 4. Card Grid

### Purpose

Present multiple equal-weight items. Good for features, benefits, or options.

### When to Use

- "What You Get" outputs
- "What We Help With" list
- Multiple options (done-for-you vs self-serve)
- Feature highlights

### Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [Section Header]                                   │
│  [Section Subheader] (optional)                     │
│                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ [Icon]  │  │ [Icon]  │  │ [Icon]  │             │
│  │ [Title] │  │ [Title] │  │ [Title] │             │
│  │ [Text]  │  │ [Text]  │  │ [Text]  │             │
│  └─────────┘  └─────────┘  └─────────┘             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Content Slots

| Slot | Content | Required |
|------|---------|----------|
| Section Header | H2 | Yes |
| Section Subheader | Supporting text | No |
| Cards | Array of card objects | Yes (min 2, max 4) |

### Card Structure

| Slot | Content | Required |
|------|---------|----------|
| Icon | Simple icon or emoji | No |
| Title | H3 or bold text | Yes |
| Description | Short paragraph (2-3 sentences max) | Yes |
| Link | Optional "Learn more" link | No |

### Rules

- Minimum 2 cards, maximum 4 cards
- All cards must be equal height
- Icons optional but must be consistent (all have icons or none)
- No images in cards (keep simple)
- No buttons in individual cards (use CTA Block below)

### Mobile Behavior

- 3 columns → 2 columns → 1 column
- Cards stack vertically on mobile
- Equal spacing between cards

### Variants

| Variant | Use Case |
|---------|----------|
| With Icons | Feature highlights |
| Without Icons | Text-focused content |
| Highlighted | One card has accent border (recommended option) |

### Props (for code)

```
header: string
subheader?: string
cards: Array<{
  icon?: string
  title: string
  description: string
  link?: { label: string, href: string }
  highlighted?: boolean
}>
columns: 2 | 3 | 4
```

---

## 5. Testimonial Block

### Purpose

Social proof. Builds trust through third-party validation.

### When to Use

- After problem/solution sections
- Before CTA blocks
- On pages where trust is critical (Pricing, SOS)

### Structure

**Single Testimonial:**
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         "[Quote text goes here]"                    │
│                                                     │
│         — Name, Location                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Multiple Testimonials:**
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ "Quote"     │  │ "Quote"     │  │ "Quote"     │ │
│  │ — Name      │  │ — Name      │  │ — Name      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Content Slots

| Slot | Content | Required |
|------|---------|----------|
| Quote | Testimonial text | Yes |
| Name | Client name | Yes |
| Location | City, Country or Title | No |
| Photo | Client photo | No (not using currently) |

### Rules

- Only use testimonials with Permission: Yes from Proof Library
- Quote must be verbatim (no editing)
- Keep quotes under 50 words
- No photos unless high quality and approved
- Light background to differentiate from content sections

### Mobile Behavior

- Single testimonial: full width, centered
- Multiple testimonials: stack vertically or carousel
- No horizontal scrolling (bad UX)

### Variants

| Variant | Use Case |
|---------|----------|
| Single Featured | One large testimonial, high impact |
| Grid | 2-3 testimonials in row |
| Carousel | 3+ testimonials, rotating (optional) |

### Props (for code)

```
testimonials: Array<{
  quote: string
  name: string
  location?: string
  photo?: string
}>
variant: 'single' | 'grid' | 'carousel'
backgroundColor: 'light' | 'accent-light'
```

---

## 6. CTA Block

### Purpose

Drive action. Clear conversion point. Used sparingly for maximum impact.

### When to Use

- End of major page sections
- Bottom of page (before footer)
- After building value/trust

### Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              [Headline]                             │
│              [Supporting text] (optional)           │
│                                                     │
│              [Primary CTA]                          │
│              [Secondary CTA] (optional)             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Content Slots

| Slot | Content | Required |
|------|---------|----------|
| Headline | H2, action-oriented | Yes |
| Supporting Text | 1 sentence max | No |
| Primary CTA | Button | Yes |
| Secondary CTA | Text link | No |

### Rules

- ONE primary CTA only
- Secondary CTA must be visually subordinate (text link, not button)
- Contrasting background to stand out
- Centered alignment
- Generous padding (XL spacing above and below)

### Mobile Behavior

- Full width
- CTAs stack vertically
- Same padding ratios

### Variants

| Variant | Use Case |
|---------|----------|
| Default | Light background, dark text, accent button |
| Dark | Dark background (#182d33), light text, accent button |
| Minimal | No supporting text, just headline + CTA |

### Props (for code)

```
headline: string
supportingText?: string
primaryCTA: { label: string, href: string }
secondaryCTA?: { label: string, href: string }
variant: 'default' | 'dark' | 'minimal'
```

---

## 7. Footer

### Purpose

Secondary navigation. Legal links. Contact information. Consistent across all pages.

### When to Use

Every page. Always at bottom.

### Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [Logo]                                             │
│                                                     │
│  [Nav Column 1]    [Nav Column 2]    [Contact]      │
│  - Link            - Link            Email          │
│  - Link            - Link                           │
│  - Link            - Link                           │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  © 2026 Review My Emails    [Legal Links]           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Content Slots

| Slot | Content | Required |
|------|---------|----------|
| Logo | RME logo (smaller than header) | Yes |
| Nav Columns | Grouped links | Yes |
| Contact | Email address | Yes |
| Copyright | Year + company name | Yes |
| Legal Links | Privacy, Terms | Yes |

### Link Groups

**Column 1: Main**
- Home
- Pricing
- SOS Hotline

**Column 2: More**
- About
- Partner With Us
- Contact

**Legal Row:**
- Privacy Policy
- Terms & Conditions

### Rules

- Dark background (#182d33)
- Light text (#fafcfc)
- No CTA buttons in footer
- Contact email must be clickable (mailto:)
- Keep link count under 10 total

### Mobile Behavior

- Single column, stacked
- Logo at top
- Link groups collapse or stack
- Legal links at very bottom
- Same dark background

### Props (for code)

```
logo: string
navGroups: Array<{
  title?: string
  links: Array<{ label: string, href: string }>
}>
contactEmail: string
legalLinks: Array<{ label: string, href: string }>
copyrightYear: number
companyName: string
```

---

## Component Usage Matrix

| Page | Header | Hero | Two-Column | Card Grid | Testimonial | CTA Block | Footer |
|------|--------|------|------------|-----------|-------------|-----------|--------|
| Home | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pricing | ✓ | ✓ | ✓ | ✓ | - | ✓ | ✓ |
| SOS | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| About | ✓ | ✓ (minimal) | ✓ | - | - | ✓ | ✓ |
| Partner | ✓ | ✓ | ✓ | - | - | ✓ | ✓ |

---

## Implementation Notes

### Component Independence

Each component should:
- Be self-contained
- Accept props for all variable content
- Handle its own responsive behavior
- Not depend on global styles beyond design tokens

### Design Tokens

Extract these as CSS variables or JS constants:
- Colors (from design system)
- Spacing (8px base unit)
- Typography scale
- Border radius (8px default)
- Shadows (minimal, if any)

### Accessibility

Every component must:
- Have proper heading hierarchy
- Include focus states
- Support keyboard navigation
- Meet WCAG AA contrast

---

## Change Log

| Date | Change | Approved By |
|------|--------|-------------|
| 2026-01-16 | Initial component architecture | Founder |

---
