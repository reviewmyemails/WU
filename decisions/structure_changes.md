# Structure Changes for Wix

Date: 2026-01-16

Status: Ready to apply in Wix

Purpose: Implement locked sitemap and structural decisions

---

## Instructions

Apply these changes in Wix manually.
Structure and navigation changes only.
Each change shows what to do and why.

---

## Final Locked Sitemap

```
PRIMARY NAVIGATION
├── Home
├── Pricing
├── SOS Hotline
└── [Get My List Cleaned] (CTA button → anchor.reviewmyemails.com)

TIER 2 — Linked from Home
└── About / Meet YT (NEW - minimal page)

TIER 3 — Footer Only
├── White Glove
├── Affiliate (simplified)
├── Contact
└── Legal pages

DELETED
└── Why We're Different (merged into Home)
```

---

## Change 1: Navigation — Remove "More" Dropdown

**Action:** Remove the "More" dropdown from primary navigation

**Current state:** Primary nav includes a "More" dropdown

**New state:** Primary nav shows only: Home | Pricing | SOS Hotline | [Get My List Cleaned CTA]

**Reason:** Simplified navigation. Key pages in primary nav, supporting pages in footer.

---

## Change 2: Navigation — Remove "Why We're Different"

**Action:** Remove "Why We're Different" from all navigation menus

**Current state:** Page exists and may be linked in nav or footer

**New state:** Page deleted, content merged into Home

**Reason:** Decision logged 2026-01-16. Key differentiators belong in conversion context on Home, not buried in separate page.

---

## Change 3: Page Deletion — Why We're Different

**Action:** Delete the "Why We're Different" page

**File reference:** Why You Should Choose Us _ Email List Cleaning & Deliverability Services _ Review My Emails

**Redirect:** Set up 301 redirect from old URL to Home page

**Content to preserve (for merging into Home):**
- Human review, not just automation
- Keep / Monitor / Suppress system (not binary valid/invalid)
- Clear explanations with every result
- Access to real deliverability experts

**Reason:** Decision logged 2026-01-16. 3/3 agent agreement. Content moves to Home → How It Works section.

---

## Change 4: New Page — About / Meet YT

**Action:** Create new minimal About page

**Page title:** About (or "Meet YT")

**Location:** Link from Home page, also in footer

**NOT in primary navigation**

**Required content:**

1. Photo of YT

2. Short bio (2-3 sentences):
   - Role: Founder of Review My Emails
   - Expertise: Email deliverability specialist
   - Focus: Helping marketers land in the inbox

3. Awards/credentials:
   - Best Business Award (2022)
   - Top 100 Marketing & Advertising Leaders (2021)
   - Litmus Coach Award (2020)

4. One personal signal (pick one):
   - 5th Dan Black Belt
   - OR: Speaks multiple languages

**Keep it minimal:**
- No long story
- No timeline
- No philosophy essay
- Must support trust and buying decisions
- Translation-friendly language

**Reason:** Decision logged 2026-01-16. 3/3 agent agreement. Trust signal without forcing visitors to read.

---

## Change 5: Home Page — Add "How It Works" Section

**Action:** Add new section to Home page

**Location:** After hero/introduction, before testimonials or pricing CTA

**Section title:** How It Works

**Content structure (short blocks, not paragraphs):**

Block 1: Two Ways to Clean Your List
- Done-for-you: Send us your list. We clean it. We return results with clear recommendations.
- Self-serve: Platform access opening in stages. Join waitlist to get notified.

Block 2: What Makes Us Different
- Human review, not just automation
- Keep / Monitor / Suppress system — not binary valid/invalid
- Clear explanations with every result
- Access to real deliverability experts

Block 3: Optional Support
- SOS Hotline available before or after cleaning
- Talk to a real deliverability expert
- Get interpretation, not just data

**Design notes:**
- Keep as short blocks, not long paragraphs
- Each point must support a buying decision
- Use simple, translation-friendly language
- Do not introduce new claims outside Product Truth / Proof Library

**Reason:** Decision logged 2026-01-16. Founder approved. Explains done-for-you vs self-serve and integrates differentiators from deleted "Why We're Different" page.

---

## Change 6: Affiliate Page — Simplify

**Action:** Simplify Affiliate page to email-based referral only

**Current state:** Page has placeholder text implying automated tracking systems

**New state:** Simple referral explanation with email contact

**Remove:**
- Any forms
- Any tracking promises
- Any complex systems
- Any "program" language
- Any automation implications

**Keep/Add:**
- Simple referral explanation
- Who it is for
- What they get
- How to start (email only)
- Clear expectations

**Content framework:**

Heading: Partner With Us

Who this is for:
- Email marketers with an audience
- Agencies serving email senders
- Consultants in the deliverability space

What you get:
- Commission on referred customers
- No complex tracking or portals
- Direct communication

How it works:
1. Email us to discuss partnership
2. We agree on terms
3. You refer clients
4. We track and pay you

CTA: Email us to start →

**Reason:** Decision logged 2026-01-16. 2/3 agent agreement with founder context. Page matches reality, low maintenance.

---

## Change 7: Footer Links — Update

**Action:** Update footer navigation

**Footer should include:**
- Home
- Pricing
- SOS Hotline
- About / Meet YT
- Affiliate
- White Glove (if exists)
- Contact
- Legal pages (Privacy, Terms)

**Footer should NOT include:**
- Why We're Different (deleted)

---

## Summary Checklist

| Change | Action | Status |
|--------|--------|--------|
| Navigation | Remove "More" dropdown | Ready |
| Navigation | Remove "Why We're Different" | Ready |
| Page | Delete "Why We're Different" + redirect | Ready |
| Page | Create "About / Meet YT" (minimal) | Ready |
| Home | Add "How It Works" section | Ready |
| Affiliate | Simplify to email-based | Ready |
| Footer | Update links | Ready |

---

## After Applying

1. Test all navigation links
2. Confirm 301 redirect from Why We're Different URL to Home
3. Review About page on mobile
4. Review How It Works section on mobile
5. Test Affiliate page email link
6. Mark this document as "Applied" with date
7. Update rme_change_log.md

---

## Decision Log References

- How It Works format: Decision Log 2026-01-16
- Why We're Different merge: Decision Log 2026-01-16
- About page depth: Decision Log 2026-01-16
- Affiliate program: Decision Log 2026-01-16

---
