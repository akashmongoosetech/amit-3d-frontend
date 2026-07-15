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
    slug: "precision-cnc-enclosure",
    title: "Precision CNC Enclosure",
    blurb: "Manufacturing-ready 3D model for industrial CNC machinery enclosure.",
    category: "Industrial",
    year: "2026",
    client: "AeroForm Manufacturing",
    services: ["CAD modeling", "Industrial design", "Technical drawings", "3D printing prep"],
    image: projectVolta,
    body: [
      "AeroForm needed a precision 3D model of their new CNC enclosure for prototyping, manufacturing documentation, and investor presentations. The existing concept was a rough sketch with dimensional callouts.",
      "We built a fully parametric model in SolidWorks with every flange, fastener boss, cable channel and ventilation slot modeled to engineering tolerance. The final model was export-ready for CNC programming, injection molding analysis and 3D-printed prototyping.",
      "The 3D-printed prototype passed first-fit validation with zero revisions, cutting 6 weeks off the development cycle. AeroForm used the same model for their technical brochure and investor deck, presenting a unified visual language from shop floor to boardroom.",
    ],
  },
  {
    slug: "luxury-residence-interior",
    title: "Luxury Residence Interior",
    blurb: "Photorealistic interior visualization for a high-end residential development.",
    category: "Architecture",
    year: "2026",
    client: "Sterling Development",
    services: ["Archviz", "Interior rendering", "Material visualization", "Real-time walkthrough"],
    image: projectMeridian,
    body: [
      "Sterling Development was pre-selling luxury apartments with architectural blueprints and mood boards. They needed photorealistic renders that would make buyers feel the space before a single brick was laid.",
      "We modeled the entire penthouse suite from CAD plans — every furnishing, fixture and finish — and lit each room for three lighting scenarios: golden hour, overcast and evening. The material library included custom PBR textures for marble, oak, brass and hand-loomed textiles.",
      "The pre-sale campaign launched with 22 hero renders and a real-time walkthrough. Sterling sold 80% of units in the first phase within 10 weeks, with buyers specifically citing the visualizations as the deciding factor.",
    ],
  },
  {
    slug: "medical-imaging-device",
    title: "Medical Imaging Device",
    blurb: "FDA submission-ready 3D model with exploded views and technical illustrations.",
    category: "Medical",
    year: "2025",
    client: "HealthVue Diagnostics",
    services: [
      "Medical modeling",
      "Technical illustration",
      "Exploded views",
      "Regulatory renders",
    ],
    image: projectCourt,
    tall: true,
    body: [
      "HealthVue was preparing their next-generation portable ultrasound for FDA 510(k) submission and needed a complete 3D model package that could serve both regulatory documentation and marketing simultaneously.",
      "Our team created a high-fidelity model with over 300 individual components, each labeled and organized by assembly group. We generated exploded views, cross-section renders and material callout illustrations meeting FDA submission standards. The same model was used for the product website, sales deck and training manual.",
      "HealthVue's regulatory team reported that the visualization package reduced reviewer questions by 40% compared to their previous submission. The product launched on schedule with a single, consistent 3D asset powering engineering, compliance and marketing.",
    ],
  },
  {
    slug: "ergonomic-office-chair",
    title: "Ergonomic Office Chair",
    blurb: "Full product visualization campaign with exploded animation and configurator assets.",
    category: "Furniture",
    year: "2025",
    client: "Contour Works",
    services: ["Product modeling", "Animation", "Configurator assets", "E-commerce renders"],
    image: projectZest,
    tall: true,
    body: [
      "Contour Works was launching a premium ergonomic chair with over 40 customizable options. Their existing product photography couldn't keep up with the permutations, and buyers couldn't visualize the difference between mesh types, frame colors or lumbar support configurations.",
      "We built a master model with interchangeable components, then rendered every possible configuration across all colorways — over 400 unique product shots from a single 3D asset. The exploding assembly animation demonstrated the chair's internal mechanism in under 30 seconds.",
      "The product configurator powered by our 3D assets launched with zero photography shoots required. Contour Works reported a 34% increase in add-on sales as customers could finally see what each option looked like before purchase.",
    ],
  },
  {
    slug: "sportscar-concept-evo",
    title: "Sports Car Concept EVO",
    blurb: "Full exterior and interior 3D visualization for an automotive concept launch.",
    category: "Automotive",
    year: "2024",
    client: "Vertex Automotive",
    services: ["Vehicle modeling", "Interior rendering", "Showroom visuals", "Configurator"],
    image: projectAster,
    tall: true,
    body: [
      "Vertex was revealing their first electric sports car concept at an international auto show and needed visuals that matched the ambition of the engineering — studio shots, environment scenes and an interactive color configurator for the show floor.",
      "We modeled the body, chassis and interior to the exact CAD data provided by Vertex's engineering team, then styled three environment sets: a studio lighting loop, an urban night scene and a coastal road at golden hour. The showroom configurator let attendees cycle through 12 paint finishes and 4 interior trims in real time.",
      "The concept generated over 2.8M social impressions in launch week. Vertex attributed 1,200 qualified pre-order registrations directly to the digital reveal, with the configurator averaging 4 minutes of engagement per visitor.",
    ],
  },
  {
    slug: "smartwatch-visualization",
    title: "Smartwatch Visualization",
    blurb: "E-commerce-ready 3D product visualization with 360-degree spin and lifestyle renders.",
    category: "Product",
    year: "2024",
    client: "Pinnacle Wearables",
    services: ["Product rendering", "360 animation", "Lifestyle visualization", "Marketing assets"],
    image: projectLedger,
    body: [
      "Pinnacle Wearables was launching a premium smartwatch and wanted their online product page to feel as premium as the hardware. Traditional photography couldn't capture the watch's ceramic finish, AMOLED display and interchangeable band system effectively.",
      "We produced a full product visualization suite: a 360-degree auto-rotation video, hero stills on reflective and matte surfaces, detail close-ups of the crown and sensors, and lifestyle scenes showing the watch in fitness, work and evening contexts. Every asset was rendered at 4K with the option to zoom to 200% without pixelation.",
      "The product page conversion rate improved by 27% compared to their previous launch. Pinnacle's marketing team used the same 3D assets for social media, email campaigns and retail displays — producing a full campaign from a single modeling session.",
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
    slug: "benefits-of-professional-3d-modeling",
    title: "Why Professional 3D Modeling Is a Competitive Advantage",
    excerpt:
      "How high-quality 3D assets reduce development costs, accelerate time-to-market and improve stakeholder communication.",
    category: "Perspective",
    date: "Jun 28, 2026",
    publishedAt: "2026-06-28",
    modifiedAt: "2026-06-28",
    keywords: [
      "3D modeling",
      "product development",
      "CAD visualization",
      "manufacturing",
      "prototyping",
    ],
    readTime: "6 min read",
    author: "Daniel Voss",
    role: "Lead 3D Engineer",
    image: newsIdentity,
    body: [
      "Every product, building or system starts as an idea. The gap between that idea and a physical prototype has traditionally been filled with drawings, spreadsheets and expensive rounds of physical iteration. Professional 3D modeling closes that gap with a single digital asset that every stakeholder can see, touch and test before a single unit is manufactured.",
      "The most immediate benefit is speed. A product that once required three physical prototyping rounds — each costing thousands and taking weeks — can now be validated digitally in days. Engineering teams can run interference checks, test assembly sequences and simulate stress points on the model before any material is cut. The result is fewer prototypes, less waste and a shorter path to production.",
      "3D models also transform communication. A client reviewing a photorealistic render understands the design instantly, without needing to read engineering drawings or interpret abstract specifications. Marketing teams can use the same model for packaging visualization, e-commerce imagery and launch campaigns. One asset, a dozen use cases, zero reshoots.",
      "The upfront investment in professional 3D modeling pays for itself by the first design review. The question isn't whether you can afford it — it's whether you can afford the delays, miscommunication and rework that come without it.",
    ],
  },
  {
    slug: "cad-vs-3d-modeling",
    title: "CAD vs 3D Modeling: What's the Difference and Which One Do You Need?",
    excerpt:
      "Understanding the distinction between engineering CAD and creative 3D modeling — and when to use each.",
    category: "Case notes",
    date: "May 20, 2026",
    publishedAt: "2026-05-20",
    modifiedAt: "2026-05-20",
    keywords: [
      "CAD",
      "3D modeling",
      "engineering design",
      "product development",
      "parametric modeling",
    ],
    readTime: "5 min read",
    author: "Mia Calderon",
    role: "Technical Director",
    image: newsMaximalism,
    body: [
      "A question we hear often: what's the difference between CAD and 3D modeling? The short answer is that CAD is a subset of 3D modeling — one focused on engineering precision — while 3D modeling as a broader discipline includes sub-division modeling, sculpting and surface modeling used in visualization and animation.",
      "CAD modeling (Computer-Aided Design) is dimension-driven. Every feature has a numeric value: a hole is exactly 6.35mm, a fillet is precisely 2mm radius, two faces are perfectly parallel. CAD models are parametric, meaning changing one dimension automatically updates every dependent feature. This is indispensable for manufacturing, where a 0.1mm error means a part doesn't fit.",
      "Polygon or surface modeling (often called 'creative' 3D modeling) prioritizes visual quality over dimensional accuracy. A character model, a car body for a game, or an architectural visualization are built with millions of polygons shaped by the artist's eye. These models are optimized for rendering and animation, not CNC programming.",
      "For most product development projects, the right approach is both. Start with CAD for engineering accuracy, then adapt the CAD data into a high-poly model for photorealistic rendering. At Verto3D, we bridge both worlds — delivering models that satisfy engineering tolerances and marketing expectations from the same source file.",
    ],
  },
  {
    slug: "architectural-visualization-trends-2026",
    title: "Architectural Visualization Trends Defining 2026",
    excerpt:
      "From real-time walkthroughs to AI-assisted texturing — the technologies reshaping archviz.",
    category: "Perspective",
    date: "Apr 14, 2026",
    publishedAt: "2026-04-14",
    modifiedAt: "2026-04-14",
    keywords: [
      "archviz",
      "architectural visualization",
      "real-time rendering",
      "CGI",
      "3D rendering trends",
    ],
    readTime: "4 min read",
    author: "Elena Marchetti",
    role: "Creative Director",
    image: newsConference,
    body: [
      "Architectural visualization has moved beyond static hero shots. Clients no longer want a single beautiful image of a building — they want to walk through it, change the time of day, swap materials and see how light moves through the space. Real-time rendering engines are making this possible at a quality level that rivals offline renderers.",
      "The biggest shift is the expectation of interactivity. A developer pre-selling apartments needs more than exterior views; they need buyers to experience the kitchen with their chosen countertop, the living room at sunset, the bathroom in both warm and cool lighting. Creating a single master model that supports all these variations is more efficient than rendering 50 standalone images.",
      "AI-assisted tools are also changing the workflow. Texture generation, denoising and even initial massing studies can be accelerated with machine learning. The key is knowing where AI speeds up the process and where the artist's judgment is irreplaceable — lighting composition, material storytelling and architectural narrative still require a human eye.",
      "The studios winning the most projects in 2026 are those that deliver not just images, but experiences. Real-time capability, material flexibility and the ability to iterate quickly on feedback are now table stakes.",
    ],
  },
  {
    slug: "cgi-for-ecommerce",
    title: "CGI for E-commerce: Why Leading Brands Are Replacing Product Photography",
    excerpt:
      "How 3D product visualization is transforming online retail with higher conversions and lower production costs.",
    category: "Studio",
    date: "Mar 5, 2026",
    publishedAt: "2026-03-05",
    modifiedAt: "2026-03-05",
    keywords: [
      "CGI",
      "e-commerce",
      "product visualization",
      "3D product rendering",
      "online retail",
    ],
    readTime: "5 min read",
    author: "Daniel Voss",
    role: "Lead 3D Engineer",
    image: newsProcess,
    body: [
      "A product photoshoot for a single SKU costs anywhere from $500 to $5,000 depending on styling, set construction and retouching. For a catalog of 100 products across multiple colorways, angles and lifestyle contexts, the costs multiply quickly — and reshoots are inevitable when packaging changes or a new finish launches.",
      "CGI (computer-generated imagery) flips this model. A single 3D master asset can generate every angle, every colorway, every lighting scenario with no reshoot required. When the product is updated — a new color, a revised logo, a different material — the model is updated once and re-rendered across every asset.",
      "The results speak for themselves. Brands using 3D product visualization report 20-40% higher conversion rates on product pages, driven by the ability to offer 360-degree views, zoom-to-detail functionality and lifestyle contexts that traditional photography can't match. Customers who can inspect a product from every angle buy with more confidence.",
      "The barrier to entry has also dropped significantly. High-quality 3D product renders are now accessible to mid-market brands, not just enterprise companies. At Verto3D, we've developed scalable workflows that make CGI cost-effective for catalogs of any size, from a single hero product to a full seasonal collection.",
    ],
  },
];

