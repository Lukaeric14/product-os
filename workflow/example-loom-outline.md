# Loom Outline: Credits & Billing System

**Total time:** ~5 minutes

---

## 1. Context (1 min)

**Show:** Current billing page in staging

**Cover:**
- Why: Revenue beyond subscriptions, monetize content generation
- Pain: "Billing is too complicated" - customer complaints
- Goal: Revenue + clarity in one feature

---

## 2. What We're Building (1 min)

**Show:** PRD Summary

**Product locations:**
- Header: Credit balance indicator (next to user avatar)
- Settings > Billing (NEW): Purchase history, buy more credits
- Content Generator: Credit cost shown before generation
- Post Boosting modal (NEW): Credit cost shown before boosting

**Out of scope:** No subscription changes, no refunds, no expiration

---

## 3. User Flow (1.5 min)

**Show:** Excalidraw wireframes

- Header balance → Dropdown → Buy Credits → Stripe modal → Success
- Desktop + mobile layouts
- 3 packs, "Most Popular" highlighted

---

## 4. Edge Cases (1 min)

**Show:** PRD Edge Cases

- Insufficient credits → Blocked + Buy CTA
- Payment fails → Error, retry, no credits
- Generation fails → Auto-refund

---

## 5. QA Focus (30 sec)

**Show:** QA checklist

- Test accounts ready
- Focus: Purchase flow, insufficient credits UX
- Check mobile responsive
