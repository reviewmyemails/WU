# RME Implementation Roadmap

Date: 2026-01-16

Status: READY TO BUILD

Purpose: Step-by-step implementation order for RME website rebuild. Structure and system only. Copy documents applied at the end.

---

## Phase 0: Foundation

### Step 0.1: Project Setup
- [ ] Create Wix project or prepare dev environment
- [ ] Import `design_tokens.css` as base stylesheet
- [ ] Add Inter font via Google Fonts
- [ ] Configure breakpoints in CSS/Wix

### Step 0.2: Base Styles
- [ ] Set global typography defaults (body, headings)
- [ ] Set global link styles
- [ ] Set global focus states
- [ ] Test responsive font scaling

### Deliverable
Clean slate with tokens loaded. All pages will inherit base styles.

---

## Phase 1: Global Components

Build these first. They appear on every page.

### Step 1.1: Button Component
**Priority: CRITICAL**

Build all three variants:
- [ ] Primary button
- [ ] Secondary button
- [ ] Tertiary (text link with arrow)

Build all states:
- [ ] Default
- [ ] Hover
- [ ] Active
- [ ] Disabled
- [ ] Loading (optional for now)

Test:
- [ ] All sizes (sm, md, lg)
- [ ] Full-width option
- [ ] Mobile touch targets

**Reused in:** Header, Hero, Card, CTA Block, all pages

---

### Step 1.2: Header Component
**Priority: CRITICAL**

Build:
- [ ] Logo placement (left)
- [ ] Nav links (center or right)
- [ ] Primary CTA button (right)
- [ ] Sticky scroll behavior
- [ ] Mobile hamburger menu
- [ ] Mobile menu overlay

Nav items (5 total):
1. Home
2. Pricing
3. SOS
4. About
5. [CTA Button]

Test:
- [ ] Sticky works on scroll
- [ ] Mobile menu opens/closes
- [ ] Active state on current page
- [ ] Skip-to-content link

**Reused in:** All pages (identical)

---

### Step 1.3: Footer Component
**Priority: CRITICAL**

Build:
- [ ] Dark background section
- [ ] Logo (small)
- [ ] Nav groups (2-3 columns)
- [ ] Legal links row
- [ ] Copyright text
- [ ] Mobile stacking

Nav groups:
- Services: Pricing, SOS
- Company: About, Partners
- Legal: Privacy, Terms

Test:
- [ ] Mobile layout
- [ ] Link hover states
- [ ] Proper spacing

**Reused in:** All pages (identical)

---

### Step 1.4: Section Container
**Priority: HIGH**

Build:
- [ ] Background variants (white, light, dark)
- [ ] Padding variants (md, lg, xl)
- [ ] Max-width constraints
- [ ] ID support for anchors

Test:
- [ ] Responsive padding reduction
- [ ] Background switching
- [ ] Content centering

**Reused in:** Every section on every page

---

## Phase 2: Content Components

### Step 2.1: Hero Component
**Priority: HIGH**

Build:
- [ ] Headline (H1)
- [ ] Subheadline
- [ ] Primary CTA button
- [ ] Optional secondary link
- [ ] Light/dark variants
- [ ] Center/left alignment

Test:
- [ ] Responsive headline sizing
- [ ] Mobile layout
- [ ] Dark variant contrast

**Used on:** Home, Pricing, SOS

---

### Step 2.2: Two-Column Component
**Priority: HIGH**

Build:
- [ ] Content column (text, lists)
- [ ] Media column (placeholder for now)
- [ ] Left/right positioning
- [ ] 50-50, 60-40, 40-60 splits
- [ ] Background variants

Test:
- [ ] Mobile stacking (content first)
- [ ] Alternating layouts
- [ ] With bullet lists

**Used on:** Home (How It Works, What You Get), SOS

---

### Step 2.3: Card Component
**Priority: HIGH**

Build:
- [ ] Default card style
- [ ] Featured variant (accent border)
- [ ] Pricing variant (larger, with price + features)
- [ ] Hover state
- [ ] Disabled state

Test:
- [ ] Consistent heights in grid
- [ ] Mobile full-width
- [ ] Featured badge placement

**Used on:** Home (features), Pricing (tiers)

---

### Step 2.4: Card Grid Component
**Priority: HIGH**

Build:
- [ ] Responsive grid (3 → 2 → 1 columns)
- [ ] Gap variants
- [ ] Centering for fewer items

Test:
- [ ] All breakpoints
- [ ] Equal height cards

**Used on:** Home, Pricing

---

### Step 2.5: CTA Block Component
**Priority: MEDIUM**

Build:
- [ ] Dark variant (default)
- [ ] Light variant
- [ ] Headline + subtext + button
- [ ] Centered layout

Test:
- [ ] Mobile padding
- [ ] Button hover on dark bg

**Used on:** Home, Pricing, SOS (before footer)

---

### Step 2.6: Testimonial Component
**Priority: MEDIUM**

Build:
- [ ] Quote text
- [ ] Author name + title
- [ ] Author image (optional)
- [ ] Light/featured variants

Test:
- [ ] Without image fallback
- [ ] Mobile layout

**Used on:** Home (1-2 placements)

---

### Step 2.7: Status Badge Component
**Priority: LOW**

Build:
- [ ] Keep (green)
- [ ] Monitor (orange)
- [ ] Suppress (red)
- [ ] Size variants

Test:
- [ ] Grouped display
- [ ] Accessibility

**Used on:** Home (What You Get section), SOS

---

## Phase 3: Page Assembly

Build pages in this order. Each page tests and refines components.

### Step 3.1: Home Page
**Complexity: HIGH | Components: ALL**

