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

    sections: z.array(z.string()),

    heroVideo: z.string().optional(),

    gallery: z.array(z.string()).optional(),

    beforeAfter: z
      .object({
        before: z.string(),
        after: z.string(),
      })
      .optional(),

    gameplayVideo: z.string().optional(),

    presentation: z
      .object({
        folder: z.string(),
        slides: z.number().int().positive(),
        format: z
          .enum(['webp', 'jpg', 'png'])
          .default('webp'),
      })
      .optional(),

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

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/pages',
  }),

  schema: z.object({
    title: z.string(),
    heading: z.string().optional(),

    subtitle: z.string().optional(),
    intro: z.string().optional(),

    about: z
      .object({
        title: z.string(),
        text: z.string(),
      })
      .optional(),

    background: z
      .object({
        title: z.string(),
        text: z.string(),
      })
      .optional(),

    areas: z
      .object({
        title: z.string(),

        items: z.array(
          z.object({
            title: z.string(),
            text: z.string(),
          })
        ),
      })
      .optional(),

    education: z
      .object({
        title: z.string(),

        master: z.object({
          title: z.string(),
          degree: z.string(),
          organization: z.string(),
          logo: z.string(),
          description: z.string(),
          year: z.string(),
        }),

        bachelor: z.object({
          title: z.string(),
          degree: z.string(),
          organization: z.string(),
          logo: z.string(),
          description: z.string(),
          year: z.string(),
        }),
      })
      .optional(),

    courses: z
      .object({
        title: z.string(),

        items: z.array(
          z.object({
            title: z.string(),
            organization: z.string(),
            year: z.string(),
            logo: z.string(),
          })
        ),
      })
      .optional(),

    technologies: z
      .object({
        title: z.string(),

        creative: z.object({
          title: z.string(),
          items: z.array(z.string()),
        }),

        development: z.object({
          title: z.string(),
          items: z.array(z.string()),
        }),
      })
      .optional(),

    contact: z
      .object({
        title: z.string(),
        text: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  projects,
  projectContent,
  pages,
};