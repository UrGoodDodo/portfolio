export function withBase(
  path: string
): string {
  const base =
    import.meta.env.BASE_URL;

  const normalizedBase =
    base.endsWith('/')
      ? base.slice(0, -1)
      : base;

  const normalizedPath =
    path.startsWith('/')
      ? path
      : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
}


export function withoutBase(
  path: string
): string {
  const base =
    import.meta.env.BASE_URL;

  const normalizedBase =
    base.endsWith('/')
      ? base.slice(0, -1)
      : base;

  if (
    normalizedBase &&
    path.startsWith(normalizedBase)
  ) {
    const result =
      path.slice(
        normalizedBase.length
      );

    return result.startsWith('/')
      ? result
      : `/${result}`;
  }

  return path;
}