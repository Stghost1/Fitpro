# 🏋️ FitPro — AI-Powered Fitness SaaS

A full-stack fitness SaaS app with gender-specific workouts, weight loss & muscle gain programs, Pro nutrition plans, and Stripe subscription payments.

---

## 📁 Project Structure

```
fitpro-app/
├── pages/
│   ├── index.js              ← Main React app (entire frontend)
│   ├── _document.js          ← PWA meta tags & head setup
│   ├── success.js            ← Stripe payment success page
│   └── api/
│       └── create-checkout.js ← Stripe API endpoint
├── public/
│   ├── manifest.json         ← PWA manifest
│   ├── icon-192.png          ← App icon (you must add this)
│   └── icon-512.png          ← App icon (you must add this)
├── .env.example              ← Environment variable template
├── .gitignore
├── next.config.js
└── package.json
```

---

## 🚀 STEP 1 — Run Locally (5 Minutes)

### Prerequisites
- Node.js 18+ installed → download at https://nodejs.org
- A code editor (VS Code recommended) → https://code.visualstudio.com

### Commands
```bash
# 1. Open terminal in the fitpro-app folder
cd fitpro-app

# 2. Install dependencies
npm install

# 3. Copy the environment file
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open your browser at **http://localhost:3000** — the app is running!

---

## 🌐 STEP 2 — Deploy to Vercel (Free, 10 Minutes)

### 2a. Push to GitHub

1. Go to https://github.com → Click "New repository"
2. Name it `fitpro-app` → Click "Create repository"
3. Open terminal in your fitpro-app folder and run:

```bash
git init
git add .
git commit -m "Initial FitPro commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fitpro-app.git
git push -u origin main
```

### 2b. Deploy on Vercel

1. Go to https://vercel.com → Sign up with GitHub (free)
2. Click **"New Project"**
3. Select your `fitpro-app` repository → Click **"Import"**
4. Click **"Deploy"** (leave all settings as default)
5. Wait ~60 seconds → Your app is live at `https://fitpro-app.vercel.app`

### 2c. Add Environment Variables to Vercel

1. In Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Add these one by one:
   - `STRIPE_SECRET_KEY` = `sk_test_...` (your Stripe key)
   - `STRIPE_PRICE_ID`   = `price_...`  (your Stripe price ID)
   - `NEXT_PUBLIC_BASE_URL` = `https://fitpro-app.vercel.app` (your actual URL)
3. Click **"Save"** → Go to **Deployments** → **Redeploy**

---

## 💳 STEP 3 — Set Up Stripe Payments

### 3a. Create Stripe Account

1. Go to https://stripe.com → Sign up (free)
2. Complete identity verification for live payments

### 3b. Get Your API Keys

1. Stripe Dashboard → **Developers** → **API keys**
2. Copy **Secret key** (starts with `sk_test_` for testing)
3. Paste into `STRIPE_SECRET_KEY` in Vercel environment variables

### 3c. Create a Product & Price

1. Stripe Dashboard → **Products** → **Add product**
2. Name: "FitPro Pro"
3. Pricing model: **Recurring**
4. Price: **$9.99** per **month**
5. Click **Save product**
6. Copy the **Price ID** (starts with `price_...`)
7. Paste into `STRIPE_PRICE_ID` in Vercel environment variables

### 3d. Test Payments

Use Stripe's test card: `4242 4242 4242 4242` · Exp: `12/34` · CVC: `123`

---

## 📱 STEP 4 — Make It Installable (PWA)

### Add App Icons

You need two icon files in the `/public` folder:
- `icon-192.png` — 192×192 pixels
- `icon-512.png` — 512×512 pixels

Create them free at https://favicon.io or https://realfavicongenerator.net

### How Users Install It

**Android (Chrome):**
- Open the app URL in Chrome
- Tap the 3-dot menu → "Add to Home screen"
- Or Chrome shows an automatic install banner

**iPhone (Safari):**
- Open the app URL in Safari
- Tap the Share icon → "Add to Home Screen"
- Tap "Add" — it appears like a real app

---

## 🤖 STEP 5 — Publish to Google Play Store (~$25, 1–3 Hours)

Use Microsoft PWABuilder — free tool that wraps your PWA as an Android app.

1. Go to https://pwabuilder.com
2. Enter your Vercel URL → Click **"Start"**
3. Click **"Package For Stores"** → Select **"Google Play"**
4. Download the `.aab` file

**Submit to Play Store:**
1. Go to https://play.google.com/console → Pay one-time $25 fee
2. Create app → Upload the `.aab` file
3. Fill in: app name, description, category (Health & Fitness), screenshots
4. Content rating questionnaire → Set price: Free (with in-app purchases)
5. Submit → Google reviews in 3–7 days

---

## 🍎 STEP 6 — Publish to Apple App Store ($99/year, Needs a Mac)

Use Capacitor to wrap your web app as a native iOS app.

### Prerequisites
- Mac computer with Xcode installed (free from Mac App Store)
- Apple Developer account: https://developer.apple.com ($99/year)

### Commands

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios

# Initialize Capacitor (replace with your details)
npx cap init "FitPro" "com.yourname.fitpro" --web-dir=out

# Build Next.js as static export
# First add this to next.config.js: output: 'export'
npm run build

# Add iOS platform
npx cap add ios

# Copy web files to iOS
npx cap copy ios

# Open in Xcode
npx cap open ios
```

### In Xcode:
1. Sign in: Xcode → Preferences → Accounts → Add Apple ID
2. Select your Team in the project settings
3. Set Bundle Identifier to match your cap init value
4. Connect iPhone or use Simulator to test
5. Product → Archive
6. Distribute App → App Store Connect → Upload

### In App Store Connect (https://appstoreconnect.apple.com):
1. My Apps → New App
2. Fill in all metadata: name, description, keywords, screenshots
3. Select your uploaded build
4. Submit for Review — Apple reviews in 1–3 days

---

## 🛡️ SECURITY CHECKLIST (Before Going Live)

- [x] No API keys in frontend code
- [x] Stripe secret key only used server-side (in /api route)
- [x] Security headers set in next.config.js
- [x] .env.local is in .gitignore
- [ ] Enable Stripe webhook signature verification for production
- [ ] Add rate limiting to /api/create-checkout (use upstash/ratelimit)
- [ ] Set up Stripe webhook to verify payments server-side
- [ ] Add Cloudflare for DDoS protection (free tier)

---

## 💰 MONETIZATION SUMMARY

| Plan    | Price      | Features                                          |
|---------|------------|---------------------------------------------------|
| Free    | $0/month   | 3 workouts/week, basic library, progress tracking |
| Pro     | $9.99/month| Everything + nutrition, unlimited workouts, AI    |
| Pro Annual | $79.99/year | Same as Pro — save 33%                       |

**Revenue target:** 100 Pro subscribers = ~$999/month recurring

---

## 📞 SUPPORT

Questions? Open an issue on GitHub or reach out via email.

Built with: Next.js · React · Lucide Icons · Stripe · Vercel
