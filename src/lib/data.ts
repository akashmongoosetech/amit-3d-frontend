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
    services: ["Medical modeling", "Technical illustration", "Exploded views", "Regulatory renders"],
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
    excerpt: "How high-quality 3D assets reduce development costs, accelerate time-to-market and improve stakeholder communication.",
    category: "Perspective",
    date: "Jun 28, 2026",
    publishedAt: "2026-06-28",
    modifiedAt: "2026-06-28",
    keywords: ["3D modeling", "product development", "CAD visualization", "manufacturing", "prototyping"],
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
    excerpt: "Understanding the distinction between engineering CAD and creative 3D modeling — and when to use each.",
    category: "Case notes",
    date: "May 20, 2026",
    publishedAt: "2026-05-20",
    modifiedAt: "2026-05-20",
    keywords: ["CAD", "3D modeling", "engineering design", "product development", "parametric modeling"],
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
    excerpt: "From real-time walkthroughs to AI-assisted texturing — the technologies reshaping archviz.",
    category: "Perspective",
    date: "Apr 14, 2026",
    publishedAt: "2026-04-14",
    modifiedAt: "2026-04-14",
    keywords: ["archviz", "architectural visualization", "real-time rendering", "CGI", "3D rendering trends"],
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
    excerpt: "How 3D product visualization is transforming online retail with higher conversions and lower production costs.",
    category: "Studio",
    date: "Mar 5, 2026",
    publishedAt: "2026-03-05",
    modifiedAt: "2026-03-05",
    keywords: ["CGI", "e-commerce", "product visualization", "3D product rendering", "online retail"],
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
    items: ["Product design", "Mechanical parts", "Consumer electronics", "Packaging design", "Prototyping", "Manufacturing-ready models"],
  },
  {
    title: "Architectural Visualization",
    items: ["Interior rendering", "Exterior rendering", "Floor plan visualization", "Real-time walkthroughs", "Real estate marketing", "Urban planning"],
  },
  {
    title: "Industrial Design",
    items: ["CAD modeling", "Reverse engineering", "BIM modeling", "Technical drawings", "Engineering specs", "DFM analysis"],
  },
  {
    title: "Animation & CGI",
    items: ["Product animation", "Exploded views", "360-degree spins", "Marketing CGI", "Archviz walkthrough", "Motion graphics"],
  },
  {
    title: "Furniture & Interior",
    items: ["Furniture modeling", "Interior staging", "Material visualization", "Custom joinery", "Lighting studies", "Space planning"],
  },
  {
    title: "Automotive & Transport",
    items: ["Vehicle modeling", "Part visualization", "Showroom renders", "Configurator assets", "Concept design", "Technical illustration"],
  },
  {
    title: "Medical & Scientific",
    items: ["Anatomical models", "Device visualization", "Surgical planning", "Lab equipment", "Pharma packaging", "Regulatory renders"],
  },
  {
    title: "AR/VR & Digital Twins",
    items: ["Real-time models", "AR product preview", "VR walkthroughs", "Digital twin assets", "IoT integration", "Interactive configurators"],
  },
];

export const testimonials = [
  {
    quote: "The closest thing to an in-house 3D department without actually hiring one",
    detail: "From CAD conversion to photorealistic rendering, they integrated seamlessly into our workflow and delivered on every deadline.",
    name: "Alex Morane",
    role: "CEO, AeroForm Manufacturing",
  },
  {
    quote: "Finally, a 3D partner who understands both engineering and aesthetics",
    detail: "They didn't just make our product look good — every polygon had a purpose, and the models were manufacturing-ready straight out of review.",
    name: "Taylor Reyes",
    role: "Director of Product, Contour Works",
  },
  {
    quote: "Fast turnaround without compromising on precision",
    detail: "Every request was handled with care and technical accuracy. Never just speed — always done right, right down to the chamfers.",
    name: "Jordan Bleeker",
    role: "Founder, Pinnacle Wearables",
  },
  {
    quote: "A process as precise as the final renders",
    detail: "They challenged our assumptions about what 3D could do and turned a fuzzy brief into focused, high-impact visual assets.",
    name: "Casey Quan",
    role: "Head of Development, Sterling Development",
  },
  {
    quote: "Gave our product launch the polish it needed to stand out",
    detail: "They took engineering CAD data and built a visual identity that felt premium, clear and unmistakably ours.",
    name: "Riley Jamison",
    role: "Design Director, Vertex Automotive",
  },
  {
    quote: "The kind of technical partner you want on speed dial",
    detail: "Reliable, sharp and ego-free. We trusted them with our product models — and they delivered every single time.",
    name: "Morgan Ellis",
    role: "Principal, HealthVue Diagnostics",
  },
];

export const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Projects delivered",
    detail: "From single product models to enterprise-scale digital twin implementations across 50+ industries.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    detail: "Based on post-project surveys — our highest priority is delivering on time, on spec and on budget.",
  },
  {
    value: 50,
    suffix: "+",
    label: "Industries served",
    detail: "Manufacturing, architecture, medical, automotive, furniture, aerospace, consumer electronics and more.",
  },
  {
    value: 15,
    suffix: "+",
    prefix: "",
    suffixWord: " years",
    label: "Combined experience",
    detail: "Our team brings expertise from industrial design, architectural visualization and CGI production.",
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
