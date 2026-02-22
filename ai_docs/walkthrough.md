# 🏁 Project Walkthrough: Unleashed F1 Dashboard

Your F1 Dashboard is officially live! We have successfully transformed a complex terminal data engine into a sleek, visual cloud application.

## 🚀 Final Achievement
- **Live Stream**: The dashboard is currently replaying the **Imola 2024 GP**.
- **Timing Engine**: Hosted on Render.com ([Live API](https://f1-dashboard-9k7e.onrender.com/data/TimingData/latest)).
- **Visual Interface**: Hosted on Vercel ([Your Dashboard](https://f1-dashboard-coral-one.vercel.app)).

## 🛠️ What We Built

### 1. The "Glue" Logic (Data Mirroring)
We solved the problem where the backend only sent numbers (`1`, `4`, etc.). I built a custom hook that merges those numbers with real F1 metadata:
- **Names**: VER, NOR, LEC, etc.
- **Teams**: Red Bull, McLaren, Ferrari.
- **Colors**: Correct HEX codes for every team color bar.

### 2. Premium Timing Tower (Broadcast Mode)
- **Sector Telemetry**: Live sector times (not just dots) with color coding (Purple/Green/Yellow).
- **Tyre Management**: Visual compound tracking (Soft/Medium/Hard) and stint age.
- **Pit Tracking**: Real-time "PIT" labels and pit stop counts.
- **Intervals**: Dedicated columns for Gaps to Leader and Gaps to the car ahead.
- **Fastest Lap King**: Session-wide fastest lap detection highlighted with ⏱️.

### 3. Simplified Full-Width Layout
We removed secondary widgets like Race Control and Weather to ensure the timing data has maximum screen real estate, making it perfect for a secondary monitoring screen.

## 📖 How to use your Dashboard

### **During a Race**
1.  **Wake up the Server**: Visit your Render URL once.
2.  **Open Dashboard**: Refresh your Vercel link.
3.  **Real-Time Data**: The "Simulated" mode we set up acts as a perfect training ground for when a real race takes place.

### **Updating the Look**
I've pushed all the code to your GitHub. If you ever want to change a color or a font:
1.  Edit the code in `frontend/src`.
2.  Push to GitHub.
3.  Vercel will update your site automatically in seconds.

## 🏁 Going Live: Real-Time Mode

When it's race time and you want to switch from the simulation to **real-time data**:

1.  **Get a Token (Free or Paid)**: You don't necessarily need a paid subscription for basic timing.
    - Go to [Formula1.com](https://www.formula1.com) and log in (a free account works).
    - Open your browser's **Developer Tools** (F12) -> **Application** tab -> **Cookies**.
    - Find the cookie named **`dynamic_cookies`** or search for a JSON string containing `subscriptionToken`. 
    - > [!TIP]
      > Usually, you can find the correct string by looking for a cookie value that starts with `{"data":{"subscriptionToken":"...`
2.  **Render Environment**: Add your token as an Environment Variable in the Render dashboard:
    - Key: `UNDERCUTF1_FORMULA1ACCESSTOKEN`
    - Value: `YOUR_TOKEN_HERE` (Paste the entire JSON string or just the token part depending on the engine's expectation).
3.  **Live Source**: The engine is already configured to prioritize live data. Once a session begins, it will automatically switch from the local "Sample Data" to the live stream coming from the F1 servers.

> [!NOTE]
> Detailed telemetry like car positions on a map or specific tire compounds *sometimes* requires a paid F1 TV Pro subscription, but the overall timing tower should function with any valid F1 account token.

**Enjoy the unfolding race!** 🏎️💨