export const services = [
  {
    title: "3D Product Modeling",
    items: [
      "Product design",
      "Mechanical parts",
      "Consumer electronics",
      "Packaging design",
      "Prototyping",
      "Manufacturing-ready models",
    ],
  },
  {
    title: "Architectural Visualization",
    items: [
      "Interior rendering",
      "Exterior rendering",
      "Floor plan visualization",
      "Real-time walkthroughs",
      "Real estate marketing",
      "Urban planning",
    ],
  },
  {
    title: "Industrial Design",
    items: [
      "CAD modeling",
      "Reverse engineering",
      "BIM modeling",
      "Technical drawings",
      "Engineering specs",
      "DFM analysis",
    ],
  },
  {
    title: "Animation & CGI",
    items: [
      "Product animation",
      "Exploded views",
      "360-degree spins",
      "Marketing CGI",
      "Archviz walkthrough",
      "Motion graphics",
    ],
  },
  {
    title: "Furniture & Interior",
    items: [
      "Furniture modeling",
      "Interior staging",
      "Material visualization",
      "Custom joinery",
      "Lighting studies",
      "Space planning",
    ],
  },
  {
    title: "Automotive & Transport",
    items: [
      "Vehicle modeling",
      "Part visualization",
      "Showroom renders",
      "Configurator assets",
      "Concept design",
      "Technical illustration",
    ],
  },
  {
    title: "Medical & Scientific",
    items: [
      "Anatomical models",
      "Device visualization",
      "Surgical planning",
      "Lab equipment",
      "Pharma packaging",
      "Regulatory renders",
    ],
  },
  {
    title: "AR/VR & Digital Twins",
    items: [
      "Real-time models",
      "AR product preview",
      "VR walkthroughs",
      "Digital twin assets",
      "IoT integration",
      "Interactive configurators",
    ],
  },
];

