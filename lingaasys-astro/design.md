# Lingaasys Design System

This document describes the implemented Lingaasys Astro + TypeScript website. The project keeps one visual system while giving each page its own interaction language.

## 1. Design philosophy
Premium, professional, human-centered and technology-driven. Sharp geometry, strong typography, orange accent, white/grey/dark surfaces and purposeful motion. Internal pages are not copies of homepage sections.

## 2. Brand and typography
- Brand: Lingaasys; tagline: “Creating Systems for Humanity”.
- Accent: `#F26522`.
- Font: Sora with system fallbacks.
- Heading scale uses responsive `clamp()` values; body is 16px/1.65.

## 3. Color tokens
- `--or`: `#F26522` accent
- `--bg`: `#FFFFFF` light surface
- `--gr`: `#F1F1F0` grey surface
- `--line`: `#DADAD8` borders
- `--mute`: `#5E5E5B` secondary text
- `--fg`: `#141414` primary ink
- `--dk`: `#111111` dark surface

## 4. Shared UI
Header/navigation, footer, buttons, skip link, responsive container, chatbot, focus states and reduced-motion behavior are shared. Only the current route receives `aria-current="page"`.

## 5. Homepage
The homepage is an entry point and summary. It contains the existing network hero, “Creating Systems for Humanity” headline loop, short About/Culture/Technologies/Industries/Careers/Contact previews and CTAs to the full pages.

## 6. Page-specific experiences
- **About:** editorial story, What We Build hover items and Understand → Design → Build → Improve flow.
- **Culture:** sequential SOONER / SAFER / HAPPIER hero, active principle rows, editorial values stream and human-centered typography.
- **Industries:** hover/tap explorer with subdued non-selected items, short description and View More routing to eight dedicated detail pages.
- **Technologies:** code-editor visual, technology ecosystem nodes with descriptions, and Frontend → API → Backend → Database → Intelligence flow.
- **Careers:** Build Your Future With Us, Internship / Full Time paths, role details, Why Join Lingaasys, four-step application flow and resume upload/prefill behavior.
- **Contact:** meaningful-contact hero, social/contact options, form, communication network visual and existing chatbot.

## 7. Motion
Motion is lightweight and purposeful: scroll reveals, hover transitions, page-specific network/code/culture/flow animations and chatbot idle motion. `prefers-reduced-motion` disables decorative animation.

## 8. Accessibility and responsive behavior
Semantic headings, labels, focus styles, `aria-live`, `aria-pressed`, `aria-current`, keyboard-friendly controls and touch fallbacks are used. Layouts adapt for desktop, tablet and mobile.

## 9. Content/data
Navigation and reusable preview content live in `src/data/site.ts`. Industry detail content lives in `src/data/industries.ts`. Contact links remain null until real company values are supplied; the UI marks unavailable links rather than inventing URLs.

## 10. Architecture
Reusable page-specific components live under `src/components/about`, `culture`, `industries`, `technologies`, `careers` and `contact`. Routes live under `src/pages`, including eight industry detail routes.
