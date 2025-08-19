# Gopi Portfolio – Professional, Responsive, and Azure-Ready

A clean, single-source-of-truth portfolio built with Next.js (App Router) and **one editable content file**. Optimized for deployment on **Azure App Service** (Linux, Node 20 LTS).

Live: **[https://gopiportfolioapp.azurewebsites.net/](https://gopiportfolioapp.azurewebsites.net/)**

---

## ✨ Features

* Single content file at `src/content/site-data.ts` (About, Experience, Projects, Skills, Education, Contact)
* App Router with modular sections in `src/app/page.tsx`
* Theming via `src/app/layout.tsx` and `src/app/globals.css`
* Built-in **Contact API** (Resend) and **AI Chat API** (Gemini)
* [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font)

---

## 🚀 Getting Started (Local)

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Open the app
# http://localhost:3000
```

Edit your content at:

```
src/content/site-data.ts
```

The home page reads from this file to render **About, Experience, Projects, Skills, Education, and Contact**.

---

## 🔐 Environment Variables

Create a `.env.local` in the project root:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_destination_email
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

> **Security tips**
>
> * Never commit `.env*` files.
> * In Azure, put these in **App Service → Configuration → Application settings** as **name/value pairs**.
> * Prefix only variables that must be exposed to the browser with `NEXT_PUBLIC_`.

---

## ☁️ Deploy on Azure App Service (Linux, Node 20)

### Option A — Quick deploy with Azure CLI

Requires the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) and an Azure subscription.

```bash
# Login
az login

# From project root
az webapp up \
  --name gopiportfolioapp \
  --resource-group gopiportfolioapp \
  --runtime "NODE:20-lts" \
  --os-type Linux
```

**Configure App Settings (env vars):**

1. Azure Portal → App Services → `gopiportfolioapp` → **Configuration** → **Application settings**
2. Add each variable from the **Environment Variables** section
3. **Save** and **Restart** the app

**Build & Start Commands (Linux App Service):**

* Azure’s Node container will run `npm install` and `npm start` by default. Ensure these scripts exist in `package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p 8080",
    "dev": "next dev"
  }
}
```

> App Service uses port **8080** internally. Setting `next start -p 8080` avoids port conflicts.

**Node Version**

* Already set by `--runtime "NODE:20-lts"`. If you need to change later: App Service → **Configuration** → **General settings** → **Node version**.

**Logs & Debugging**

* App Service → **Log stream** for real-time logs
* App Service → **Diagnose and solve problems** for detectors
* Enable **Application Logging (Filesystem)** for deeper diagnostics

### Option B — CI/CD via GitHub Actions

1. In Azure Portal: App Service → **Deployment Center** → **GitHub** → select repo/branch → **Finish**
2. Azure will generate `.github/workflows/azure-webapps.yml` with steps to build and deploy
3. Confirm the workflow uses Node `20.x`, runs `npm ci && npm run build`, and deploys the `.next` output

Minimal example (snippet):

```yaml
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: azure/webapps-deploy@v3
        with:
          app-name: gopiportfolioapp
          publish-profile: ${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE }}
```

> Add your **Publish Profile** in the repo secrets as `AZUREAPPSERVICE_PUBLISHPROFILE` (App Service → **Get publish profile**).

---

## 🌐 Optional: Custom Domain & HTTPS (Azure)

1. App Service → **Custom domains** → **Add custom domain**
2. Create DNS **CNAME** to `gopiportfolioapp.azurewebsites.net`
3. Back in App Service, **Validate** and **Add**
4. Turn on **TLS/SSL** → **Private Key Certificates** → **Create App Service Managed Certificate** → **Bind** to your domain

---

## 🧩 Project Structure (key files)

* `src/content/site-data.ts` — **single place to update your details**
* `src/app/page.tsx` — page composition and sections
* `src/app/layout.tsx` — theme provider and global layout
* `src/app/globals.css` — theme variables and utility classes
* `src/app/api/contact/route.ts` — **Resend** email API (set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`)
* `src/app/api/ai/route.ts` — **Gemini** chat API (set `GEMINI_API_KEY`)

---

## 🧪 Health Checks & Troubleshooting

* **Blank page / 404 after deploy**: ensure `npm run build` succeeded (check Deployment Center logs). Make sure `start` script is `next start -p 8080`.
* **500/502 errors**: check **Log stream** and **Container settings**; confirm Node version is 20 and environment variables are present.
* **API 500 (Contact/AI)**: missing keys, wrong env names, or network egress restrictions.
* **CORS issues**: if calling APIs from a different origin, allow your domain in API route logic or proxy via Next API routes.
* **Slow first load**: enable caching headers where safe; consider Image Optimization and static assets.

---

## 🔎 SEO & Analytics (optional)

* Configure `metadata` in `src/app/layout.tsx`
* Add Open Graph images
* Add analytics (e.g., Google Analytics, Azure Application Insights) via App Router instrumentation

---

## 📄 License

MIT (or your preferred license)

---

## 🙌 Credits & Feedback

Built with Next.js. Fonts by Geist. Hosting on Azure App Service.

Questions or suggestions? Open an issue or reach out via the **Contact** form on the live site.
