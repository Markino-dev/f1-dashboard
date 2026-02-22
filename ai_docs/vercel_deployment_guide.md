# 🚀 Final Step: Deploying your Dashboard to Vercel

Follow these steps to make your F1 Dashboard live on the web!

### 1. Sign Over to Vercel
- Go to [Vercel.com](https://vercel.com/) and sign in using your **GitHub** account.

### 2. Import your Repository
- Click the **"New Project"** button.
- You should see your `f1-dashboard` repository (the one we just pushed to). Click **"Import"**.

### 3. Configure the Project
- **Framework Preset**: Vercel should automatically detect **Next.js**.
- **Root Directory**: Click "Edit" and change it to `frontend` (since our code is inside that folder).

### 4. Add the "Live Data" Connection (CRITICAL)
Before clicking deploy, expand the **"Environment Variables"** section and add this:

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://f1-dashboard-9k7e.onrender.com` |

> [!IMPORTANT]
> This link tells the frontend where your Render backend is. Without this, the dashboard will remain empty!

### 5. Deploy!
- Click **"Deploy"**. 
- Wait ~1 minute for the confetti! 🎉

---

### **How to verify it's working:**
1. Once deployed, click the **"Visit"** button on Vercel.
2. You should see the **"UNLEASHED F1"** dashboard.
3. The names **VER**, **NOR**, **LEC** should appear in the Timing Tower with their live Imola data!

### **What's next?**
Your dashboard is now **Live** and **Automated**. 
- Whenever you want to see a real race, just wake up your Render backend.
- Whenever I make a change to the code, simply push to GitHub and Vercel will update your site automatically!
