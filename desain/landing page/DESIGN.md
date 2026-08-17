---
name: Auliacorp Editorial Core
colors:
  surface: '#0c1321'
  surface-dim: '#0c1321'
  surface-bright: '#323948'
  surface-container-lowest: '#070e1b'
  surface-container-low: '#151c29'
  surface-container: '#19202d'
  surface-container-high: '#232a38'
  surface-container-highest: '#2e3543'
  on-surface: '#dce2f6'
  on-surface-variant: '#c7c6cd'
  inverse-surface: '#dce2f6'
  inverse-on-surface: '#29303f'
  outline: '#909097'
  outline-variant: '#46464c'
  surface-tint: '#c2c6db'
  primary: '#c2c6db'
  on-primary: '#2b3040'
  primary-container: '#0a0f1e'
  on-primary-container: '#777b8e'
  inverse-primary: '#595e70'
  secondary: '#c7c7c3'
  on-secondary: '#2f312e'
  secondary-container: '#464744'
  on-secondary-container: '#b5b5b2'
  tertiary: '#f0bd8b'
  on-tertiary: '#482904'
  tertiary-container: '#1c0c00'
  on-tertiary-container: '#9f7347'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dee1f7'
  primary-fixed-dim: '#c2c6db'
  on-primary-fixed: '#161b2b'
  on-primary-fixed-variant: '#414658'
  secondary-fixed: '#e3e2df'
  secondary-fixed-dim: '#c7c7c3'
  on-secondary-fixed: '#1b1c1a'
  on-secondary-fixed-variant: '#464744'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#f0bd8b'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#623f18'
  background: '#0c1321'
  on-background: '#dce2f6'
  surface-variant: '#2e3543'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 80px
    fontWeight: '900'
    lineHeight: 88px
    letterSpacing: -0.05em
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '900'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 120px
---

## Brand & Style

The design system is built for a corporate creative powerhouse, prioritizing authority, sophistication, and a high-end editorial feel. The aesthetic draws heavily from modern minimalism and luxury publishing, utilizing extreme contrast and expansive whitespace to create a sense of curated prestige.

The visual narrative is "Dramatic Clarity." By stripping away decorative elements like gradients and blurs, the focus shifts entirely to structural composition and typographic weight. The emotional response should be one of stability, creative confidence, and intentionality.

- **Primary Style:** High-Contrast / Bold Minimalism.
- **Visual Strategy:** Large-scale typography, strict grid alignment, and a "less is more" philosophy regarding color and effects.
- **Core Principles:** No glassmorphism, no neomorphism, and no decorative shadows. Depth is achieved through color blocking and scale rather than lighting effects.

## Colors

The palette is anchored in an "Ink & Parchment" contrast. The background is a deep, immersive Ink-Navy, providing a sophisticated alternative to pure black. Text and structural lines utilize a warm Off-White to prevent eye strain while maintaining maximum impact.

- **Background (Ink-Navy):** `#0A0F1E`. Used for all primary canvases to create a dramatic, theatrical foundation.
- **Content (Off-White):** `#FDFCF8`. Used for body text, primary borders, and high-contrast surfaces.
- **Accent (Muted Gold):** `#D4A373`. Reserved strictly for primary calls to action, active states, or critical highlights. Use sparingly (less than 5% of the UI) to maintain its prestige.
- **Surface (Deep Charcoal):** `#121212`. Used for secondary containers or subtle background shifts where true navy is too vibrant.

## Typography

This design system uses a single, versatile typeface, **Inter**, to achieve a systematic and functional look. The distinction is created through aggressive scale and weight shifts.

- **Headlines:** Must use the "Black" or "ExtraBold" weights. Tracking is tightened significantly (-0.02em to -0.05em) to create a dense, "inked" look common in high-end magazines.
- **Body Text:** Uses "Regular" and "Medium" weights. Line height is generous (1.5x) to ensure legibility against the dark background.
- **Labels:** Always set in Uppercase with expanded letter spacing to act as structural "markers" throughout the layout.

## Layout & Spacing

The layout follows a **Fixed Grid** approach for desktop to preserve the editorial composition, transitioning to a fluid model for smaller breakpoints.

- **Desktop:** 12-column grid with a 1440px max-width. Margins are intentionally large (64px) to create a "frame" around the content.
- **Rhythm:** An 8px base unit drives all spacing. For vertical rhythm between major sections, use "Section Gaps" of 120px+ to maintain the luxury feel of whitespace.
- **Alignment:** Strict left-alignment for all headlines and body blocks. Avoid centering large blocks of text; the design should feel architectural and grounded.

## Elevation & Depth

In this design system, depth is **flat and structural**. We reject the use of drop shadows and blurs.

- **Tonal Layers:** To differentiate elements, use color blocks. A primary surface is `#0A0F1E`, while a raised "container" (like a card) should use a subtle shift to `#121212` or a thin 1px border of `#FDFCF8` at 15% opacity.
- **Outlines:** Use "Ghost Borders"—low-opacity off-white lines—to define zones without adding visual weight.
- **Hierarchy:** High-priority items are brought to the "front" using the Muted Gold accent or by reversing the color scheme (Off-White background with Ink-Navy text).

## Shapes

The shape language is precise and sharp.

- **Corners:** Components use a **Soft (4px)** radius. This is just enough to take the "sting" off the edges without making the UI feel friendly or bubbly. 
- **Buttons:** Keep corners consistent with the 4px radius. Do not use pill-shaped buttons; they conflict with the architectural editorial style.
- **Media:** Photography and video should always have sharp (0px) corners to mimic printed magazine spreads.

## Components

### Buttons
- **Primary:** Background `#D4A373` (Gold), Text `#0A0F1E`. 4px border radius. Bold typography. No shadows.
- **Secondary:** Transparent background, 1px border of `#FDFCF8`, Text `#FDFCF8`.
- **Tertiary/Ghost:** Text `#FDFCF8` with an underlined hover state.

### Input Fields
- **Style:** Underline-only or subtle 1px bordered boxes. Background should be slightly darker than the main canvas.
- **Active State:** Border color shifts to Gold (`#D4A373`).

### Cards
- **Structure:** No shadows. Use a 1px border (`#FDFCF8` at 10% opacity) or a solid background of `#121212`.
- **Spacing:** Generous internal padding (32px+) to allow the content to "breathe."

### Navigation
- **Top Bar:** Minimalist. Use Label-MD typography. Ensure plenty of horizontal space between links. 
- **Active Link:** Indicated by a simple 2px Gold underline or a weight shift to Bold.

### Lists & Tables
- **Dividers:** Use thin 1px lines in `#FDFCF8` at very low opacity (0.1). Avoid zebra-striping; use subtle hover highlights instead.