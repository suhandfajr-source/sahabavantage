import { JournalArticle } from '@/types';

export const journalArticles: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'the-architecture-of-light-and-shadow',
    title: 'The Architecture of Light and Shadow: Designing for Tropical Serenity',
    excerpt: 'How our architectural studio harnesses cross-ventilation, deep eaves, and filtered daylight to evoke an effortless sense of calm in modern homes.',
    content: `In an era defined by sensory overstimulation, true luxury is no longer defined by ornamentation, but by spatial clarity, natural equilibrium, and silence.
    
    When we began conceptualizing the architectural identity of Sahaba Vantage Estates, the primary inquiry was simple yet foundational: *How does a structure hold space for a meaningful human life?*
    
    ### The Poetry of Natural Light
    Light in the tropics is both a gift and an element requiring deliberate architectural choreography. Rather than relying on harsh perimeter glazing, our residences utilize recessed clerestories, filtered timber brise-soleil screens, and central reflecting atriums. 
    
    As the sun rises across the mountain ridges, dawn light sweeps across honed travertine surfaces with a soft, diffused luminescence. By midday, cantilevered eaves cast cool, deep shadows, reducing heat gain by up to 40% while preserving open visual sightlines into the surrounding forest.
    
    ### Honest Materials that Age Gracefully
    We reject synthetic, ephemeral veneers in favor of materials that carry an innate honesty:
    
    - **Andesite Volcanic Stone**: Quarried locally in West Java, cut into monolithic slabs that weather into richer patinas over decades.
    - **Reclaimed Indonesian Teak**: Kiln-dried sustainably and finished with organic oils rather than plastic varnishes, preserving the warm tactile scent of authentic timber.
    - **Rammed Earth & Monolithic Cast Concrete**: Delivering superior acoustic dampening that shields residents from the hum of external urban life.
    
    Architecture is not merely a container; it is an instrument through which we experience the cadence of everyday existence.`,
    author: {
      name: 'Arya Daniswara',
      role: 'Principal Architectural Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    category: 'Architecture',
    publishedAt: '2026-03-02',
    readTime: '5 min read',
    featured: true,
    tags: ['Architecture', 'Biophilic Design', 'Tropical Modernism', 'Sustainability'],
    pullQuote: 'True luxury is no longer defined by ornamentation, but by spatial clarity, natural equilibrium, and silence.'
  },
  {
    id: 'art-02',
    slug: 'why-quiet-luxury-is-redefining-modern-estates',
    title: 'Why Quiet Luxury is Redefining Indonesia’s High-End Real Estate',
    excerpt: 'The shift from ostentatious displays to thoughtful, multi-generational sanctuaries that prioritize wellness, privacy, and acoustic serenity.',
    content: `Over the past decade, the definition of prestige in Indonesian real estate has undergone a profound psychological evolution. Affluent homebuyers and discerning families are pivoting away from gilded excess toward properties characterized by timeless restraint, privacy, and holistic well-being.
    
    ### The Rise of the Multi-Generational Sanctuary
    Today’s estate is not merely an asset on a balance sheet; it is the center of family legacy. Spaces are designed to accommodate private contemplation as effortlessly as lively multi-generational family gatherings.
    
    Dual primary suites, dedicated wellness pavilions, and private sensory gardens provide distinct zones of sanctuary where family members of all ages can thrive simultaneously.
    
    ### Spatial Integrity Over Density
    Where conventional developers maximize land yield by squeezing floorplans, Sahaba Vantage prioritizes low density, dedicating upwards of 65% of the total estate masterplan to conserved green spaces, linear parks, and natural waterways.`,
    author: {
      name: 'Dina Kusuma',
      role: 'Head of Lifestyle & Brand Strategy',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    category: 'Property Insight',
    publishedAt: '2026-02-18',
    readTime: '4 min read',
    featured: false,
    tags: ['Market Trends', 'Quiet Luxury', 'Investment', 'Lifestyle'],
    pullQuote: 'Today’s estate is not merely an asset on a balance sheet; it is the center of family legacy.'
  },
  {
    id: 'art-03',
    slug: 'the-philosophy-of-indoor-outdoor-living',
    title: 'The Art of the Breeze: Redefining Indoor-Outdoor Living in West Java',
    excerpt: 'Exploring how pocket gardens, open-air lanais, and continuous floor planes create seamless transitions between architecture and landscape.',
    content: `Living in harmony with climate means creating homes that breathe. Through continuous terrazzo flooring extending from interior living rooms onto outdoor timber decks, the boundary between inside and outside is deliberately dissolved.
    
    ### Acoustic Calming Elements
    By integrating subtle water features, reflecting ponds, and native bamboo plantings around perimeter bedrooms, the sound of trickling water and rustling leaves masks unwanted ambient noise, promoting deep rest and restorative sleep.
    
    Our masterplans ensure that every window frame acts as a curated landscape painting, connecting homeowners with the natural cycles of dusk and dawn.`,
    author: {
      name: 'Budi Santoso, IAI',
      role: 'Lead Landscape & Masterplan Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    category: 'Lifestyle',
    publishedAt: '2026-01-25',
    readTime: '6 min read',
    featured: false,
    tags: ['Landscape', 'Interior Design', 'Wellness'],
    pullQuote: 'Every window frame acts as a curated landscape painting connecting homeowners with the rhythms of nature.'
  }
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}

export function getAllArticles(): JournalArticle[] {
  return journalArticles;
}
