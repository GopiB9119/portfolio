Professional, responsive portfolio with a single editable content file.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit your content in `src/content/site-data.ts`. The home page reads from this file to render About, Experience, Projects, Skills, Education, and Contact.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Customize

Key files:

- `src/content/site-data.ts` — single place to update your details
- `src/app/page.tsx` — page composition and sections
- `src/app/layout.tsx` — theme provider and global layout
- `src/app/globals.css` — theme variables and utility classes
 - `src/app/api/contact/route.ts` — Resend email API (set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in `.env.local`)
 - `src/app/api/ai/route.ts` — Gemini chat API (set `GEMINI_API_KEY`)

### Environment variables

Create a `.env.local` in the project root with:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_destination_email
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
