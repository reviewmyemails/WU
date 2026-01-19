# RME Visual Personality Specification

Date: 2026-01-17

Status: LOCKED

Purpose: Define the personality layer that sits on top of the design system. This is where "cool" lives — the subtle details that create trust and memorability without gimmicks.

---

## Core Principle

**"I trust this company to solve my issues, I want to give them my money."**

Every visual decision supports this outcome. Not "wow, cool animation" — instead, "wow, this person knows their shit."

---

## Visual Direction: Editorial Expert with Warmth

A blend of:
- **Intellectual Cool (Primary)** — Clean layouts, confident whitespace, clear hierarchy
- **Quiet Power (Secondary)** — Restraint signals expertise, no need to shout
- **Sea Theme (Accent)** — Light nautical touches in micro-interactions and copy, not visual design

### What This Looks Like

| Element | Treatment |
|---------|-----------|
| Typography | Inter, clean, generous sizing — reads like a confident expert |
| Color | Teal palette — connects to ocean/Delphi without being literal |
| Layout | Generous whitespace — signals premium, not cramped SaaS |
| Copy | Sea metaphors where natural (easter eggs, confirmations) |
| Interactions | Subtle, purposeful — button hover, form feedback |
| Delphi | Background presence — footer, 404, favicon, not hero |

---

## Sea Theme Implementation

### Where Sea Theme LIVES (Same as Anchor)

1. **Micro-copy / Easter Eggs**
   - Confirmation messages: "⚓ COMMAND CONFIRMED"
   - Action labels: "Cargo Manifest", "Mission Briefing"
   - Navigation: "Return to Base (Homepage)"
   - Trust badges: "🌊 Smooth sailing guaranteed"

2. **Email Communications**
   - Subject lines can use nautical themes
   - "Big ship channel opened" style notifications

3. **404 Page**
   - Delphi can be prominent here
   - "Lost at sea?" messaging

4. **Footer**
   - Small Delphi icon acceptable
   - "Ahoy" in contact email (ahoy@reviewmyemails.com)

5. **Favicon / App Icon**
   - Delphi silhouette or octopus element

### Where Sea Theme DOES NOT Live

1. **Hero sections** — No wave illustrations, no ocean backgrounds
2. **Navigation** — Professional labels only
3. **Pricing cards** — Clean, no nautical decoration
4. **Trust badges** — Standard icons (lock, shield, checkmark)
5. **Primary CTAs** — "Get My List Cleaned" not "Set Sail"

### Delphi Visibility Scale

**Current choice: Level A (Same as Anchor)**

| Level | Visibility | Where |
|-------|------------|-------|
| A | Minimal | Footer, 404, favicon, email signatures |
| B | Light | + Success pages, empty states |
| C | Prominent | + Hero area, throughout site |

**Rationale:** Delphi is charming but shouldn't compete with YT as the face of the brand. Keep mascot for delightful moments, not primary identity.

---

## Subtle Animations

### Approved Animation Types

1. **Button Hover**
   - Background color shift: 200ms ease
   - Slight scale on active: scale(0.98)

2. **Page Load**
   - Fade-in for content blocks: 300ms, staggered
   - No bounce, no slide-in

3. **Form Feedback**
   - Success checkmark: subtle scale animation
   - Error shake: gentle, 2-3 oscillations max

4. **Focus States**
   - Ring appears: 150ms ease
   - No pulsing or glowing

5. **Scroll Reveals (Optional)**
   - Fade-in on scroll for sections
   - No parallax, no complex transforms
   - Respects prefers-reduced-motion

### Animation Rules

- Maximum duration: 300ms for micro-interactions
- Easing: ease or ease-out only (no bounce)
- No auto-play, no looping
- Must support prefers-reduced-motion: reduce
- Never delay user action (no loading spinners unless necessary)

### NOT Approved

- Parallax scrolling
- Floating elements
- Particle effects
- WebGL / Canvas animations
- Auto-rotating carousels
- Animated backgrounds
- Confetti
- Morphing shapes

---

## Copy Tone Guidelines

### Primary Voice (Website)

Professional, clear, confident. Like a consultant who knows exactly what they're doing.

**Good:**
- "We manually review every email on your list"
- "Know which emails to keep, monitor, or suppress"
- "Your cleaned list, delivered in 2-24 hours"

**Avoid:**
- "We're the BEST at email cleaning!!!!"
- "Your list is literally drowning in bad emails"
- "Let's gooo! Time to clean!"

### Sea Theme Voice (Micro-interactions only)

Playful, brief, unexpected. Rewards attention to detail.

