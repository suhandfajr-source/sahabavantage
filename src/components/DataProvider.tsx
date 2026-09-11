'use client';

import React, { createContext, useContext } from 'react';
import { Development, JournalArticle } from '@/types';

interface SiteData {
  developments: Development[];
  articles: JournalArticle[];
}

const SiteDataContext = createContext<SiteData>({ developments: [], articles: [] });

/**
 * Bridges server-rendered merged content (static baseline + CSV imports)
 * into client components without each importing static data directly.
 */
export function DataProvider({
  developments,
  articles,
  children
}: SiteData & { children: React.ReactNode }) {
  return (
    <SiteDataContext.Provider value={{ developments, articles }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteData {
  return useContext(SiteDataContext);
}
