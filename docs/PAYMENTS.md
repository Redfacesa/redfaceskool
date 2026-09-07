# Payments: Refesco uses RedFace Pay

Refesco is a **commerce client**. RedFace Pay is the **payment infrastructure**.

Students and instructors never see Paystack in Refesco. Card UI, if any, lives on hosted RedFace checkout.

## Contract

```text
Refesco offer (course / live / event ticket)
      ↓
Refesco enrollment (pending)
      ↓
POST {REDFACE_COMMERCE_API_BASE}/payments
  Authorization: Bearer rf_live_…
  Idempotency-Key: refresco:{enrollmentId}
  { amount, currency, label, business_id, metadata }
      ↓
checkout_url (hosted RedFace Pay)
      ↓
Buyer pays
      ↓
GET /payments/:id until status = paid
      ↓
Refesco enrollment = paid (access)
```

Metadata should include:

- `origin`: `refresco`
- `offer_id`, `offer_kind` (`course` | `live` | `event`)
- `instructor_id`
- `enrollment_id`
- `student_email`
- `student_handle`
- `platform_share_bps` (e.g. 2000 = 20%)

Enrollments are stored in `.data/store.json` on this app (gitignored). Paid is set only after RedFace reports paid, or in demo mode. Instructor payouts still happen on RedFace, not in that file.

Live merchant steps: `/setup/pay`

Settlement split to instructors is a **RedFace Pay / subaccount** concern later. v1 records the intended share in metadata. Do not build a second ledger in Refesco.

## Env

| Variable | Purpose |
|----------|---------|
| `REDFACE_COMMERCE_API_BASE` | Commerce API URL |
| `REDFACE_API_KEY` | `rf_live_…` or `rf_test_…` |
| `REDFACE_BUSINESS_ID` | Refesco platform merchant on RedFace |
| `REDFACE_CHECKOUT_RETURN_URL` | `/checkout/return` |

Never store Paystack secret keys in this repository.

## Demo mode

If `REDFACE_API_KEY` is empty, `src/lib/redfacePay.ts` returns a local demo checkout URL. No money moves.

## Revenue (product, not code)

Default marketplace share: instructor 80%, Refesco 20%. Memberships, instructor Pro, events take, and corporate seats are later SKUs. Do not implement subscriptions in v1.
