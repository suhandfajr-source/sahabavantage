'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/data/articles';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="pt-32 pb-28 bg-[#F8F6F1] text-[#0B1D3A] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#6B6B6B] hover:text-[#0B1D3A] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to Journal</span>
        </Link>

        {/* Article Metadata Header */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-[#0B1D3A] text-[#C7A66A] font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-[#6B6B6B]">{formatDate(article.publishedAt)}</span>
            <span className="text-[#6B6B6B]">•</span>
            <span className="text-[#6B6B6B]">{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-normal leading-tight text-[#0B1D3A]">
            {article.title}
          </h1>

          <p className="text-base sm:text-xl font-serif-luxury italic text-[#6B6B6B] leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Bar */}
          <div className="flex items-center justify-between py-4 border-y border-[#0B1D3A]/10">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#C7A66A]/40"
              />
              <div>
                <span className="text-xs font-bold text-[#0B1D3A] block">{article.author.name}</span>
                <span className="text-[11px] text-[#6B6B6B] font-sans-luxury">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[#6B6B6B]">
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard.');
                  }
                }}
                className="p-2 rounded-full hover:bg-black/5 hover:text-[#0B1D3A] transition-colors"
                aria-label="Share article"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Cover Hero Image */}
        <div className="rounded-3xl overflow-hidden border border-[#C7A66A]/30 shadow-2xl mb-12 h-[380px] sm:h-[480px]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose max-w-none text-sm sm:text-base text-[#4A4A4A] font-sans-luxury leading-relaxed space-y-6 mb-16">
          {article.pullQuote && (
            <div className="p-6 sm:p-8 my-8 rounded-2xl bg-[#0B1D3A] text-[#F8F6F1] border-l-4 border-[#C7A66A]">
              <p className="font-serif-luxury italic text-lg sm:text-xl text-[#F8F6F1]/95 leading-relaxed">
                “{article.pullQuote}”
              </p>
            </div>
          )}

          <div className="whitespace-pre-line leading-relaxed space-y-4">
            {article.content}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-[#0B1D3A]/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#0B1D3A] mr-2">Tags:</span>
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white border border-[#0B1D3A]/10 text-xs text-[#6B6B6B]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#0B1D3A]/15 space-y-8">
          <h3 className="text-2xl font-serif-luxury text-[#0B1D3A]">
            Related Perspectives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/journal/${rel.slug}`}
                className="p-6 rounded-2xl bg-white border border-[#C7A66A]/20 shadow-sm hover:shadow-md transition-all group space-y-3"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                  {rel.category}
                </span>
                <h4 className="font-serif-luxury text-base text-[#0B1D3A] group-hover:text-[#9D7D45] transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#6B6B6B] line-clamp-2">{rel.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
