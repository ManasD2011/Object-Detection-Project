---
name: nextjs-premium-ui
description: Build stunning, clean, professional, and premium Next.js UI components and pages. Use this skill whenever the user asks to create, design, improve, or refactor any Next.js interface — including landing pages, dashboards, marketing sites, SaaS UIs, auth screens, onboarding flows, settings pages, data tables, pricing pages, hero sections, empty states, or any React component that should look polished and high-end. Trigger even for vague requests like "make it look good", "make it premium", "clean up the UI", "it looks bad", "build a nice page for X", or any mention of a UI component or page. Always use this skill before writing any Next.js UI code — do not skip it even for small components.
---

# Next.js Premium UI — Master Skill

Every output from this skill should look like it was designed at Linear, Vercel, Resend, or Raycast — interfaces that feel considered, precise, and alive. Not flashy. Not generic. Genuinely crafted.

---

## Step 0: Think Before You Code

Before touching a file, answer these four questions:

1. **What job does this UI do?** (inform, convert, manage, configure, delight)
2. **Who is sitting in front of it?** (developer, executive, consumer, operator)
3. **What single emotion should it trigger?** (trust, speed, calm, clarity, power, delight)
4. **What is the one thing they should notice first?**

These answers dictate every design decision. Write them as a comment at the top of your work.

> **Premium is not a coat of paint.** It's the result of removing everything unnecessary and making every remaining element feel exactly right.

---

## Stack (2026 Canonical)

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 16+ App Router | Server Components by default |
| Styling | **Tailwind CSS v4** | CSS-first `@theme`, no `tailwind.config.js` |
| Components | **shadcn/ui** (latest) | Copy-into-project model, owns the code |
| Primitives | Radix UI or Base UI | Via shadcn — never use bare |
| Icons | `lucide-react` | Consistent, clean, tree-shakeable |
| Fonts | `next/font` | Never `<link>`, never CDN |
| Motion | `tailwindcss-animate` + Framer Motion | Tailwind for simple, Framer for orchestrated |
| Forms | `react-hook-form` + `zod` | Via shadcn Form — never raw controlled inputs |
| Types | TypeScript strict | `noImplicitAny`, `strictNullChecks`, always |

---

## Tailwind v4 Essentials

> v4 is a ground-up rewrite. **No `tailwind.config.js`.** Everything lives in CSS.

### Setup (globals.css)

```css
@import "tailwindcss";

@theme {
  /* Brand tokens — override these per project */
  --color-brand: oklch(0.6 0.2 250);
  --color-brand-subtle: oklch(0.95 0.04 250);

  /* Typography */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  /* Custom breakpoint */
  --breakpoint-3xl: 1920px;

  /* Radius scale */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
}

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --muted: oklch(0.961 0 0);
    --muted-foreground: oklch(0.501 0 0);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.961 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --accent: oklch(0.961 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --ring: oklch(0.708 0 0);
    --radius: 0.5rem;
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --ring: oklch(0.556 0 0);
  }
}
```

### v4 Syntax Changes (Critical)

```css
/* v3 → v4 migration — old syntax is dead */
bg-opacity-50     → bg-black/50
flex-grow         → grow
flex-shrink       → shrink
outline-none      → outline-hidden
bg-gradient-to-r  → bg-linear-to-r
!flex             → flex!          /* important moved to end */
```

### v4 New Powers to Use

```tsx
{/* Container Queries — built-in, no plugin needed */}
<div className="@container">
  <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3">
    {items.map(item => <Card key={item.id} {...item} />)}
  </div>
</div>

{/* 3D transforms — native */}
<div className="rotate-x-12 perspective-1000 hover:rotate-x-0 transition-transform duration-300" />

{/* Radial gradients */}
<div className="bg-radial-[at_50%_0%] from-brand-subtle to-transparent" />
```

---

## Design System

### Typography

**Hierarchy** (copy-paste ready):

