import { defineCollection, z } from 'astro:content';

// Translation schema
const translationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    nav: z.object({
      home: z.string(),
      about: z.string(),
      services: z.string(),
      training: z.string(),
      blog: z.string(),
      contact: z.string(),
      profile: z.string(),
      admin: z.string(),
      login: z.string(),
      logout: z.string(),
    }),
    common: z.object({
      loading: z.string(),
      error: z.string(),
      success: z.string(),
      submit: z.string(),
      cancel: z.string(),
      save: z.string(),
      edit: z.string(),
      delete: z.string(),
      confirm: z.string(),
      search: z.string(),
      next: z.string(),
      previous: z.string(),
      close: z.string(),
      open: z.string(),
    }),
    form: z.object({
      required: z.string(),
      email: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      message: z.string(),
      subject: z.string(),
    }),
    auth: z.object({
      login: z.string(),
      register: z.string(),
      forgotPassword: z.string(),
      resetPassword: z.string(),
      emailVerification: z.string(),
    }),
    blog: z.object({
      readMore: z.string(),
      categories: z.string(),
      tags: z.string(),
      author: z.string(),
      publishedOn: z.string(),
      comments: z.string(),
      addComment: z.string(),
      noComments: z.string(),
    }),
    seo: z.object({
      home: z.object({
        title: z.string(),
        description: z.string(),
      }),
      about: z.object({
        title: z.string(),
        description: z.string(),
      }),
      blog: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
  }),
});

// Blog posts schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
    ogImage: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    // Multilingual support
    locale: z.enum(['fr', 'en', 'de', 'es', 'ar', 'zh']),
    translations: z.record(z.string()).optional(), // Links to other language versions
  }),
});

// Categories schema
const categoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    slug: z.string(),
    color: z.string().optional(),
    icon: z.string().optional(),
    locale: z.enum(['fr', 'en', 'de', 'es', 'ar', 'zh']),
    translations: z.record(z.string()).optional(),
  }),
});

// Pages schema for static content
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['fr', 'en', 'de', 'es', 'ar', 'zh']),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    translations: z.record(z.string()).optional(),
  }),
});

export const collections = {
  'translations': translationsCollection,
  'blog': blogCollection,
  'categories': categoriesCollection,
  'pages': pagesCollection,
};