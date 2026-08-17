---
name: Auliacorp Administrative Interface
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#46464c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76767d'
  outline-variant: '#c7c6cd'
  surface-tint: '#595e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#161b2b'
  on-primary-container: '#7f8397'
  inverse-primary: '#c2c6db'
  secondary: '#605e5c'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2df'
  on-secondary-container: '#666462'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b0800'
  on-tertiary-container: '#ce6548'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee1f7'
  primary-fixed-dim: '#c2c6db'
  on-primary-fixed: '#161b2b'
  on-primary-fixed-variant: '#414658'
  secondary-fixed: '#e5e2df'
  secondary-fixed-dim: '#c9c6c3'
  on-secondary-fixed: '#1c1b1a'
  on-secondary-fixed-variant: '#484745'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a1'
  on-tertiary-fixed: '#3b0800'
  on-tertiary-fixed-variant: '#7f2a12'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  sidebar-width: 260px
  panel-max-width: 480px
---

## Brand & Style
The design system is engineered for high-utility Content Management Systems (CMS) and enterprise workflows. The aesthetic is rooted in **Modern Minimalism** with a focus on information density and visual clarity. It prioritizes functionality over decoration, using sharp hierarchy and purposeful spacing to reduce cognitive load during long work sessions.

The emotional response is one of stability, authority, and precision. By removing all non-functional flourishes like gradients or blurs, the interface establishes a "tools-first" environment where content is the primary focus.

## Colors
The palette utilizes high-contrast zones to separate navigation from workspace:

- **Deep Ink Navy (#0A0F1E):** Reserved for the sidebar, global navigation, and primary headers. It provides a grounding "frame" for the application.
- **Warm Off-White (#FDF9F6):** The primary canvas color. This reduces eye strain compared to pure white while maintaining a professional, clean look for main content areas and cards.
- **Burnt Amber (#C05A3E):** The functional accent. Used exclusively for primary actions, active states, and focus indicators. It provides a warm, sophisticated contrast to the cool navy.
- **Utility Neutrals:** Slate grays are used for borders (#E2E8F0) and secondary text (#64748B) to maintain a soft but clear structure.

## Typography
Inter is used across all levels for its exceptional legibility in data-heavy environments. 

- **Titles & Headings:** Use **Bold (700)** weight with slight negative letter-spacing to create a compact, authoritative look.
- **Body Text:** Use **Regular (400)** for long-form content and descriptions. 
- **Labels & UI Elements:** Use **Medium (500)** or **Semi-Bold (600)** at smaller scales (13px/14px) to ensure buttons and navigation items remain legible.
- **Data Points:** For table content, prioritize `body-md` to maximize the number of visible rows without sacrificing readability.

## Layout & Spacing
This design system employs a **Fixed-Fluid Hybrid** layout. The sidebar remains fixed at 260px, while the main content area utilizes a fluid grid that caps at 1440px to prevent excessive line lengths.

- **Grid:** 12-column system with 16px gutters.
- **Density:** High-density for data tables (vertical padding of 12px per row) and standard density for forms (20px gap between fields).
- **Responsive:** On tablet, the sidebar collapses into a drawer. On mobile, the layout reflows into a single column with 16px margins.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Crisp Outlines** rather than shadows. 

1. **Level 0 (Base):** Off-White (#FDF9F6) background.
2. **Level 1 (Cards/Containers):** Pure White (#FFFFFF) surfaces with a 1px border (#E2E8F0).
3. **Level 2 (Popovers/Drawers):** Pure White with a subtle, tight shadow (0px 4px 12px rgba(0,0,0,0.05)) to separate the floating element from the content below.
4. **Active States:** Highlighted using the Burnt Amber (#C05A3E) accent, typically through a 2px left-border or a solid background fill for buttons.

## Shapes
The shape language is "Soft-Square." This maintains the professional, architectural feel of an enterprise tool while avoiding the clinical harshness of sharp 90-degree corners.

- **Small Components (Inputs, Buttons):** 4px (0.25rem) radius.
- **Large Components (Cards, Panels):** 8px (0.5rem) radius.
- **Category Badges:** Fully rounded (pill-shaped) to distinguish them from interactive buttons.

## Components

### Data Tables
- **Header:** Semi-bold Inter, 12px, Uppercase, Slate-500 text.
- **Rows:** 1px bottom border (#F1F5F9). Alternate row striping is not used; instead, use a subtle hover state (#F8FAFC).
- **Cells:** High-density vertical padding (12px).

### Form Inputs
- **Default:** White background, 1px border (#CBD5E1), 4px radius.
- **Focus State:** 1px border of Burnt Amber (#C05A3E) with a 3px soft outer glow (offset) of the same color at 15% opacity.
- **Labels:** 13px Medium weight, positioned 8px above the input.

### Slide-over Panels
- **Container:** Enters from the right, full height, 480px width.
- **Header:** Sticky header with Deep Navy text and a close icon.
- **Footer:** Fixed footer with a primary Burnt Amber button and a secondary outline button.

### Category Badges
- **Style:** Small (12px), Medium weight.
- **Coloration:** Low-saturation backgrounds with high-saturation text (e.g., a soft muted blue background with deep navy text) to indicate status without competing with the primary accent color.

### Primary Buttons
- **Background:** Burnt Amber (#C05A3E).
- **Text:** White, 14px, Semi-bold.
- **Interaction:** Shifts to a slightly darker shade of amber on hover; no elevation change.