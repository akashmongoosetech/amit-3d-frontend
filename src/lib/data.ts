import projectVolta from "@/assets/project-volta.jpg";
import projectMeridian from "@/assets/project-meridian.jpg";
import projectCourt from "@/assets/project-court.jpg";
import projectZest from "@/assets/project-zest.jpg";
import projectAster from "@/assets/project-aster.jpg";
import projectLedger from "@/assets/project-ledger.jpg";
import newsIdentity from "@/assets/news-identity.jpg";
import newsMaximalism from "@/assets/news-maximalism.jpg";
import newsConference from "@/assets/news-conference.jpg";
import newsProcess from "@/assets/news-process.jpg";

export interface Project {
  slug: string;
  title: string;
  blurb: string;
  category: string;
  year: string;
  client: string;
  services: string[];
  image: string;
  tall?: boolean;
  body: string[];
}

export const projects: Project[] = [
  {
    slug: "volta-athletics",
    title: "Volta Athletics",
    blurb: "Celebrating the drive and determination behind modern sport.",
    category: "Campaign",
    year: "2026",
    client: "Volta",
    services: ["Art direction", "Campaign", "Motion identity"],
    image: projectVolta,
    body: [
      "Volta came to us with a performance product and a quiet brand. Our job was to give the label a voice as loud as its athletes — a campaign system built on grain, sweat and single-source light.",
      "We built a modular art direction toolkit: one lighting recipe, one typographic scale, one motion language. Every asset from stadium banners to 6-second cutdowns comes from the same kit, so the brand stays unmistakable at any size.",
      "The launch campaign lifted branded search by 61% in eight weeks and gave Volta a photographic style competitors now imitate.",
    ],
  },
  {
    slug: "meridian-motors",
    title: "Meridian Motors",
    blurb: "A blend of classic car heritage and contemporary design.",
    category: "Brand identity",
    year: "2025",
    client: "Meridian",
    services: ["Brand identity", "Web design", "Content strategy"],
    image: projectMeridian,
    body: [
      "Meridian restores and re-engineers mid-century racing cars. The brand needed to feel like the workshop smells: oil, leather and patience.",
      "We paired a heritage serif with an engineering grotesk, built a photography direction around warm garage light, and rebuilt the digital showroom as a slow, cinematic scroll.",
      "Waitlist enquiries tripled within a quarter of launch, with an average time-on-site of over six minutes.",
    ],
  },
  {
    slug: "court-club",
    title: "Court Club",
    blurb: "Highlighting quirky, lesser-known sports with humour and energy.",
    category: "Campaign",
    year: "2025",
    client: "Court Club",
    services: ["Campaign", "Art direction", "Social system"],
    image: projectCourt,
    tall: true,
    body: [
      "Court Club champions the sports nobody televises. The brief: make table tennis, padel and pickleball feel like the coolest thing on the internet.",
      "We leaned into saturated backdrops, hard flash and deadpan casting — a look that treats amateur athletes like cover stars.",
      "The first drop earned 4.2M organic impressions and sold out the club's founding memberships in eleven days.",
    ],
  },
  {
    slug: "zest-and-co",
    title: "Zest & Co",
    blurb: "Bold packaging and branding that brings personality to the shelf.",
    category: "Packaging",
    year: "2024",
    client: "Zest & Co",
    services: ["Packaging", "Brand identity", "E-commerce"],
    image: projectZest,
    tall: true,
    body: [
      "A citrus soda with real fruit and zero patience for beige wellness branding. Zest needed shelf presence that shouts from three aisles away.",
      "We designed a can system built on collision: clashing brights, oversized type and splash photography that makes the product feel cold to the touch.",
      "Zest landed national listings within six months, with the design earning two packaging awards along the way.",
    ],
  },
  {
    slug: "aster-gallery",
    title: "Aster Gallery",
    blurb: "Challenging fashion stereotypes and celebrating the unexpected.",
    category: "Brand identity",
    year: "2024",
    client: "Aster",
    services: ["Brand identity", "Editorial design", "Web design"],
    image: projectAster,
    tall: true,
    body: [
      "Aster is a gallery that treats fashion as sculpture. The identity had to disappear politely behind the work — then surprise you in the details.",
      "We built a near-invisible system: hairline rules, generous white space and a single serif voice, punctuated by unexpected scale shifts in editorial layouts.",
      "The rebrand coincided with Aster's most-attended season on record and a feature in three international design annuals.",
    ],
  },
  {
    slug: "mint-and-ledger",
    title: "Mint & Ledger",
    blurb: "A brand identity combining tradition with modern finance.",
    category: "Brand identity",
    year: "2024",
    client: "Mint & Ledger",
    services: ["Brand identity", "Design system", "Web design"],
    image: projectLedger,
    body: [
      "A fintech for people who miss banks with marble floors. Mint & Ledger asked for trust you can feel — heritage cues without the dust.",
      "Deep greens, engraved brass details and a typographic system borrowed from ledgers gave the product warmth that fintech gradients can't fake.",
      "Post-rebrand, activation rates rose 34% and the brand raised its Series A on the strength of the new story.",
    ],
  },
];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  publishedAt: string;
  modifiedAt: string;
  keywords: string[];
  readTime: string;
  author: string;
  role: string;
  image: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "launching-a-bold-identity",
    title: "Launching a bold identity for a fast-moving startup",
    excerpt: "How we crafted a confident, standout brand in six weeks.",
    category: "Case notes",
    date: "Jun 24, 2026",
    publishedAt: "2026-06-24",
    modifiedAt: "2026-06-24",
    keywords: ["brand identity", "startup branding", "creative direction", "logo design"],
    readTime: "6 min read",
    author: "Mara Ellison",
    role: "Creative Director",
    image: newsIdentity,

    body: [
      "Startups usually come to us with the same tension: they need to look established before they are. The answer is never to fake scale — it's to commit harder to a point of view than bigger companies can afford to.",
      "For this launch we cut the brand down to three decisions: one colour that owns the category, one typeface used at two sizes only, and one photographic rule. Constraint is what reads as confidence.",
      "Six weeks from kickoff to launch. The lesson: speed doesn't come from skipping steps, it comes from making fewer, braver decisions earlier.",
    ],
  },
  {
    slug: "maximalism-in-ecommerce",
    title: "Maximalism in e-commerce",
    excerpt: "Why more is finally more in online retail.",
    category: "Perspective",
    date: "May 12, 2026",
    publishedAt: "2026-05-12",
    modifiedAt: "2026-05-12",
    keywords: ["ecommerce", "maximalism", "conversion design", "art direction"],
    readTime: "4 min read",
    author: "Jonas Reber",
    role: "Head of Strategy",
    image: newsMaximalism,

    body: [
      "For a decade, every store looked like the same white template with different products dropped in. That era is ending — and conversion data is what's ending it.",
      "Shoppers scroll past minimalism because minimalism looks like everyone. Densely styled, editorially chaotic product pages are outperforming clean grids in category after category.",
      "The catch: maximalism only works when it's designed. Clutter with intent is a brand. Clutter without intent is a garage sale.",
    ],
  },
  {
    slug: "designing-a-slow-beverage-brand",
    title: "Notes from the coast: a slow beverage brand",
    excerpt: "What a bottle on a rock taught us about restraint.",
    category: "Studio",
    date: "Apr 3, 2026",
    publishedAt: "2026-04-03",
    modifiedAt: "2026-04-03",
    keywords: ["packaging", "beverage branding", "photography", "restraint"],
    readTime: "5 min read",
    author: "Mara Ellison",
    role: "Creative Director",
    image: newsConference,

    body: [
      "Some products want noise. This one wanted silence. A small-batch drinks label asked us for a brand that would feel at home outdoors, at golden hour, with nothing else in frame.",
      "We shot the entire campaign with natural light and a single bottle. No props, no set builds, no retouch beyond dust removal. The discipline forced every other decision — type, colour, copy — to earn its place.",
      "Restraint photographs beautifully. It also ships faster, costs less and ages better than any trend we could have chased.",
    ],
  },
  {
    slug: "inside-our-process",
    title: "Inside our process: from brief to brand",
    excerpt: "The unglamorous middle of every project we ship.",
    category: "Studio",
    date: "Mar 18, 2026",
    publishedAt: "2026-03-18",
    modifiedAt: "2026-03-18",
    keywords: ["design process", "brand strategy", "studio", "craft"],
    readTime: "7 min read",
    author: "Priya Anand",
    role: "Design Lead",
    image: newsProcess,

    body: [
      "Every portfolio shows the after. This is about the middle — the desk covered in specimens, the third round of type pairings, the coffee going cold while two directions fight it out.",
      "We print everything. Screens flatter bad decisions; paper doesn't. A brand that survives being pinned to a wall for a week is a brand that will survive the market.",
      "Our rule of thumb: if the team can't explain a design decision in one sentence, it isn't a decision yet. Process is just the discipline of getting to that sentence.",
    ],
  },
];

