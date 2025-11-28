# KasaEd Deployment Guide

## 🚀 Quick Start (Development)

The application is currently running on your local machine!

**Development Server:** http://localhost:3000

Click the preview button in your IDE to view the application.

---

## 📦 Building for Production

### 1. Create Production Build

```bash
cd c:\Users\Jerry\Desktop\Kasa_Qoder\kasaed-app
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Preview Production Build

```bash
npm run preview
```

Tests the production build locally before deployment.

---

## ☁️ Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel:**

- Zero configuration for Vite projects
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps:**

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   cd c:\Users\Jerry\Desktop\Kasa_Qoder\kasaed-app
   vercel
   ```

3. Follow prompts:

   - Project name: `kasaed-app`
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`

4. Your app will be live at: `https://kasaed-app.vercel.app`

### Option 2: Netlify

**Steps:**

1. Create `netlify.toml`:

   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy:
   - Push to GitHub
   - Connect repository at https://netlify.com
   - Auto-deploy on push

### Option 3: GitHub Pages

**Steps:**

1. Update `vite.config.js`:

   ```js
   export default defineConfig({
     base: "/kasaed-app/",
     // ... rest of config
   });
   ```

2. Install gh-pages:

   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json`:

   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Firebase Hosting

**Steps:**

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:

   ```bash
   firebase init hosting
   ```

3. Configure:

   - Public directory: `dist`
   - Single-page app: `Yes`
   - GitHub deploys: `Optional`

4. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## 🔧 Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
VITE_APP_NAME=KasaEd
VITE_API_URL=https://api.kasaed.gh
VITE_ENABLE_ANALYTICS=true
VITE_OFFLINE_MODE=true
```

Access in code:

```js
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📱 PWA Installation

After deployment, users can install KasaEd as an app:

### Android

1. Open site in Chrome
2. Tap menu (⋮) → "Install app" or "Add to Home screen"
3. KasaEd appears as native app

### iOS

1. Open site in Safari
2. Tap Share (📤) → "Add to Home Screen"
3. KasaEd appears on home screen

### Desktop (Chrome/Edge)

1. Click install icon (⊕) in address bar
2. Or Settings → "Install KasaEd..."
3. Launches as standalone app

---

## 🔒 Security Checklist

Before production deployment:

- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set security headers:
  ```
  Content-Security-Policy: default-src 'self'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  ```
- [ ] Verify encryption keys are not hardcoded
- [ ] Test panic button functionality
- [ ] Confirm hotline numbers are correct
- [ ] Review privacy policy
- [ ] Test offline mode
- [ ] Verify session expiration (15 min)

---

## 📊 Monitoring & Analytics

### Setup (Optional)

1. **Google Analytics 4** (Privacy-compliant):

   ```bash
   npm install @analytics/google-analytics
   ```

2. **Sentry** (Error tracking):

   ```bash
   npm install @sentry/react
   ```

3. Configure in `main.jsx`:

   ```js
   import * as Sentry from "@sentry/react";

   if (import.meta.env.PROD) {
     Sentry.init({
       dsn: "YOUR_SENTRY_DSN",
       beforeSend(event) {
         // Filter sensitive data
         return event;
       },
     });
   }
   ```

---

## 🧪 Testing Before Deployment

### Manual Testing Checklist

- [ ] Onboarding flow completes successfully
- [ ] All 4 languages switch correctly
- [ ] Crisis keywords trigger emergency screen
- [ ] Panic button clears data and exits
- [ ] Voice input works (Chrome/Edge)
- [ ] Offline mode shows FAQ
- [ ] Hotline links open dialer
- [ ] Chat history saves and loads
- [ ] Dark mode toggles correctly
- [ ] Font size adjustment works
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] PWA manifest valid
- [ ] Service worker caches assets

### Browser Testing

Test on:

- Chrome (Windows, Android)
- Firefox (Windows)
- Safari (iOS, macOS)
- Edge (Windows)

### Accessibility Testing

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Use browser extensions:
# - WAVE (Chrome)
# - axe DevTools (Chrome/Firefox)
# - Lighthouse (Chrome DevTools)
```

---

## 🌍 Domain Setup (Optional)

### Custom Domain on Vercel

1. Purchase domain (e.g., kasaed.gh)
2. Add domain in Vercel dashboard
3. Update DNS:
   ```
   A Record: 76.76.21.21
   CNAME: cname.vercel-dns.com
   ```
4. HTTPS auto-configured

### SSL Certificate

Automatic on Vercel/Netlify. For custom hosting:

```bash
# Using Certbot (Let's Encrypt)
sudo certbot certonly --webroot -w /var/www/kasaed -d kasaed.gh
```

---

## 📈 Performance Optimization

### Already Implemented

- ✅ Code splitting (Vite automatic)
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression
- ✅ Service worker caching

### Additional Optimizations

1. **Image Optimization**:

   ```bash
   npm install --save-dev vite-plugin-imagemin
   ```

2. **Bundle Analysis**:

   ```bash
   npm run build -- --mode analyze
   ```

3. **CDN for Static Assets**:
   - Upload to Cloudflare CDN
   - Update paths in build

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy KasaEd

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📞 Post-Deployment Support

### User Support Channels

1. **In-App Help** - Already integrated
2. **Email Support**: support@kasaed.gh
3. **Hotline**: +233 XX XXX XXXX
4. **FAQ Page**: /faq (to be created)

### Monitoring Metrics

Track:

- Daily Active Users (DAU)
- Session duration
- Crisis hotline referrals
- Most asked questions
- Language preferences
- Error rates
- Page load times

---

## 🆘 Troubleshooting

### Common Issues

**Issue:** App won't load in production

- Check browser console for errors
- Verify base URL in vite.config.js
- Ensure HTTPS is enabled

**Issue:** Service worker not updating

- Clear browser cache
- Increment version in manifest
- Force refresh (Ctrl+Shift+R)

**Issue:** Encryption errors

- Verify CryptoJS is bundled
- Check browser compatibility
- Test in incognito mode

---

## 📋 Pre-Launch Checklist

- [ ] All features tested on production build
- [ ] Privacy policy reviewed by legal
- [ ] Content validated by medical professionals
- [ ] Hotline numbers verified
- [ ] Domain configured (if using custom)
- [ ] SSL certificate active
- [ ] Analytics configured (opt-in)
- [ ] Error monitoring setup
- [ ] Backup strategy in place
- [ ] User support channels ready
- [ ] Marketing materials prepared
- [ ] Press release drafted
- [ ] Social media accounts created
- [ ] Launch date scheduled

---

## 🎉 Launch Day

1. **Final deployment** (early morning)
2. **Smoke test** all critical features
3. **Monitor** error logs for first 24h
4. **Announce** on social media
5. **Engage** with early users
6. **Collect** feedback
7. **Iterate** based on data

---

## 📞 Emergency Contacts

If issues arise post-deployment:

- **Technical Lead**: [Your contact]
- **Medical Advisor**: Ghana Health Service
- **Legal**: [Lawyer contact]
- **Hosting Support**: Vercel/Netlify support

---

**KasaEd is ready to launch! 🚀**

Follow this guide for a smooth, successful deployment.

Questions? Refer to README.md or PROJECT_SUMMARY.md for additional details.
