# Symptom Checklist for Review My Emails

## Signs Your List Might Be Hurting You (Even If Metrics Look Fine)

---

## Category 1: Deliverability Signals

### Symptom: Your open rates dropped, but your ESP shows no warnings

**What you'd notice:** Opens went from 25% to 18% over a few months. No alerts, no bounce spikes, nothing flagged as wrong.

**What it usually means:** Mailbox providers (Gmail, Outlook, etc.) are quietly routing more of your mail to spam or promotions. They don't tell you—they just do it. Your ESP only sees what happens after you send, not where mail lands.

**What people wrongly assume:** "If something were wrong, my email platform would tell me." ESPs report delivery (mail accepted by servers), not placement (where it actually goes). A message can be "delivered" straight to spam.

**Why this requires expert interpretation:** The drop could be seasonal, could be content-related, could be list quality, could be authentication issues, could be sending patterns. Knowing which requires looking at the composition of your list alongside the behavior patterns—not just the numbers.

---

### Symptom: Gmail inboxing got worse, but other providers seem fine

**What you'd notice:** Engagement from Gmail addresses specifically dropped. Yahoo, Outlook, others holding steady or even improving.

**What it usually means:** Gmail uses different filtering logic than other providers. It weighs engagement history heavily—if Gmail users on your list stopped engaging months ago, Gmail "remembers" and starts filtering more aggressively. This often means your Gmail segment has accumulated more disengaged or problematic addresses than other segments.

**What people wrongly assume:** "It's a Gmail algorithm change" or "Gmail is just harder." Sometimes true, but more often it's that your Gmail audience composition has quietly degraded.

**Why this requires expert interpretation:** Could be authentication issues specific to Gmail, could be content triggers, could be list composition, could be that competitors warmed up better infrastructure. The provider-specific pattern is a clue, not a diagnosis.

---

### Symptom: You validated your list, but bounces still happen

**What you'd notice:** You ran your list through a validation service. It came back "95% valid." Then you sent, and 3-4% bounced anyway.

**What it usually means:** Validation checks if an address *can* receive mail at the moment of checking. It doesn't check if the address *will* accept mail from *you*, or if the mailbox is monitored, or if the user has marked similar mail as spam before. Validation is a snapshot; deliverability is a relationship.

**What people wrongly assume:** "Valid means safe to mail." Valid means the address exists. That's necessary but not sufficient. A valid address can still be a spam trap, an abandoned account, a role address that never engages, or someone who'll report you.

**Why this requires expert interpretation:** Understanding *why* bounces happen post-validation requires examining the types of bounces, the domains involved, and patterns in when they occur.

---

### Symptom: Your bounce rate is fine, but your complaint rate is creeping up

**What you'd notice:** Bounces under 1%, so technically "healthy." But spam complaints are slowly rising—maybe from 0.02% to 0.05% over six months.

**What it usually means:** Your list has real addresses that simply don't want your mail anymore (or never did). Low bounces just means the addresses exist. Rising complaints means the humans behind those addresses are actively frustrated.

**What people wrongly assume:** "Low bounces = healthy list." Bounces measure address validity. Complaints measure human sentiment. You can have a technically valid list that's functionally toxic.

**Why this requires expert interpretation:** Complaint rates need context. What's your industry average? Which mailbox providers are generating complaints? Are complaints coming from recent signups or older subscribers?

---

### Symptom: Your emails arrive, but nobody seems to see them

**What you'd notice:** You sent 50,000 emails. Delivery rate: 98%. Open rate: 4%. You *know* your subject line wasn't that bad.

**What it usually means:** "Delivered" means accepted by the receiving server. It doesn't mean inbox. If your open rate is dramatically lower than historical averages, much of your "delivered" mail is likely landing in spam, promotions tabs, or being silently filtered.

**What people wrongly assume:** "Delivered = inbox." This is the most expensive assumption in email. You can have 99% delivery and 90% spam placement simultaneously.

**Why this requires expert interpretation:** Low opens can be list fatigue, timing, subject lines, sender name issues, or placement problems. Distinguishing between "people saw it and didn't open" vs. "people never saw it" requires examining engagement patterns across segments.

---

## Category 2: Engagement Patterns

