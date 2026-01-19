# RME Diagnostic Quiz Design

*Date: January 2026*
*Status: DESIGN SPEC — Not yet implemented*

## "Is Your List Safe to Send To?"

**Implementation Note:** This document defines the quiz logic, questions, scoring, and outcomes. The quiz has not been built yet. The homepage "Take the 2-minute risk check" CTA requires this quiz to be implemented before launch.

---

## The Questions

### Question 1: Where did most of these email addresses come from?

**Why this matters:** Source is the strongest predictor of list quality. No technical knowledge needed—they know where they got the addresses.

- **A)** People typed their own email into a form on my website/app
- **B)** I collected them at events, trade shows, or in-person signups
- **C)** They came from a partner, purchased list, or I'm not sure of the original source
- **D)** Mixed—some are direct signups, some from other sources

---

### Question 2: When someone signs up, what happens next?

**Why this matters:** Reveals whether bad addresses get filtered out at the point of entry.

- **A)** They receive an email and must click something to confirm (double opt-in)
- **B)** They're added immediately and get a welcome email
- **C)** They're added to the list—I don't send a confirmation
- **D)** I'm not sure what the current process is

---

### Question 3: How old is the oldest address on this list?

**Why this matters:** Email addresses decay over time. Age is a proxy for decay risk.

- **A)** Less than 6 months
- **B)** 6 months to 2 years
- **C)** 2-5 years
- **D)** More than 5 years, or I don't know

---

### Question 4: How often do you email this list?

**Why this matters:** Regular contact keeps lists "warm" and surfaces bad addresses before they accumulate.

- **A)** At least once a month
- **B)** Every few months
- **C)** A few times a year or less
- **D)** This list hasn't been emailed in a long time (or ever)

---

### Question 5: The last time you emailed this list (or a similar one), what happened?

**Why this matters:** Past behavior is the best predictor. If they've seen problems, more are likely.

- **A)** Delivered fine, low bounces, no issues
- **B)** Some bounces, but nothing alarming
- **C)** Noticeable bounces, spam complaints, or deliverability issues
- **D)** I haven't emailed this list yet / I don't track this

---

### Question 6: How confident are you that these people expect to hear from you?

**Why this matters:** Expectation drives engagement and complaint rates. They know this intuitively.

- **A)** Very confident—they signed up recently and know who I am
- **B)** Mostly confident—they signed up, though it may have been a while
- **C)** Uncertain—some may have forgotten or didn't realize they signed up
- **D)** Low confidence—many might not recognize my name or remember signing up

---

## Scoring Logic

### Point System

Each answer carries a risk weight:

| Answer | Points |
|--------|--------|
| A | 0 |
| B | 1 |
| C | 3 |
| D | 2 |

**Maximum possible: 18 points**

### Risk Thresholds

| Score | Risk Level |
|-------|------------|
| 0-4 | Low Risk |
| 5-9 | Medium Risk |
| 10-18 | High Risk |

### Critical Flags (Override Logic)

Certain answer combinations automatically elevate risk regardless of total score:

**Auto-elevate to High Risk if:**
- Q1 = C (unknown/purchased source) AND Q5 = C or D (past problems or no history)
- Q3 = D (very old/unknown age) AND Q4 = C or D (infrequent contact)

