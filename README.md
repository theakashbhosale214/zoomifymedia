# Zoomify Media — website

React 19 + Vite + Tailwind CSS v4, animated with [Motion](https://motion.dev) and [Lenis](https://lenis.darkroom.engineering) smooth scrolling.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run lint
```

Vite 8 needs **Node 20.19+ or 22.12+**.

## The story hero

The page opens with a pinned, scroll-driven "film" (`src/components/Story.jsx`) in five chapters:

| # | Chapter | What happens on screen |
| --- | --- | --- |
| 01 | Unseen | A crowd of grey posts; the camera zooms into one of them, the brand |
| 02 | Story | A camera viewfinder frames a sunrise |
| 03 | Craft | An edit timeline cuts between shots while colour-grade sliders move |
| 04 | Reach | The frame becomes a phone, the post goes live, likes and enquiries arrive |
| 05 | Growth | A growth line sweeps the screen behind the closing headline and buttons |

Everything is drawn in code, so no footage is needed. The chapter lines live in `content.story.chapters`. Visitors with reduced motion turned on see chapter 05 as a static hero.

## Editing the site

| What | Where |
| --- | --- |
| All copy: story lines, services, clients, process, FAQ, contact details | `src/data/content.js` |
| Colours, fonts, easing | the `@theme` block at the top of `src/index.css` |
| Client logos | `src/assets/clients/` (trimmed WebP files), listed in `content.js` with an industry for the filters |

In `content.js`, wrapping words in `*asterisks*` sets them in the italic serif accent, for example `"content that *converts.*"`.

### Palette "Dusk"

| Token | Hex | Used for |
| --- | --- | --- |
| `night` | `#0d1020` | story, process, footer |
| `lavender` | `#f3f1f9` | page background |
| `powder` | `#b3cbee` | secondary accent |
| `peach` | `#ffa27f` | signal colour: buttons, highlights, the CTA |
| `ember` | `#d9562f` | accent text on light backgrounds (readable contrast) |

Fonts: **Bricolage Grotesque** (display), **Newsreader** italic (accent words), **Geist** (body) and **DM Mono** (labels), from Google Fonts.

## Contact form (EmailJS)

Create `.env.local` in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The form sends `name`, `email`, `phone`, `company`, `service` and `message`. "Enquire about this" on a service card pre-selects that service in the form.

## Structure

```
src/
  components/
    Story.jsx         scroll-story hero (see the comment at the top)
    Navbar.jsx        floating nav that switches light/dark with the section under it
    ClientStrip.jsx   logo marquee after the story
    About.jsx         scroll-inked statement, pillars, stat cards
    Services.jsx      stacking service cards with drawn illustrations
    Work.jsx          client grid with industry filters
    Process.jsx       five-step timeline that fills as you scroll
    Why.jsx           bento grid of reasons
    Faq.jsx           accordion
    CallToAction.jsx  peach CTA with a magnetic button
    Contact.jsx       contact methods + EmailJS form
    Footer.jsx
    Motion.jsx        shared animation helpers (Reveal, SplitText, ScrollWords, Magnetic)
  lib/
    useScrollProgress.js  scroll progress that stays accurate for opacity (see the note inside)
    smoothScroll.js, useMediaQuery.js, useNow.js, text.js, events.js
  data/content.js
```

Sections mark themselves `data-theme="dark"` or `"light"` so the navbar can adapt.
