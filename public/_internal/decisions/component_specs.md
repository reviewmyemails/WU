# RME Component Specifications

Date: 2026-01-16

Status: READY FOR IMPLEMENTATION

Purpose: Engineering-ready documentation for all reusable components. No visuals. Structure and behavior only.

---

## 1. Header

### Purpose
Primary navigation. Sticky on scroll. Houses logo, nav links, and primary CTA.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logoSrc | string | required | Path to logo image |
| logoAlt | string | "Review My Emails" | Alt text for logo |
| navItems | array | required | Array of {label, href, isActive} |
| ctaText | string | "Get Started" | Primary CTA button text |
| ctaHref | string | required | CTA destination URL |
| isSticky | boolean | true | Enable sticky behavior |

### States

**Default**
- Background: transparent or white depending on page
- Nav links: --color-dark-base
- CTA: Primary button style

**Scrolled (sticky)**
- Background: --color-white
- Box shadow: --shadow-md
- Compact height (reduce padding)

**Mobile (< 768px)**
- Hamburger menu replaces nav links
- Logo + hamburger only visible
- CTA hidden until menu open

**Hover (nav links)**
- Color: --color-accent
- No underline

**Active (current page)**
- Font weight: --font-weight-semibold
- Color: --color-accent

### Mobile Behavior
- Hamburger icon: 44px touch target
- Menu slides in from right or drops down
- Full-screen overlay on mobile
- Close button or tap-outside to dismiss
- Nav items stack vertically, 48px height each

### Do
- Keep nav to 4-5 items maximum
- Use aria-label for hamburger button
- Announce menu state changes to screen readers
- Include skip-to-content link

### Don't
- Don't use dropdown menus
- Don't hide CTA on desktop
- Don't animate logo
- Don't use more than one CTA in header

---

## 2. Hero

### Purpose
Above-fold impact section. Single message, single action. Sets page context.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| headline | string | required | H1 text |
| subheadline | string | optional | Supporting text below headline |
| ctaText | string | required | Primary button text |
| ctaHref | string | required | Button destination |
| secondaryCtaText | string | optional | Secondary link text |
| secondaryCtaHref | string | optional | Secondary link destination |
| backgroundVariant | enum | "light" | "light" | "dark" |
| alignment | enum | "center" | "center" | "left" |

### States

**Default (light)**
- Background: --color-white or --color-light
- Headline: --color-dark-base
- Body: --color-text-primary

**Dark variant**
- Background: --color-dark-base
- Headline: --color-white
- Body: --color-text-inverse (with slight opacity)

**Button hover**
- Background: --color-btn-primary-hover

### Mobile Behavior
- Headline: --font-size-h1 (responsive, becomes 36px)
- Reduce vertical padding by 30%
- Stack any side-by-side elements
- CTA button full-width on mobile

### Do
- Keep headline under 10 words
- Use one primary CTA only
- Ensure sufficient contrast (WCAG AA)
- Test headline at mobile size

### Don't
- Don't add images or illustrations to hero
- Don't use multiple CTAs with equal weight
- Don't center-align long body text
- Don't use ALL CAPS for headline

---

## 3. Two-Column Section

### Purpose
Content paired with supporting element. Used for explanations, features, process steps.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| headline | string | required | Section H2 |
| content | string/node | required | Body content (can include lists) |
| media | node | optional | Right column content (image, component) |
| mediaPosition | enum | "right" | "left" | "right" |
| split | enum | "50-50" | "50-50" | "60-40" | "40-60" |
| backgroundVariant | enum | "white" | "white" | "light" | "dark" |

### States

**Default**
- Background: --color-white
- Content column: text left-aligned
- Media column: centered content

**Light background**
- Background: --color-light

**Dark background**
- Background: --color-dark-base
- Text: --color-white

**Reversed (media left)**
- Media on left, content on right
- Use for visual variety in page flow

### Mobile Behavior
- Columns stack vertically
- Content always appears first (above media)
- Media scales to full width
- Maintain aspect ratios

### Do
- Alternate left/right across page sections
- Use for process explanations
- Keep content scannable (bullets, short paragraphs)

### Don't
- Don't nest two-column sections
- Don't use for more than 3-4 bullet points
- Don't force 50-50 if content is unbalanced
- Don't use decorative images as media

---

## 4. Card

### Purpose
Contained unit for repeated content. Used in grids for features, tiers, or options.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Card heading (H3) |
| description | string | required | Card body text |
| icon | node | optional | Icon element above title |
| ctaText | string | optional | Link text |
| ctaHref | string | optional | Link destination |
| variant | enum | "default" | "default" | "featured" | "pricing" |
| isDisabled | boolean | false | Grayed out state |

