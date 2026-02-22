# F1 Dashboard

A live F1 timing dashboard built with **undercut-f1** as the data backend and **Next.js** on the frontend.

## Project Structure

```
f1-dashboard/
├── backend/          # undercut-f1 .NET data engine (deployed to Render)
├── frontend/         # Next.js web dashboard (deployed to Vercel)
├── ai_docs/          # Project planning documents
└── render.yaml       # Render hosting configuration
```

## Data Available
- Live leaderboard with positions
- Gap to leader & interval to car ahead
- Sector timings (S1, S2, S3) with personal/overall fastest highlighting
- Current tyre compound and tyre age

## Hosting
- **Backend**: [Render.com](https://render.com) (Free tier) — exposes a JSON API at `/data/TimingData/latest` and `/data/TimingAppData/latest`
- **Frontend**: [Vercel.com](https://vercel.com) (Free tier) — polls the backend and renders the dashboard

## Development & Testing

No live race? No problem. Use the undercut-f1 simulation mode with pre-recorded data:

```sh
cd backend
dotnet run --project UndercutF1.Console/UndercutF1.Console.csproj -- --with-api
```

Then visit `http://localhost:61937/data/TimingData/latest` to see live JSON.
