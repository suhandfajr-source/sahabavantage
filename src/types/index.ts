export interface UnitType {
  id: string;
  name: string;
  code: string;
  buildingArea: number; // m2
  landArea: number; // m2
  bedrooms: number;
  bathrooms: number;
  carports: number;
  floors: number;
  priceStarting?: string;
  description: string;
  exteriorImage: string;
  interiorImage: string;
  floorplanImage: string;
  interactiveRooms: {
    name: string;
    area: number; // m2
    level: number;
    description: string;
    coords: { x: number; y: number; width: number; height: number };
  }[];
  features: string[];
}

export interface MasterplanLot {
  id: string;
  lotNumber: string;
  unitTypeName: string;
  typeId: string;
  status: 'available' | 'limited' | 'sold' | 'upcoming';
  landArea: number;
  buildingArea: number;
  facing: string;
  priceEstimate?: string;
  coords: { x: number; y: number; radius?: number; width?: number; height?: number };
}

export interface Development {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullStory: string;
  location: {
    city: string;
    province: string;
    country: string;
    address: string;
    coordinates: { lat: number; lng: number };
    nearbyLandmarks: { name: string; distance: string; travelTime: string }[];
  };
  heroImage: string;
  heroVideo?: string;
  category: 'residential' | 'commercial' | 'estate';
  status: 'active' | 'upcoming' | 'completed';
  featured: boolean;
  order: number;
  stats: {
    totalUnits: number;
    completionYear: string;
    greenAreaPercentage: string;
    siteArea: string;
  };
  highlights: {
    title: string;
    description: string;
    icon?: string;
  }[];
  lifestyle: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  }[];
  gallery: {
    url: string;
    caption: string;
    category: 'architecture' | 'interior' | 'landscape' | 'lifestyle';
    aspectRatio?: 'landscape' | 'portrait' | 'wide';
  }[];
  specifications: {
    category: string;
    items: { label: string; value: string }[];
  }[];
  unitTypes: UnitType[];
  masterplanLots: MasterplanLot[];
  masterplanImage: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  category: 'Architecture' | 'Property Insight' | 'Lifestyle' | 'Development Update' | 'Company News';
  publishedAt: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  pullQuote?: string;
  gallery?: string[];
}

export interface PrivateVisitInquiry {
  id: string;
  fullName: string;
  whatsapp: string;
  email: string;
  developmentSlug: string;
  developmentName: string;
  preferredDate: string;
  preferredTime: string;
  visitorCount: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  createdAt: string;
  advisorNotes?: string;
}

export interface BrandMilestone {
  year: string;
  title: string;
  description: string;
  tag?: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  quote?: string;
}
