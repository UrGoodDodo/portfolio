import { getCollection } from 'astro:content';
import { marked } from 'marked';

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

  return await marked.parse(section);
}