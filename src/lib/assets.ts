/**
 * 获取 public 目录下静态资源的正确 URL，兼容 GitHub Pages 等子路径部署
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return normalizedBase + normalizedPath;
}
