# RME Methodology Documentation
## Internal IP: Classification Logic & Decision Framework

---

## LABEL 1: KEEP

### What Signals Trigger This Label?

**Technical Signals:**
- Valid MX records with responsive mail servers
- Domain age >2 years with consistent DNS history
- Corporate domains matching company names (john@acmecorp.com where acmecorp.com is a real business)
- Provider patterns indicating real business use (Google Workspace, Microsoft 365 with custom domains)
- Proper SPF/DKIM/DMARC on receiving domain (indicates active email management)

**Behavioral Signals:**
- Confirmed opt-in with verifiable timestamp
- Engagement within 6-12 months (opens, clicks, replies)
- Consistent engagement pattern (not single spike then silence)
- Acquisition source is first-party (website form, in-person signup, purchase)
- Address matches other customer data (shipping address city matches email domain geography)

**Pattern Signals:**
- Name and email address correlate logically (firstname.lastname@ patterns that match account holder name)
- Domain sends mail (has outbound email history - not just receives)
- Corporate email on a domain with LinkedIn company page, active website
- Role-based addresses that ARE appropriate for the content (marketing@company for B2B software newsletters)
- Typo-free with proper TLD for the region

### Reasoning Communicated to Client

"This address shows strong indicators of a real, engaged recipient. The domain is established, the address format is consistent with business use, and your records show recent engagement. This person signed up intentionally and continues to want your email."

For B2B specifically: "This is a valid corporate address at an active company. The domain has proper email infrastructure. This person can receive and is likely expecting business communications."

### Action Client Takes

- Include in all sending segments
- No special handling required
- Can use for re-engagement campaigns if engagement lapses
- Safe for triggered/transactional sends

### Patterns That Appear Repeatedly

**Common mistakes clients make:**
- Treating all Gmail/Yahoo as "consumer" and deprioritizing B2B relevance (many small business owners use personal domains)
- Assuming old addresses are bad (some of the most engaged subscribers have 10+ year old addresses)
- Over-weighting "valid" syntax and ignoring engagement entirely

**Surprising findings validators miss:**
- Some "valid" addresses are honeypots with perfect technical signals
- Catch-all domains return "valid" for literally any address
- New corporate domains (<6 months) often have poor infrastructure despite being "valid"

**Things that look risky but aren't:**
- Unusual TLDs that are legitimate (.io, .co, country-specific)
- Very long email addresses (some corporate systems generate these)
- Addresses with numbers (often indicate legitimate sequential assignment)

### What Requires Human Expertise?

**Where automated tools fail:**
- Validators cannot see engagement history - they only see if delivery is technically possible
- Validators cannot distinguish between "address exists" and "person wants email"
- Validators miss context: a valid address at a competitor's domain is a problem regardless of validity

