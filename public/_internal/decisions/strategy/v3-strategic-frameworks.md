# V3 Strategic Frameworks
## Locked Frameworks for RME Website Implementation

*Date: January 2026*
*Status: LOCKED*

---

## 1. CTA Destination Architecture

### Framework

Three distinct entry points, one core service. Every path leads to the same product (list review + expert interpretation), but framing matches the visitor's state.

| CTA | Visitor State | Destination | Framing |
|-----|---------------|-------------|---------|
| Main: "Get answers about your list" | Ready to act | anchor.reviewmyemails.com/buy-credits | Standard review flow |
| Quiz: "Take the 2-minute risk check" | Uncertain, needs diagnosis | Quiz → Results → Review | Self-diagnosis first |
| Crisis: "Start here →" | Urgent, in trouble | SOS priority path | Expedited, higher touch |

### Rules

- All paths lead to the same core service
- Framing changes, product doesn't
- No bait-and-switch between paths
- Crisis path gets priority response, not different product

### Priority Order

1. **Quiz CTA** — highest priority gap (if quiz doesn't exist, CTA makes false promise)
2. **Crisis CTA** — needs distinct routing to SOS
3. **Main CTA** — functional, may need copy polish on destination

---

## 2. Crisis Triage Framework

### Model: Medical Intake

Treat crisis visitors like emergency room triage:
- Assess severity
- Stabilize first
- Diagnose after

### Crisis Indicators (Route to SOS)

- ESP compliance warning or account suspension
- Blocklisted (confirmed or suspected)
- Bounce spike on last send
- Team afraid to send again

### Triage Logic

| Signal | Severity | Response |
|--------|----------|----------|
| ESP suspended account | Critical | Immediate SOS, expedited review |
| Blocklisted (confirmed) | Critical | SOS + blocklist communication help |
| Compliance warning | High | Priority SOS response |
| Bounce spike (>5%) | High | SOS + list review |
| Suspected blocklist | Medium | Standard review, escalate if confirmed |

### Escalation Rules

- Crisis checked on any form → routes to SOS immediately
- Crisis cases receive priority response (faster than standard queue)
- YT personally handles all crisis cases
- **Capacity note:** Crisis prioritization is volume-dependent. If crisis volume exceeds capacity, triage by severity.

### De-escalation Rules

- If triage reveals non-crisis (user misunderstood), redirect to standard path with explanation
- Never make user feel stupid for thinking they were in crisis
- Frame as: "Good news — this is more manageable than you thought"

---

## 3. Burned-by-Tools Proof System

### The 5 Proofs

These are the core messages that differentiate RME from validation tools. Deploy across the customer journey.

| # | Proof | Where It Lands |
|---|-------|----------------|
| 1 | "Valid doesn't mean safe" | Homepage symptoms, methodology section |
| 2 | "Catch-all domains are invisible risk" | Quiz results *(future)*, FAQ *(future)* |
| 3 | "Recycled addresses become weapons" | SOS page, crisis framing |
| 4 | "Engagement decay doesn't show on validation" | Steps section, pricing justification |
| 5 | "This isn't from a dataset. It's from real lists reviewed one by one." | About/credibility *(future)*, why us |

*Note: Pages marked (future) do not exist yet. Update deployment locations as pages are built.*

### Proof Deployment Rules

- Each proof appears at least twice in the journey
- Never cluster all 5 in one section (overwhelming)
- Proof #1 is the gateway — if they don't get this, nothing else matters
- Proofs should create "oh, that's why tools failed me" recognition

### Proof Expansion (When Needed)

**Proof 1: "Valid doesn't mean safe"**
- Validation checks if address can receive mail
- Doesn't check if person wants YOUR mail
- Doesn't detect traps, complainers, or abandoned accounts

**Proof 2: "Catch-all domains are invisible risk"**
- Catch-all domains accept all addresses
- anytypo@catchall.com returns "valid"
- Could be real, could be honeypot, could be nobody
- Tools can't tell the difference

**Proof 3: "Recycled addresses become weapons"**
- Valid address today can become trap tomorrow
- Abandoned addresses get recycled by ISPs
- Previous validation means nothing after recycling
- Only engagement history + pattern recognition catches this

**Proof 4: "Engagement decay doesn't show on validation"**
- Address that hasn't opened in 2 years still validates
- Technical validity ≠ human interest
- Sending to decayed addresses trains ISPs to filter you

**Proof 5: "This isn't from a dataset. It's from real lists reviewed one by one."**
- User-facing framing: emphasizes human attention and care
- Addresses the fear: "will they actually look at MY list?"
- Technical/methodology contexts can use: "Software checks records. Experience recognizes patterns."
- This is the moat — competitors can copy tools, not accumulated judgment

---

## 4. Steps Emotional Journey Model

### The Three Phases

| Phase | Visitor State | Core Need | What We Provide |
|-------|---------------|-----------|-----------------|
| **Before** | Unsettled competence | Acknowledgment that uncertainty is reasonable | "You're not paranoid. This is genuinely complex." |
| **During** | Anxious surrender | Silence that feels like work, not marketing | No drip campaigns. No "checking in." Just results. |
| **After** | Equipped clarity | Actionable output, not dependency | Clear next steps. Not "call us to understand." |

### Before Phase (Pre-Purchase)

**Visitor mindset:** "I'm good at my job but this email stuff makes me feel stupid."

**What they need to hear:**
- This is genuinely complex
- Tools aren't enough (not because you're dumb, because they're limited)
- You're right to want expert eyes

**What they fear:**
- Looking incompetent
- Being sold something they don't need
- Another tool that doesn't help

### During Phase (Waiting for Results)

**Visitor mindset:** "Did I just waste money? Are they actually doing anything?"

**What they need:**
- Silence that signals work happening
- No "just checking in" emails
- Clear timeline, then delivery

**What they fear:**
- Being forgotten
- Getting generic output
- Having to explain their situation again

### After Phase (Post-Delivery)

**Visitor mindset:** "OK I have results. Now what?"

**What they need:**
- Clear actions, not dashboards
- Confidence to execute
- Path to more help if needed (not pushed)

**What they fear:**
- Results they can't interpret
- Being upsold before they've used what they bought
- Dependency on ongoing consulting

### Design Implications

- Steps section should map to emotional journey, not operational process
- Copy should acknowledge feelings, not just describe features
- CTA at each phase should match the emotional state

---

## 5. Measurement Guardrails

### The 6-Week Rule

No conclusions about website/marketing effectiveness before 6 weeks of data. Before that, you're measuring noise.

### Qualitative > Quantitative (At Low Volume)

| Volume Level | Primary Metric | Why |
|--------------|----------------|-----|
| <100 conversions/month | Qualitative feedback | Numbers too small for patterns |
| 100-500/month | Blended qual + quant | Starting to see patterns |
| >500/month | Quantitative primary | Statistical significance possible |

### Metrics to Ignore (First 30 Days)

- Bounce rate
- Conversion rate
- Week-over-week growth
- A/B test results

### Metrics to Watch (First 30 Days)

- Are people finding the site?
- Are they reading (scroll depth, time on page)?
- What questions are they asking (SOS emails, support)?
- What's the sentiment of early buyers?

### Red Flags (Immediate Action Required)

- Zero conversions after 2 weeks with traffic
- Bounce rate >80% consistently
- Negative feedback pattern (3+ similar complaints)
- Technical errors blocking conversion

### Success Signals (Qualitative)

- "This is exactly what I needed"
- "Why didn't I find you sooner"
- "Finally someone who gets it"
- Referrals without asking

### Anti-Pattern: Premature Optimization

Do not:
- A/B test headlines in week 1
- Redesign based on 50 visitors
- Add features because one person asked
- Change pricing based on early conversion rate

---

## Framework Integration

These 5 frameworks work together:

1. **CTA Architecture** determines where people enter
2. **Crisis Triage** handles urgent cases appropriately
3. **Burned-by-Tools Proofs** build trust throughout journey
4. **Emotional Journey** shapes the experience
5. **Measurement Guardrails** prevent premature changes

All frameworks support the core positioning: **Answers, not validation. Expert interpretation included.**

---

*Locked: January 2026*
*Review: When site launches or major pivot required*