### Symptom: Engagement feels random—some sends do great, others tank

**What you'd notice:** Monday's send: 28% open rate. Wednesday's send to the same list: 14%. Similar content, similar time. No obvious explanation.

**What it usually means:** You likely have distinct segments within your list that respond to different triggers. What feels random is actually signal—certain content resonates with engaged subscribers while other content only gets opened by your most loyal segment.

**What people wrongly assume:** "Email is just unpredictable." It's actually quite predictable once you understand your segments. Wild swings usually mean you're treating a heterogeneous list as homogeneous.

**Why this requires expert interpretation:** Diagnosing inconsistency requires segmenting performance by subscriber age, signup source, engagement history, and domain. The pattern in the "randomness" tells you what's actually happening.

---

### Symptom: Your best campaigns are getting worse over time

**What you'd notice:** Your holiday campaign got 35% opens three years ago, 28% two years ago, 22% last year. Same basic approach, same list growth, declining returns.

**What it usually means:** Your list is aging. Early subscribers were highly engaged (they found you when you were smaller, more niche). As you've grown, you've added subscribers who are less aligned or less engaged. The dilution shows up as declining performance even on your strongest content.

**What people wrongly assume:** "Our content is getting stale" or "email is dying." Your content might be fine. You're just averaging in more disengaged subscribers with each passing year.

**Why this requires expert interpretation:** Declining performance could be content fatigue, competitive pressure, changing audience preferences, or list composition shift. Isolating the cause requires cohort analysis.

---

### Symptom: Your click rates are stable, but revenue per email is dropping

**What you'd notice:** 3% click rate, same as always. But revenue per send has dropped 20% year over year.

**What it usually means:** The *people* clicking are changing. Your most engaged, highest-intent subscribers might be churning out while lower-quality clicks fill the gap. Same quantity, different quality.

**What people wrongly assume:** "Clicks mean engagement, engagement means value." Not all clicks are equal. A click from a loyal customer has different value than a click from someone who'll never buy.

**Why this requires expert interpretation:** This requires connecting email engagement data to downstream behavior—purchase patterns, customer lifetime value, conversion rates by segment.

---

### Symptom: New subscribers engage once, then disappear

**What you'd notice:** Welcome email: 60% open rate. Second email: 25%. By email five: 8%. The dropoff is steep and consistent.

**What it usually means:** Your acquisition source is generating curiosity, not commitment. People sign up for an incentive (discount, lead magnet, etc.) with no intention of ongoing engagement. You're acquiring addresses, not subscribers.

**What people wrongly assume:** "That's just how email works—people lose interest." Healthy lists see gradual decline, not cliff-drop patterns. Steep early dropoff signals misaligned expectations at signup.

**Why this requires expert interpretation:** Diagnosing this requires examining acquisition sources individually. Some sources might deliver engaged subscribers while others deliver addresses that will never engage.

---

### Symptom: Your list keeps growing, but engaged subscribers stay flat

**What you'd notice:** List size: 100K → 150K → 200K. Active 30-day subscribers: 40K → 42K → 41K. You're adding, but not really growing.

**What it usually means:** You're adding roughly as many disengaged subscribers as you're adding engaged ones. Your "growth" is mostly padding your list with addresses that will never respond.

**What people wrongly assume:** "Bigger list = more reach." Bigger list can mean worse deliverability, higher costs, and diluted metrics. Quality and quantity aren't the same measurement.

**Why this requires expert interpretation:** Understanding why growth isn't translating to engagement requires examining where new subscribers come from, how they're being welcomed, and how quickly they disengage.

---

## Category 3: Things That Feel "Off"

### Symptom: You're scared to remove any emails from your list

**What you'd notice:** You know you should clean inactive subscribers, but you can't bring yourself to do it. What if they come back? What if that's revenue you're leaving on the table?

**What it usually means:** You're optimizing for possibility over probability. Holding onto years of non-openers "just in case" is actively harming your sender reputation and dragging down your deliverability.

**What people wrongly assume:** "A bigger list is always better" or "they might re-engage someday." Some will. Most won't. And keeping them is causing immediate damage to your ability to reach people who *want* your mail.

