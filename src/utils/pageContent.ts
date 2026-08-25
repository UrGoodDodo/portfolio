import { getCollection } from 'astro:content';

import type { Language } from '../i18n/config';

export async function getPageContent(
  lang: Language,
  pageId: string
) {
  const pages = await getCollection('pages');

  const page = pages.find((entry) => {
    const [entryLang, entryPageId] =
      entry.id.split('/');

    return (
      entryLang === lang &&
      entryPageId === pageId
    );
  });

  return page ?? null;
}