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

export function getLanguageFromUrl(
  url: URL
): Language {
  const segments =
    url.pathname
      .split('/')
      .filter(Boolean);

  const language =
    segments.find(
      (segment) =>
        segment === 'en' ||
        segment === 'ru'
    );

  if (
    language === 'en' ||
    language === 'ru'
  ) {
    return language;
  }

  return defaultLanguage;
}

export function getLocalizedPath(
  pathname: string,
  currentLang: Language,
  targetLang: Language
): string {
  if (currentLang === targetLang) {
    return pathname;
  }

  const currentSegment =
    `/${currentLang}/`;

  const targetSegment =
    `/${targetLang}/`;

  if (
    pathname.includes(currentSegment)
  ) {
    return pathname.replace(
      currentSegment,
      targetSegment
    );
  }

  const currentEnding =
    `/${currentLang}`;

  const targetEnding =
    `/${targetLang}`;

  if (
    pathname.endsWith(currentEnding)
  ) {
    return pathname.slice(
      0,
      -currentEnding.length
    ) + targetEnding;
  }

  return pathname;
}