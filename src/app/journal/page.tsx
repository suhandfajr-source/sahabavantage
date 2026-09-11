'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { journalArticles } from '@/data/articles';
import { formatDate } from '@/lib/utils';
import { Search, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function JournalPage() {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Architecture', 'Property Insight', 'Lifestyle', 'Development Update'];

  const filtered = journalArticles.filter((article) => {
    const matchesCat = selectedCat === 'All' || article.category === selectedCat;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featured = journalArticles.find((a) => a.featured) || journalArticles[0];

  return (
    <div className="pt-32 pb-28 bg-[#F8F6F1] text-[#0B1D3A] min-h-screen">
      {/* Journal Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A66A] block">
            EDITORIAL & PERSPECTIVES
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal leading-tight text-[#0B1D3A]">
            The Vantage Journal
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B] font-sans-luxury leading-relaxed">
            Eksplorasi mendalam mengenai filsafat arsitektur tropis, wawasan investasi properti bernilai abadi, dan kurasi gaya hidup tenang.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0B1D3A]/10 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCat === cat
                    ? 'bg-[#0B1D3A] text-[#F8F6F1] shadow-md'
                    : 'text-[#6B6B6B] hover:text-[#0B1D3A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
            />
          </div>
        </div>
      </div>

      {/* Featured Headline Article */}
      {selectedCat === 'All' && !searchQuery && featured && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
          <div className="rounded-[32px] overflow-hidden border border-[#C7A66A]/30 bg-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            <div className="lg:col-span-7 relative h-[360px] sm:h-[440px] overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6">
                <span className="px-3.5 py-1.5 rounded-full bg-[#0B1D3A]/85 text-[#C7A66A] text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
                  Featured Editorial
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs text-[#6B6B6B]">
                  <span className="text-[#C7A66A] font-semibold uppercase">{featured.category}</span>
                  <span>•</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#0B1D3A] group-hover:text-[#9D7D45] transition-colors">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans-luxury leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#0B1D3A]/10">
                <div className="flex items-center space-x-2">
                  <Image
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-[#0B1D3A]">{featured.author.name}</span>
                </div>

                <Link
                  href={`/journal/${featured.slug}`}
                  className="inline-flex items-center space-x-1 text-xs uppercase tracking-widest font-semibold text-[#0B1D3A] hover:text-[#C7A66A] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-3xl overflow-hidden border border-[#C7A66A]/20 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <Image
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#0B1D3A]/85 text-[#C7A66A] text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] text-[#6B6B6B]">
                    <span>{formatDate(art.publishedAt)}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-serif-luxury text-xl text-[#0B1D3A] group-hover:text-[#9D7D45] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-3 font-sans-luxury">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#0B1D3A]/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#0B1D3A]">{art.author.name}</span>
                <Link
                  href={`/journal/${art.slug}`}
                  className="text-xs uppercase tracking-widest font-semibold text-[#C7A66A] group-hover:translate-x-1 transition-transform flex items-center space-x-1"
                >
                  <span>Read ↗</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
