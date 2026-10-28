export const site = {
  brand: {
    name: 'Mai Manzil',
    legalName: 'Mai Manzil L.L.C-FZ',
    domain: 'www.maimanzil.com',
    title: 'Mai Manzil | On-Demand Manpower Supply in Dubai',
    tagline: 'On-demand manpower. Professional people. Reliable service.',
    footerDescription: 'On-demand staff for hospitality, housekeeping and events in Dubai. The right people, when you need them.',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Staffing Capacity', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  ctas: {
    primary: { label: 'Request Staff', href: '/contact' },
    secondary: { label: 'View Staffing Capacity', href: '/portfolio' },
  },

  hero: {
    mobileHeadline: 'Your team,',
    mobileHeadlineAccent: 'on demand.',
    mobileSubhead: 'Hospitality. Housekeeping. Events.',
    headline: 'On-demand manpower supply for your business in Dubai.',
    subhead:
      'Flexible staffing for hospitality, housekeeping, events, and operational needs. Request the roles and headcount you need, when you need them.',
    badges: ['On-demand staffing', 'Hospitality roles', 'Housekeeping teams', 'Event manpower'],
  },
  heroSlides: [
    { image: '/hero-dubai.jpg', alt: 'A Dubai venue prepared for hospitality services.' },
    { image: '/luxury-event-dubai.jpg', alt: 'A formal venue prepared for an event.' },
    { image: '/portfolio-weddings.jpg', alt: 'A wedding reception venue.' },
    { image: '/portfolio-corporate.jpg', alt: 'A corporate event venue.' },
  ],

  featuredWork: [
    {
      title: 'Hospitality & Event Staffing',
      category: 'On-demand hospitality manpower',
      description: 'Waiters, waitresses, bartenders, baristas, and hostesses for catering, venues, and events.',
      image: '/portfolio-corporate.jpg',
    },
    {
      title: 'Housekeeping & Stewarding',
      category: 'Housekeeping manpower',
      description: 'Personnel for room care, public-area cleaning, event spaces, and back-of-house support.',
      image: '/portfolio-6-cleaning.jpg',
    },
    {
      title: 'Guest Reception & Supervision',
      category: 'Event & operational staffing',
      description: 'Hostesses, supervisors, and managers to support guest reception and team coordination.',
      image: '/host-hostess.png',
    },
  ],

  gallery: [
    { image: '/hero-dubai.jpg', title: 'Hospitality in Dubai', alt: 'Hospitality setting in Dubai' },
    { image: '/luxury-event-dubai.jpg', title: 'Event hospitality', alt: 'Event venue prepared for hospitality service' },
    { image: '/portfolio-1-weddings.jpg', title: 'Wedding receptions', alt: 'Wedding venue supported by event staff' },
    { image: '/portfolio-2-corporate.jpg', title: 'Corporate events', alt: 'Corporate venue setup' },
    { image: '/portfolio-3-hospitality.jpg', title: 'Hospitality teams', alt: 'Hospitality service setting' },
    { image: '/portfolio-6-cleaning.jpg', title: 'Housekeeping', alt: 'Housekeeping and venue cleaning' },
  ],

  services: [
    {
      title: 'Waiters & Waitresses',
      description: 'Table service, guest assistance, food running, and banquet support.',
      icon: 'utensils',
      category: "Hospitality",
      highlights: ["Table and banquet service","Guest assistance and food running"],
    },
    {
      title: 'Bartenders',
      description: 'Beverage preparation, bar service, bar-area upkeep, and applicable hygiene and responsible-service procedures.',
      icon: 'martini',
      category: "Hospitality",
      highlights: ["Beverage preparation and service","Bar upkeep and hygiene"],
    },
    {
      title: 'Baristas',
      description: 'Coffee and beverage preparation, counter service, and cafe support.',
      icon: 'coffee',
      category: "Hospitality",
      highlights: ["Coffee and beverage preparation","Counter service and cafe support"],
    },
    {
      title: 'Cashiers',
      description: 'POS transactions, payment handling, receipts, and end-of-shift procedures defined by the client.',
      icon: 'receipt',
      category: "Operations",
      highlights: ["POS and payment handling","Receipts and shift procedures"],
    },
    {
      title: 'Stewards',
      description: 'Dishwashing, kitchen cleanliness, equipment handling, and back-of-house support.',
      icon: 'cookingPot',
      category: "Kitchen support",
      highlights: ["Dishwashing and kitchen hygiene","Equipment and back-of-house support"],
    },
    {
      title: 'Housekeeping',
      description: 'Cleaning and sanitising, bed-making, supply replenishment, waste handling, and reporting maintenance or safety concerns.',
      icon: 'sparkles',
      category: "Facilities",
      highlights: ["Room and public-area cleaning","Supply replenishment and upkeep"],
    },
    {
      title: 'Supervisors & Managers',
      description: 'Team briefings, attendance checks, task allocation, client coordination, and service monitoring.',
      icon: 'clipboardCheck',
      category: "Operations",
      highlights: ["Briefings and task allocation","Attendance and client coordination"],
    },
    {
      title: 'Hostesses',
      description: 'Guest greeting, registration support, seating coordination, and queue guidance.',
      icon: 'userRoundCheck',
      category: "Guest services",
      highlights: ["Guest greeting and registration","Seating and queue guidance"],
    },
  ],

  businessAreas: [
    {
      title: 'Hospitality manpower',
      description:
        'On-demand personnel for hotels, restaurants, cafes, banquets, catering companies, exhibitions, conferences, weddings, concerts, and corporate events.',
    },
    {
      title: 'Housekeeping manpower',
      description:
        'Housekeeping staff for guest rooms, public areas, offices, event spaces, and back-of-house areas, based on your schedule and staffing requirements.',
    },
    {
      title: 'Event & operational staffing',
      description:
        'Temporary and project-based staff deployed for operational peaks and events, based on availability and an agreed staffing plan.',
    },
  ],

  process: [
    {
      step: 'Plan',
      description: 'We confirm role profiles, headcount, location, shift times, reporting points, and site instructions.',
    },
    {
      step: 'Coordinate',
      description: 'We align the staffing plan with availability, venue requirements, and agreed terms.',
    },
    {
      step: 'Support',
      description: 'Team leads can coordinate briefings, attendance, task allocation, and service standards on site.',
    },
    {
      step: 'Review',
      description: 'We communicate operational changes and service concerns through the designated client contacts.',
    },
  ],

  staffingCapacity: [
    { role: 'Waiter', minimum: 5, maximum: 150, responsibilities: 'Table service, guest assistance, food running, and banquet support.' },
    { role: 'Waitress', minimum: 5, maximum: 100, responsibilities: 'Table service, guest assistance, food running, and banquet support.' },
    { role: 'Barista', minimum: 5, maximum: 25, responsibilities: 'Coffee and beverage preparation, counter service, and cafe operations.' },
    { role: 'Bartender', minimum: 5, maximum: 20, responsibilities: 'Beverage preparation, bar service, and bar-area upkeep.' },
    { role: 'Cashier', minimum: 5, maximum: 15, responsibilities: 'POS operation, payment handling, and transaction support.' },
    { role: 'Steward', minimum: 5, maximum: 50, responsibilities: 'Dishwashing, kitchen hygiene, equipment, and back-of-house support.' },
    { role: 'Housekeeping', minimum: 5, maximum: 200, responsibilities: 'Room, public-area, and event-space cleaning and upkeep.' },
  ],

  about: {
    title: 'Your on-demand manpower supply partner',
    body:
      'Mai Manzil L.L.C-FZ is a Dubai-based on-demand manpower supply company providing personnel for hospitality, housekeeping, events, and day-to-day operations. We support hotels, restaurants, cafes, catering companies, exhibitions, venues, and corporate functions. Each staffing request is planned around the roles, headcount, schedule, site requirements, availability, and terms agreed with the client.',
    vision:
      'To be a trusted hospitality and facilities-support partner in the UAE, recognised for dependable staffing, professional conduct, service quality, and long-term client relationships.',
    mission: [
      'Provide capable, presentable, and service-focused personnel for hospitality, housekeeping, and event operations.',
      'Match staffing plans to client needs, service standards, and agreed timelines.',
      'Promote guest satisfaction, workplace safety, teamwork, and respectful communication.',
      'Build lasting partnerships through transparent coordination, responsive support, and continuous improvement.',
    ],
    values: [
      {
        title: 'Professional presentation',
        description: 'We communicate the grooming, uniform, and conduct expectations relevant to each client and venue.',
      },
      {
        title: 'Safety & hygiene',
        description: 'Personnel follow applicable site rules, food-safety practices, housekeeping procedures, and health-and-safety instructions.',
      },
      {
        title: 'Responsive coordination',
        description: 'Designated contacts coordinate attendance, schedule changes, shortages, incidents, and service concerns.',
      },
    ],
  },

  contact: {
    phone: '050 119 9583\n055 556 9301',
    email: 'info@maimanzil.com',
    location: 'Meydan Grandstand, 6th Floor, Nad Al Sheba, Dubai, UAE',
    headline: 'Tell us about your staffing requirements',
    description: 'Share the roles, headcount, location, dates, shift hours, and responsibilities you need. We will coordinate availability and an appropriate staffing plan.',
    cardNote: 'Deployments are confirmed after the staffing request, availability, rates, schedule, and applicable terms have been agreed in writing.',
    ctaLabel: 'Contact Mai Manzil',
  },
};
