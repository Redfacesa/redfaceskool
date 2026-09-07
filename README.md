# RedFace Skool (Refesco)

Public name: **RedFace Skool**. Marketplace line: **Refesco**.

Students, instructors, and events meet here. **RedFace Pay** takes the money. This app never talks to Paystack.

Repo: [Redfacesa/redfaceskool](https://github.com/Redfacesa/redfaceskool)

## What this is

Udemy + professional network + events, with a marketplace in the middle.

Red Face does not have to teach. Instructors bring knowledge. Students bring demand. RedFace Skool provides infrastructure, trust, and payouts via RedFace Pay.

```text
Student pays
      ↓
RedFace Skool enrollment (this app)
      ↓
POST RedFace Commerce API /payments
      ↓
Hosted RedFace checkout
      ↓
Student returns
      ↓
RedFace Skool grants access (after paid)
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

Drop brand and catalog images in `public/`:

- `public/shared/logo.png`, `wordmark.png`, `home.jpg`
- `public/covers/{course-slug}.jpg`
- `public/avatars/{instructor-slug}.jpg`

Without those files, RedFace Skool still shows designed cover panels. Swap files in, no code change.

Without `REDFACE_API_KEY`, checkout stays in **demo mode** (no live charge). Enrollments are still recorded.

## Product rules

See [docs/PRODUCT.md](docs/PRODUCT.md) and [docs/PAYMENTS.md](docs/PAYMENTS.md).

- Never call people professors.
- RedFace Skool Certificate of Completion is not an industry certification.
- Do not collect cards in this repo.
