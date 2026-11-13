// Run after build: SITE_URL=https://your-confirmed-domain.example node scripts/generate-sitemap.mjs
import { writeFileSync } from "node:fs";
if (!process.env.SITE_URL) {
  console.error(
    "Provide your verified production origin as SITE_URL. No domain is assumed.",
  );
  process.exit(1);
}
const url = new URL(process.env.SITE_URL);
if (!["http:", "https:"].includes(url.protocol) || url.username || url.password)
  throw new Error("SITE_URL must be an HTTP(S) origin without credentials");
const paths = [
  "/",
  "/studios",
  "/studios/create",
  "/studios/build",
  "/studios/grow",
  "/work",
  "/about",
  "/project-lab",
  "/find-solution",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  ...[
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "M1",
    "M2",
    "M3",
  ].map((id) => `/services/${id}`),
];
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `\n  <url><loc>${url.origin}${path}</loc></url>`).join("")}\n</urlset>\n`,
);
writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml\n`,
);
console.log(
  "Generated sitemap and robots for the configured production origin.",
);