export const services = [
  {
    title: "Product design",
    items: ["Apps", "Websites", "Design systems", "Wireframing", "Dashboards", "Prototyping"],
  },
  {
    title: "Content strategy",
    items: ["Website copy", "Tone of voice", "Information architecture", "UX writing", "Microcopy"],
  },
  {
    title: "Brand identity",
    items: [
      "Logo design",
      "Type & colour systems",
      "Brand guidelines",
      "Art direction",
      "Motion identity",
    ],
  },
  {
    title: "Front-end dev",
    items: ["Marketing sites", "Migration", "SEO", "CMS integration", "E-commerce setup"],
  },
];

export const testimonials = [
  {
    quote: "The closest thing to an in-house design team without actually hiring one",
    detail:
      "From strategy to execution, they integrated seamlessly into our workflow and brought clarity to every step.",
    name: "Alex Morane",
    role: "CEO, Fieldnote",
  },
  {
    quote: "Finally, a partner who understands both brand and business",
    detail:
      "They didn't just make us look good — every design decision aligned with our goals and audience.",
    name: "Taylor Reyes",
    role: "Director of Product, Hatch",
  },
  {
    quote: "Fast turnarounds without compromising on craft",
    detail:
      "Every request was handled with care and a clear sense of purpose. Never just speed — always done right.",
    name: "Jordan Bleeker",
    role: "Founder, Northline",
  },
  {
    quote: "A process as thoughtful as the final product",
    detail:
      "They challenged our thinking when needed and turned a fuzzy brief into a focused, high-impact outcome.",
    name: "Casey Quan",
    role: "Head of Strategy, Parcel",
  },
  {
    quote: "Gave our launch the polish it needed to stand out",
    detail:
      "They took half-formed ideas and built a visual identity that felt premium, clear and unmistakably us.",
    name: "Riley Jamison",
    role: "Design Director, Coven",
  },
  {
    quote: "The kind of creative partner you want on speed dial",
    detail:
      "Reliable, sharp and ego-free. We trusted them with our brand — and they delivered every single time.",
    name: "Morgan Ellis",
    role: "Principal, Studio Wren",
  },
];