export const testimonials = [
  {
    quote: "The closest thing to an in-house 3D department without actually hiring one",
    detail:
      "From CAD conversion to photorealistic rendering, they integrated seamlessly into our workflow and delivered on every deadline.",
    name: "Alex Morane",
    role: "CEO, AeroForm Manufacturing",
  },
  {
    quote: "Finally, a 3D partner who understands both engineering and aesthetics",
    detail:
      "They didn't just make our product look good — every polygon had a purpose, and the models were manufacturing-ready straight out of review.",
    name: "Taylor Reyes",
    role: "Director of Product, Contour Works",
  },
  {
    quote: "Fast turnaround without compromising on precision",
    detail:
      "Every request was handled with care and technical accuracy. Never just speed — always done right, right down to the chamfers.",
    name: "Jordan Bleeker",
    role: "Founder, Pinnacle Wearables",
  },
  {
    quote: "A process as precise as the final renders",
    detail:
      "They challenged our assumptions about what 3D could do and turned a fuzzy brief into focused, high-impact visual assets.",
    name: "Casey Quan",
    role: "Head of Development, Sterling Development",
  },
  {
    quote: "Gave our product launch the polish it needed to stand out",
    detail:
      "They took engineering CAD data and built a visual identity that felt premium, clear and unmistakably ours.",
    name: "Riley Jamison",
    role: "Design Director, Vertex Automotive",
  },
  {
    quote: "The kind of technical partner you want on speed dial",
    detail:
      "Reliable, sharp and ego-free. We trusted them with our product models — and they delivered every single time.",
    name: "Morgan Ellis",
    role: "Principal, HealthVue Diagnostics",
  },
];

export const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Projects delivered",
    detail:
      "From single product models to enterprise-scale digital twin implementations across 50+ industries.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    detail:
      "Based on post-project surveys — our highest priority is delivering on time, on spec and on budget.",
  },
  {
    value: 50,
    suffix: "+",
    label: "Industries served",
    detail:
      "Manufacturing, architecture, medical, automotive, furniture, aerospace, consumer electronics and more.",
  },
  {
    value: 15,
    suffix: "+",
    prefix: "",
    suffixWord: " years",
    label: "Combined experience",
    detail:
      "Our team brings expertise from industrial design, architectural visualization and CGI production.",
  },
];

