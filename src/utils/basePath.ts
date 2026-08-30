function getNormalizedBase(): string {
  const base = import.meta.env.BASE_URL;

  if (!base || base === '/') {
    return '';
  }

  return base.endsWith('/')
    ? base.slice(0, -1)
    : base;
}

export function withBase(path: string): string {
  const base = getNormalizedBase();

  const normalizedPath =
    path.startsWith('/')
      ? path
      : `/${path}`;

  if (!base) {
    return normalizedPath;
  }

  if (
    normalizedPath === base ||
    normalizedPath.startsWith(`${base}/`)
  ) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
}