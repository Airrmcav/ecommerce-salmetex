import { Metadata } from "next";

const BASE_URL = "https://salmetexmed.com.mx";
const SITE_NAME = "Salmetexmed";

type PageType = "home" | "category" | "product" | "blog" | "special";

interface MetadataParams {
  type: PageType;
  title: string;
  description: string;
  keywords?: string[];
  slug?: string;
  images?: { url: string; alt?: string }[];
  noIndex?: boolean;
}

export function generatePageMetadata({
  type,
  title,
  description,
  keywords = [],
  slug,
  images = [],
  noIndex = false,
}: MetadataParams): Metadata {
  const canonical = slug ? `${BASE_URL}/${slug}` : BASE_URL;

  const defaultKeywords = [
    "equipo médico",
    "Mexico",
    "Salmetexmed",
    SITE_NAME,
  ];

  const mergedKeywords =
    keywords.length > 0 ? [...keywords, ...defaultKeywords] : defaultKeywords;

  const ogImages =
    images.length > 0
      ? images.map((img) => ({
          url: img.url,
          alt: img.alt ?? title,
          width: 1200,
          height: 630,
        }))
      : [
          {
            url: `${BASE_URL}/og-image.jpg`,
            alt: title,
            width: 1200,
            height: 630,
          },
        ];

  const result: Metadata = {
    title,
    description: truncateDescription(description),
    keywords: mergedKeywords,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_MX",
      type: type === "product" ? "product" : "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ogImages.map((img) => img.url),
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };

  return result;
}

export function generateProductMetadata(params: {
  productName: string;
  textSeo?: string;
  description: string;
  slug: string;
  categoryName: string;
  imageUrl?: string;
  active?: boolean;
}): Metadata {
  const { productName, textSeo, description, slug, categoryName, imageUrl } = params;

  return generatePageMetadata({
    type: "product",
    title: productName,
    description: textSeo || description,
    slug,
    keywords: [
      productName,
      categoryName,
      "equipo médico",
      "comprar",
      "Mexico",
    ],
    images: imageUrl ? [{ url: imageUrl, alt: productName }] : [],
  });
}

export function generateCategoryMetadata(params: {
  categoryName: string;
  slug: string;
  description?: string;
}): Metadata {
  const { categoryName, slug, description } = params;

  return generatePageMetadata({
    type: "category",
    title: `${categoryName} | ${SITE_NAME}`,
    description:
      description ||
      `Compra equipos médicos de ${categoryName} en México. Equipos certificados, garantía y envío nacional.`,
    slug: `categoria/${slug}`,
    keywords: [
      categoryName,
      `${categoryName} México`,
      `comprar ${categoryName}`,
      "equipo médico",
    ],
  });
}

export function generateBlogMetadata(params: {
  title: string;
  description: string;
  slug?: string;
}): Metadata {
  return generatePageMetadata({
    type: "blog",
    title: params.title,
    description: params.description,
    slug: params.slug ? `blog/${params.slug}` : "blog",
    keywords: [params.title, "blog", "equipo médico", "salud"],
  });
}

function truncateDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export const SITE_CONFIG = {
  BASE_URL,
  SITE_NAME,
  PHONE: "844 595 4660",
  PHONE_WA: "528445954660",
  EMAIL: "contacto@salmetexmed.com.mx",
} as const;