**Why this requires expert interpretation:** Knowing *who* to remove requires understanding the difference between dormant-but-reachable and harmful-to-keep. There are strategies for safely re-engaging lapsed subscribers vs. cutting losses.

---

### Symptom: You have no idea where half your subscribers came from

**What you'd notice:** You're looking at subscribers and can't identify the acquisition source. Some have been there for years. Some appeared mysteriously during a campaign you barely remember.

**What it usually means:** Subscribers without clear provenance often perform the worst. They might be from a partner deal gone wrong, a poorly-tagged campaign, a third-party list that got mixed in, or a form that was accidentally public.

**What people wrongly assume:** "They're on the list, so they opted in at some point." Maybe. But without knowing where they came from, you can't assess whether that opt-in was legitimate, informed, or compliant.

**Why this requires expert interpretation:** Tracing address origins requires forensic work—looking at signup dates, email patterns, engagement history, and domain clustering.

---

### Symptom: Your competitor's emails always seem to land in inbox; yours don't

**What you'd notice:** You test by signing up for competitor newsletters. Theirs arrive immediately, in primary inbox. Yours (to yourself) end up in promotions or spam.

**What it usually means:** Inbox placement is earned through consistent positive engagement over time. Your competitor may have better list hygiene, better engagement rates, better sending patterns, or simply a longer track record.

**What people wrongly assume:** "They must know a trick" or "they have some special relationship with Gmail." There are no tricks. Deliverability is the result of accumulated trust.

**Why this requires expert interpretation:** Diagnosing why your placement differs requires examining your authentication setup, sending patterns, list composition, engagement rates, and reputation scores.

---

### Symptom: You feel like you're sending to the same people who never respond

**What you'd notice:** You write, you send, you wait. Same 15% open, same 2% click, same names in your "engaged" segment. The other 85% might as well not exist.

**What it usually means:** Your list has stratified into engaged and ghost tiers. The ghost tier isn't just neutral—they're actively signaling to mailbox providers that your mail isn't wanted.

**What people wrongly assume:** "At least I'm reaching *some* people." Yes, but reaching them despite the drag of the ghost tier, not because of your list.

**Why this requires expert interpretation:** Reviving stratified lists requires careful segmentation, targeted re-engagement, and strategic pruning. The right approach depends on your specific list composition.

---

### Symptom: You're not sure if your signup form is doing what it should

**What you'd notice:** People subscribe. You assume the process works. But you've never actually tested the full flow, or compared your form to current best practices.

**What it usually means:** Your front door might be broken. Forms without double opt-in collect fake addresses and typos. Forms without expectation-setting collect people who didn't understand what they signed up for.

**What people wrongly assume:** "The form works—people are submitting it." Submissions ≠ good subscriptions.

**Why this requires expert interpretation:** Evaluating signup form effectiveness requires connecting form design to downstream engagement.

---

## Category 4: False Positives (Things That Look Fine But Aren't)

### Symptom: Your delivery rate is 99%

**What you'd notice:** Your ESP dashboard shows 99% delivery. Green checkmarks. Everything looks healthy.

**What it usually means:** Almost nothing. Delivery means the receiving server accepted the message for processing. It doesn't mean inbox. A 99% delivery rate and 80% spam placement can coexist perfectly well.

**What people wrongly assume:** "99% delivery means my list is healthy and my emails are getting through."

**Why this requires expert interpretation:** The delivery rate alone tells you nothing about placement, engagement, or list quality.

---

### Symptom: Your unsubscribe rate is very low

**What you'd notice:** Only 0.1% unsubscribe rate per campaign. You interpret this as "people want to stay subscribed."

**What it usually means:** People who don't care often don't unsubscribe—they just stop opening and eventually mark you as spam or let their addresses go dormant. Low unsubscribes can mask high disengagement.

**What people wrongly assume:** "If they didn't like it, they'd unsubscribe." Many people use the spam button instead. Many just stop opening.

**Why this requires expert interpretation:** Understanding true disengagement requires looking at unsubscribes alongside open decay, complaint rates, and dormancy patterns.

---

### Symptom: Your list is mostly business email addresses

**What you'd notice:** 70% of your list is company domains—addresses like name@company.com rather than personal Gmail or Yahoo accounts.

