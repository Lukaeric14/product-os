# Linear Tickets: Credits & Billing System

**Project:** Credits & Billing (Obaid - W02)

---

## Ticket 1: Credit Balance Backend

**Title:** Set up credit balance model and API endpoints

**Description:** Create the database model for credit balances and transactions, plus API endpoints for reading balance and history.

**Acceptance Criteria:**
- [ ] `credit_balances` table: userId, balance, updatedAt
- [ ] `credit_transactions` table: userId, type, amount, description, createdAt
- [ ] GET `/api/credits/balance` returns current balance
- [ ] GET `/api/credits/history` returns paginated transactions
- [ ] Balance updates atomically (no race conditions)

**Links:**
- PRD: [Section 6 - How](link)

---

## Ticket 2: Credit Balance UI

**Title:** Display credit balance in header

**Description:** Show credit balance in the app header with dropdown for quick actions.

**Acceptance Criteria:**
- [ ] Balance visible in header next to user avatar
- [ ] Format: [coin icon] + number (e.g., "125")
- [ ] Click opens dropdown with balance, "Buy Credits", "View History"
- [ ] Balance updates after purchase/deduction without page refresh
- [ ] Shows "0" when empty (not hidden)
- [ ] Works on mobile (icon-only acceptable)

**Images:**
[Attach Excalidraw: header-balance-dropdown.png]

**Links:**
- PRD: [Section 6 - Credit Balance Display](link)

---

## Ticket 3: Credit Purchase Flow

**Title:** Build credit pack purchase flow with Stripe

**Description:** Users can buy credit packs via Stripe checkout modal.

**Acceptance Criteria:**
- [ ] "Buy Credits" button on Settings > Billing page
- [ ] Modal shows 3 packs: Basic ($10/100), Standard ($25/275), Pro ($50/600)
- [ ] Standard pack highlighted as "Most Popular"
- [ ] Stripe checkout opens in modal (not redirect)
- [ ] Success: confetti animation, balance updates, modal closes
- [ ] Failure: error message with retry option
- [ ] Purchase recorded in transaction history

**Images:**
[Attach Excalidraw: credit-pack-modal.png]

**Links:**
- PRD: [Section 6 - Purchase Flow](link)
- Stripe docs: [Payment Intents](https://stripe.com/docs/payments/payment-intents)
