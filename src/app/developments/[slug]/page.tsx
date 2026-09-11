import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDevelopmentBySlug, getAllDevelopments } from '@/data/developments';
import DevelopmentDetailClient from '@/components/developments/DevelopmentDetailClient';

interface DevelopmentPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllDevelopments().map((dev) => ({
    slug: dev.slug,
  }));
}

export async function generateMetadata({ params }: DevelopmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const development = getDevelopmentBySlug(slug);

  if (!development) {
    return {
      title: 'Development Not Found | Sahaba Vantage Estates',
    };
  }

  return {
    title: development.seo.title,
    description: development.seo.description,
    keywords: development.seo.keywords,
    alternates: {
      canonical: `/developments/${development.slug}`,
    },
    openGraph: {
      title: development.seo.title,
      description: development.seo.description,
      url: `/developments/${development.slug}`,
      siteName: 'Sahaba Vantage Estates',
      type: 'website',
      images: [{ url: development.heroImage }],
    },
  };
}

export default async function DevelopmentDetailPage({ params }: DevelopmentPageProps) {
  const { slug } = await params;
  const development = getDevelopmentBySlug(slug);

  if (!development) {
    notFound();
  }

  return <DevelopmentDetailClient development={development} />;
}
