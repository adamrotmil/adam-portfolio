// For GitHub Pages, the site is served under /adam-portfolio/
// The configure-pages action injects basePath into next.config for Next.js routing,
// but raw <img> tags need manual prefixing.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