```tsx
// Page title
<h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">

// Section heading
<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">

// Card heading
<h3 className="text-lg font-semibold">

// Overline / label
<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">

// Body
<p className="text-sm leading-relaxed text-muted-foreground">

// Mono / code
<code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">
```

**Font pairings by product type:**

| Product type | Display | Body | Via |
|---|---|---|---|
| SaaS / Dev tool | Geist | Geist Mono | `next/font/local` (Vercel) |
| Modern marketing | Sora | DM Sans | `next/font/google` |
| Editorial / Luxury | Playfair Display | DM Sans | `next/font/google` |
| Minimal / Corporate | Inter | Inter | `next/font/google` |
| Bold / Expressive | Cal Sans | Instrument Sans | `next/font/local` |

The font IS part of the brand identity. Never leave it as system-ui.

### Color Philosophy

- **One neutral base + one accent.** Never two competing accent colors.
- Use **OKLCH** for all custom colors — more vibrant, perceptually uniform, v4 native.
- `oklch(L C H)` — L=lightness (0–1), C=chroma, H=hue angle
- Always verify WCAG AA: 4.5:1 for text, 3:1 for UI elements.
- Use `color-mix()` for tints: `color-mix(in oklch, var(--color-brand) 15%, transparent)`

### Spacing Rhythm

```
Micro:   gap-1  gap-1.5  gap-2    (4–8px)    icon gaps, tight labels
Small:   gap-3  gap-4             (12–16px)  form elements, list items
Medium:  gap-6  gap-8             (24–32px)  card padding, section spacing
Large:   gap-12 gap-16            (48–64px)  page section gaps
XLarge:  gap-20 gap-24 gap-32    (80–128px) hero and marketing spacing
```

### Depth System

```
Level 0 — Flat:    no shadow, border only
           border border-border/60 rounded-xl

Level 1 — Raised:  subtle card elevation
           border border-border shadow-sm rounded-xl

Level 2 — Float:   modals, dropdowns, popovers
           border border-border shadow-md rounded-2xl

Level 3 — Overlay: command palette, sheets
           border border-border/50 shadow-xl rounded-2xl

Glass:    bg-background/80 backdrop-blur-sm border border-border/40 rounded-2xl
```

---

## shadcn/ui 2026 Patterns

### Visual Styles — Choose One Per Project

| Style | Feel | Best for |
|---|---|---|
| **Default (Vega)** | Classic neutral | General SaaS |
| **New York** | Tighter, denser | Dev tools, dashboards |
| **Sera** | Editorial, typographic, print-inspired | Marketing, blogs |
| **Nova** | Compact, reduced padding | Data-heavy apps |
| **Lyra** | Boxy, sharp, mono-friendly | Terminal / code aesthetic |

```bash
npx shadcn@latest init
# Apply a different style later without starting over:
npx shadcn@latest apply --preset <preset-id> --only theme,font
```

### New Components (2025–2026)

```tsx
{/* ButtonGroup — split buttons, grouped controls */}
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"

<ButtonGroup>
  <Button>Save</Button>
  <ButtonGroupSeparator />
  <Button variant="ghost" size="icon"><ChevronDown className="h-4 w-4" /></Button>
</ButtonGroup>

{/* InputGroup — icons, prefixes, addons on inputs */}
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

<InputGroup>
  <InputGroupAddon>
    <SearchIcon className="h-4 w-4 text-muted-foreground" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>

{/* Spinner — unified loading state, use everywhere */}
import { Spinner } from "@/components/ui/spinner"

<Button disabled={isLoading}>
  {isLoading && <Spinner className="mr-2 h-4 w-4" />}
  Save changes
</Button>
```

### Core Component Patterns

**Premium Card:**
```tsx
<div className="group rounded-2xl border border-border bg-card p-6 shadow-sm
                transition-all duration-200 hover:shadow-md hover:border-border/80">
  <div className="mb-4 flex items-start justify-between">
    <div className="rounded-lg bg-primary/8 p-2.5">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <Badge variant="secondary">New</Badge>
  </div>
  <h3 className="mb-1.5 font-semibold text-foreground">Card Title</h3>
  <p className="text-sm leading-relaxed text-muted-foreground">
    Supporting description text that explains the feature or metric.
  </p>
</div>
```

