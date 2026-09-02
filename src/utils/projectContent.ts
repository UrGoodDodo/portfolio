import { getCollection } from 'astro:content';
import { marked } from 'marked';

import { withBase } from './basePath';

import type { Language } from '../i18n/config';

export async function getProjectContent(
  lang: Language,
  projectId: string
) {
  const contents = await getCollection('projectContent');

  const content = contents.find((entry) => {
    const [entryLang, entryProjectId] = entry.id.split('/');

    return (
      entryLang === lang &&
      entryProjectId === projectId
    );
  });

  return content ?? null;
}

export async function getProjectsByLanguage(
  lang: Language
) {
  const projects = await getCollection('projects');

  return projects
    .filter((project) => {
      const [entryLang] = project.id.split('/');

      return entryLang === lang;
    })
    .sort((a, b) => {
      return b.data.year - a.data.year;
    });
}

export async function getLatestProjectsByLanguage(
  lang: Language,
  limit = 3
) {
  const projects = await getProjectsByLanguage(lang);

  return projects.slice(0, limit);
}

export function getProjectSlug(
  projectId: string
): string {
  const [, slug] = projectId.split('/');

  return slug;
}

export function getMarkdownSection(
  markdown: string,
  sectionName: string
): string | null {
  const normalized = markdown.replace(/\r\n/g, '\n');

  const lines = normalized.split('\n');

  const heading = `## ${sectionName}`;

  const startIndex = lines.findIndex(
    (line) =>
      line.trim().toLowerCase() ===
      heading.toLowerCase()
  );

  if (startIndex === -1) {
    return null;
  }

  const sectionLines: string[] = [];

  for (
    let i = startIndex + 1;
    i < lines.length;
    i++
  ) {
    const line = lines[i];

    // Следующая секция второго уровня завершает текущую.
    if (/^\s*##\s+/.test(line)) {
      break;
    }

    sectionLines.push(line);
  }

  const content = sectionLines
    .join('\n')
    .trim();

  return content.length > 0
    ? content
    : null;
}

export async function renderMarkdownSection(
  markdown: string,
  sectionName: string
): Promise<string | null> {
  const section = getMarkdownSection(
    markdown,
    sectionName
  );

  if (!section) {
    return null;
  }

  const renderer = new marked.Renderer();

  renderer.image = ({ href, title, text }) => {
    const src =
      href.startsWith('/')
        ? withBase(href)
        : href;

    const allowedLayouts = new Set([
      'default',
      'left',
      'right',
      'wide',
      'contained',
      'half',
    ]);

    const layout =
      title && allowedLayouts.has(title)
        ? title
        : 'default';

    return `
      <img
        src="${src}"
        alt="${text}"
        class="markdown-image markdown-image--${layout}"
      >
    `;
  };

  const preparedSection =
    renderHalfImagePairs(section);

  return await marked.parse(preparedSection, {
    renderer,
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderHalfImagePairs(
  markdown: string
): string {
  const lines = markdown.split('\n');

  const result: string[] = [];

  const halfImagePattern =
    /^!\[(.*?)\]\((\S+)\s+"half"\)\s*$/;

  for (let i = 0; i < lines.length; i++) {
    const first =
      lines[i].match(halfImagePattern);

    const second =
      lines[i + 1]?.match(halfImagePattern);

    if (first && second) {
      const [, firstAlt, firstHref] = first;
      const [, secondAlt, secondHref] = second;

      const firstSrc =
        firstHref.startsWith('/')
          ? withBase(firstHref)
          : firstHref;

      const secondSrc =
        secondHref.startsWith('/')
          ? withBase(secondHref)
          : secondHref;

      result.push(`
<div class="markdown-image-pair">
  <img
    src="${firstSrc}"
    alt="${escapeHtml(firstAlt)}"
    class="markdown-image markdown-image--half"
  >
  <img
    src="${secondSrc}"
    alt="${escapeHtml(secondAlt)}"
    class="markdown-image markdown-image--half"
  >
</div>
`);

      i++;

      continue;
    }

    result.push(lines[i]);
  }

  return result.join('\n');
}