**Auto-elevate to Medium Risk if:**
- Q1 = C (unknown source) regardless of other answers
- Q2 = D (don't know signup process) AND Q6 = C or D (low expectation confidence)

### Why This Logic Works

1. **Source (Q1) is weighted heavily** because purchased/unknown lists have fundamentally different risk profiles than organic signups.

2. **The combination of age + inactivity** (Q3 + Q4) matters more than either alone.

3. **Past problems (Q5)** are the strongest signal when available.

4. **Expectation (Q6)** predicts complaint rates.

---

## Outcome Descriptions

### LOW RISK

**What this usually means:**

Your list has the characteristics we typically see in healthy, sendable lists. The addresses came from people who gave them to you directly, you've stayed in contact, and you haven't seen warning signs.

**Patterns we typically see with lists like this:**
- Bounce rates under 2%
- Low spam complaint rates
- Good inbox placement

**What to consider:**

You're likely fine to send, but "low risk" isn't "no risk." A small percentage of addresses decay even in well-maintained lists.

If you want extra confidence before a large send, validation can catch the few problem addresses that slip through even in healthy lists. This is especially worth considering if:
- You're sending to this list for the first time
- You're about to significantly increase send volume
- Your sender reputation is something you actively protect

**Why expert interpretation can help:**

A quiz can assess general patterns, but can't examine the actual addresses. Validation tools can identify specific issues that wouldn't show up in these questions.

---

### MEDIUM RISK

**What this usually means:**

Your list has some characteristics associated with deliverability problems, but also some protective factors. The risk isn't certain, but it's not negligible either.

**Patterns we typically see with lists like this:**
- Bounce rates between 2-8%
- Some invalid addresses that will hard bounce
- Possible spam traps if the list includes older or third-party addresses
- Inconsistent engagement rates

**Common scenarios that land here:**
- Good source, but the list has aged without regular contact
- Regular senders who've let signup quality slip
- Mixed lists (some great sources, some questionable)
- First-time senders with reasonable lists who lack historical data

**What to consider:**

You have a decision to make. You could:

1. **Send to a small segment first** (10-20%) to gauge actual bounce rates before sending to everyone
2. **Clean the list** using validation before sending to remove known problems
3. **Review your highest-risk segments** (oldest addresses, addresses from unclear sources) separately

**Why expert interpretation can help:**

Medium risk is where context matters most. A 4-year-old list from a reputable B2B source is different from a 1-year-old list scraped from business cards at conferences.

---

### HIGH RISK

**What this usually means:**

Your list has multiple characteristics strongly associated with deliverability problems. Sending to this list as-is carries significant risk of high bounce rates, spam trap hits, or reputation damage.

**This doesn't necessarily mean your list is worthless.** It means the risk is high enough that sending blind is inadvisable.

**Patterns we typically see with lists like this:**
- Bounce rates above 8% (sometimes much higher)
- Spam traps present, especially in purchased or old lists
- Addresses that will hard bounce on first send
- Risk of being flagged or throttled by inbox providers

**Common scenarios that land here:**
- Purchased or rented lists (regardless of what the seller claimed)
- Very old lists being revived after years of no contact
- Lists of unknown origin inherited from someone else
- Mixed sources where the risky portion is substantial

**What to consider:**

1. **Don't send to this list as-is.** The potential damage to your sender reputation isn't worth the risk.

2. **Validation is strongly recommended before any send.** This will identify which addresses are definitely bad, which are risky, and which are likely fine.

3. **Consider whether this list should be sent to at all.** If the source is genuinely unknown or purchased, validation can remove bad addresses but can't fix the fundamental issue that these people may not want to hear from you.

4. **If you must send, start very small.** A test send to 5% of the list can reveal actual (vs. predicted) bounce rates.

**Why expert interpretation can help:**

High-risk lists often have specific problems that require specific solutions. Validation doesn't just flag "good" and "bad"—it identifies categories of risk that inform strategy.

---

## Edge Cases and Limitations

### When This Quiz May Give Wrong Results

**False Low Risk:**
- Typo-heavy lists: If people consistently misspell their own addresses at signup
- Role-based addresses: A B2B list of info@, sales@, contact@ addresses will score "low risk" but has different deliverability characteristics
- Recently compromised domains: A list could be healthy until a major company domain shuts down

**False High Risk:**
- Well-maintained purchased lists: Rare, but some data providers do maintain their lists
- Event lists with strong relationship: In-person signups at a small conference where everyone knows you
- Re-engagement campaigns: Sometimes you're *supposed* to email an old list carefully

**Scenarios the quiz can't assess:**
- Technical setup issues (SPF, DKIM, sending infrastructure)
- Content-based spam filtering risk
- Industry-specific deliverability patterns
- Individual email provider behavior
- Your current sender reputation

### What 5-7 Questions Can't Capture

1. **The actual addresses themselves.** A quiz assesses list *characteristics*, not list *contents*.

2. **Nuance within categories.** "Partner list" could mean a trusted co-marketing arrangement or a shady lead broker.

3. **Your specific risk tolerance.** For a brand-new sender domain, 3% bounces is concerning. For an established sender, 3% is a rounding error.

4. **Engagement history.** Whether people open and click your emails matters enormously.

5. **Send volume and velocity.** Sending 100K emails at once is different from sending 100K over a month.

---

### Recommended Disclaimer

> **About these results:**
>
> This assessment is based on general patterns we see across many email lists. It indicates relative risk level, not certainty. Lists that score "low risk" can still have problems; lists that score "high risk" can sometimes perform fine.
>
> The only way to know what's actually in your list is to examine the addresses themselves. This quiz helps you decide whether that examination is worth doing—it doesn't replace it.
>
> Your results are not stored or shared.

---

## Implementation Notes

**For the interface:**
- Show progress (Question 3 of 6)
- Allow going back to change answers
- Don't reveal scoring logic during the quiz
- Show the result immediately—no email gate

**For the results page:**
- Lead with the risk level and what it means
- Make the "what to consider" section the most prominent
- Include the limitations/disclaimer visibly
- Offer a clear path to learn more OR to get actual validation—but don't make either feel mandatory

**Tone throughout:**
- Informative, not alarming
- Specific, not vague
- Honest about uncertainty
- Respectful of their intelligence
