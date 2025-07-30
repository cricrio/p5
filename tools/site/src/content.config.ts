import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

import { sketchLoader } from './loaders/sketch';

const postSketches = defineCollection({
  loader: glob({
    pattern: './src/content/sketches/**/post.{mdoc,md,mdx}',
    generateId: ({ entry }) => entry.split('/')[3],
  }),
  schema: z.object({
    title: z.string(),
    publish: z.boolean(),
    animated: z.boolean().optional(),
  }),
});

const sketches = defineCollection({
  loader: sketchLoader({ pattern: './sketches/**/sketch.js' }),
  schema: z.object({
    sketch: z.string(),
    steps: z.record(z.string(), z.string()),
  }),
});

export const collections = { sketches, postSketches };
