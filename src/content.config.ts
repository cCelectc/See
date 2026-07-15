import { defineCollection } from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postSchema = z.object({
	title: z.string(),
	published: z.date(),
	updated: z.date().optional(),
	draft: z.boolean().optional().default(false),
	pinned: z.boolean().optional().default(false),
	description: z.string().optional().default(""),
	image: z.string().optional().default(""),
	tags: z.array(z.string()).optional().default([]),
	category: z.string().optional().nullable().default(""),
	lang: z.string().optional().default(""),

	/* For internal use */
	prevTitle: z.string().default(""),
	prevSlug: z.string().default(""),
	nextTitle: z.string().default(""),
	nextSlug: z.string().default(""),
});

const specSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	image: z.string().optional(),
	friends: z.array(z.object({
		name: z.string(),
		avatar: z.string(),
		description: z.string(),
		url: z.string(),
		tags: z.array(z.string()).optional().default([]),
	})).optional().default([]),
});

const postsLoader = glob({
	base: "./content/posts",
	pattern: "**/index.{md,mdx}",
});

const postsCollection: CollectionConfig<
	typeof postSchema,
	typeof postsLoader
> = defineCollection({
	loader: postsLoader,
	schema: postSchema,
});

const specLoader = glob({
	base: "./content/spec",
	pattern: "**/index.{md,mdx}",
});

const specCollection: CollectionConfig<
	typeof specSchema,
	typeof specLoader
> = defineCollection({
	loader: specLoader,
	schema: specSchema,
});

export const collections: {
	posts: typeof postsCollection;
	spec: typeof specCollection;
} = {
	posts: postsCollection,
	spec: specCollection,
};
