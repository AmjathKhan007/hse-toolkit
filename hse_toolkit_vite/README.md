# HSE Toolkit — Vite React Starter

This repository is a starter React + Vite project containing a subset of the HSE Toolkit features:
- Safe Man-Hours calculator
- TRIR / AFR / FAR calculator
- Man-Days Worked calculator
- LTI Tracker
- Downloadable A4 PDF reports (via @react-pdf/renderer)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build locally:
```bash
npm run preview
```

## Deploy to Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Netlify base directory: (leave blank if files are at repo root)

If you encounter build errors, ensure `index.html` and `src/main.jsx` are at the repository root so Vite can resolve imports.
