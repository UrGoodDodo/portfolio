import { defaultLanguage, type Language } from './config';
import { ui } from './ui';

export function getUi(lang: Language) {
  return ui[lang];
}

export function getSectionTitle(
  lang: Language,
  sectionName: string
): string {
  const t = getUi(lang);

  return (
    t.sectionTitles[sectionName] ??
    formatSectionTitleFallback(sectionName)
  );
}

function formatSectionTitleFallback(
  sectionName: string
): string {
  return sectionName
    .split('-')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(' ');
}

export function getLanguageFromUrl(url: URL): Language {
  const [, firstSegment] = url.pathname.split('/');

  if (firstSegment === 'ru') {
    return 'ru';
  }

  if (firstSegment === 'en') {
    return 'en';
  }

  return defaultLanguage;
}

export function getLocalizedPath(
  pathname: string,
  targetLang: Language
): string {
  const segments = pathname
    .split('/')
    .filter(Boolean);

  if (
    segments[0] === 'en' ||
    segments[0] === 'ru'
  ) {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }

  return `/${segments.join('/')}${
    pathname.endsWith('/') ? '/' : ''
  }`;
}