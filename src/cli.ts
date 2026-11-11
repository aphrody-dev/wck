#!/usr/bin/env bun
import { resolve } from "path";
import { formatReport, validateWeb } from "./validator";

function printHelp(): void {
  console.log(`
wck: Compile-Time Web & Lighthouse 100 Gate (3-letter Sovereign CLI)
100% pure oven-sh/bun (Full Rust) with zero external dependencies

Usage:
  wck [<path>] [options]

Arguments:
  <path>             Target directory or HTML file to validate (default: ".")

Options:
  --json             Output full report in structured JSON format
  --quiet            Print summary line only
  --spec=<name>      Run only specific spec (seo, aiseo, mwg, cwv, lh, wasm, webgpu)
  -h, --help         Display this help message

Specs Validated:
  1. seo             Google Search SEO (meta, title 10..60, desc 50..160, canonical, OpenGraph, landmarks, robots.txt, sitemap.xml)
  2. aiseo           Google AI Mode SEO / GEO (JSON-LD WebSite+SearchAction, robots crawler permissions, /llms.txt)
  3. mwg             Modern Web Guidelines (responsive viewport, light/dark color-scheme, :focus-visible, reduced-motion, zero deprecated)
  4. cwv             Core Web Vitals Static Gate (CLS=0.000 explicit media & compositor keyframes, LCP < 14KB TCP IW10, INP < 30KB JS)
  5. lh              Lighthouse 100/100/100/100 Gate (Performance, Accessibility, Best Practices, SEO)
  6. wasm            WebAssembly Spec Gate (magic header, WebAssembly.validate(), WebAssembly.Module(), contract verification)
  7. webgpu          WebGPU & Dawn Spec Gate (@compute/@vertex/@fragment, workgroup <= 256, binding uniqueness, 16-byte std140 align, gpu guard)
`);
}

const args = process.argv.slice(2);
let targetPath = ".";
let jsonOutput = false;
let quietOutput = false;
let specFilter: any = "all";

for (const arg of args) {
  if (arg === "-h" || arg === "--help" || arg === "help") {
    printHelp();
    process.exit(0);
  } else if (arg === "-v" || arg === "--version" || arg === "version") {
    console.log(
      "wck v1.0.0 (Compile-Time Web Validator - oven-sh/bun v1.4.4 Full Rust)",
    );
    process.exit(0);
  } else if (arg === "--json") {
    jsonOutput = true;
  } else if (arg === "--quiet") {
    quietOutput = true;
  } else if (arg.startsWith("--spec=")) {
    specFilter = arg.split("=")[1];
  } else if (!arg.startsWith("-")) {
    targetPath = arg;
  }
}

try {
  const resolved = resolve(process.cwd(), targetPath);
  const report = validateWeb(resolved, {
    json: jsonOutput,
    quiet: quietOutput,
    specFilter,
  });

  if (jsonOutput) {
    console.log(JSON.stringify(report, null, 2));
  } else if (quietOutput) {
    console.log(report.summary);
  } else {
    console.log(formatReport(report));
  }

  process.exit(report.allPassed ? 0 : 1);
} catch (err: any) {
  console.error(`wck execution error: ${err.message}`);
  process.exit(1);
}