**What it usually means:** This could be excellent (you're reaching decision-makers at work) or problematic (corporate firewalls, gateway filters, people who change jobs).

**What people wrongly assume:** "Business addresses are more valuable." Sometimes true. But business addresses also disappear when people change jobs, get filtered more aggressively by corporate IT.

**Why this requires expert interpretation:** Assessing business address quality requires examining engagement patterns by domain, understanding corporate filtering, and tracking role-based addresses.

---

### Symptom: You've never had a deliverability "incident"

**What you'd notice:** No major bounce spikes. No blacklistings. No mass spam folder events. Everything has been... fine.

**What it usually means:** Possibly nothing wrong. Possibly slow degradation you haven't noticed. Many deliverability problems are chronic, not acute.

**What people wrongly assume:** "No problems = no problems." Acute incidents are obvious. Chronic reputation decay is invisible until you compare to where you used to be.

**Why this requires expert interpretation:** Identifying slow degradation requires baseline comparison, trend analysis, and understanding what "healthy" looks like for your industry.

---

## Category 5: Things You're Doing That Create Future Problems

### Symptom: You send to everyone, every time

**What you'd notice:** Every campaign goes to your full list. 100% coverage, every send.

**What it usually means:** You're training mailbox providers that a large portion of your recipients never engage. This gradually erodes your sender reputation.

**What people wrongly assume:** "More sends = more opportunity." This ignores the cost side. Each send to a non-engager is a negative signal.

**Why this requires expert interpretation:** Finding the right send frequency and segmentation strategy requires understanding your specific engagement decay curves.

---

### Symptom: You rarely (or never) remove inactive subscribers

**What you'd notice:** Your list only grows. Unsubscribes come off, hard bounces come off, but you've never proactively removed disengaged addresses.

**What it usually means:** You're accumulating reputation weight. Every address that hasn't opened in 18 months is diluting your engagement metrics and signaling to mailbox providers that your mail isn't wanted.

**What people wrongly assume:** "They might come back. I don't want to lose potential revenue."

**Why this requires expert interpretation:** Smart list hygiene isn't just "delete non-openers." It's understanding the right inactivity threshold for your business.

---

### Symptom: You don't have double opt-in enabled

**What you'd notice:** Someone submits your form, they're immediately on your list. No confirmation email required.

**What it usually means:** You're accepting typos, fake addresses, misremembered addresses, and malicious signups into your list.

**What people wrongly assume:** "Double opt-in loses subscribers. I can't afford the drop."

**Why this requires expert interpretation:** The single vs. double opt-in decision depends on your acquisition sources, your industry, your regional legal requirements.

---

### Symptom: You purchased, rented, or "partnered" for email addresses

**What you'd notice:** A chunk of your list came from somewhere other than your own organic signup forms.

**What it usually means:** These addresses have disproportionate risk. They didn't choose you. They may not recognize you. They're more likely to complain, less likely to engage.

**What people wrongly assume:** "They opted in somewhere, so it's probably fine."

**Why this requires expert interpretation:** Evaluating acquired address risk requires examining engagement patterns, complaint rates, and domain analysis for that specific segment.

---

### Symptom: You treat all addresses the same

**What you'd notice:** Same campaigns, same frequency, same treatment whether someone signed up yesterday or five years ago.

**What it usually means:** You're ignoring the most valuable information you have—behavior. Different subscribers need different approaches.

**What people wrongly assume:** "We don't have time for segmentation."

**Why this requires expert interpretation:** Building effective segments requires understanding which behavioral signals matter for your audience.

---

## How to Use This Checklist

**If you recognized 1-2 symptoms:** You might be fine, but it's worth investigating to confirm.

**If you recognized 3-5 symptoms:** There are likely patterns in your list that you're not seeing in your metrics.

**If you recognized 6 or more:** Your list is probably working against you in ways that aren't obvious from your dashboard.

---

## What These Symptoms Have in Common

None of these symptoms can be diagnosed by validation alone. They require understanding:

- How different parts of your list behave over time
- How mailbox providers are responding to your sending patterns
- What your engagement data actually means in context
- Where the risks are hiding in plain sight

This is the kind of interpretation that turns data into decisions.