export const process = [
  {
    phase: "Discovery & Briefing",
    number: "01",
    steps: [
      {
        title: "Requirements discussion",
        duration: "1–2 days",
        text: "We talk through your project goals, technical requirements, deliverable format and timeline to align on scope and expectations.",
      },
      {
        title: "File & reference collection",
        duration: "1 day",
        text: "We gather CAD files, sketches, reference images, material specs and any existing assets to build from accurate source material.",
      },
      {
        title: "Project planning & quoting",
        duration: "1 day",
        text: "We map out the modeling pipeline, define milestones and confirm the scope, pricing and delivery schedule.",
      },
    ],
  },
  {
    phase: "3D Modeling & CAD",
    number: "02",
    steps: [
      {
        title: "Base geometry construction",
        duration: "3–5 days",
        text: "We build the primary model from reference or CAD data, establishing clean topology and correct proportions for the intended use case.",
      },
      {
        title: "Detail refinement",
        duration: "2–3 days",
        text: "We add secondary geometry, surface details, fasteners, textures and all elements that give the model its realism and accuracy.",
      },
      {
        title: "Technical review",
        duration: "1–2 days",
        text: "An internal quality check validates dimensional accuracy, polygon optimization, naming conventions and file structure before sharing with you.",
      },
    ],
  },
  {
    phase: "Texturing & Materials",
    number: "03",
    steps: [
      {
        title: "Material development",
        duration: "2–3 days",
        text: "We create or source PBR materials — metals, plastics, fabrics, glass, wood, composites — matched to your specifications or reference samples.",
      },
      {
        title: "UV mapping & baking",
        duration: "1–2 days",
        text: "We unwrap the model for texture application and bake normal, displacement and AO maps for maximum visual fidelity.",
      },
      {
        title: "Material review",
        duration: "1 day",
        text: "We present the textured model for your feedback, adjusting material properties, colors and finishes as needed.",
      },
    ],
  },
  {
    phase: "Lighting & Rendering",
    number: "04",
    steps: [
      {
        title: "Lighting setup",
        duration: "1–2 days",
        text: "We design lighting scenarios — studio, environmental, dramatic — that showcase the model effectively for its intended use.",
      },
      {
        title: "Render production",
        duration: "2–5 days",
        text: "We produce final renders at the specified resolution, format and style, optimizing render settings for quality and turnaround time.",
      },
      {
        title: "Post-production",
        duration: "1 day",
        text: "We composite, color-grade and polish the final renders, ensuring consistency across all deliverables in the set.",
      },
    ],
  },
  {
    phase: "Review & Delivery",
    number: "05",
    steps: [
      {
        title: "Client review",
        duration: "2–3 days",
        text: "We present the completed work for your feedback, with clear revision notes and a straightforward change request process.",
      },
      {
        title: "Revisions & finalization",
        duration: "1–3 days",
        text: "We implement your feedback through the agreed revision rounds, refining until every detail meets your approval.",
      },
      {
        title: "Final delivery & handoff",
        duration: "1 day",
        text: "All assets are delivered in your required formats with organized file structures, naming conventions and any usage documentation needed.",
      },
    ],
  },
];

export const faqs = [
  {
    q: "What file formats do you deliver?",
    a: "We deliver in any standard format including .STP, .IGES, .SLDPRT, .STL, .OBJ, .FBX, .GLB, .USDZ and .BLEND. For rendering projects we provide .PNG, .EXR, .PSD and .TIFF at your specified resolution. Let us know your pipeline and we'll match it.",
  },
  {
    q: "How much does a typical 3D modeling project cost?",
    a: "Pricing depends on complexity, level of detail, intended use and turnaround time. Single product models typically start at $1,200. Architectural visualization packages start at $2,500. We provide a fixed-price quote after our discovery call so there are no surprises.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Most single-product projects deliver within 5–10 business days. Complex industrial models or full architectural visualizations typically take 2–4 weeks. We also offer expedited timelines for time-critical launches — just let us know your deadline during the briefing.",
  },
  {
    q: "Do you accept CAD files as reference?",
    a: "Yes — we work directly from STEP, IGES, SolidWorks, Fusion 360, AutoCAD, Rhino and Blender source files. If you have engineering CAD data, we can build the visualization model from it, preserving dimensional accuracy while optimizing for rendering.",
  },
  {
    q: "Can you prepare models for 3D printing?",
    a: "Absolutely. We optimize models specifically for FDM, SLA, SLS and multi-jet fusion printing processes. This includes wall thickness validation, support structure optimization, manifold geometry checks and file export in .STL or .3MF format ready for your slicing software.",
  },
  {
    q: "Are projects kept confidential?",
    a: "Yes. We sign NDAs on request and treat every project as confidential. Many of our clients are developing unreleased products, and we have strict data security practices including encrypted file transfer, access-controlled storage and no public portfolio without your written consent.",
  },
  {
    q: "Who owns the intellectual property of the 3D models?",
    a: "You own 100% of the final deliverables. We retain no IP rights to the models, renders or any project assets. Our standard contract assigns all IP to you upon final payment. We never reuse client models or designs without explicit written permission.",
  },
];

export interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  size: string;
  material: string;
  productionTime: string;
  startingPrice: number;
  rating: number;
  image: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "ergonomic-chair-pro",
    name: "Ergonomic Chair Pro",
    category: "Furniture",
    description:
      "Fully parametric office chair model with adjustable lumbar support, breathable mesh back and polished aluminum frame. Production-ready for manufacturing.",
    size: "68 × 62 × 112 cm",
    material: "Mesh, Aluminum, PU Foam",
    productionTime: "5–8 days",
    startingPrice: 2400,
    rating: 4.8,
    image: "https://picsum.photos/seed/chair-pro/800/900",
  },
  {
    id: "smartwatch-sport",
    name: "Smartwatch Sport X2",
    category: "Electronics",
    description:
      "High-detail smartwatch model with ceramic case, AMOLED display, interchangeable bands and optical sensor array. E-commerce ready.",
    size: "44 × 38 × 11 mm",
    material: "Ceramic, Titanium, Silicone",
    productionTime: "4–6 days",
    startingPrice: 1800,
    rating: 4.9,
    image: "https://picsum.photos/seed/watch-sport/800/900",
  },
  {
    id: "cnc-motor-mount",
    name: "Precision CNC Motor Mount",
    category: "Industrial",
    description:
      "Manufacturing-grade motor mount with CNC-machined tolerances, threaded inserts and vibration-dampening geometry. STEP and IGES included.",
    size: "25 × 18 × 14 cm",
    material: "7075 Aluminum",
    productionTime: "3–5 days",
    startingPrice: 950,
    rating: 4.7,
    image: "https://picsum.photos/seed/cnc-mount/800/900",
  },
  {
    id: "luxury-villa-exterior",
    name: "Luxury Villa Exterior",
    category: "Architecture",
    description:
      "Photorealistic architectural model with landscaped surroundings, pool, terrace and interior cutaway views. Real-time walkthrough capable.",
    size: "30 × 25 × 12 m (site)",
    material: "Concrete, Glass, Stone, Timber",
    productionTime: "12–18 days",
    startingPrice: 5500,
    rating: 4.9,
    image: "https://picsum.photos/seed/luxury-villa/800/900",
  },
  {
    id: "medical-scanner-housing",
    name: "CT Scanner Housing",
    category: "Medical",
    description:
      "FDA submission-ready medical device housing with ergonomic patient interface, cable management and service access panels.",
    size: "180 × 85 × 120 cm",
    material: "ABS, Polycarbonate, Stainless Steel",
    productionTime: "8–12 days",
    startingPrice: 4200,
    rating: 4.6,
    image: "https://picsum.photos/seed/ct-scanner/800/900",
  },
  {
    id: "sports-car-concept",
    name: "Sports Car Concept Aero",
    category: "Automotive",
    description:
      "Full exterior and interior concept car model with active aerodynamics, battery pack layout and configurable paint finishes.",
    size: "4.7 × 2.0 × 1.2 m",
    material: "Carbon Fiber, Aluminum, Leather",
    productionTime: "15–20 days",
    startingPrice: 8500,
    rating: 5.0,
    image: "https://picsum.photos/seed/sportscar/800/900",
  },
];

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  count: number;
  icon: string;
  image: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: "architectural",
    title: "Architectural Models",
    description: "Building exteriors, interiors, landscapes and urban planning visualizations.",
    count: 48,
    icon: "Building2",
    image: "https://picsum.photos/seed/arch-cat/600/400",
  },
  {
    id: "product-prototypes",
    title: "Product Prototypes",
    description: "Consumer goods, electronics, packaging and concept validation models.",
    count: 72,
    icon: "Lightbulb",
    image: "https://picsum.photos/seed/proto-cat/600/400",
  },
  {
    id: "industrial",
    title: "Industrial Components",
    description: "Machine parts, enclosures, tooling and manufacturing equipment.",
    count: 64,
    icon: "Settings",
    image: "https://picsum.photos/seed/indus-cat/600/400",
  },
  {
    id: "engineering",
    title: "Engineering Parts",
    description: "Precision CAD models with full tolerance annotations and assembly drawings.",
    count: 56,
    icon: "Telescope",
    image: "https://picsum.photos/seed/eng-cat/600/400",
  },
  {
    id: "miniature",
    title: "Miniature Models",
    description: "Scale replicas, dioramas, terrain and collectible miniatures.",
    count: 35,
    icon: "Search",
    image: "https://picsum.photos/seed/mini-cat/600/400",
  },
  {
    id: "characters",
    title: "Character Figures",
    description: "3D sculpted characters for games, animation and collectible figures.",
    count: 29,
    icon: "Users",
    image: "https://picsum.photos/seed/char-cat/600/400",
  },
  {
    id: "toys",
    title: "Toys & Collectibles",
    description: "Action figures, model kits, board game pieces and display statues.",
    count: 41,
    icon: "Smile",
    image: "https://picsum.photos/seed/toy-cat/600/400",
  },
  {
    id: "educational",
    title: "Educational Models",
    description: "Anatomy, chemical structures, physics demonstrators and teaching aids.",
    count: 23,
    icon: "BookOpen",
    image: "https://picsum.photos/seed/edu-cat/600/400",
  },
  {
    id: "medical",
    title: "Medical Models",
    description:
      "Anatomical replicas, surgical guides, implant prototypes and visualization models.",
    count: 31,
    icon: "Heart",
    image: "https://picsum.photos/seed/med-cat/600/400",
  },
  {
    id: "automotive",
    title: "Automotive Parts",
    description: "Engine components, body panels, interior trim and custom fabrication parts.",
    count: 45,
    icon: "Truck",
    image: "https://picsum.photos/seed/auto-cat/600/400",
  },
  {
    id: "mechanical",
    title: "Mechanical Components",
    description: "Gears, bearings, linkages, housings and full assembly models.",
    count: 53,
    icon: "Cog",
    image: "https://picsum.photos/seed/mech-cat/600/400",
  },
  {
    id: "home-decor",
    title: "Home Decor",
    description: "Furniture, lighting, decorative objects and interior accessories.",
    count: 38,
    icon: "Sofa",
    image: "https://picsum.photos/seed/decor-cat/600/400",
  },
  {
    id: "personalized",
    title: "Personalized Gifts",
    description: "Custom engraved items, nameplates, awards and commemorative pieces.",
    count: 27,
    icon: "Gift",
    image: "https://picsum.photos/seed/gift-cat/600/400",
  },
  {
    id: "corporate",
    title: "Corporate Gifts",
    description: "Branded promotional models, trophy designs and executive desk accessories.",
    count: 19,
    icon: "Briefcase",
    image: "https://picsum.photos/seed/corp-cat/600/400",
  },
  {
    id: "jewelry",
    title: "Jewelry Prototypes",
    description: "Ring, necklace, bracelet and accessory models for casting and presentation.",
    count: 22,
    icon: "Gem",
    image: "https://picsum.photos/seed/jewel-cat/600/400",
  },
  {
    id: "furniture",
    title: "Furniture Models",
    description: "Chairs, tables, shelving, sofas and custom joinery for pre-visualization.",
    count: 36,
    icon: "Armchair",
    image: "https://picsum.photos/seed/furn-cat/600/400",
  },
  {
    id: "scale-models",
    title: "Scale Models",
    description: "Architectural scale models, master planning and exhibition dioramas.",
    count: 17,
    icon: "Ruler",
    image: "https://picsum.photos/seed/scale-cat/600/400",
  },
  {
    id: "machine-parts",
    title: "Machine Parts",
    description:
      "Custom machining models with full GD&T, thread specs and surface finish callouts.",
    count: 44,
    icon: "Wrench",
    image: "https://picsum.photos/seed/machine-cat/600/400",
  },
  {
    id: "custom-orders",
    title: "Custom Orders",
    description: "One-off bespoke models designed and built to your exact specifications.",
    count: 99,
    icon: "Star",
    image: "https://picsum.photos/seed/custom-cat/600/400",
  },
];

export interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  material: string;
  size: string;
  image: string;
  badge?: "popular" | "featured" | "best-seller";
}

export const trendingProducts: TrendingProduct[] = [
  {
    id: "tp-1",
    name: "Mechanical Keyboard Case",
    category: "Product Prototypes",
    material: "CNC Aluminum",
    size: "36 × 14 × 3 cm",
    image: "https://picsum.photos/seed/keyboard/600/700",
    badge: "best-seller",
  },
  {
    id: "tp-2",
    name: "Drone Frame V2",
    category: "Industrial",
    material: "Carbon Fiber",
    size: "45 × 45 × 8 cm",
    image: "https://picsum.photos/seed/drone/600/700",
    badge: "popular",
  },
  {
    id: "tp-3",
    name: "Modular Bookshelf",
    category: "Furniture",
    material: "Birch Plywood",
    size: "120 × 30 × 180 cm",
    image: "https://picsum.photos/seed/bookshelf/600/700",
    badge: "featured",
  },
  {
    id: "tp-4",
    name: "Robot Arm Joint",
    category: "Mechanical",
    material: "Steel & Aluminum",
    size: "22 × 15 × 12 cm",
    image: "https://picsum.photos/seed/robot-joint/600/700",
    badge: "popular",
  },
  {
    id: "tp-5",
    name: "Desk Lamp Minimal",
    category: "Home Decor",
    material: "Brass & Opal Glass",
    size: "40 × 20 × 20 cm",
    image: "https://picsum.photos/seed/desklamp/600/700",
  },
  {
    id: "tp-6",
    name: "Sneaker Sole Mold",
    category: "Engineering",
    material: "Tool Steel",
    size: "30 × 18 × 12 cm",
    image: "https://picsum.photos/seed/sneaker-mold/600/700",
    badge: "best-seller",
  },
];

export interface LatestProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  launchDate: string;
}

export const latestProducts: LatestProduct[] = [
  {
    id: "lp-1",
    name: "Smart Home Hub",
    description:
      "Compact smart home controller with touch display, thermal management and wall-mount bracket.",
    image: "https://picsum.photos/seed/smarthub/600/500",
    launchDate: "Jul 2026",
  },
  {
    id: "lp-2",
    name: "Ergonomic Footrest",
    description: "Adjustable footrest with memory foam cushion, steel base and anti-slip grip.",
    image: "https://picsum.photos/seed/footrest/600/500",
    launchDate: "Jun 2026",
  },
  {
    id: "lp-3",
    name: "Industrial Sensor Enclosure",
    description:
      "Weatherproof IP67 sensor housing with cable glands, wall mount and vented design.",
    image: "https://picsum.photos/seed/sensor/600/500",
    launchDate: "Jun 2026",
  },
  {
    id: "lp-4",
    name: "Minimalist Desk Organizer",
    description:
      "Modular desk organizer with pen holder, phone stand and cable management channel.",
    image: "https://picsum.photos/seed/organizer/600/500",
    launchDate: "May 2026",
  },
];

export interface WhyChooseItem {
  title: string;
  text: string;
}

export const whyChooseUs: WhyChooseItem[] = [
  {
    title: "High Precision",
    text: "All models built to exact specifications with tolerances down to 0.01mm for engineering-grade accuracy.",
  },
  {
    title: "Professional Finishing",
    text: "Smooth surfaces, clean edges and production-ready textures — no cleanup required.",
  },
  {
    title: "Custom Design",
    text: "Every model is built from scratch or adapted to your unique requirements and brand standards.",
  },
  {
    title: "Fast Delivery",
    text: "Structured pipeline with clear milestones ensures on-time delivery every time.",
  },
  {
    title: "Affordable Pricing",
    text: "Fixed-price quotes with transparent billing — no surprise costs or hidden fees.",
  },
  {
    title: "High Quality Materials",
    text: "PBR materials, accurate physical properties and manufacturing-grade surface finishes.",
  },
  {
    title: "Prototype Support",
    text: "Models optimized for 3D printing, CNC machining, injection molding and casting processes.",
  },
  {
    title: "Multiple Sizes",
    text: "From micro-scale components to full architectural models — any size, any resolution.",
  },
  {
    title: "Color Options",
    text: "Full Pantone and RAL matching for brand-accurate color representation across materials.",
  },
  {
    title: "Expert Designers",
    text: "Senior 3D artists and CAD engineers with 15+ years combined industry experience.",
  },
];

export interface Material {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  image: string;
}