export const stats = [
  {
    value: 8,
    suffix: "+",
    label: "Years of experience",
    detail: "Years of dedication to creating impactful, measurable design solutions.",
  },
  {
    value: 95,
    suffix: "+",
    label: "Happy clients",
    detail: "Founders and teams across four continents, from pre-seed to public.",
  },
  {
    value: 140,
    suffix: "+",
    label: "Completed projects",
    detail: "A proven track record across industries — each project adding depth.",
  },
  {
    value: 12,
    suffix: "",
    prefix: "$",
    suffixWord: "M",
    label: "Raised by our clients",
    detail: "Capital raised by brands we've partnered with since 2018.",
  },
];

export const process = [
  {
    phase: "Discovery",
    number: "01",
    steps: [
      {
        title: "Stakeholder interviews & briefing",
        duration: "3–5 days",
        text: "We talk with key stakeholders to understand the business, the product and what success looks like — gathering context and aligning on outcomes.",
      },
      {
        title: "User & market research",
        duration: "1 week",
        text: "From audience behaviour to competitive landscape, we dig deep to uncover the insights that will inform both design and strategy.",
      },
      {
        title: "Defining the challenge",
        duration: "2 days",
        text: "We define a clear problem statement, map user journeys and outline objectives. This becomes the north star for everything that follows.",
      },
    ],
  },
  {
    phase: "Concept",
    number: "02",
    steps: [
      {
        title: "Creative & strategic exploration",
        duration: "2 days",
        text: "Rough sketches meet strategic thinking. We push ideas, test assumptions and explore what the brand could become.",
      },
      {
        title: "Concept refinement",
        duration: "3–5 days",
        text: "Based on feedback, ideas evolve into stronger, more focused concepts — a design direction, an identity, a content system.",
      },
      {
        title: "Direction alignment",
        duration: "2 days",
        text: "Before building anything, we present key concepts, rationale and early prototypes to make sure the direction feels right.",
      },
    ],
  },
  {
    phase: "Execution",
    number: "03",
    steps: [
      {
        title: "Design systems & UI",
        duration: "2 weeks",
        text: "We craft the visuals and interactions pixel by pixel, rooted in a scalable system that supports growth.",
      },
      {
        title: "Build & collaboration",
        duration: "3 weeks",
        text: "Design and development go hand in hand — translating design into clean, responsive, performant code.",
      },
      {
        title: "Testing & QA",
        duration: "1 week",
        text: "Before anything goes live we test across devices and scenarios, fix bugs, refine flows and make sure it all works.",
      },
    ],
  },
  {
    phase: "Launch",
    number: "04",
    steps: [
      {
        title: "Final prep & handoff",
        duration: "3 days",
        text: "Everything reviewed and handed off cleanly — assets, guidelines and everything the team needs to move forward.",
      },
      {
        title: "Rollout & support",
        duration: "Ongoing",
        text: "We support the rollout, monitor performance and make sure the experience is seamless from day one.",
      },
    ],
  },
];

