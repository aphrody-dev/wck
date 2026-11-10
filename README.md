# wck: Sovereign Compile-Time Web & Lighthouse Gate

Deterministic, zero-compromise Compile-Time Web Validator implementing all 7 mandatory specifications for modern web platforms.

Built in 100% pure oven-sh/bun (Full Rust) with zero external npm dependencies. Compiled to a standalone native Windows executable (`wck.exe`).

## 7 Mandatory Specifications

1. **Spec 1 — Google Search SEO (`seo`)**:
   - `<html lang="...">` ISO language declaration
   - `<meta charset="utf-8">`
   - `<title>` length between 10 and 60 characters
   - `<meta name="description">` length between 50 and 160 characters
   - `<link rel="canonical" href="https://...">`
   - OpenGraph metadata (`og:title`, `og:description`, `og:url`, `og:type`)
   - Semantic landmarks: `<header role="banner">`, `<main role="main">`, `<footer role="contentinfo">`
   - Accessible names on `<button>`, `<input>`, `<a>`, `<svg role="img">`
   - `robots.txt` and `sitemap.xml` validation

2. **Spec 2 — Google AI Mode SEO & Generative Engine Optimization (`aiseo`)**:
   - Schema.org JSON-LD Structured Data (`WebSite` or `SoftwareApplication` with `potentialAction: SearchAction`)
   - Meta robots AI crawler directives: `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`
   - Concise AI Crawler Index (`/llms.txt`) with H1 title, summary, and canonical endpoints

3. **Spec 3 — Modern Web Guidelines & WCAG 2.2 AA (`mwg`)**:
   - `<meta name="viewport" content="width=device-width, initial-scale=1">` (rejects `maximum-scale=1` or `user-scalable=no`)
   - Explicit `color-scheme: light dark` support
   - Keyboard `:focus-visible` CSS rules
   - `@media (prefers-reduced-motion: reduce)` support
   - Zero deprecated HTML tags and zero inline `javascript:` URLs

4. **Spec 4 — Core Web Vitals Static Gate (`cwv`)**:
   - **CLS = 0.000**: Explicit `width` & `height` on all `<img>`, `<svg>`, `<canvas>`, `<video>` tags; compositor-only `@keyframes`
   - **LCP Budget**: Initial HTML + gzipped CSS `< 14 KB` (fits inside TCP IW10 congestion window)
   - **INP Budget**: Initial JS bundle gzipped size `< 30 KB` (< 15 ms parse/compile, < 50 ms INP)

5. **Spec 5 — Lighthouse 100/100/100/100 Gate (`lh`)**:
   - Deterministic 100/100/100/100 scores across Performance, Accessibility, Best Practices, and SEO

6. **Spec 6 — WebAssembly Spec Gate (`wasm`)**:
   - Magic header `\0asm\x01\x00\x00\x00` validation
   - Native `WebAssembly.validate()` bytecode verification
   - Native `WebAssembly.Module()` instantiation and export/import contract checks

7. **Spec 7 — WebGPU & Chromium Dawn Spec Gate (`webgpu`)**:
   - WGSL entry points `@compute`, `@vertex`, `@fragment`
   - Universal Dawn/Chromium workgroup limit: `X * Y * Z <= 256` invocations
   - Group/binding uniqueness (`@group(g) @binding(b)`)
   - 16-byte struct uniform std140 layout alignment rules
   - Browser `navigator.gpu` capability guard

## CLI Usage

```bash
# Validate directory
wck C:\src\aphrody\dist

# Validate single HTML document
wck C:\src\gamescope-rs\web\index.html

# Output JSON
wck C:\src\aphrody\dist --json
```