**Metric / KPI Card:**
```tsx
<div className="rounded-xl border border-border bg-card p-6">
  <div className="mb-1 flex items-center justify-between">
    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
    <TrendingUp className="h-4 w-4 text-emerald-500" />
  </div>
  <p className="text-3xl font-bold tracking-tight">$48,295</p>
  <p className="mt-1 text-xs text-muted-foreground">
    <span className="font-medium text-emerald-500">+12.5%</span> from last month
  </p>
</div>
```

**Empty State:**
```tsx
<div className="flex flex-col items-center justify-center py-20 text-center">
  <div className="mb-4 rounded-2xl bg-muted p-5">
    <InboxIcon className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="mb-1 text-base font-semibold">Nothing here yet</h3>
  <p className="mb-6 max-w-sm text-sm text-muted-foreground">
    Once you add your first item, it'll show up here.
  </p>
  <Button variant="outline">
    <PlusIcon className="mr-2 h-4 w-4" />
    Add item
  </Button>
</div>
```

**Live Status Badge:**
```tsx
<span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200
                 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700
                 dark:border-emerald-800/50 dark:bg-emerald-950 dark:text-emerald-400">
  <span className="relative flex h-1.5 w-1.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full
                     bg-emerald-400 opacity-75" />
    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
  </span>
  Live
</span>
```

**Announcement Banner:**
```tsx
<div className="w-full border-b border-border bg-muted/50 py-2 text-center
                text-xs text-muted-foreground">
  <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs
                   font-medium text-primary-foreground">
    New
  </span>
  Introducing AI-powered analytics.{" "}
  <a href="#" className="font-medium text-foreground underline-offset-2 hover:underline">
    Learn more →
  </a>
</div>
```

---

## Page Playbooks

### Landing Page

**Section order (never deviate without reason):**
1. Announcement banner (optional)
2. Sticky nav
3. Hero
4. Social proof / logo strip
5. Feature bento or alternating sections
6. How it works
7. Pricing
8. Testimonials (marquee or grid)
9. Final CTA
10. Footer

**Sticky Nav:**
```tsx
<header className="sticky top-0 z-50 w-full border-b border-border/50
                   bg-background/80 backdrop-blur-sm">
  <div className="container flex h-16 items-center justify-between">
    <Logo />
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {["Features", "Pricing", "Docs", "Blog"].map(link => (
        <a key={link} href="#"
           className="text-muted-foreground transition-colors hover:text-foreground">
          {link}
        </a>
      ))}
    </nav>
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm">Sign in</Button>
      <Button size="sm" className="shadow-sm">Get started</Button>
    </div>
  </div>
</header>
```

**Hero Section:**
```tsx
<section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
  {/* Background grid texture */}
  <div className="pointer-events-none absolute inset-0
    bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),
        linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)]
    bg-[size:4rem_4rem]
    [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

  <div className="container relative text-center">
    {/* Eyebrow */}
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border
                    bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      Now in public beta
    </div>

    <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight
                   text-balance md:text-6xl lg:text-7xl">
      Build products your{" "}
      <span className="bg-linear-to-r from-foreground to-foreground/50
                       bg-clip-text text-transparent">
        users love
      </span>
    </h1>

    <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
      The platform that brings design, development, and data together —
      so teams can move fast without breaking things.
    </p>

    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Button size="lg" className="h-12 px-8 text-base shadow-sm">
        Start for free
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" size="lg" className="h-12 px-8 text-base">
        View demo
      </Button>
    </div>

    <p className="mt-4 text-xs text-muted-foreground">
      No credit card required · 14-day free trial · Cancel anytime
    </p>
  </div>
</section>
```

