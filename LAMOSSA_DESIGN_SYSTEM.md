# Lamossa-Inspired Design System Specification

## Complete Visual System for Nexus KM

Based on a thorough analysis of [Lamossa Framer Template](https://lamossa.framer.website/), this document defines every aspect of the design system to be applied across the Nexus KM application.

---

## 1. Design Philosophy

### Core Aesthetic Principles

| Principle | Description |
|-----------|-------------|
| **High Contrast Dark Mode** | Deep, rich dark backgrounds with bright, focused content |
| **Confident Minimalism** | Every element earns its space; nothing decorative |
| **Premium & Editorial** | Magazine-quality typography with generous whitespace |
| **Purposeful Restraint** | Limited color palette, maximum impact |
| **Smooth & Sophisticated** | Subtle, choreographed animations that feel expensive |

### Emotional Tone
- **Bold** — Unapologetically confident design choices
- **Clean** — Surgical precision in layout and spacing
- **Premium** — Feels like a luxury product
- **Trustworthy** — Professional, not playful
- **Calm** — No visual noise, everything is intentional

---

## 2. Typography System

### Font Stack

| Role | Font Family | Fallbacks |
|------|-------------|-----------|
| **Primary** | `Inter` | system-ui, -apple-system, sans-serif |
| **Display** | `Inter` | system-ui, sans-serif |
| **Mono** | `JetBrains Mono` | ui-monospace, monospace |

> Note: Lamossa uses a single sans-serif throughout for maximum cohesion. Inter is the closest match.

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `text-hero` | 72px / 4.5rem | 600 | 1.0 | -0.03em | Page hero headlines |
| `text-display` | 48px / 3rem | 600 | 1.1 | -0.025em | Section titles |
| `text-heading` | 32px / 2rem | 600 | 1.2 | -0.02em | Card titles, H2 |
| `text-title` | 24px / 1.5rem | 600 | 1.3 | -0.015em | H3, widget titles |
| `text-subtitle` | 18px / 1.125rem | 500 | 1.4 | -0.01em | Subheadings |
| `text-body` | 16px / 1rem | 400 | 1.6 | 0 | Paragraphs |
| `text-small` | 14px / 0.875rem | 400 | 1.5 | 0 | Secondary text |
| `text-caption` | 12px / 0.75rem | 500 | 1.4 | 0.02em | Labels, captions |
| `text-micro` | 11px / 0.6875rem | 600 | 1.2 | 0.05em | Badges, tags |

### Typography Rules

1. **Headlines**: Semibold (600), tight letter-spacing, near-white color
2. **Body Text**: Regular (400), slightly muted color for contrast balance
3. **Labels/Captions**: Medium (500), subtle uppercase for hierarchy cues
4. **Numbers/Stats**: Semibold (600), larger scale, accent color optional
5. **Never use bold (700+)** — Semibold is the maximum weight

---

## 3. Color System

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Background Primary** | `#0A0A0A` | Main page background |
| **Background Elevated** | `#111111` | Cards, panels, modals |
| **Background Subtle** | `#1A1A1A` | Hover states, secondary surfaces |
| **Background Muted** | `#262626` | Input backgrounds, dividers |

| Token | Hex | Usage |
|-------|-----|-------|
| **Text Primary** | `#FFFFFF` | Headlines, primary content |
| **Text Secondary** | `#A3A3A3` | Body text, descriptions |
| **Text Muted** | `#737373` | Captions, placeholders |
| **Text Disabled** | `#525252` | Disabled states |

| Token | Hex | Usage |
|-------|-----|-------|
| **Accent Primary** | `#FFFFFF` | Primary buttons, focus rings |
| **Accent Lime** | `#D4FF00` | Highlight, badges, success (Lamossa signature) |
| **Accent Blue** | `#3B82F6` | Links, info states (optional) |

| Token | Hex | Usage |
|-------|-----|-------|
| **Border Default** | `#262626` | Card borders, dividers |
| **Border Subtle** | `#1F1F1F` | Very subtle separators |
| **Border Focus** | `#FFFFFF` | Focus states |

### Semantic Colors

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Success** | `#052E16` | `#4ADE80` | `#166534` |
| **Warning** | `#422006` | `#FACC15` | `#854D0E` |
| **Error** | `#450A0A` | `#F87171` | `#991B1B` |
| **Info** | `#0C1929` | `#60A5FA` | `#1E40AF` |

### Gradient (Signature: Lime Glow)
```css
/* Lamossa Signature Glow */
background: radial-gradient(ellipse at 50% 0%, rgba(212, 255, 0, 0.15) 0%, transparent 50%);
```

---

## 4. Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon gaps, tight padding |
| `space-2` | 8px | Button padding, small gaps |
| `space-3` | 12px | Input padding, card gaps |
| `space-4` | 16px | Section padding, list gaps |
| `space-5` | 20px | Card padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Large section gaps |
| `space-10` | 40px | Section separators |
| `space-12` | 48px | Page section spacing |
| `space-16` | 64px | Hero section padding |
| `space-20` | 80px | Major section breaks |
| `space-24` | 96px | Page top/bottom margins |

### Layout Grid

| Breakpoint | Container Width | Side Padding |
|------------|-----------------|--------------|
| `sm` (640px+) | 100% | 24px |
| `md` (768px+) | 100% | 32px |
| `lg` (1024px+) | 960px | 40px |
| `xl` (1280px+) | 1120px | 48px |
| `2xl` (1536px+) | 1280px | 64px |

---

## 5. Border Radius System

### Philosophy: Subtle, Not Playful

| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | 0 | No rounding |
| `radius-sm` | 4px | Chips, tags, small badges |
| `radius-md` | 6px | Buttons, inputs |
| `radius-lg` | 8px | Cards, panels |
| `radius-xl` | 12px | Modals, large cards |
| `radius-2xl` | 16px | Hero cards, featured sections |
| `radius-full` | 9999px | Avatars, pills |

> Key: Corners are subtle — nothing exceeds 16px radius except circles.

---

## 6. Shadow System

### Dark Mode Shadows (Subtle Elevation)

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle lift |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Modals, popovers |
| `shadow-glow` | `0 0 40px rgba(212,255,0,0.15)` | Accent glow effect |

> Note: Shadows are less prominent in dark mode; rely more on border contrast.

---

## 7. Component Styling

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| **Primary** | `#FFFFFF` | `#0A0A0A` | none | `opacity: 0.9` |
| **Secondary** | `transparent` | `#FFFFFF` | `1px #262626` | `bg: #1A1A1A` |
| **Ghost** | `transparent` | `#A3A3A3` | none | `text: #FFFFFF` |
| **Accent** | `#D4FF00` | `#0A0A0A` | none | `opacity: 0.9` |

**Button Specifications:**
- Height: 40px (default), 36px (small), 48px (large)
- Padding: 16px horizontal
- Border-radius: 6px
- Font: 14px, weight 500
- Transition: 150ms ease

### Inputs

| State | Background | Border | Text |
|-------|------------|--------|------|
| **Default** | `#1A1A1A` | `1px #262626` | `#FFFFFF` |
| **Focus** | `#1A1A1A` | `1px #FFFFFF` | `#FFFFFF` |
| **Disabled** | `#111111` | `1px #1F1F1F` | `#525252` |

**Input Specifications:**
- Height: 44px
- Padding: 12px 16px
- Border-radius: 6px
- Font: 14px, weight 400

### Cards

| Type | Background | Border | Radius |
|------|------------|--------|--------|
| **Default** | `#111111` | `1px #262626` | 8px |
| **Elevated** | `#1A1A1A` | `1px #262626` | 12px |
| **Interactive** | `#111111` | `1px #262626` | 8px |

**Card Hover:**
- Border: `1px #404040`
- Background: `#1A1A1A`
- Transition: 200ms ease

### Badges/Tags

| Variant | Background | Text | Radius |
|---------|------------|------|--------|
| **Default** | `#262626` | `#A3A3A3` | 4px |
| **Accent** | `rgba(212,255,0,0.1)` | `#D4FF00` | 4px |
| **Success** | `#052E16` | `#4ADE80` | 4px |

---

## 8. Animation & Motion

### Timing Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| `duration-fast` | 100ms | Hover states, toggles |
| `duration-normal` | 200ms | Button feedback, focus |
| `duration-slow` | 300ms | Panels, modals |
| `duration-slower` | 500ms | Page transitions |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General purpose |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entry animations |
| `ease-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | Premium feel |

### Animation Patterns

| Pattern | Specification |
|---------|---------------|
| **Fade In** | opacity 0 → 1, 300ms, ease-out |
| **Slide Up** | translateY(8px) → 0, opacity 0 → 1, 400ms |
| **Scale In** | scale(0.98) → 1, opacity 0 → 1, 300ms |
| **Hover Lift** | translateY(-2px), 150ms |

### Micro-Interactions

| Element | Interaction |
|---------|-------------|
| **Button Hover** | Slight opacity reduction (0.9), 150ms |
| **Button Active** | scale(0.98), 100ms |
| **Card Hover** | Border lightens, subtle background shift, 200ms |
| **Link Hover** | Underline appears, color brightens |
| **Input Focus** | Border color change, 150ms |

---

## 9. Iconography

### Style Guidelines

| Property | Value |
|----------|-------|
| **Style** | Outlined (stroke icons) |
| **Stroke Width** | 1.5px |
| **Sizes** | 16px, 20px, 24px |
| **Color** | Inherit from text color |
| **Optical Balance** | Always vertically centered |

### Usage Rules

1. Icons accompany text, rarely standalone (except icon buttons)
2. 8px gap between icon and text
3. Icons in buttons: 20px size
4. Icons in navigation: 20px size
5. Decorative icons: 24px with reduced opacity

---

## 10. Do's and Don'ts

### ✅ DO

- Use the dark background consistently across all surfaces
- Maintain high contrast between text and background
- Use the lime accent (`#D4FF00`) sparingly for maximum impact
- Keep border-radius subtle (max 16px for containers)
- Use generous whitespace between sections
- Animate purposefully — every motion should have meaning
- Use semibold (600) for headlines, regular (400) for body
- Keep the UI minimalist — less is more

### ❌ DON'T

- Use bright, saturated background colors
- Mix multiple accent colors in the same view
- Use rounded corners larger than 16px on containers
- Add decorative elements that don't serve function
- Use heavy shadows — rely on borders for separation
- Overanimate — keep motion subtle and quick
- Use bold (700+) weight — it's too heavy
- Add visual noise — every pixel must earn its place

---

## 11. Tailwind CSS Configuration

```javascript
// Lamossa-Inspired Tailwind Config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "bg-primary": "#0A0A0A",
        "bg-elevated": "#111111",
        "bg-subtle": "#1A1A1A",
        "bg-muted": "#262626",
        
        // Text
        "text-primary": "#FFFFFF",
        "text-secondary": "#A3A3A3",
        "text-muted": "#737373",
        "text-disabled": "#525252",
        
        // Accents
        "accent": "#FFFFFF",
        "accent-lime": "#D4FF00",
        
        // Borders
        "border-default": "#262626",
        "border-subtle": "#1F1F1F",
        "border-focus": "#FFFFFF",
        
        // Semantic
        "success": { DEFAULT: "#4ADE80", bg: "#052E16" },
        "warning": { DEFAULT: "#FACC15", bg: "#422006" },
        "error": { DEFAULT: "#F87171", bg: "#450A0A" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        "heading": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "title": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" }],
        "subtitle": ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "500" }],
      },
      borderRadius: {
        "sm": "4px",
        "md": "6px",
        "lg": "8px",
        "xl": "12px",
        "2xl": "16px",
      },
      boxShadow: {
        "sm": "0 1px 2px rgba(0,0,0,0.3)",
        "md": "0 4px 12px rgba(0,0,0,0.4)",
        "lg": "0 8px 24px rgba(0,0,0,0.5)",
        "glow": "0 0 40px rgba(212,255,0,0.15)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
}
```

---

## 12. Application to Nexus KM

### Key Transformations

| Current | Lamossa-Inspired |
|---------|------------------|
| Light/white backgrounds | Deep dark (#0A0A0A) |
| Teal primary (#1c7487) | White primary, Lime accent |
| Indigo AI accent (#6366f1) | Lime (#D4FF00) for AI |
| Large border-radius (24px+) | Subtle radius (max 16px) |
| Multiple gradients | Minimal, focused gradients |
| Complex shadows | Border-based elevation |
| Colorful cards | Monochrome with subtle borders |

### Next Steps

1. **Implement Tailwind config** with Lamossa tokens
2. **Update global styles** for dark mode base
3. **Transform Home page** with new design system
4. **Apply to all components** consistently

---

*This design system specification captures the complete visual language of the Lamossa template. Implementation should follow this document precisely to achieve visual parity.*