**Good places:**
- Success confirmation: "⚓ COMMAND CONFIRMED"
- Order summary: "📦 Cargo Manifest"
- Return link: "← Return to Base"
- Footer: "Questions? Email ahoy@reviewmyemails.com"

**Bad places:**
- Hero headline (keep it clear)
- Pricing (keep it professional)
- Primary CTAs (no confusion)

---

## Trust Signal Design

### Placement Hierarchy

1. **Header** — None (keep it clean)
2. **Below Hero** — Optional single line (e.g., "10,000+ lists cleaned")
3. **Near Pricing** — Reassurance ("Money-back guarantee")
4. **Footer** — Credentials, certifications, awards

### Trust Badge Style

- Simple, monochrome icons preferred
- No garish "GUARANTEED" badges
- Subtle placement, never dominating
- Real testimonials only (from Proof Library with Permission: Yes)

### What NOT to Do

- Countdown timers
- "Only 3 spots left!" urgency
- Fake scarcity
- Pop-ups asking for email
- Exit-intent modals

---

## Component-Specific Personality

### Header
- Clean, professional
- No sea theme
- Logo links home
- CTA is confident, not pushy

### Hero
- Strong headline, clear value prop
- No illustrations
- Single CTA focus
- Light teal background acceptable for variety

### Cards
- Clean borders
- Subtle hover shadow
- No decorative elements
- Featured card uses accent border only

### CTA Block
- Dark teal background (--color-dark-base)
- White text
- Simple, direct headline
- No nautical language

### Footer
- Dark background
- Small Delphi icon acceptable
- "Ahoy" email is fine
- Otherwise professional

### 404 Page
- Delphi can be prominent
- "Lost at sea?" or similar
- Helpful navigation back

### Success/Confirmation Pages
- Sea theme micro-copy encouraged
- "⚓ COMMAND CONFIRMED" style
- Delphi image acceptable

---

## Implementation Checklist

### Phase 1 (Current Build)
- [ ] Base components use design tokens (no custom colors)
- [ ] Button hover animation added
- [ ] Focus states visible
- [ ] No decorative elements added

### Phase 2 (Copy Application)
- [ ] Sea theme micro-copy only in approved locations
- [ ] Primary copy is professional and clear
- [ ] No nautical terms in nav or CTAs

### Phase 3 (Polish)
- [ ] Subtle scroll animations if desired
- [ ] 404 page with Delphi
- [ ] Footer Delphi icon

---

## Reference: What "Cool" Means for RME

**Cool = Earned Trust**

A visitor should feel:
1. "This is a real expert, not a faceless tool"
2. "My data is safe with them"
3. "They know what they're doing"
4. "I can relax and let them handle it"

**Cool is NOT:**
- Flashy animations
- Trendy gradients
- Playful throughout (only in easter eggs)
- Trying too hard to be memorable

**Cool IS:**
- Confident restraint
- Clear value proposition
- Professional with personality in the right places
- Expertise you can feel

---

## Change Log

| Date | Change | Approved By |
|------|--------|-------------|
| 2026-01-17 | Initial spec created | Pending |
| 2026-01-17 | Direction pivot: Editorial design over sea theme. No wave dividers, no ocean textures, no layout gimmicks. Sea theme lives only in micro-copy. | Founder |
| 2026-01-17 | Prototype v2 approved structure: Hero (badge + headline + subhead + buttons), Steps with icons, Testimonial pull quote, Manifesto statement, Feature cards, Editorial testimonials, Quiet CTA | Founder |
| 2026-01-17 | Icon boxes: Solid teal (#0d9488) with white icons — not light teal (too faint) | Founder |
| 2026-01-17 | Hero badge: "By Yanna-Torry Aspraki" linking to LinkedIn, outline style with hover fill | Founder |
| 2026-01-17 | Keep both testimonial AND manifesto sections: Testimonial = social proof, Manifesto = brand philosophy ("Validation is the mechanism. Diagnosis is the product. Clarity is the difference.") | Founder |
| 2026-01-17 | Hero headline finalized: "Expert eyes on every email. Real answers on what's broken." — emphasizes diagnosis over validation | Founder |
| 2026-01-17 | Hero subhead revised to emphasize CONTEXT: how leads are acquired, organized, what's sent — the strategic value automated tools can't provide | Founder |
| 2026-01-17 | Manifesto keeps "Clarity" (not "Certainty") — honest promise we can deliver vs overpromise on outcomes we don't control | Founder |
| 2026-01-17 | Feature card 3: "Expert interpretation included" — connects to diagnosis/strategy messaging | Founder |
| 2026-01-17 | Added free walkthrough mention to "Expert interpretation" card — surfaces Layer 2 (post-clean call) without conflating with SOS Hotline (public funnel) | Founder |