**Bento Feature Grid:**
```tsx
<section className="container py-24">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
    {/* Large hero feature — spans 2 columns */}
    <div className="col-span-1 md:col-span-2 rounded-2xl border border-border
                    bg-linear-to-br from-card to-muted/30 p-8">
      <Badge className="mb-4" variant="secondary">Core feature</Badge>
      <h3 className="text-2xl font-bold tracking-tight">Real-time collaboration</h3>
      <p className="mt-2 text-muted-foreground">
        Work alongside your team with live cursors, presence indicators, and instant sync.
      </p>
    </div>
    {/* Tall secondary */}
    <div className="row-span-2 rounded-2xl border border-border bg-card p-6">
      {/* ... */}
    </div>
    {/* Two wide smalls */}
    <div className="rounded-2xl border border-border bg-card p-6">{/* ... */}</div>
    <div className="rounded-2xl border border-border bg-card p-6">{/* ... */}</div>
  </div>
</section>
```

**Logo Strip:**
```tsx
<div className="border-y border-border bg-muted/30 py-10">
  <p className="mb-6 text-center text-xs font-medium uppercase
                tracking-widest text-muted-foreground">
    Trusted by teams at
  </p>
  <div className="container flex flex-wrap items-center justify-center gap-10
                  opacity-40 grayscale transition-opacity hover:opacity-60">
    {logos.map(logo => (
      <Image key={logo.name} src={logo.src} alt={logo.name} height={24} width={80} />
    ))}
  </div>
</div>
```

---

### SaaS Dashboard

**Layout shell:**
```tsx
// app/(app)/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
```

**Sidebar:**
```tsx
<aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
  <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
    <Logo className="h-6 w-6" />
    <span className="text-sm font-semibold">Acme Inc</span>
  </div>

  <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
    {navItems.map(item => (
      <Link key={item.href} href={item.href} className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive(item.href)
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      )}>
        <item.icon className="h-4 w-4 shrink-0" />
        {item.label}
        {item.badge && (
          <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5
                           text-[10px] font-medium text-primary-foreground">
            {item.badge}
          </span>
        )}
      </Link>
    ))}
  </nav>

  <div className="border-t border-border p-3">
    <UserMenu />
  </div>
</aside>
```

**Topbar:**
```tsx
<header className="flex h-16 shrink-0 items-center justify-between
                   border-b border-border bg-card px-6">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Overview</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" className="gap-2">
      <PlusIcon className="h-3.5 w-3.5" />
      New
    </Button>
    <Button variant="ghost" size="icon" aria-label="Notifications">
      <BellIcon className="h-4 w-4" />
    </Button>
    <Avatar className="h-8 w-8 cursor-pointer" />
  </div>
</header>
```

---

### Auth Page

