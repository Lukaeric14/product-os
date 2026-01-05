# PRD: Credits & Billing System

## 1. Summary

Users can purchase credit packs to pay for content generation and post boosting. Credits are deducted per action, and users can view their balance and purchase history. This monetizes our core value proposition while incentivizing platform engagement through bonus credits for referrals and listing uploads.

---

## 2. Why

**Business context:**
- Keylead needs revenue beyond subscriptions
- Content generation and boosting have real costs (AI, API fees)
- Competitors charge per-action; we need parity

**Customer pain:**
- Current billing is "too complicated" (Nima feedback, 3 customer complaints in Dec)
- Users want transparency on what they're paying for
- Agents want to control spend per listing

**What happens if we don't build this:**
- No path to sustainable unit economics on content generation
- Lose users who churn due to billing confusion

---

## 3. What

**In scope:**
- Credit balance display in header
- Credit pack purchase flow (3 tiers: $10, $25, $50)
- Credit deduction on content generation
- Credit deduction on post boosting
- Purchase history view
- Bonus credits for referrals (+50 credits)
- Bonus credits for listing uploads (+10 credits per listing)

**Goals:**
- 20% of active users purchase credits in first month
- Reduce billing-related support tickets by 50%
- Average revenue per user increases by $15/month

---

## 4. Out of Scope

- Subscription tier changes (separate initiative)
- Credit gifting between users
- Credit expiration (credits don't expire for v1)
- Refund flow (handle manually for now)
- Enterprise/team credit pools

---

## 5. Where

**Product locations:**
- Header (NEW): Credit balance indicator (next to user avatar)
- Settings > Billing (NEW): Purchase history, buy more credits
- Content Generator: Credit cost shown before generation
- Post Boosting modal (NEW): Credit cost shown before boosting
- Referral page: Bonus credit callout
- Listing upload success (NEW): Bonus credit notification

---

## 6. How

### User Journey

1. User sees credit balance in header (e.g., "125 credits")
2. Clicks balance → goes to Settings > Billing
3. Sees current balance, purchase history, "Buy Credits" button
4. Clicks "Buy Credits" → sees 3 pack options
5. Selects pack → Stripe checkout opens
6. Completes payment → credits added immediately
7. Returns to billing page with updated balance

### Behavior Specs

**Credit Balance Display:**
- Shows in header, always visible when logged in
- Format: "[icon] 125" (no "credits" text, space constrained)
- Clicking opens dropdown with: balance, "Buy Credits" link, "View History" link
- Updates in real-time after purchase or deduction

**Purchase Flow:**
- 3 packs: Basic ($10 = 100 credits), Standard ($25 = 275 credits), Pro ($50 = 600 credits)
- Standard pack highlighted as "Most Popular"
- Stripe checkout in modal (not redirect)
- Loading state while processing
- Success: confetti animation, balance updates
- Failure: error message, retry option

**Credit Deduction:**
- Content generation: 5 credits per cover, 2 credits per carousel slide
- Post boosting: 10 credits base + 1 credit per $1 ad spend
- Show cost before action: "This will use 5 credits"
- If insufficient credits: block action, show "Buy Credits" CTA
- Deduction happens at generation start (not completion)

**Bonus Credits:**
- Referral: +50 credits when referred user completes first purchase
- Listing upload: +10 credits per new listing (max 10 listings = 100 credits)
- Show toast notification when bonus credits awarded

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| User has 3 credits, generation costs 5 | Block with "Insufficient credits. You need 2 more." + Buy CTA |
| Payment fails mid-checkout | Show error, no credits added, user can retry |
| User closes checkout modal before completing | No credits added, can restart |
| Generation fails after credits deducted | Refund credits automatically, show notification |
| User earns bonus credits while on billing page | Balance updates live, toast notification |
| User has 0 credits | Show "0" in header (not hidden), gentle "Buy credits to continue" prompt |

### Success Criteria

- [ ] User can see credit balance from any page
- [ ] User can purchase credits via Stripe
- [ ] Credits deduct correctly for content generation
- [ ] Credits deduct correctly for post boosting
- [ ] Bonus credits award for referrals
- [ ] Bonus credits award for listing uploads
- [ ] Purchase history shows all transactions
- [ ] Insufficient credits blocks actions with clear messaging

---

## 7. Links

- **Designs:** [Excalidraw - Credits & Billing](link)
- **Figma:** N/A (using Excalidraw wireframes)
- **Stripe docs:** [Payment Intents](https://stripe.com/docs/payments/payment-intents)
- **Related PRD:** Referral System (for bonus credits integration)
- **Customer feedback:** [Slack thread - billing complaints](link)
