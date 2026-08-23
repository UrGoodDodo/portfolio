import { getCollection } from 'astro:content';
import { marked } from 'marked';

export async function getProjectContent(projectId: string) {
  const contents = await getCollection('projectContent');

  const content = contents.find((entry) => {
    const folder = entry.id.split('/')[0];

    return folder === projectId;
  });

  if (!content) {
    return null;
  }

  return content;
}

export function getMarkdownSection(
  markdown: string,
  sectionName: string
): string | null {
  const normalized = markdown.replace(/\r\n/g, '\n');

  const lines = normalized.split('\n');

  const heading = `## ${sectionName}`;

  const startIndex = lines.findIndex(
    (line) => line.trim().toLowerCase() === heading.toLowerCase()
  );

  if (startIndex === -1) {
    return null;
  }

  const sectionLines: string[] = [];

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];

    // Следующая секция второго уровня завершает текущую.
    if (/^##\s+/.test(line)) {
      break;
    }

    sectionLines.push(line);
  }

  return sectionLines.join('\n').trim();
}

export function formatSectionTitle(sectionName: string): string {
  return sectionName
    .split('-')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(' ');
}

export async function renderMarkdownSection(
  markdown: string,
  sectionName: string
): Promise<string | null> {
  const section = getMarkdownSection(markdown, sectionName);

  if (!section) {
    return null;
  }

  return await marked.parse(section);
}