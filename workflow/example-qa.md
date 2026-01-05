# QA Checklist: Credits & Billing System

## 1. Context

**Feature:** Credits & Billing System
**User types:** Business users (real estate agents)
**Environment:** Staging (staging.keylead.com)

---

## 2. Test Account Setup

| Account | Credentials | State Required |
|---------|-------------|----------------|
| Business User (new) | test-billing-new@keylead.com / Test123! | Fresh account, 0 credits |
| Business User (with credits) | test-billing-credits@keylead.com / Test123! | Account with 50 credits |
| Business User (with listings) | test-billing-listings@keylead.com / Test123! | Account with 3 listings, 25 credits |

**Stripe Test Cards:**
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Requires auth: 4000 0025 0000 3155

---

## 3. Pre-Test Setup

- [ ] Clear browser cache/cookies or use incognito
- [ ] Confirm staging environment is deployed
- [ ] Verify test accounts exist and have correct state
- [ ] Have Stripe test card numbers ready

---

## 4. Test Cases

### 4.1 Credit Balance Display

**TC-1: Balance visible in header**
- Action: Log in as test-billing-credits@keylead.com
- Expected: Credit balance "50" visible in header next to user avatar
- Expected: Balance has coin/credit icon

**TC-2: Balance dropdown**
- Action: Click on credit balance in header
- Expected: Dropdown opens with:
  - Current balance: "50 credits"
  - "Buy Credits" link
  - "View History" link

**TC-3: Zero balance display**
- Action: Log in as test-billing-new@keylead.com
- Expected: Credit balance shows "0" (not hidden)
- Expected: Dropdown shows "0 credits" with "Buy Credits" CTA

---

### 4.2 Purchase Flow

**TC-4: Navigate to purchase**
- Action: Click "Buy Credits" from header dropdown
- Expected: Navigate to Settings > Billing page
- Expected: Page shows current balance, "Buy Credits" button

**TC-5: Credit pack options**
- Action: Click "Buy Credits" button
- Expected: Modal opens with 3 pack options:
  - Basic: $10 = 100 credits
  - Standard: $25 = 275 credits (highlighted "Most Popular")
  - Pro: $50 = 600 credits

**TC-6: Successful purchase**
- Action: Select "Standard" pack, complete Stripe checkout with 4242 4242 4242 4242
- Expected: Loading state during processing
- Expected: Success animation (confetti)
- Expected: Balance updates to previous + 275
- Expected: Modal closes, billing page shows updated balance

**TC-7: Failed purchase**
- Action: Select "Basic" pack, use decline card 4000 0000 0000 0002
- Expected: Error message: "Payment failed. Please try again."
- Expected: Credits NOT added
- Expected: Retry option available

**TC-8: Cancelled purchase**
- Action: Select a pack, then close Stripe modal before completing
- Expected: Credits NOT added
- Expected: Can restart purchase flow

---

### 4.3 Credit Deduction

**TC-9: Content generation cost display**
- Action: Log in as test-billing-credits@keylead.com, start content generation flow
- Expected: Before generating, see message: "This will use X credits"
- Expected: Cost breakdown visible (e.g., "5 credits for cover")

**TC-10: Successful deduction**
- Action: Complete content generation
- Expected: Credits deducted from balance
- Expected: Header balance updates
- Expected: Generation proceeds

**TC-11: Insufficient credits - blocked**
- Action: Log in as test-billing-new@keylead.com (0 credits), try to generate content
- Expected: Action blocked
- Expected: Message: "Insufficient credits. You need X more."
- Expected: "Buy Credits" CTA visible
- Expected: Clicking CTA goes to purchase flow

**TC-12: Generation failure refund**
- Action: Start generation, simulate failure (if possible in staging)
- Expected: Credits refunded automatically
- Expected: Notification: "Generation failed. X credits refunded."

---

### 4.4 Bonus Credits

**TC-13: Listing upload bonus**
- Action: Log in as test-billing-credits@keylead.com, upload a new listing
- Expected: After successful upload, toast notification: "+10 bonus credits!"
- Expected: Balance increases by 10
- Expected: Transaction appears in history as "Bonus - Listing Upload"

**TC-14: Referral bonus (if testable)**
- Action: Use referral flow (may need separate setup)
- Expected: +50 credits when referred user completes first purchase
- Expected: Transaction appears in history as "Bonus - Referral"

---

### 4.5 Purchase History

**TC-15: History displays correctly**
- Action: Navigate to Settings > Billing, view purchase history
- Expected: Table shows:
  - Date
  - Type (Purchase / Deduction / Bonus)
  - Description
  - Amount (+/- credits)
  - Balance after

**TC-16: History updates after purchase**
- Action: Complete a purchase, check history
- Expected: New transaction appears at top
- Expected: Description: "Credit Pack - Standard"
- Expected: Amount: "+275"

---

## 5. Edge Cases

**EC-1: Rapid actions**
- Action: Try to generate content twice quickly
- Expected: Second action blocked or queued, no double-deduction

**EC-2: Browser back during checkout**
- Action: Start checkout, press browser back
- Expected: No credits added, no duplicate charges

**EC-3: Session timeout during checkout**
- Action: Start checkout, wait 30+ minutes, complete
- Expected: Either completes successfully or shows session error (not stuck)

**EC-4: Balance at exact cost**
- Action: Have exactly 5 credits, generate content costing 5
- Expected: Succeeds, balance goes to 0

---

## 6. Polish Check

### Visual Quality
- [ ] Credit icon is crisp, not pixelated
- [ ] Balance number aligned properly with icon
- [ ] Dropdown shadow and borders match design system
- [ ] Pack cards have consistent spacing
- [ ] "Most Popular" badge is visible and styled correctly
- [ ] Success confetti animation is smooth, not janky

### Mobile Responsive
- [ ] Balance visible in mobile header (may be icon-only)
- [ ] Dropdown works on mobile (touch-friendly)
- [ ] Purchase modal scrollable on small screens
- [ ] Stripe checkout works on mobile

### Loading States
- [ ] Button shows loading spinner during purchase
- [ ] Balance shows skeleton/shimmer while loading
- [ ] No layout shift when balance loads

### Error States
- [ ] Error messages are human-readable (not technical)
- [ ] Retry options are clear
- [ ] Errors don't break the page