Sections (in order):
1. Header (global)
2. Hero - "Stop sending emails into the void"
3. Two-Column - Problem/solution
4. Card Grid - Three-step process or features
5. Two-Column - What You Get (with status badges)
6. Testimonial - Single featured
7. CTA Block - "Ready to clean your list?"
8. Footer (global)

**Copy source:** `decisions/home_page_rewrite.md`

Build notes:
- Longest page, most sections
- Tests all major components
- Establishes section rhythm pattern

---

### Step 3.2: Pricing Page
**Complexity: MEDIUM | Components: Hero, Card, CTA Block**

Sections:
1. Header (global)
2. Hero - "Pricing"
3. Context section (why cleaning matters) - simple text
4. Card Grid - Pricing tiers (3 cards)
5. Two-Column - What's included breakdown
6. CTA Block
7. Footer (global)

**Copy source:** `decisions/pricing_page_rewrite.md`

Build notes:
- Pricing cards need special attention
- Test featured tier highlighting
- "Context before cost" rule applies

---

### Step 3.3: SOS Page
**Complexity: MEDIUM | Components: Hero, Two-Column, CTA Block**

Sections:
1. Header (global)
2. Hero - SOS explanation
3. Two-Column - What happens / why it matters
4. Two-Column - Process (reversed)
5. Simple text section - Expectations
6. CTA Block
7. Footer (global)

**Copy source:** `decisions/sos_page_rewrite.md`

Build notes:
- More text-focused
- Fewer components
- Clear process explanation

---

### Step 3.4: About Page
**Complexity: LOW | Components: Hero, Two-Column**

Sections:
1. Header (global)
2. Hero - Simple headline
3. Two-Column - Photo + bio
4. Simple text - Credentials/background (optional)
5. CTA Block (optional)
6. Footer (global)

**Copy source:** `decisions/about_page_copy.md`

Build notes:
- Minimal page
- One good photo needed
- No testimonials on this page

---

### Step 3.5: Partner/Affiliate Page
**Complexity: LOW | Components: Hero, Two-Column**

Sections:
1. Header (global)
2. Hero - Partner program headline
3. Two-Column - How it works
4. Simple text - Terms/expectations
5. CTA Block - Email to apply
6. Footer (global)

**Copy source:** `decisions/affiliate_page_simplification.md`

Build notes:
- Simple page
- Email-based application (no form)
- Could be combined with About as tab

---

## Phase 4: Polish & QA

### Step 4.1: Cross-Page Consistency
- [ ] Header identical on all pages
- [ ] Footer identical on all pages
- [ ] Section spacing consistent
- [ ] Button styles uniform

### Step 4.2: Responsive Testing
- [ ] Desktop (1200px+)
- [ ] Tablet (768px - 1199px)
- [ ] Mobile (< 768px)
- [ ] Test real devices if possible

### Step 4.3: Accessibility Audit
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Color contrast check
- [ ] Focus states visible
- [ ] Alt text on images

### Step 4.4: Performance
- [ ] Image optimization
- [ ] Font loading (display: swap)
- [ ] Minimal JS
- [ ] Test load time

---

## Component Reuse Matrix

| Component | Home | Pricing | SOS | About | Partner |
|-----------|------|---------|-----|-------|---------|
| Header | ✓ | ✓ | ✓ | ✓ | ✓ |
| Footer | ✓ | ✓ | ✓ | ✓ | ✓ |
| Hero | ✓ | ✓ | ✓ | ✓ | ✓ |
| Two-Column | ✓ | ✓ | ✓ | ✓ | ✓ |
| Card | ✓ | ✓ | - | - | - |
| Card Grid | ✓ | ✓ | - | - | - |
| CTA Block | ✓ | ✓ | ✓ | ? | ✓ |
| Testimonial | ✓ | - | - | - | - |
| Status Badge | ✓ | - | ✓ | - | - |

---

## Copy Document Reference

| Page | Copy Document | Status |
|------|---------------|--------|
| Home | `home_page_rewrite.md` | Ready |
| Pricing | `pricing_page_rewrite.md` | Ready |
| SOS | `sos_page_rewrite.md` | Ready |
| About | `about_page_copy.md` | Ready |
| Partner | `affiliate_page_simplification.md` | Ready |

**Application rule:** Structure first, copy last. Build with placeholder text, then replace with final copy from documents.

---

## Estimated Build Sequence

```
Week 1: Foundation + Global Components
├── Day 1-2: Setup, tokens, base styles
├── Day 3-4: Button, Header
└── Day 5: Footer, Section Container

Week 2: Content Components
├── Day 1-2: Hero, Two-Column
├── Day 3-4: Card, Card Grid
└── Day 5: CTA Block, Testimonial, Status Badge

Week 3: Page Assembly
├── Day 1-2: Home page
├── Day 3: Pricing page
├── Day 4: SOS page
└── Day 5: About, Partner pages

Week 4: Polish
├── Day 1-2: Responsive fixes
├── Day 3: Accessibility
├── Day 4: Performance
└── Day 5: Final QA
```

---

## Dependencies

**Before starting:**
- [ ] Design tokens file imported
- [ ] Inter font loaded
- [ ] Logo files ready
- [ ] YT photo ready (About page)

**Blocked until copy is applied:**
- Final headline text
- Testimonial selection (from Proof Library)
- Pricing tier specifics

---

## Success Criteria

Phase complete when:
- [ ] All 5 pages render correctly at all breakpoints
- [ ] Components match design system exactly
- [ ] Copy from documents is applied
- [ ] No accessibility errors
- [ ] Load time under 3 seconds
- [ ] Founder approval on each page