```tsx
export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Branding panel — desktop only */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white">
        <div className="flex items-center gap-2.5">
          <Logo className="h-7 w-7 text-white" />
          <span className="font-semibold">Acme</span>
        </div>
        <blockquote className="space-y-2">
          <p className="text-lg leading-relaxed text-zinc-300">
            "This platform cut our time-to-ship by 60%. Our team can't
            imagine working without it."
          </p>
          <footer className="text-sm text-zinc-500">
            — Priya Mehta, CTO at Helios
          </footer>
        </blockquote>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="password" render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a href="/forgot"
                       className="text-xs text-muted-foreground hover:text-foreground">
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2 h-4 w-4" />}
                Sign in
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register"
               className="font-medium text-foreground underline-offset-4 hover:underline">
              Sign up free
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

### Pricing Page

```tsx
<div className="grid gap-4 md:grid-cols-3">
  {plans.map(plan => (
    <div key={plan.name} className={cn(
      "relative flex flex-col rounded-2xl border p-7 transition-shadow",
      plan.featured
        ? "border-primary bg-primary text-primary-foreground shadow-xl scale-[1.02]"
        : "border-border bg-card hover:shadow-md"
    )}>
      {plan.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary-foreground px-3 py-0.5
                           text-xs font-semibold text-primary shadow-sm">
            Most popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-semibold">{plan.name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className={cn("text-sm",
            plan.featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
            /month
          </span>
        </div>
        <p className={cn("mt-2 text-sm",
          plan.featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {plan.description}
        </p>
      </div>

      <ul className="mb-8 flex-1 space-y-2.5">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.featured ? "secondary" : "outline"}
        className="w-full"
        asChild
      >
        <a href={plan.href}>Get started</a>
      </Button>
    </div>
  ))}
</div>
```

---

## Animation Playbook

### Rules First

| Use case | Duration | Easing | Notes |
|---|---|---|---|
| Hover (color, shadow) | 150ms | ease-out | Never animate layout |
| Button press | 100ms | ease-in | `scale-[0.97]` |
| Page entrance | 400–500ms | ease-out | Once, not on repeat |
| Staggered list | 300ms + 60–80ms delay | ease-out | Cap at 5–6 staggered items |
| Modal / dialog open | 200ms | ease-out | Scale + fade |
| Sheet / drawer slide | 300ms | `cubic-bezier(0.32,0.72,0,1)` | Transform only |

**Tailwind animate-in (CSS, no JS):**
```tsx
<div className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both">
  Content
</div>

{/* Staggered items */}
{items.map((item, i) => (
  <div
    key={item.id}
    className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
    style={{ animationDelay: `${i * 70}ms` }}
  >
    {/* ... */}
  </div>
))}
```

**Framer Motion — blur-in (Linear/Vercel pattern):**
```tsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i.id} variants={item}>{/* ... */}</motion.li>
  ))}
</motion.ul>
```

**Always respect reduced motion:**
```tsx
import { useReducedMotion } from "framer-motion"