**What humans add:**
- Pattern recognition across the full list (cluster of similar addresses often indicates scraping)
- Business context (is this address appropriate for THIS sender's content?)
- Historical knowledge of problematic domains that haven't been blacklisted yet

---

## LABEL 2: MONITOR

### What Signals Trigger This Label?

**Technical Signals:**
- Valid but hosted on free providers with aggressive filtering (Gmail, Yahoo, Outlook.com)
- Domain is valid but relatively new (6 months to 2 years)
- Catch-all domain (cannot verify specific address existence)
- Valid but using email forwarding service (alumni addresses, custom domain forwarding)
- MX points to known aggressive spam filters (Barracuda, Mimecast, Proofpoint)

**Behavioral Signals:**
- Last engagement 6-12 months ago (not recent, not ancient)
- Subscribed via partner list share or co-registration
- Single engagement event then silence (opened once, never again)
- High frequency of soft bounces in history
- Opened but never clicked (possible image-loading proxy, not human)

**Pattern Signals:**
- Address format changed by provider (Gmail dot variations, plus addressing)
- Role-based address at small company where it might be one person (info@ at 5-person company)
- Personal domain with single MX record (hobbyist setup, might break)
- Address at company undergoing M&A (domain might migrate or die)
- Generic first names with common domains (john@gmail.com - valid but competitive inbox)

### Reasoning Communicated to Client

"This address is technically deliverable but carries elevated risk. The combination of [specific factors] means you should track performance closely. It's not bad enough to remove, but not clean enough to send without watching."

Specific reasoning variations:

*For engagement gaps:* "They haven't engaged in 8 months. They might still want your email, or they might have abandoned this address. Keep sending but track - if no engagement in 90 days, suppress."

*For catch-all domains:* "We can't verify this specific address exists because the domain accepts all email. It might be valid, might be a typo, might be a trap. Send carefully and watch for bounces."

*For aggressive filters:* "This address is valid but behind Mimecast enterprise filtering. Your email will be heavily scrutinized. Ensure content is clean and send during business hours."

### Action Client Takes

- Include in sending but flag for engagement tracking
- Set automated suppression trigger: if no engagement in [60-90 days], move to Suppress
- Reduce frequency if sending high volume (weekly → bi-weekly)
- Don't include in triggered/transactional until engagement confirmed
- Review before major campaigns (product launches, sales)

**Timeline:** Re-evaluate in 90 days. Either upgrades to Keep (engaged) or downgrades to Suppress (no engagement).

### Patterns That Appear Repeatedly

**Common mistakes clients make:**
- Treating Monitor as "Keep but worse" - sending the same volume and ignoring tracking
- Never actually re-evaluating - Monitor list grows forever
- Using Monitor addresses for re-engagement campaigns (risky, should use only Keep)

**Surprising findings validators miss:**
- Addresses that validate perfectly but belong to spam complainers
- Corporate addresses where the employee left (IT hasn't disabled, but no one reads)
- Forwarding addresses where the forward destination is dead

**Things that look safe but aren't:**
- Alumni forwarding addresses (forward destinations change, often silently fail)
- Role addresses at big companies (rotate handlers, different tolerance for commercial email)
- Addresses that "re-validate" after being bad (could be recycled into honeypots)

### What Requires Human Expertise?

**Where automated tools fail:**
- Validators cannot detect engagement decay - only humans tracking history see this
- Validators cannot identify "inbox competition" - john@gmail.com is technically fine but practically difficult
- Validators cannot see organizational context (company being acquired, domain migrating)

**What humans add:**
- Risk calibration based on client's sender reputation (strong senders can handle more Monitor, weak senders cannot)
- Industry-specific patterns (healthcare addresses have different behavior than retail)
- Seasonal awareness (addresses collected at trade shows need different evaluation timeline)

---

## LABEL 3: SUPPRESS

### What Signals Trigger This Label?

**Technical Signals:**
- Invalid MX records / domain doesn't accept email
- Known spam trap domains (entire lists exist of trap domains)
- Disposable/temporary email domains (mailinator, guerrillamail, 10minutemail, etc.)
- Syntax violations that somehow got through (no @, multiple @, invalid characters)
- Parked domains with no mail server
- Domains that exist but explicitly reject all email (null MX)
- Known honeypot patterns (specific address formats used by trap operators)

**Behavioral Signals:**
- No engagement ever (subscribed 2+ years ago, never opened)
- Hard bounce history (even once - address confirmed dead)
- Spam complaint history (even once - they don't want email)
- Unsubscribed previously (re-added through data merge error)
- Acquired through purchased list, scraped source, or contest entry
- Engagement only via "privacy proxy" opens (Apple MPP with no clicks ever)

**Pattern Signals:**
- Sequential addresses suggesting generation (user1@, user2@, user3@)
- Keyboard walk patterns (qwerty@, asdf@, test@, aaa@)
- Known fake name patterns (test user, mickey mouse, John Doe)
- Competitor domains (why are they on your list?)
- Addresses that appear in multiple purchased list datasets (professional list seeder)
- Role addresses at large companies for marketing content (abuse@, postmaster@, legal@)
- Personal addresses of known anti-spam activists or deliverability professionals (immediate complaint risk)

### Reasoning Communicated to Client

**For technical invalids:**
"This address cannot receive email. The domain doesn't have mail servers configured. Sending here will hard bounce, hurting your sender reputation with zero benefit."

**For spam traps:**
"This address matches known spam trap patterns. Sending here will likely result in immediate blacklisting. It exists specifically to catch senders who don't maintain clean lists."

**For behavioral suppressions:**
"This person either never wanted your email or stopped wanting it. They haven't engaged in 3 years despite 150+ sends. Continuing to send damages your reputation with their provider and wastes your resources."

**For purchased/scraped:**
"This address didn't opt in to YOUR list. Regardless of technical validity, sending here is spam. It will generate complaints and damage your ability to reach people who did subscribe."

**For complaint history:**
"This person complained about your email. They do not want it. Continuing to send after a complaint is not just ineffective - it's hostile and potentially illegal depending on jurisdiction."

### Action Client Takes

- Remove from all sending lists immediately
- Add to internal suppression list to prevent re-addition
- If this came from a data source, flag that source as compromised
- Do NOT attempt re-engagement
- Do NOT move back to Monitor or Keep without explicit, verified re-consent
- For large clusters: investigate acquisition source, likely systemic problem

**Timeline:** Permanent unless recipient explicitly re-subscribes through confirmed opt-in.

### Patterns That Appear Repeatedly

**Common mistakes clients make:**
- "But they're a customer!" - Customer status doesn't override no-engagement/complaint
- Trying to "re-engage" suppress-list addresses through different IP/domain (makes everything worse)
- Removing from marketing but keeping in transactional (complaints apply to all email)
- Arguing about purchased lists: "But we paid for them!" Doesn't matter.

**Surprising findings validators miss:**
- Recycled addresses: previously valid, now honeypots (validators see "valid," history shows dead)
- Addresses that pass validation but are on internal ISP watchlists
- Valid-looking corporate addresses at companies with strict spam reporting policies (financial institutions)

**Things that look dangerous but might not be (rare exceptions):**
- Some role addresses are single-person small businesses (evaluate individually)
- Very old addresses that bounced might have been re-activated (but verify with extreme caution)
- Addresses at domains that changed MX providers (genuine temporary bounce vs. permanent failure)

### What Requires Human Expertise?

**Where automated tools fail:**
- Validators cannot see complaint history
- Validators cannot identify recycled addresses
- Validators cannot detect trap patterns that haven't been published
- Validators cannot assess behavioral signals at all

**What humans add:**
- Industry knowledge of which domains are complaint-heavy
- Recognition of trap patterns based on years of seeing them
- Business judgment about acceptable risk (zero for some suppressions, near-zero for others)
- Pattern recognition across the list revealing systemic acquisition problems

---

## UNIVERSAL RULES (Apply to Every List)

1. **Hard bounces are always Suppress.** No exceptions. One hard bounce = permanent removal.

2. **Spam complaints are always Suppress.** No exceptions. Someone who complains never becomes a good subscriber.

3. **Known trap domains are always Suppress.** No validator catches all of them, but the known ones are absolute.

4. **Disposable email domains are always Suppress.** By design, these are used by people avoiding commitment.

5. **Syntax invalids are always Suppress.** If it's not a valid email format, it cannot receive email.

6. **No engagement in 2+ years is always Suppress.** The inbox is abandoned or the recipient has completely tuned out.

7. **Purchased list addresses are always Suppress.** No engagement history, no consent, no value, all risk.

8. **Previous unsubscribes are always Suppress.** They explicitly said no. Re-adding is both unethical and illegal in many jurisdictions.

---

## CONTEXTUAL RULES (Depend on Client Situation)

### Industry-Specific

**B2B SaaS:**
- Role addresses get more Monitor tolerance (info@, sales@ might be appropriate)
- Longer engagement gaps acceptable (business buyers have longer decision cycles)
- Heavy weight on domain reputation (sending to Fortune 500 IT departments requires pristine signals)

**E-commerce/Retail:**
- Consumer addresses at free providers are standard (Gmail/Yahoo dominant)
- Shorter engagement windows (no purchase/open in 6 months = risk)
- Seasonal adjustment (holiday collectors re-evaluate in February)

**Healthcare:**
- Extra caution on role addresses (HIPAA-adjacent concerns)
- Patient addresses require different handling than HCP addresses
- Institutional domains (.edu, .gov) have stricter filtering

**Financial Services:**
- Highest complaint risk - subscribers at banks/brokerages report aggressively
- Compliance concerns override marketing desires
- More aggressive suppression thresholds

### Volume-Specific

**High-Volume Senders (>1M/month):**
- Tighter Monitor criteria (less room for error at scale)
- Faster suppression triggers (can't afford reputation damage)
- More granular engagement tracking required

**Low-Volume Senders (<10K/month):**
- Can afford more Monitor tolerance (individual relationships matter more)
- Longer engagement windows acceptable
- Personal touch can recover borderline addresses

### Reputation-Specific

**Strong Sender Reputation:**
- Can tolerate higher percentage of Monitor
- ISPs give benefit of doubt
- Re-engagement campaigns are viable

**Weak/Recovering Reputation:**
- Aggressive suppression required
- Monitor category should be small or empty
- Only Keep addresses until reputation stabilizes

---

## EXCEPTION RULES (Experience-Based)

### Exceptions That Upgrade Risk Level

**"Valid" but actually dangerous:**
- Recycled domain addresses (domain expired, bought by trap operator)
- Addresses at companies in litigation with the client
- Personal addresses of journalists covering the client's industry (one bad experience becomes a story)
- Addresses that appear on multiple purchased lists (professional trap seeder)

**"Engaged" but misleading:**
- Apple Mail Privacy Protection opens (not real engagement)
- Security scanner clicks (enterprise email systems clicking all links)
- Bot traffic engagement (inflated metrics, no human)

### Exceptions That Downgrade Risk Level

**"Risky" but actually acceptable:**
- Role addresses at businesses where the client has relationship (sales@ at a known customer)
- Catch-all domains where other signals are very strong (multiple purchases, support tickets)
- New domains where ownership is verifiable (startup founder, known company rebrand)
- Addresses with typos where the intended address is verifiable (gogle.com meant gmail.com, client has other data confirming identity)

---

## THE META-RULE: What Software Will Never Do

The most valuable thing in RME's methodology is the **integration of signals across dimensions that software keeps separate:**

1. **Cross-referencing validity with behavior:** A valid address with no engagement is worse than an invalid address (at least the invalid one doesn't damage reputation).

2. **Understanding business context:** The same address can be Keep for one client and Suppress for another based on relevance and relationship.

3. **Recognizing systemic problems:** Individual address evaluation misses list-level patterns that indicate acquisition problems.

4. **Applying judgment under uncertainty:** When signals conflict, humans weigh them based on the specific situation. Software has to pick a rule.

5. **Communicating the "why":** Clients don't just need labels - they need to understand so they can prevent future problems. Software can't have that conversation.

---

## DOCUMENTATION FOR FUTURE APP ENCODING

When building software, these classifications can be partially automated:

**Fully Automatable:**
- Syntax validation
- MX record checks
- Known trap domain lists
- Disposable domain lists
- Hard bounce history
- Complaint history

**Partially Automatable (requires thresholds set by humans):**
- Engagement decay windows
- Monitor-to-Suppress triggers
- Domain age thresholds
- Catch-all handling

**Not Automatable (requires human review):**
- Business context appropriateness
- Pattern recognition across list
- Exception handling
- Root cause analysis
- Client communication

The app can handle triage. The methodology - the judgment layer - is what clients pay for and competitors cannot replicate.
