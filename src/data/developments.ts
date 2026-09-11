import { Development } from '@/types';

export const developments: Development[] = [
  {
    id: 'sve-bogor-01',
    slug: 'vantage-residence',
    name: 'Vantage Residence',
    tagline: 'Designed for Life in Balance.',
    shortDescription: '24 exclusive hillside residences nestled amidst the misty green elevations of Bogor, blending modernist lines with tropical landscape.',
    fullStory: `Vantage Residence is an architectural celebration of equilibrium — where the quiet dignity of pure geometric form meets the untamed grace of tropical nature. Positioned on an undulating hillside in South Bogor, each residence is terraced to capture uninterrupted panoramic vistas of Mount Salak while maximizing prevailing mountain cross-breezes.
    
    Constructed using locally quarried Andesite stone, monolithic rammed earth partitions, and sustainably harvested Indonesian teak, the homes create a continuous sanctuary. With floor-to-ceiling glass expanses, private cantilevered infinity plunge pools, and dual-aspect internal courtyard gardens, Vantage Residence transcends typical dwellings to provide a timeless family retreat.`,
    location: {
      city: 'Bogor',
      province: 'West Java',
      country: 'Indonesia',
      address: 'Jl. Raya Rancamaya No. 88, Bogor Selatan',
      coordinates: { lat: -6.6534, lng: 106.8293 },
      nearbyLandmarks: [
        { name: 'Jagorawi Expressway Interchange', distance: '3.2 km', travelTime: '7 mins' },
        { name: 'Rancamaya Golf & Country Club', distance: '1.8 km', travelTime: '4 mins' },
        { name: 'Bogor Botanical Gardens', distance: '9.5 km', travelTime: '18 mins' },
        { name: 'Halim Perdanakusuma Airport (via Toll)', distance: '48 km', travelTime: '45 mins' }
      ]
    },
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    category: 'residential',
    status: 'active',
    featured: true,
    order: 1,
    stats: {
      totalUnits: 24,
      completionYear: '2026',
      greenAreaPercentage: '68%',
      siteArea: '4.2 Hectares'
    },
    highlights: [
      {
        title: 'Bespoke Architectural Geometry',
        description: 'Designed by internationally acclaimed studio to optimize solar orientation, passive cooling, and visual tranquility.'
      },
      {
        title: 'Private Forest Buffer',
        description: 'Over 68% of the master site is preserved as conserved pine woodland, biophilic water channels, and community orchards.'
      },
      {
        title: 'Zero-Grid Solar Readiness',
        description: 'Each residence features integrated high-efficiency photovoltaic infrastructure and rainwater harvesting reservoirs.'
      },
      {
        title: 'Private Resident Sanctuary Club',
        description: 'Exclusive 24-seat screening pavilion, heated mineral lap pool, curated wellness spa, and concierge lounge.'
      }
    ],
    lifestyle: [
      {
        title: 'Morning Awakening',
        subtitle: 'Mornings Defined by Mist & Birds',
        description: 'Wake to the gentle golden light diffusing through floor-to-ceiling clerestory windows, overlooking the serene Salak mountain range.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'The Central Atrium',
        subtitle: 'Bringing the Outdoor Forest Indoors',
        description: 'Internal private courtyards create an interplay of rain, sunlight, and breezes within the heart of your home.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'Twilight Gathering',
        subtitle: 'Intimate Evenings Under Open Skies',
        description: 'Expansive cantilevered teak timber decks with sunken fire pits provide the ideal setting for multi-generational dining.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        caption: 'South elevation cantilever overlooking the private valley',
        category: 'architecture',
        aspectRatio: 'wide'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Double-height living space with Travertine marble finishes',
        category: 'interior',
        aspectRatio: 'landscape'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
        caption: 'Minimalist chef kitchen with imported quartzite and hidden scullery',
        category: 'interior',
        aspectRatio: 'portrait'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        caption: 'Evening illumination reflecting on the infinity plunge pool',
        category: 'architecture',
        aspectRatio: 'landscape'
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
        caption: 'Master bath retreat featuring monolithic freestanding bathtub',
        category: 'interior',
        aspectRatio: 'portrait'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
        caption: 'Preserved pine woodland walking trail along the creek',
        category: 'landscape',
        aspectRatio: 'wide'
      }
    ],
    specifications: [
      {
        category: 'Structure & Foundation',
        items: [
          { label: 'Foundation', value: 'Reinforced Concrete Bore Piles & Raft Footing' },
          { label: 'Superstructure', value: 'Seismic Grade-4 Reinforced Monolithic Concrete' },
          { label: 'Roof System', value: 'Insulated Standing Seam Titanium Zinc with Acoustic Damping' }
        ]
      },
      {
        category: 'Finishes & Materials',
        items: [
          { label: 'Flooring (Living & Dining)', value: 'Silver Travertine & Imported Italian Bianco Carrara Marble' },
          { label: 'Flooring (Bedrooms)', value: 'Solid Engineered Indonesian Teak (Grade A)' },
          { label: 'Exterior Cladding', value: 'Honed Lava Stone, Fluted Teak Panels & Fair-faced Concrete' },
          { label: 'Windows & Glazing', value: 'Schüco Low-E Acoustic Double-Glazed Argon Insulated System' }
        ]
      },
      {
        category: 'Sanitary & Appliances',
        items: [
          { label: 'Sanitary Ware', value: 'Toto Neorest Smart Suites & Dornbracht Brushed Platinum Fixtures' },
          { label: 'Kitchen Cabinetry', value: 'Poliform Custom Italian Joinery with Silestone Calacatta Tops' },
          { label: 'Appliances', value: 'Gaggenau 400 Series Induction, Combi-Steam Oven & Wine Climate Cabinet' }
        ]
      },
      {
        category: 'Smart Home & Security',
        items: [
          { label: 'Automation', value: 'Control4 Smart Home Ecosystem (HVAC, Lighting, Shades, Audio)' },
          { label: 'HVAC System', value: 'Daikin VRV Water-Cooled Silent Air Conditioning with Air Purification' },
          { label: 'Security', value: 'Biometric Face Recognition, Optical Perimeter AI Sensors, 24/7 Concierge' }
        ]
      }
    ],
    unitTypes: [
      {
        id: 'unit-celestial',
        name: 'The Celestial Villa',
        code: 'TYPE-380',
        buildingArea: 385,
        landArea: 450,
        bedrooms: 4,
        bathrooms: 5,
        carports: 3,
        floors: 3,
        priceStarting: 'Rp 8.5 Miliar',
        description: 'A three-storey masterpiece featuring a private top-floor observatory terrace, double-height great room, and secluded subterranean wine lounge.',
        exteriorImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        interiorImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        floorplanImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
        interactiveRooms: [
          { name: 'Grand Living Hall', area: 54.0, level: 1, description: 'Double-height 6.2m ceiling opening directly onto the infinity terrace', coords: { x: 20, y: 35, width: 35, height: 28 } },
          { name: 'Chef & Show Kitchen', area: 28.5, level: 1, description: 'Custom Italian marble island with concealed prep pantry', coords: { x: 58, y: 35, width: 25, height: 20 } },
          { name: 'Master Sanctuary Suite', area: 48.0, level: 2, description: 'Private corner balcony, dual walk-in dressing salon and spa bath', coords: { x: 22, y: 15, width: 38, height: 26 } },
          { name: 'Mountain View Solarium', area: 32.0, level: 3, description: 'Rooftop meditation pavilion with sunset cocktail bar', coords: { x: 45, y: 65, width: 30, height: 22 } }
        ],
        features: [
          'Direct Infinity Plunge Pool Access',
          'Private Glass Elevating System',
          'Rooftop Sky Observatory',
          'Subterranean Multipurpose Suite'
        ]
      },
      {
        id: 'unit-horizon',
        name: 'The Horizon Pavilion',
        code: 'TYPE-290',
        buildingArea: 295,
        landArea: 320,
        bedrooms: 3,
        bathrooms: 4,
        carports: 2,
        floors: 2,
        priceStarting: 'Rp 6.2 Miliar',
        description: 'An expansive two-level pavilion configured with a continuous flow between indoor courtyards, dining pavilions, and lush gardens.',
        exteriorImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        interiorImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        floorplanImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
        interactiveRooms: [
          { name: 'Open-Plan Family Salon', area: 42.0, level: 1, description: 'Continuous sightline towards the private bamboo garden', coords: { x: 25, y: 40, width: 32, height: 25 } },
          { name: 'Internal Courtyard Oasis', area: 18.0, level: 1, description: 'Sunlit Japanese maple garden bringing natural light deep into bedrooms', coords: { x: 60, y: 38, width: 18, height: 20 } },
          { name: 'Primary Master Suite', area: 36.5, level: 2, description: 'Spacious retreat with freestanding soaker tub overlooking valley', coords: { x: 28, y: 18, width: 30, height: 24 } }
        ],
        features: [
          'Internal Japanese Zen Garden',
          'Wrap-around Timber Verandah',
          'Double Volume Dining Hall',
          'Dedicated Home Office / Study'
        ]
      }
    ],
    masterplanLots: [
      { id: 'lot-01', lotNumber: 'V-01', unitTypeName: 'The Celestial Villa', typeId: 'unit-celestial', status: 'sold', landArea: 480, buildingArea: 385, facing: 'North-East (Mount Salak View)', coords: { x: 18, y: 28, radius: 16 } },
      { id: 'lot-02', lotNumber: 'V-02', unitTypeName: 'The Celestial Villa', typeId: 'unit-celestial', status: 'available', landArea: 450, buildingArea: 385, facing: 'North-East (Mount Salak View)', priceEstimate: 'Rp 8.5 Miliar', coords: { x: 30, y: 26, radius: 16 } },
      { id: 'lot-03', lotNumber: 'V-03', unitTypeName: 'The Horizon Pavilion', typeId: 'unit-horizon', status: 'available', landArea: 340, buildingArea: 295, facing: 'North (Pine Forest Frontage)', priceEstimate: 'Rp 6.3 Miliar', coords: { x: 42, y: 24, radius: 15 } },
      { id: 'lot-04', lotNumber: 'V-04', unitTypeName: 'The Horizon Pavilion', typeId: 'unit-horizon', status: 'limited', landArea: 320, buildingArea: 295, facing: 'North (Pine Forest Frontage)', priceEstimate: 'Rp 6.2 Miliar', coords: { x: 54, y: 26, radius: 15 } },
      { id: 'lot-05', lotNumber: 'V-05', unitTypeName: 'The Celestial Villa', typeId: 'unit-celestial', status: 'available', landArea: 465, buildingArea: 385, facing: 'East (Morning Valley Light)', priceEstimate: 'Rp 8.7 Miliar', coords: { x: 67, y: 32, radius: 16 } },
      { id: 'lot-06', lotNumber: 'V-06', unitTypeName: 'The Celestial Villa', typeId: 'unit-celestial', status: 'sold', landArea: 510, buildingArea: 410, facing: 'Corner Prime Valley View', coords: { x: 80, y: 40, radius: 18 } },
      { id: 'lot-07', lotNumber: 'V-07', unitTypeName: 'The Horizon Pavilion', typeId: 'unit-horizon', status: 'available', landArea: 330, buildingArea: 295, facing: 'South-East (River Meadow)', priceEstimate: 'Rp 6.25 Miliar', coords: { x: 26, y: 55, radius: 15 } },
      { id: 'lot-08', lotNumber: 'V-08', unitTypeName: 'The Horizon Pavilion', typeId: 'unit-horizon', status: 'available', landArea: 325, buildingArea: 295, facing: 'South-East (River Meadow)', priceEstimate: 'Rp 6.2 Miliar', coords: { x: 39, y: 58, radius: 15 } },
      { id: 'lot-09', lotNumber: 'V-09', unitTypeName: 'The Celestial Villa', typeId: 'unit-celestial', status: 'limited', landArea: 440, buildingArea: 385, facing: 'South-West (Sunset Ridge)', priceEstimate: 'Rp 8.4 Miliar', coords: { x: 53, y: 62, radius: 16 } },
      { id: 'lot-10', lotNumber: 'V-10', unitTypeName: 'The Celestial Villa', typeId: 'unit-celestial', status: 'upcoming', landArea: 460, buildingArea: 385, facing: 'South-West (Sunset Ridge)', coords: { x: 68, y: 68, radius: 16 } }
    ],
    masterplanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
    seo: {
      title: 'Vantage Residence Bogor | 24 Exclusive Hillside Villas',
      description: 'Discover Vantage Residence Bogor — 24 modern hillside architectural estates offering tranquility, panoramic mountain views, and quiet luxury living.',
      keywords: ['Vantage Residence', 'Bogor Luxury Home', 'Sahaba Vantage', 'Hillside Villa Bogor', 'Quiet Luxury Property']
    }
  },
  {
    id: 'sve-bandung-02',
    slug: 'vantage-sanctuary',
    name: 'Vantage Sanctuary',
    tagline: 'A Forest Haven Above the Cloudline.',
    shortDescription: '18 biophilic forest estates poised on the pristine ridge of Dago Peak Bandung, immersed in year-round cool air and conserved eucalyptus canopies.',
    fullStory: `Perched 1,200 meters above sea level on the historic Dago Ridge, Vantage Sanctuary is conceived as an architectural dialogue between human comfort and native highland ecology. 
    
    The architecture employs cantilevers that touch the ground lightly, preserving existing towering pine trees. Expansive thermal-break glass facades open to the valley breeze, eliminating the need for artificial cooling. Each residence incorporates organic charred cedar siding (Shou Sugi Ban), volcanic slate masonry, and private indoor-outdoor thermal spring onsen pools.`,
    location: {
      city: 'Bandung',
      province: 'West Java',
      country: 'Indonesia',
      address: 'Jl. Dago Pakar Highlands No. 12, Ciburial, Cimenyan',
      coordinates: { lat: -6.8521, lng: 107.6322 },
      nearbyLandmarks: [
        { name: 'Dago Heritage Golf Course', distance: '2.5 km', travelTime: '6 mins' },
        { name: 'Taman Hutan Raya Ir. H. Djuanda', distance: '1.2 km', travelTime: '3 mins' },
        { name: 'Bandung City Center / Gedung Sate', distance: '8.0 km', travelTime: '20 mins' },
        { name: 'Whoosh Fast Train Station Padalarang', distance: '22 km', travelTime: '35 mins' }
      ]
    },
    heroImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=85',
    category: 'residential',
    status: 'active',
    featured: true,
    order: 2,
    stats: {
      totalUnits: 18,
      completionYear: '2026',
      greenAreaPercentage: '74%',
      siteArea: '3.6 Hectares'
    },
    highlights: [
      {
        title: 'High-Altitude Biophilic Architecture',
        description: 'Cantilevered volumes floating seamlessly above the undulating forest floor without disrupting indigenous root systems.'
      },
      {
        title: 'Thermal Spring Onsen Pools',
        description: 'Private mineral-infused heated plunge onsens integrated into the master suites of every villa.'
      },
      {
        title: 'Artisan Natural Palette',
        description: 'Hand-charred Shou Sugi Ban timber, raw volcanic stone, and brushed brass details that age gracefully over time.'
      },
      {
        title: 'Direct Forest Trail Access',
        description: 'Private gated access into the Djuanda Forest Reserve trails, bird sanctuaries, and natural mountain streams.'
      }
    ],
    lifestyle: [
      {
        title: 'Crisp Mountain Awakening',
        subtitle: '18°C Mornings with Mountain Mist',
        description: 'Step onto cantilevered cedar balconies wrapped in morning fog, brewing pour-over coffee as the sun crests over the ridge.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'Mindful Sanctuary',
        subtitle: 'Thermal Baths Amidst Ancient Trees',
        description: 'Unwind in private heated mineral onsen baths surrounded by pine needles and ambient forest acoustics.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80',
        caption: 'Cantilevered forest villa emerging through the Dago mist',
        category: 'architecture',
        aspectRatio: 'wide'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Living salon featuring wood-burning fireplace and panoramic valley windows',
        category: 'interior',
        aspectRatio: 'landscape'
      },
      {
        url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
        caption: 'Private heated onsen bath terrace overlooking eucalyptus canopies',
        category: 'architecture',
        aspectRatio: 'portrait'
      }
    ],
    specifications: [
      {
        category: 'Climate & Thermal Design',
        items: [
          { label: 'Insulation', value: 'Rockwool High-Density Acoustic and Thermal Multi-Layer Envelope' },
          { label: 'Fireplace', value: 'Stuv 30-Compact High-Efficiency Clean Wood Fireplace' },
          { label: 'Passive Ventilation', value: 'Aero-Dynamic Ridge Cross-Draft Glazing Louvers' }
        ]
      },
      {
        category: 'Natural Materials',
        items: [
          { label: 'Wood Finishes', value: 'Japanese Yakisugi / Shou Sugi Ban & Solid Bengkirai Decking' },
          { label: 'Stone Masonry', value: 'Merapi Volcanic Basalt and Honed Limestone Blocks' }
        ]
      }
    ],
    unitTypes: [
      {
        id: 'unit-sanctuary-grand',
        name: 'The Canopy Pavilion',
        code: 'TYPE-420',
        buildingArea: 420,
        landArea: 520,
        bedrooms: 4,
        bathrooms: 5,
        carports: 3,
        floors: 3,
        priceStarting: 'Rp 9.8 Miliar',
        description: 'An elevated four-bedroom forest estate with private glass skybridge, onsen deck, and dedicated guest wing.',
        exteriorImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
        interiorImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        floorplanImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
        interactiveRooms: [
          { name: 'Great Forest Lounge', area: 58.0, level: 1, description: 'Surrounded by triple-aspect glass facing the pine canopy', coords: { x: 20, y: 30, width: 38, height: 30 } },
          { name: 'Onsen Wellness Deck', area: 24.0, level: 1, description: 'Sunken natural stone mineral bath with thermal hydromassage', coords: { x: 62, y: 32, width: 22, height: 25 } },
          { name: 'Sky Bridge Suite', area: 44.0, level: 2, description: 'Floating bedroom pod connected via architectural glazed bridge', coords: { x: 28, y: 15, width: 32, height: 26 } }
        ],
        features: [
          'Floating Glass Skybridge',
          'Private Thermal Onsen Terrace',
          'Wood Burning Hearth in Lounge',
          'Temperature-Controlled Wine Cellar'
        ]
      }
    ],
    masterplanLots: [
      { id: 'lot-s01', lotNumber: 'S-01', unitTypeName: 'The Canopy Pavilion', typeId: 'unit-sanctuary-grand', status: 'available', landArea: 520, buildingArea: 420, facing: 'North (Ridge View)', priceEstimate: 'Rp 9.8 Miliar', coords: { x: 25, y: 30, radius: 17 } },
      { id: 'lot-s02', lotNumber: 'S-02', unitTypeName: 'The Canopy Pavilion', typeId: 'unit-sanctuary-grand', status: 'limited', landArea: 540, buildingArea: 420, facing: 'North-East (Valley View)', priceEstimate: 'Rp 10.2 Miliar', coords: { x: 45, y: 35, radius: 17 } },
      { id: 'lot-s03', lotNumber: 'S-03', unitTypeName: 'The Canopy Pavilion', typeId: 'unit-sanctuary-grand', status: 'sold', landArea: 580, buildingArea: 420, facing: 'East (Morning Panorama)', coords: { x: 65, y: 42, radius: 18 } }
    ],
    masterplanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
    seo: {
      title: 'Vantage Sanctuary Dago Peak | Biophilic Forest Estates Bandung',
      description: 'Exclusive 18 forest villas in Dago Peak Bandung with private thermal onsen pools and mountain panoramas.',
      keywords: ['Vantage Sanctuary', 'Dago Peak Bandung', 'Luxury Villa Bandung', 'Biophilic Home Indonesia']
    }
  },
  {
    id: 'sve-jakarta-03',
    slug: 'the-grand-vantage',
    name: 'The Grand Vantage',
    tagline: 'An Urban Sanctuary of Singular Distinction.',
    shortDescription: '12 monolithic urban mansions situated within the historic, tree-lined quiet enclave of South Jakarta, presenting unmatched privacy and prestige.',
    fullStory: `The Grand Vantage represents the zenith of metropolitan architecture. Situated in the prestigious, green residential quarter of South Jakarta, this collection of 12 private urban estates balances hyper-convenient proximity to the central business district with the supreme sanctuary of private, secluded courtyard living.
    
    Characterized by monumental fluted limestone facades, bronze brise-soleil architectural screens, private 4-car subterranean motor courts, and multi-tier private courtyards with lap pools, The Grand Vantage caters to discerning families seeking generational legacy assets.`,
    location: {
      city: 'South Jakarta',
      province: 'DKI Jakarta',
      country: 'Indonesia',
      address: 'Jl. Senopati Pratama No. 5, Kebayoran Baru, Jakarta Selatan',
      coordinates: { lat: -6.2341, lng: 106.8095 },
      nearbyLandmarks: [
        { name: 'SCBD Financial Center', distance: '1.5 km', travelTime: '5 mins' },
        { name: 'Pacific Place Mall & The Ritz-Carlton', distance: '1.8 km', travelTime: '6 mins' },
        { name: 'Senayan Golf Club', distance: '3.0 km', travelTime: '10 mins' },
        { name: 'Soekarno-Hatta International Airport', distance: '28 km', travelTime: '35 mins' }
      ]
    },
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85',
    category: 'residential',
    status: 'upcoming',
    featured: true,
    order: 3,
    stats: {
      totalUnits: 12,
      completionYear: '2027',
      greenAreaPercentage: '55%',
      siteArea: '2.8 Hectares'
    },
    highlights: [
      {
        title: 'Monumental Architectural Stone',
        description: 'Hand-selected Portuguese limestone panels and precision German engineered bronze kinetic privacy screens.'
      },
      {
        title: 'Subterranean Private Gallery',
        description: 'Private 4-car underground collector garage with direct private high-speed elevator access to all floors.'
      },
      {
        title: 'Private 18m Lap Pool & Courtyard',
        description: 'Monolithic indoor-outdoor swimming pool enveloped by vertical botanical gardens and cascading water walls.'
      },
      {
        title: 'Embassy-Grade Security Protocols',
        description: 'Multi-layer perimeter access, discreet biometric access corridors, and safe room provisions.'
      }
    ],
    lifestyle: [
      {
        title: 'Urban Serenity',
        subtitle: 'An Oasis in the Heart of the Capital',
        description: 'Close your solid bronze entrance portal and enter an acoustically silent realm of cascading water and lush foliage.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
        caption: 'Monumental streetscape with fluted limestone portals and bronze screening',
        category: 'architecture',
        aspectRatio: 'wide'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Formal reception salon with 7-meter ceilings and custom brass chandelier',
        category: 'interior',
        aspectRatio: 'landscape'
      }
    ],
    specifications: [
      {
        category: 'Prestige Architectural Specifications',
        items: [
          { label: 'Exterior Stone', value: 'Moca Cream Portuguese Limestone & Custom Dark Bronze Louvers' },
          { label: 'Elevators', value: 'Schindler Villa Luxury Glass Private Traction Lift' },
          { label: 'Acoustic Rating', value: 'STC 55 Sound Attenuation throughout All Living Quarters' }
        ]
      }
    ],
    unitTypes: [
      {
        id: 'unit-grand-estate',
        name: 'The Diplomat Mansion',
        code: 'TYPE-650',
        buildingArea: 650,
        landArea: 600,
        bedrooms: 5,
        bathrooms: 7,
        carports: 4,
        floors: 4,
        priceStarting: 'Rp 28.0 Miliar',
        description: 'A stately four-level urban mansion with private basement collector car showroom, 18m lap pool, and top-floor entertainment salon.',
        exteriorImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        interiorImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        floorplanImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
        interactiveRooms: [
          { name: 'Formal Grand Salon', area: 75.0, level: 1, description: 'Triple-height volume with direct sightline across the 18m courtyard lap pool', coords: { x: 22, y: 32, width: 42, height: 32 } },
          { name: 'Private Lap Pool & Verandah', area: 55.0, level: 1, description: 'Surrounded by living vertical green walls and reflection pond', coords: { x: 66, y: 28, width: 22, height: 36 } },
          { name: 'Presidential Master Suite', area: 68.0, level: 2, description: 'Encompassing dual walk-in couture closets, steam shower, and private reading lounge', coords: { x: 25, y: 15, width: 38, height: 28 } }
        ],
        features: [
          'Subterranean 4-Car Collector Garage',
          'Private 18m Lap Pool',
          'Private Schindler Elevator',
          'Top-Floor Sky Lounge & Cigar Terrace'
        ]
      }
    ],
    masterplanLots: [
      { id: 'lot-g01', lotNumber: 'G-01', unitTypeName: 'The Diplomat Mansion', typeId: 'unit-grand-estate', status: 'limited', landArea: 600, buildingArea: 650, facing: 'North-East', priceEstimate: 'Rp 28.0 Miliar', coords: { x: 30, y: 35, radius: 20 } },
      { id: 'lot-g02', lotNumber: 'G-02', unitTypeName: 'The Diplomat Mansion', typeId: 'unit-grand-estate', status: 'available', landArea: 650, buildingArea: 650, facing: 'North-East', priceEstimate: 'Rp 29.5 Miliar', coords: { x: 55, y: 35, radius: 20 } },
      { id: 'lot-g03', lotNumber: 'G-03', unitTypeName: 'The Diplomat Mansion', typeId: 'unit-grand-estate', status: 'upcoming', landArea: 720, buildingArea: 720, facing: 'Corner Prime Estate', coords: { x: 75, y: 45, radius: 22 } }
    ],
    masterplanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
    seo: {
      title: 'The Grand Vantage Jakarta | Ultra-Luxury Urban Mansions Senopati',
      description: 'Exclusive 12 private urban mansions in South Jakarta with private pools, underground car collector garages, and embassy-grade privacy.',
      keywords: ['The Grand Vantage', 'Luxury House Jakarta', 'Senopati Mansion', 'Sahaba Vantage Jakarta']
    }
  }
];

export function getDevelopmentBySlug(slug: string): Development | undefined {
  return developments.find((d) => d.slug === slug);
}

export function getAllDevelopments(): Development[] {
  return developments;
}
