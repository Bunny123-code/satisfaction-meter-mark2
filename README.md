# Satisfaction Meter – Offline Customer Feedback App

Thank you for using **Satisfaction Meter**! This app lets your customers give quick feedback (Happy 😊, Neutral 😐, Unhappy 😠) with optional comments.  
All data stays on the device – no internet needed after installation. Perfect for a store tablet or kiosk.

---

## 🚀 How to install on your tablet or phone

### Option 1: Install from the web (GitHub Pages) – recommended
1. On your **Android tablet** or **iPhone/iPad**, open Chrome or Safari.
2. Go to this address (replace with your real GitHub Pages URL):  
   `https://Bunny123-code.github.io/satisfaction-meter-mark2/`
3. The app will load. You will see the customer feedback screen.
4. **Install as an app**:
   - **Android (Chrome)**: tap the three dots menu → **Install app** → tap **Install**.
   - **iPhone/iPad (Safari)**: tap the **Share** icon (square with arrow) → scroll down → tap **Add to Home Screen** → tap **Add**.
5. After installation, an icon named “SatMeter” will appear on your home screen.
6. **Now you can turn off Wi-Fi / mobile data** – the app works completely offline forever.

### Option 2: Copy files from a USB drive (advanced)
If you received the files on a USB stick:
- Copy the entire folder to your tablet’s internal storage.
- Open the `index.html` file in a browser.
- Then follow the “Install app” steps above (the browser will offer to install it).

---

## 📝 How to use the Customer screen

1. Open the app from your home screen.
2. **Store name** appears at the top. To change it, edit the `index.html` file (look for `const STORE_NAME = "My Store";` near the top of the script).
3. Customer taps one of the three large emoji buttons:  
   😊 Happy – 😐 Neutral – 😠 Unhappy
4. (Optional) Writes a short comment (max 300 characters).
5. Taps **Submit Feedback**.
6. A “Thank you!” message appears, then the form resets for the next customer.
7. Repeat for as many customers as you like.

---

## 📊 How to view feedback (Dashboard)

- From the customer screen, tap the **📊 Dashboard** button in the top bar.
- Or open the app and tap the **Dashboard** link.
- The dashboard shows:
  - Total responses
  - Counts and percentages for each mood
  - A simple bar chart
  - The 20 most recent comments with date/time
- **Refresh** button reloads the latest data.
- **Export Data** saves all feedback as a JSON file (backup).
- **Import Data** lets you restore a backup or move data to another device.
- **Reset All Data** clears everything (use with care – asks for confirmation).

---

## 🔧 Changing the store name

1. Open the `index.html` file in a text editor (on a computer).
2. Find this line near the top of the `<script>` section:  
   `const STORE_NAME = "My Store";`
3. Change `"My Store"` to your actual store name (e.g., `"Coffee Corner"`).
4. Save the file and re-upload to your device (or copy it again).
5. The new name will show on the customer screen.

---

## 💾 Data storage & offline

- All feedback is saved inside your device using **IndexedDB** (a built-in browser database).
- No internet connection is ever needed after the first installation.
- Data stays on the device even if you close the app or restart the tablet.
- To move data to another tablet, use **Export Data** on the old device, transfer the JSON file, then **Import Data** on the new device.

---

## ❓ Troubleshooting

**The app won’t install / no “Install app” option?**  
- Make sure you are using Chrome on Android or Safari on iOS. Other browsers may not support installation.
- Try refreshing the page and waiting a few seconds.

**I can’t see the dashboard / chart?**  
- Make sure you have submitted at least one feedback.
- Tap the **Refresh** button on the dashboard.

**How do I delete a single feedback?**  
- The app does not support deleting single entries (to keep it simple). Use **Reset All Data** to clear everything, or export data, edit the JSON file, then re-import.

**The app asks for internet after installation?**  
- That shouldn’t happen. All core files are cached. If you see an error, reinstall the app: remove it from home screen, open the URL again, and re-install.

---

## 📁 File structure (for tech-savvy owners)