export const materials: Material[] = [
  {
    id: "pla",
    name: "PLA",
    description:
      "Biodegradable thermoplastic ideal for prototypes, concept models and low-stress parts. Easy to print with excellent surface finish.",
    bestFor: "Prototypes, Concept Models, Home Decor",
    image: "https://picsum.photos/seed/pla/600/400",
  },
  {
    id: "abs",
    name: "ABS",
    description:
      "Strong, durable thermoplastic with good impact resistance. Suitable for functional parts and end-use components.",
    bestFor: "Functional Parts, Enclosures, Automotive",
    image: "https://picsum.photos/seed/abs/600/400",
  },
  {
    id: "petg",
    name: "PETG",
    description:
      "Food-safe, impact-resistant material with excellent layer adhesion and chemical resistance. Great for consumer products.",
    bestFor: "Food Containers, Medical, Consumer Goods",
    image: "https://picsum.photos/seed/petg/600/400",
  },
  {
    id: "resin",
    name: "Resin",
    description:
      "High-detail photopolymer resin for ultra-smooth surfaces, miniature figures, jewelry patterns and investment casting.",
    bestFor: "Miniatures, Jewelry, Dental, Figurines",
    image: "https://picsum.photos/seed/resin/600/400",
  },
  {
    id: "nylon",
    name: "Nylon",
    description:
      "Strong, flexible engineering thermoplastic with excellent wear resistance and fatigue life. Ideal for moving parts.",
    bestFor: "Gears, Hinges, Living Hinges, Bearings",
    image: "https://picsum.photos/seed/nylon/600/400",
  },
  {
    id: "tpu",
    name: "TPU",
    description:
      "Flexible, rubber-like filament perfect for gaskets, seals, shoe soles and vibration-dampening components.",
    bestFor: "Gaskets, Seals, Grips, Wearables",
    image: "https://picsum.photos/seed/tpu/600/400",
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber",
    description:
      "Ultra-stiff, lightweight composite material for aerospace, automotive and high-performance structural parts.",
    bestFor: "Drone Frames, Brackets, Racing Parts",
    image: "https://picsum.photos/seed/carbon/600/400",
  },
  {
    id: "wood-fill",
    name: "Wood Fill",
    description:
      "PLA composite with real wood fibers. Sandable, stainable and paintable for natural wood aesthetics.",
    bestFor: "Furniture, Decor, Architectural Models",
    image: "https://picsum.photos/seed/woodfill/600/400",
  },
  {
    id: "metal-finish",
    name: "Metal Finish",
    description:
      "Metal-infused filaments and finishing processes for authentic metallic appearance with real weight and feel.",
    bestFor: "Display Models, Awards, Premium Goods",
    image: "https://picsum.photos/seed/metal/600/400",
  },
];

export interface CustomerProject {
  id: string;
  customerName: string;
  industry: string;
  projectType: string;
  review: string;
  rating: number;
  beforeImage: string;
  afterImage: string;
}

export const customerProjects: CustomerProject[] = [
  {
    id: "cp-1",
    customerName: "AeroForm Manufacturing",
    industry: "Industrial",
    projectType: "CNC Enclosure Redesign",
    review:
      "The precision exceeded our expectations. The model was manufacturing-ready straight out of review.",
    rating: 5,
    beforeImage: "https://picsum.photos/seed/before-1/600/400",
    afterImage: "https://picsum.photos/seed/after-1/600/400",
  },
  {
    id: "cp-2",
    customerName: "Sterling Development",
    industry: "Architecture",
    projectType: "Luxury Residence Visualization",
    review:
      "Sold 80% of units in 10 weeks — buyers specifically cited the visualizations as the deciding factor.",
    rating: 5,
    beforeImage: "https://picsum.photos/seed/before-2/600/400",
    afterImage: "https://picsum.photos/seed/after-2/600/400",
  },
  {
    id: "cp-3",
    customerName: "Contour Works",
    industry: "Furniture",
    projectType: "Office Chair Product Campaign",
    review:
      "Over 400 unique product shots from a single 3D asset. Zero photography shoots required.",
    rating: 5,
    beforeImage: "https://picsum.photos/seed/before-3/600/400",
    afterImage: "https://picsum.photos/seed/after-3/600/400",
  },
];

export const productsFaqs = [
  {
    q: "How long does production take?",
    a: "Most single-product models deliver within 5–10 business days. Complex assemblies or large architectural models typically take 2–4 weeks. Expedited timelines are available for time-critical projects.",
  },
  {
    q: "What materials are available?",
    a: "We support PLA, ABS, PETG, Resin, Nylon, TPU, Carbon Fiber, Wood Fill and Metal Finish. Each material has specific properties suited to different applications — we'll recommend the best option for your project.",
  },
  {
    q: "Can I upload my own design?",
    a: "Yes — send us your sketches, CAD files, reference images or even hand-drawn concepts. We'll work from your materials to create a precision 3D model that matches your vision.",
  },
  {
    q: "What file formats do you accept?",
    a: "We accept STEP, IGES, SolidWorks, Fusion 360, AutoCAD, Rhino, Blender, OBJ, FBX and STL files. If your format isn't listed, ask us — we likely support it.",
  },
  {
    q: "Do you offer bulk orders?",
    a: "Yes — we regularly handle bulk orders for product catalogs, retail collections and manufacturing runs. Volume pricing and batch delivery schedules are available on request.",
  },
  {
    q: "Can I customize the model?",
    a: "Absolutely. Every model is fully customizable — size, material, color, finish and level of detail. We'll work with you through revision rounds until every detail is perfect.",
  },
];

export const modelSizes = [
  { value: "small", label: "Small (< 5cm)" },
  { value: "medium", label: "Medium (5–30cm)" },
  { value: "large", label: "Large (30–100cm)" },
  { value: "extra-large", label: "Extra Large (> 100cm)" },
  { value: "custom", label: "Custom Size" },
];

