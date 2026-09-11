import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlugMerged as getArticleBySlug, getMergedArticles as getAllArticles } from '@/lib/content';
import ArticleDetailClient from '@/components/journal/ArticleDetailClient';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = await getAllArticles();
  return all.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Sahaba Vantage Estates',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: {
      canonical: `/journal/${article.slug}`,
    },
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/journal/${article.slug}`,
      siteName: 'Sahaba Vantage Estates',
      type: 'article',
      publishedTime: article.publishedAt,
      images: [{ url: article.coverImage }],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = (await getAllArticles())
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return <ArticleDetailClient article={article} related={related} />;
}
