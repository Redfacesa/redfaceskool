# Refesco

**A technology-driven learning marketplace.** Not an online school. Not an LMS.

Students, instructors, and events meet here. **RedFace Pay** takes the money. Refesco never talks to Paystack.

Repo: [Redfacesa/redfaceskool](https://github.com/Redfacesa/redfaceskool)

## What this is

Udemy + professional network + events, with a marketplace in the middle.

Red Face does not have to teach. Instructors bring knowledge. Students bring demand. Refesco provides infrastructure, trust, and payouts via RedFace Pay.

```text
Student pays
      ↓
Refesco enrollment (this app)
      ↓
POST RedFace Commerce API /payments
      ↓
Hosted RedFace checkout
      ↓
Student returns
      ↓
Refesco grants access (after paid)
      ↓
RedFace Pay settles instructor + platform share
```

## Run locally

Needs Node 20+.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

- `/teach` instructor onboarding
- `/account` enrollments by email
- `/setup/pay` RedFace merchant + API key status

Without `REDFACE_API_KEY`, checkout stays in **demo mode** (no live charge). Enrollments are still recorded.

## Product rules

See [docs/PRODUCT.md](docs/PRODUCT.md) and [docs/PAYMENTS.md](docs/PAYMENTS.md).

- Never call people professors.
- Refesco Certificate of Completion is not an industry certification.
- Do not collect cards in this repo.