export const bookingBenefits = [
  {
    title: "High-Quality 3D Models",
    text: "Photorealistic, production-ready 3D models with clean topology, accurate geometry and professional-grade textures.",
  },
  {
    title: "Fast Turnaround",
    text: "Most models delivered within 5–10 business days. Expedited timelines available for time-critical launches.",
  },
  {
    title: "Professional Designers",
    text: "Our team brings years of experience across industrial design, architecture, gaming and product visualization.",
  },
  {
    title: "Multiple File Formats",
    text: "We deliver in STP, IGES, OBJ, FBX, STL, GLB, USDZ, BLEND and more — whatever your pipeline requires.",
  },
  {
    title: "Custom Sizes & Scales",
    text: "From miniature components to full-scale architectural models — build at any resolution and physical scale.",
  },
  {
    title: "Manufacturing Ready",
    text: "Models optimized for CNC, 3D printing, injection molding and production — tolerances and wall thickness validated.",
  },
  {
    title: "Product Visualization",
    text: "Studio-grade renders, turntable animations and exploded views for catalogs, websites and marketing materials.",
  },
  {
    title: "Affordable Pricing",
    text: "Fixed-price quotes with no hidden fees. Transparent billing based on complexity, scope and turnaround time.",
  },
];

export const bookingProcess = [
  {
    phase: "Requirement Submission",
    number: "01",
    steps: [
      {
        title: "Submit Your Brief",
        duration: "5 min",
        text: "Fill out the booking form with details about your model — purpose, industry, desired format and deadline.",
      },
      {
        title: "Upload References",
        duration: "5 min",
        text: "Attach reference images, sketches, CAD files or any existing materials that help us understand your vision.",
      },
    ],
  },
  {
    phase: "Review & Approval",
    number: "02",
    steps: [
      {
        title: "Requirements Review",
        duration: "1 business day",
        text: "Our team reviews your brief, assesses complexity and identifies any additional information needed to proceed.",
      },
      {
        title: "Quote & Timeline",
        duration: "1 business day",
        text: "You receive a fixed-price quote and estimated delivery timeline. No surprises — what we quote is what you pay.",
      },
    ],
  },
  {
    phase: "Modeling",
    number: "03",
    steps: [
      {
        title: "3D Modeling",
        duration: "3–10 days",
        text: "We build the model with precision geometry, proper topology and real-world scale. Progress updates shared at key milestones.",
      },
      {
        title: "Quality Check",
        duration: "1 day",
        text: "Internal QC review for dimensional accuracy, mesh integrity, texture fidelity and format compatibility before delivery.",
      },
    ],
  },
  {
    phase: "Delivery",
    number: "04",
    steps: [
      {
        title: "Final Delivery",
        duration: "1 day",
        text: "You receive the completed model in your requested formats along with a delivery report and any source files.",
      },
    ],
  },
];

export const bookingFaqs = [
  {
    q: "What file formats do you provide?",
    a: "We deliver in STP, IGES, SLDPRT, STL, OBJ, FBX, GLB, USDZ, BLEND and more. If your pipeline requires a specific format not listed here, just let us know — we'll accommodate it.",
  },
  {
    q: "How long does it take to complete a 3D model?",
    a: "Most single-product models are delivered within 5–10 business days from quote approval. Complex assemblies or large architectural models typically take 2–4 weeks. Expedited timelines are available on request.",
  },
  {
    q: "Can I upload reference images?",
    a: "Yes — upload sketches, photos, CAD files or any reference materials directly through the booking form. The more references you provide, the more accurately we can match your vision.",
  },
  {
    q: "Can you modify existing 3D models?",
    a: "Absolutely. Send us your existing model and a brief of what you'd like changed — geometry edits, texture updates, format conversion or optimization for a different manufacturing process.",
  },
  {
    q: "Do you support commercial usage of the models?",
    a: "Yes — you receive full commercial rights to all delivered models. We assign 100% IP to you upon final payment and never reuse or resell client work without written permission.",
  },
  {
    q: "What industries do you work with?",
    a: "We serve manufacturing, architecture, product design, automotive, aerospace, jewelry, consumer electronics, medical devices, gaming and entertainment. If it can be modeled, we've probably done something similar.",
  },
  {
    q: "Is there a minimum order value?",
    a: "Our minimum project value is $500 for simple single-object models. Most projects range from $1,200 to $8,000 depending on complexity, level of detail and intended use.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes — we sign NDAs on request and keep all project materials confidential. Many of our clients are developing unreleased products and we take data security seriously.",
  },
];

export const team = [
  { name: "Daniel Voss", role: "Lead 3D Engineer", initials: "DV" },
  { name: "Mia Calderon", role: "Technical Director", initials: "MC" },
  { name: "Elena Marchetti", role: "Creative Director", initials: "EM" },
  { name: "James Okonkwo", role: "Project Manager", initials: "JO" },
];

export const values = [
  {
    title: "Precision in Every Polygon",
    text: "Every model we build is checked for dimensional accuracy, clean topology and production readiness. We don't cut corners — we cut lead times by getting it right the first time.",
  },
  {
    title: "Industrial-Grade Accuracy",
    text: "Our roots are in engineering visualization. We understand tolerances, material properties and manufacturing constraints. A model from Verto3D is as accurate as it is beautiful.",
  },
  {
    title: "Client-First Partnership",
    text: "We work inside your pipeline, your timeline and your budget. No egos, no unnecessary complexity — just reliable delivery of high-quality 3D assets that serve your business goals.",
  },
  {
    title: "Innovation Through Technology",
    text: "We invest in the latest modeling, texturing and rendering tools so our clients benefit from faster turnaround, higher fidelity and new capabilities like real-time interactivity and digital twins.",
  },
];
