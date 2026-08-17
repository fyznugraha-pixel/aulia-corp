import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['MICE', 'EXHIBITION', 'BRANDING', 'FILM']),
  year: z.coerce.number().min(2000, 'Year must be a valid number'),
  city: z.string().optional(),
  shortDesc: z.string().min(1, 'Short description is required'),
  fullDesc: z.string().optional(),
  coverImage: z.string().min(1, 'Cover image is required'),
  gallery: z.array(z.string()).default([]),
  isFeatured: z.coerce.boolean().default(false),
  order: z.coerce.number().default(0),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  photo: z.string().min(1, 'Photo is required'),
  isLeadership: z.coerce.boolean().default(false),
  order: z.coerce.number().default(0),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  quote: z.string().min(1, 'Quote is required'),
  rating: z.coerce.number().min(1).max(5).default(5),
  photo: z.string().optional().nullable(),
  order: z.coerce.number().default(0),
});

export const clientLogoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logoUrl: z.string().min(1, 'Logo URL is required'),
  category: z.enum(['GOVERNMENT_BUMN', 'CORPORATE', 'OTHERS']),
  order: z.coerce.number().default(0),
});

export const siteSettingsSchema = z.object({
  heroHeadline: z.string().min(1, 'Hero headline is required'),
  heroSubheadline: z.string().min(1, 'Hero subheadline is required'),
  yearsActive: z.coerce.number().min(0, 'Years active must be 0 or more'),
  ctaText: z.string().min(1, 'CTA text is required'),
  aboutHeadline: z.string().min(1, 'About headline is required'),
  aboutDescription: z.string().min(1, 'About description is required'),
  contactEmail: z.string().email('Must be a valid email'),
  contactPhone: z.string().min(1, 'Phone is required'),
  contactWhatsapp: z.string().min(1, 'WhatsApp number is required'),
  contactAddress: z.string().min(1, 'Address is required'),
  socialInstagram: z.string().nullable().optional(),
  socialFacebook: z.string().nullable().optional(),
  socialTiktok: z.string().nullable().optional(),
  socialYoutube: z.string().nullable().optional(),
});

export const eventVideoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  youtubeUrl: z.string().url('Must be a valid URL').regex(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/, 'Must be a valid YouTube URL'),
  order: z.preprocess((val) => Number(val), z.number()),
  isFeatured: z.boolean().default(false),
});