### States

**Default**
- Background: --color-white
- Border: 1px solid --color-border
- Border radius: --radius-lg
- Padding: --space-md

**Hover**
- Box shadow: --shadow-md
- Border color: --color-accent (subtle)
- Transition: --transition-normal

**Featured**
- Border: 2px solid --color-accent
- Optional badge using --color-secondary

**Disabled**
- Opacity: 0.6
- No hover effects
- Cursor: not-allowed

**Pricing variant**
- Larger padding
- Price prominently displayed
- Feature list included
- CTA button at bottom

### Mobile Behavior
- Cards stack in single column
- Full width minus padding
- Maintain internal padding
- Touch target for entire card if clickable

### Do
- Use consistent card heights in grids
- Limit to 3-4 cards per row on desktop
- Keep descriptions concise (2-3 lines)

### Don't
- Don't mix card variants in same grid
- Don't use cards for single items
- Don't overload with content
- Don't use cards for navigation

---

## 5. Card Grid

### Purpose
Container for arranging cards in responsive grid layout.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | number | 3 | Columns on desktop (2-4) |
| gap | enum | "md" | "sm" | "md" | "lg" |
| children | node | required | Card components |

### States

**Desktop (1200px+)**
- Display: grid
- Grid columns: repeat(columns, 1fr)
- Gap: based on prop

**Tablet (768px - 1199px)**
- Grid columns: 2
- Reduced gap

**Mobile (< 768px)**
- Grid columns: 1
- Cards stack vertically

### Do
- Use for 3+ items
- Keep cards equal height (CSS grid handles this)
- Center grid if fewer items than columns

### Don't
- Don't use for 2 items (use two-column instead)
- Don't mix card types in same grid
- Don't exceed 4 columns

---

## 6. Testimonial

### Purpose
Social proof display. Single quote with attribution.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| quote | string | required | Testimonial text |
| authorName | string | required | Person's name |
| authorTitle | string | optional | Role/company |
| authorImage | string | optional | Path to headshot |
| variant | enum | "default" | "default" | "featured" |

### States

**Default**
- Background: --color-light
- Quote: --font-size-body, italic
- Attribution: --font-size-small

**Featured**
- Background: --color-dark-base
- Quote: --color-white
- Larger quote text

**Without image**
- Author initials in circle as fallback

### Mobile Behavior
- Full width
- Reduce quote font size
- Image: 48px circle
- Stack attribution below quote

### Do
- Use real names (Permission: Yes only)
- Keep quotes under 3 sentences
- Include role/context for credibility

### Don't
- Don't use fake testimonials
- Don't use stock photos for authors
- Don't truncate quotes
- Don't auto-rotate testimonials

---

## 7. CTA Block

### Purpose
Conversion-focused section. Used before footer or at page transitions.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| headline | string | required | Action-oriented H2 |
| subtext | string | optional | Supporting line |
| ctaText | string | required | Button text |
| ctaHref | string | required | Button destination |
| variant | enum | "dark" | "dark" | "light" | "accent" |

### States

**Dark (default)**
- Background: --color-dark-base
- Text: --color-white
- Button: Primary style (teal on dark)

**Light**
- Background: --color-light
- Text: --color-dark-base
- Button: Primary style

**Accent**
- Background: --color-accent
- Text: --color-white
- Button: White with accent text

**Button hover**
- Standard button hover behavior

### Mobile Behavior
- Reduce padding by 30%
- Button full-width
- Center all content

### Do
- Use once per page (typically before footer)
- Make headline action-oriented
- Keep subtext to one line

### Don't
- Don't add multiple CTAs
- Don't use decorative elements
- Don't place back-to-back with another CTA block

---

## 8. Footer

### Purpose
Site-wide footer. Secondary navigation, legal links, contact.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logoSrc | string | required | Logo image path |
| navGroups | array | required | Array of {title, links[]} |
| socialLinks | array | optional | Array of {platform, href, icon} |
| legalLinks | array | required | Array of {label, href} |
| copyright | string | required | Copyright text |

### States

**Default**
- Background: --color-dark-base
- Text: --color-white
- Links: --color-white with opacity

**Link hover**
- Opacity: 1
- No underline

### Mobile Behavior
- Nav groups stack vertically
- Accordion behavior optional for nav groups
- Social icons in row
- Legal links stack or wrap
- Copyright at bottom

### Do
- Keep nav groups to 3-4 max
- Include email contact
- Add accessibility statement link

### Don't
- Don't repeat primary nav exactly
- Don't use newsletter signup (not applicable)
- Don't include social media (unless added later)
- Don't use light footer variant

---

## 9. Button