function AnimatedDiv({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.4 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Responsive Strategy

**Mobile-first + container-aware with `@container`.**

Use viewport breakpoints (`md:`, `lg:`) for page-level layout decisions.
Use container queries (`@sm:`, `@lg:`) for reusable components inside variable-width columns.

```tsx
{/* Viewport — page sections */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

{/* Container — reusable widgets */}
<div className="@container">
  <div className="flex flex-col @md:flex-row gap-4">
```

**Navigation breakpoints:**
- Desktop: sticky horizontal bar or fixed sidebar
- Mobile: hamburger → shadcn `Sheet` — never a hidden overflow dropdown

**Data tables:**
- Mobile: card list (hide non-essential columns)
- Tablet: scrollable table with sticky first column
- Desktop: full table, sortable headers, row action menus

---

## Performance Rules

- `<Image>` from `next/image` — always. Never `<img>`. Set `width`/`height` or use `fill` with a sized parent.
- `next/font` — always. Zero layout shift, no external request.
- **Server Components by default.** Use `"use client"` only for: event listeners, browser APIs, React hooks, or client-only third-party libs.
- Lazy-load heavy components:
  ```tsx
  const Chart = dynamic(() => import("@/components/chart"), {
    loading: () => <Skeleton className="h-64 w-full rounded-xl" />,
    ssr: false
  })
  ```
- `Suspense` boundaries around async server components.
- `React.memo`, `useMemo`, `useCallback` — only after profiling. Don't premature-optimise.

---

## Code Architecture

### Folder Structure

```
app/
  (marketing)/           ← layout, page, loading, error for public pages
    page.tsx
    layout.tsx
  (app)/                 ← authenticated product
    dashboard/
    settings/
  api/                   ← route handlers only
components/
  ui/                    ← shadcn primitives (never hand-edit)
  layout/                ← Header, Sidebar, Footer, Shell
  [feature]/             ← feature-specific components
    feature-card.tsx
    feature-table.tsx
lib/
  utils.ts               ← cn() and shared utilities
  validations/           ← zod schemas
  api/                   ← typed fetch wrappers / server actions
hooks/                   ← custom hooks
types/                   ← shared TypeScript interfaces
```

### The `cn()` Utility (always present)

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Component Template

```tsx
// components/[feature]/feature-card.tsx
import { cn } from "@/lib/utils"
import type { FC } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ElementType
  variant?: "default" | "featured"
  className?: string
}

export const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  variant = "default",
  className,
}) => (
  <div className={cn(
    "rounded-2xl border p-6 transition-all duration-200",
    variant === "default" && "border-border bg-card hover:shadow-md",
    variant === "featured" && "border-primary/30 bg-primary/5",
    className
  )}>
    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h3 className="mb-1.5 font-semibold">{title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
  </div>
)
```

---

## Accessibility Non-Negotiables

- `aria-label` on every icon-only button or link
- `<button>` for actions, `<a href>` for navigation — **never swap**
- Every form input has an associated `<FormLabel>` — never skipped
- Focus rings: always visible — never `outline-none` without a custom visible ring
- Color is never the **only** state indicator — pair with icon, text, or pattern
- `alt` text on all `<Image>` — empty string `alt=""` for decorative only
- Keyboard navigation: Tab, Enter, Space, Escape, Arrow keys all tested
- `<html lang="en">` always set
- `suppressHydrationWarning` on `<html>` when using theme switching
- WCAG AA contrast verified — 4.5:1 for text, 3:1 for interactive UI

---

## Anti-Pattern Reference

| ❌ Never | ✅ Instead | Why |
|---|---|---|
| `style={{ color: '#333' }}` | `className="text-foreground"` | Breaks dark mode |
| `<div onClick={...}>` | `<button onClick={...}>` | Not keyboard accessible |
| `z-index: 99999` | Tailwind `z-50`, proper stacking context | Uncontrolled layering |
| `tailwind.config.js` | `@theme {}` in globals.css | v4 is CSS-only |
| `bg-opacity-50` | `bg-black/50` | v4 renamed, old is dead |
| `flex-grow` / `flex-shrink` | `grow` / `shrink` | v4 canonical |
| `outline-none` alone | `outline-hidden` + visible ring | Focus disappears entirely |
| `<img src>` | `<Image>` from next/image | No LCP optimisation |
| `"use client"` by default | Server Component by default | Unnecessary JS |
| Purple gradients on white | Neutral palette + single accent | Screams AI-generated |
| Inter everywhere | Intentional font pairing | Inter is fine; it's just bland |
| Hardcoded hex colors | CSS variables | Can't theme or dark-mode |
| Nesting `motion.div` 5 deep | Flatter animated tree | Paint thrashing |
| `!important` overrides | Fix specificity or use `cn()` | Cascading nightmare |
| Generic card layout | Bento, asymmetric, intentional grid | Forgettable vs memorable |

---

## Pre-Ship Checklist

**Visual**
- [ ] Font loaded via `next/font` — no FOUT, no `<link>` tags
- [ ] Dark mode: toggle it — nothing broken, hardcoded, or inverted
- [ ] 375px mobile: single column, no horizontal overflow, tap targets ≥ 44px
- [ ] 768px tablet: layout transitions cleanly
- [ ] 1280px+ desktop: breathing room, `max-w-7xl container` applied

**Interaction**
- [ ] Hover + focus + active states on all interactive elements
- [ ] Loading states: skeleton or spinner — never frozen blank UI
- [ ] Empty states: helpful message + recovery action
- [ ] Error states: clear message, not raw JS error
- [ ] Disabled states styled correctly (not just low opacity)

**Code Quality**
- [ ] No TypeScript errors, no `any` types
- [ ] No console warnings or errors
- [ ] `<Image>` used for all images, dimensions set
- [ ] `"use client"` is justified — not added by reflex
- [ ] Animations respect `prefers-reduced-motion`
- [ ] WCAG AA contrast verified on all text and UI
- [ ] Keyboard navigation tested end to end

---

*Ship UI that makes engineers proud and designers ask "wait, an AI wrote that?"*
