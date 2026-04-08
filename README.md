<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0427ba2a-575e-4fad-8500-bff1e62be47b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy on Vercel

1. Push this project to GitHub/GitLab/Bitbucket.
2. Import the repository in Vercel.
3. In Vercel Project Settings -> Environment Variables, add:
   - `GEMINI_API_KEY` = your Gemini API key
4. Deploy.

This project includes `vercel.json` with:
- `framework`: `vite`
- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