### Purpose
Interactive element for actions. Three tiers of visual hierarchy.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | enum | "primary" | "primary" | "secondary" | "tertiary" |
| size | enum | "md" | "sm" | "md" | "lg" |
| href | string | optional | Makes button a link |
| onClick | function | optional | Click handler |
| isDisabled | boolean | false | Disabled state |
| isLoading | boolean | false | Loading state |
| fullWidth | boolean | false | 100% width |
| iconLeft | node | optional | Icon before text |
| iconRight | node | optional | Icon after text |

### States

**Primary - Default**
- Background: --color-accent
- Text: --color-white
- Border: none

**Primary - Hover**
- Background: --color-btn-primary-hover

**Primary - Active**
- Background: darken 5%
- Transform: scale(0.98)

**Primary - Disabled**
- Background: --color-btn-disabled-bg
- Text: --color-btn-disabled-text
- Cursor: not-allowed

**Primary - Loading**
- Opacity: 0.8
- Spinner replaces text or appears left

**Secondary - Default**
- Background: transparent
- Border: 2px solid --color-accent
- Text: --color-accent

**Secondary - Hover**
- Background: --color-light
- Border: same
- Text: same

**Secondary - Disabled**
- Border: --color-btn-disabled-bg
- Text: --color-btn-disabled-text

**Tertiary - Default**
- Background: none
- Text: --color-accent
- Arrow icon (→) after text

**Tertiary - Hover**
- Text: --color-btn-primary-hover
- Arrow shifts right slightly

### Size Specs

| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| sm | 8px 16px | 14px | 36px |
| md | 12px 24px | 16px | 44px |
| lg | 16px 32px | 18px | 52px |

### Mobile Behavior
- Minimum touch target: 44px
- Full-width option for stacked layouts
- Increase padding slightly for touch

### Do
- Use primary for one main action per view
- Use secondary for alternative actions
- Use tertiary for navigation links
- Always include focus states

### Don't
- Don't use more than 2 buttons together
- Don't use primary for cancel/back actions
- Don't disable without explanation
- Don't use custom colors

---

## 10. Status Badge

### Purpose
Visual indicator for email classification status (Keep/Monitor/Suppress).

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | enum | required | "keep" | "monitor" | "suppress" |
| size | enum | "md" | "sm" | "md" |
| showLabel | boolean | true | Show text label |

### States

**Keep**
- Background: --color-success
- Text: --color-white
- Label: "Keep"

**Monitor**
- Background: --color-warning
- Text: --color-white
- Label: "Monitor"

**Suppress**
- Background: --color-error
- Text: --color-white
- Label: "Suppress"

### Size Specs

| Size | Padding | Font Size | Border Radius |
|------|---------|-----------|---------------|
| sm | 4px 8px | 11px | --radius-sm |
| md | 6px 12px | 12px | --radius-full |

### Do
- Use to explain the classification system
- Group all three when showing the concept
- Keep consistent sizing within context

### Don't
- Don't use for other purposes
- Don't modify colors
- Don't animate

---

## 11. Section Container

### Purpose
Wrapper component for consistent section spacing and backgrounds.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| background | enum | "white" | "white" | "light" | "dark" |
| paddingY | enum | "lg" | "md" | "lg" | "xl" |
| maxWidth | enum | "default" | "default" | "narrow" | "full" |
| id | string | optional | For anchor links |

### States

**White background**
- Background: --color-white

**Light background**
- Background: --color-light

**Dark background**
- Background: --color-dark-base
- All child text must be light

### Mobile Behavior
- Reduce paddingY by 30%
- Maintain horizontal padding

### Do
- Alternate backgrounds for visual rhythm
- Use IDs for in-page navigation
- Wrap all page sections

### Don't
- Don't nest section containers
- Don't use dark background consecutively
- Don't override max-width inline

---

## Implementation Notes

### Component Priority Order
1. Button (used everywhere)
2. Section Container (structural foundation)
3. Header (appears on all pages)
4. Footer (appears on all pages)
5. Hero (home, pricing, sos)
6. Two-Column (process, features)
7. Card + Card Grid (pricing tiers, features)
8. CTA Block (conversion sections)
9. Testimonial (social proof)
10. Status Badge (classification explanation)

### Shared Dependencies
- All components import design_tokens.css
- Button is dependency for: Header, Hero, CTA Block, Card
- Section Container wraps: all content components

### Accessibility Checklist (All Components)
- [ ] Keyboard navigable
- [ ] Focus states visible
- [ ] ARIA labels where needed
- [ ] Color contrast WCAG AA
- [ ] Touch targets 44px minimum
- [ ] Respects prefers-reduced-motion
