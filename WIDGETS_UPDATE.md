# Landing Page Update: Home Screen Widgets

## Context

StreakTap (the iOS app) recently shipped home screen widgets — users can now
add widgets that show their habits/streaks directly on the iOS home screen
without opening the app. The landing page (this Next.js project) needs a new
section introducing this feature, plus screenshots.

## What to build

Add a new section to the landing page dedicated to widgets, placed after
`FeaturesGrid` and before `Philosophy` in [src/app/page.tsx](src/app/page.tsx)
(follow the existing section pattern: wrap in a `Column` with
`id`, `fillWidth`, `horizontal="center"`, `paddingX="24"`, and
`className="streaktap-section"`, containing a `streaktap-wide` or
`streaktap-prose` inner `Column` — match whichever width the neighboring
sections use for a features showcase; `streaktap-wide` is used by
`FeaturesGrid`, so prefer that).

Create the new component at
`src/components/landing/Widgets.tsx` and export it from
`src/components/landing/index.ts` alongside the other sections.

### Content

- A short heading and one-line description introducing widgets, in the same
  voice as the rest of the site (calm, minimal, no hype — see
  `FeaturesGrid.tsx`'s "What it does. And what it doesn't." for tone).
- Showcase the 5 widget screenshots. Use `PhoneFrame`
  ([src/components/landing/PhoneFrame.tsx](src/components/landing/PhoneFrame.tsx))
  to wrap each screenshot the same way `Hero.tsx` displays the hero image, OR
  lay them out in a horizontal scroll / grid row if 5 full phone frames side
  by side is too wide — use your judgement on layout, but keep it minimal and
  consistent with the rest of the page (generous whitespace, no clutter, per
  the app's own design philosophy: monochrome, minimal, iOS-clean).
- Add a short caption under each screenshot describing what it shows (e.g.
  "Small widget — today's streaks at a glance", "Medium widget — multiple
  habits", "Lock screen widget", etc.) — use placeholder captions since you
  don't have exact descriptions; adjust when real screenshots arrive.

### Screenshots — USE PLACEHOLDERS

**Do not wait for real screenshots.** I will provide 5 real widget
screenshots (iPhone 17 Pro framed) later and drop them into
`public/images/`. For now:

1. Create 5 simple placeholder images (or placeholder `div`s with a neutral
   background + label like "Widget screenshot 1") sized to match how a real
   iPhone screenshot would look in `PhoneFrame` (roughly 380x800 aspect
   ratio, matching `PhoneFrame`'s default proportions).
2. Name the placeholder files predictably so I can swap them 1:1 later, e.g.:
   - `public/images/widget-1.png`
   - `public/images/widget-2.png`
   - `public/images/widget-3.png`
   - `public/images/widget-4.png`
   - `public/images/widget-5.png`
3. Reference them from `src/resources/content.tsx` (follow the existing
   pattern used for `landing.heroImage`) rather than hardcoding paths in the
   component, so swapping images later is a one-file change.

If you can't generate actual image files, a plain colored `div` with a
border and centered label text (rendered inside `PhoneFrame`) is a fine
stand-in — just make sure the component structure and image path wiring is
correct so dropping in real PNGs later requires no code changes, only a file
replacement.

## Notes

- Keep it consistent with the app's own product principles (see
  `../habit_tap/CLAUDE.md` if available): minimalist, monochrome,
  no gamification, no visual noise. The widgets section should not feel
  like a marketing carousel — same restrained tone as the rest of the site.
- Don't touch unrelated sections (`Hero`, `Steps`, `Philosophy`, `FAQ`,
  `FinalCTA`) beyond inserting the new section into `page.tsx`.
- Update `home`/`landing` content objects in `src/resources/content.tsx` for
  any new copy (heading, description, captions) rather than inlining strings
  in the component, matching how other sections source their text.
