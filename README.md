# Zunaira Khan · Immersive Portfolio

Modern, cinematic portfolio for showcasing Figma labs, Miro strategy boards, motion reels, galleries, and storytelling-driven case studies. The experience now flows through a GSAP-orchestrated scroll narrative with aurora gradients, expressive typography, and real-time hero motion.

## Tech Stack
- Next.js 16 · React 19 · TypeScript
- GSAP ScrollTrigger + ScrollTo for narrative-driven transitions
- Tailwind CSS 4 with shadcn/ui patterns (`components/ui`)
- Framer Motion + GSAP for motion (hero kinetics, floating chips, entry choreography)
- React-Three-Fiber + drei-inspired tooling for the Orbital Garden hero scene
- Theme system powered by `next-themes`

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the dev server
   ```bash
   npm run dev
   ```
3. Visit http://localhost:3000

### Available scripts
- `npm run dev` – development
- `npm run build` – production build
- `npm run start` – run the production server
- `npm run lint` – lint via ESLint 9

## Content Configuration (`data/content.json`)
The entire homepage is driven by JSON so new work can be added without touching React code.

```jsonc
{
  "name": "Zunaira Khan",
  "hero": { ... },
  "techStack": { ... },
  "sections": [
    {
      "id": "hero-narrative",
      "type": "hero-narrative",
      "title": "Northern Lights Narrative",
      "narrative": [ { "heading": "…", "body": "…" } ],
      "stats": [ { "label": "Launch windows", "value": "45 days" } ]
    }
  ]
}
```

Supported section `type` values out of the box:
- `hero-narrative` – immersive storytelling blocks with stats + pull quotes
- `manifesto` – animated manifesto tiles for core principles
- `highlights` – auto-playing carousel for recent wins
- `growth-lab` – embeds for Figma, Miro, or web-based experiments
- `motion-reels` – cinematic video embeds (YouTube, Vimeo, Loom, etc.)
- `capabilities` – Nordic glassmorphism grid driven by JSON metadata
- `resources` – links to playbooks, kits, or external tools
- `contact` – collaboration CTA with multi-channel handoff

Each section automatically receives styling, animation, and anchor ids used by the GSAP-powered dotted navigation.

## Adding New Section Types
1. Add the new section object in `data/content.json` with `type: "your-type"`.
2. Create a component under `components/sections/` (use existing files as templates, remember to add expressive fonts/classes).
3. Register the new renderer inside `components/sections/section-renderer.tsx`.
4. Optionally extend the Zod schema in `lib/content-schema.ts` for validation.

## Experiential Controls
- **Aurora background**: `components/visuals/aurora-background.tsx` wraps the app and drives ambient gradients. Tweak or add new blobs there.
- **Scroll orchestration**: `app/page.tsx` sets up GSAP ScrollTrigger + ScrollTo and feeds the dotted nav (`components/layout/scroll-dots-nav.tsx`) with active-section updates.
- **Hero motion**: `components/hero/hero-banner.tsx` combines GSAP timelines with the React-Three-Fiber Orbital Garden. Floating chips use perpetual sine easing; adjust ranges in the `gsap.to` calls for a different “physics”.
- **Typography**: Playfair Display (display serif) + Space Grotesk (creative grotesque) helpers are available via `.font-display` and `.font-creative` utility classes (defined in `app/globals.css`).

## Media Embed Cheatsheet
- **Figma**: use `https://www.figma.com/embed?embed_host=share&url=...`
- **Miro**: use board share link + `https://miro.com/app/embed/<board-id>/`
- **YouTube/Vimeo**: provide the iframe URL (`https://www.youtube.com/embed/...`)
- **Gallery**: add remote images (allowlist domains in `next.config.ts`)
- **PDF placeholder**: drop files into `public/assets` and set the relative path

## Styling & UX
- Global palette + radius tokens live in `app/globals.css`
- Aurora gradient + glow utilities are in `components/visuals/aurora-background.tsx` and the `.glimmer-outline` utility
- Theme system lives in `ThemeProvider` (see `app/layout.tsx`). Re-enable the toggle via `components/theme-toggle.tsx` when needed.
- Smooth navigation now relies entirely on GSAP ScrollTo/ScrollTrigger; Lenis and fullpage.js were removed to minimise overlap.

### Adding experimental flourishes
- Hook future analytics/contact integrations inside `components/sections/pdf-section.tsx` (comment included)
- Inject additional 3D layers within `components/hero/orbital-garden.tsx`
- For alternative storytelling modes, adjust the layout orchestration inside `app/page.tsx`

## Deployment
Ready for Vercel, Netlify, or GitHub Pages (static export not recommended if you keep live embeds).

### Vercel
1. Push to GitHub
2. "Import Project" in Vercel
3. Use `npm install && npm run build`

### Netlify
1. `npm run build`
2. Deploy using the `Next.js (SSR)` preset

### GitHub Pages
Use `next export` only if you convert embeds to static-friendly options. Otherwise prefer Vercel/Netlify for SSR.

## Future Hooks
- Contact form or CRM integration: drop endpoint inside `app/api/` and surface CTA in the footer
- Analytics: initialize in `app/layout.tsx` (look for the comment block) when ready
- Blog/MDX: add new routes in `app/(site)/blog` and link via header navigation

Enjoy crafting the cinematic creative garden! 🌿