export const faqs = [
  {
    q: "What's included in a monthly retainer?",
    a: "Each retainer includes a set number of design or strategy requests per month, priority turnaround and a dedicated point of contact. It's built for teams who want ongoing support without starting from scratch every time.",
  },
  {
    q: "How many requests can I make per month?",
    a: "We typically handle up to two active requests at a time, with new ones queued as they're completed. Most deliverables turn around within 48–72 hours depending on complexity.",
  },
  {
    q: "Is a retainer better than a one-off project?",
    a: "If you need ongoing support, faster turnarounds or regular iterations, a retainer is usually more cost-effective and collaborative than starting fresh each time.",
  },
  {
    q: "Who will I be working with?",
    a: "You'll work directly with senior designers and strategists. No middle layers, no fluff — just experienced people doing the work.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Most of our clients are remote. We're fully set up to collaborate across time zones with clear communication and shared tools.",
  },
];

export const team = [
  { name: "Mara Ellison", role: "Creative Director", initials: "ME" },
  { name: "Jonas Reber", role: "Head of Strategy", initials: "JR" },
  { name: "Priya Anand", role: "Design Lead", initials: "PA" },
  { name: "Theo Marchetti", role: "Engineering Lead", initials: "TM" },
];

export const values = [
  {
    title: "Clarity over cleverness",
    text: "If a design needs explaining, it isn't finished. We build brands people understand in a glance.",
  },
  {
    title: "Craft is strategy",
    text: "Detail is not decoration. The way something is made tells the market what it's worth.",
  },
  {
    title: "Fewer, braver decisions",
    text: "Constraint reads as confidence. We'd rather make three bold calls than thirty safe ones.",
  },
  {
    title: "Partners, not vendors",
    text: "We work inside your goals, your metrics and your roadmap — not next to them.",
  },
];
