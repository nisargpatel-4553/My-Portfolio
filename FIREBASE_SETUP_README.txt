FIREBASE AUTHENTICATION SETUP — READ THIS FIRST
==================================================

Navbar ma have "Login" button ane user "Signup / Login / Forgot Password / Logout"
badhu kaam kare che. firebase-config.js file ma tamara project "my-portfolio-b3460"
ni keys already nakhi didhi che — have vadhu karvani jarur nathi, sirf niche na
2 steps confirm kari lo:

STEPS:
1. https://console.firebase.google.com -> "my-portfolio-b3460" project kholo
   -> Left sidebar -> Build -> Authentication -> "Sign-in method" tab
   -> "Email/Password" Enabled che ke nahi check karo (nahi to Enable + Save karo).

2. GitHub Pages par deploy karva mate:
   Firebase Console -> Authentication -> Settings tab -> "Authorized domains"
   ma tamaru GitHub Pages domain add karo
   (e.g. yourusername.github.io)
   — nahi to login/signup "unauthorized domain" error aapse.

3. Files ne GitHub par push karo — badhu automatically kaam karse.
   Koi build step ni jarur nathi, badhu plain HTML/CSS/JS che.

FILES ADDED / CHANGED:
- PORTFOLIO.html   -> navbar ma Login button + user chip + auth modal ume ryu
- style.css        -> auth modal + user chip ni styling (existing dark theme prama j)
- firebase-config.js -> tamara "my-portfolio-b3460" project ni keys already set che
- auth.js          -> Login / Signup / Forgot Password / Logout logic

Koi issue aave to console (browser DevTools -> Console tab) ma error joi shakay,
Firebase generally clear error message aape che (e.g. wrong password, email already in use, etc.)
