import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/project.md',
    base: './src/content/projects',
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    year: z.number(),

    roles: z.array(z.string()),
    technologies: z.array(z.string()),

    cover: z.string(),
    featured: z.boolean().default(false),

    sections: z.array(
      z.enum([
        'hero-image',
        'hero-video',
        'overview',
        'technical-breakdown',
        'level-design',
        'before-after',
        'gameplay-video',
        'gallery',
        'project-links',
      ])
    ),

    heroVideo: z.string().optional(),

    gallery: z.array(z.string()).optional(),

    beforeAfter: z
      .object({
        before: z.string(),
        after: z.string(),
      })
      .optional(),

    gameplayVideo: z.string().optional(),

    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .optional(),
  }),
});

const projectContent = defineCollection({
  loader: glob({
    pattern: '**/content.md',
    base: './src/content/projects',
  }),
});

export const collections = {
  projects,
  projectContent,
};