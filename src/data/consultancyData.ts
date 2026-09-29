export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  leadEngineer: string;
  deliverables: string[];
  technicalStandard: string;
  turnaround: string;
  outcomeMetric: string;
  rateRange: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: '3d-elevation' | 'structural' | 'interiors' | 'turnkey';
  categoryLabel: string;
  location: string;
  plotArea: string;
  builtUpArea: string;
  configuration: string;
  completionYear: string;
  imageUrl: string;
  imageAlt: string;
  quantifiedOutcome: string;
  architecturalBrief: string;
  structuralHighlights: string[];
  clientAttribution: {
    quote: string;
    clientName: string;
    roleAndLocation: string;
  };
}

export interface TrainingModule {
  code: string;
  title: string;
  duration: string;
  focus: string;
  topics: string[];
}

export const COMPANY_INFO = {
  fullName: 'Shree Tana Technical Consultancy',
  shortCode: 'STTC',
  primaryTagline: 'Your Vision... Our Technical Support',
  secondaryTagline: 'Build Your Dream With Us',
  email: 'shreetana25@gmail.com',
  phones: ['8660623069', '9481108347'],
  formattedPhones: ['+91 86606 23069', '+91 94811 08347'],
  address: {
    line1: 'No.60/A, Second Cross, Bhuvanagiri Colony',
    line2: 'Above Suraksha Clinic, Siruguppa Road',
    cityPin: 'Ballari - 583 103, Karnataka',
    full: 'No.60/A, Second Cross, Bhuvanagiri Colony, Above Suraksha Clinic, Siruguppa Road, Ballari - 583 103.',
  },
  proprietors: [
    {
      name: 'Er. Kiran Kumar',
      qualification: 'B.E Civil',
      role: 'Proprietor · Execution, Municipal Approvals & Valuation Lead',
      specialization:
        'Specializes in municipal sanction drawings (BUDA / City Corporation), turnkey residential execution, detailed Bill of Quantities (BOQ), and bank loan property valuation across Ballari.',
      experienceHighlights: [
        '100% first-pass municipal plan sanction compliance across residential & commercial plots',
        'Precision BOQ estimation within ±3.5% variance of final site execution cost',
        'End-to-end turnkey project supervision from excavation to handover',
      ],
    },
    {
      name: 'Er. Chaitravathi',
      qualification: 'M.Tech Structure Civil',
      role: 'Proprietor · Principal Structural Engineer & Training Lead',
      specialization:
        'Directs advanced structural analysis, seismic-resistant RCC frame detailing, foundation engineering for black cotton & varied soil strata, and practical Civil Basic Training for emerging engineers.',
      experienceHighlights: [
        '12%–16% reinforcement steel optimization using IS 456:2000 & IS 1893 structural modeling',
        'Specialized footing & pile-raft structural designs tailored for Ballari soil conditions',
        'Hands-on mentorship in structural drafting, Bar Bending Schedules (BBS), and site engineering',
      ],
    },
  ],
};

export const IMAGES = {
  heroBgTwilight: '/src/assets/images/hero_twilight_stone_residence_1790672092847.jpg',
  heroVilla: '/src/assets/images/hero_luxury_elevation_1790665479226.jpg',
  structuralBlueprint: '/src/assets/images/service_structural_blueprint_1790665493634.jpg',
  projectVilla: '/src/assets/images/project_villa_exterior_1790665506446.jpg',
  projectInterior: '/src/assets/images/project_interior_living_1790665518207.jpg',
  projectCommercial: '/src/assets/images/project_commercial_complex_1790665529183.jpg',
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'approval-drawings',
    index: '01',
    title: 'Approval Drawings and Execution',
    shortTitle: 'Approval & Execution',
    summary:
      'Complete municipal sanction blueprints, Vastu-aligned floor plans, FSI/FAR verification, and disciplined on-site civil construction execution.',
    leadEngineer: 'Er. Kiran Kumar, B.E Civil',
    deliverables: [
      'BUDA & Ballari City Corporation compliant sanction sheets',
      '2D working floor plans, site layout, and rain-water harvesting details',
      'Stage-wise site supervision, quality testing, and turnkey civil execution',
      'Plumbing, electrical, and drainage centerline working layouts',
    ],
    technicalStandard: 'National Building Code (NBC) & Local Municipal Bye-Laws',
    turnaround: '5–7 Working Days for Submission Set',
    outcomeMetric: '100% Municipal Sanction Compliance across 180+ Residential Plots',
    rateRange: '₹12 – ₹18 / sq.ft. (Design & Sanction) · Turnkey Execution from ₹1,750 / sq.ft.',
  },
  {
    id: '3d-elevation',
    index: '02',
    title: '3D Elevation',
    shortTitle: '3D Elevation',
    summary:
      'Photorealistic architectural exterior 3D visualizations showcasing cantilevered balconies, facade lighting, material textures, and compound gates before construction begins.',
    leadEngineer: 'Er. Kiran Kumar & Architectural Visualization Team',
    deliverables: [
      'Daylight and golden-hour dusk 8K exterior 3D perspective views',
      'Detailed 2D elevation working dimensions with facade material callouts',
      'Compound wall, MS/wooden gate, and architectural pergola detailing',
      'Exterior weather-shield color palette and cladding specification sheet',
    ],
    technicalStandard: 'True-to-Scale Sun Path & Architectural Material Rendering',
    turnaround: '4–6 Working Days per Elevation Option',
    outcomeMetric: 'Zero Facade Rework on Site via Dimensioned 3D Working Sheets',
    rateRange: '₹8,500 – ₹22,000 per Residence (G to G+3 Scale)',
  },
  {
    id: 'estimation-valuation',
    index: '03',
    title: 'Estimation and Valuation',
    shortTitle: 'Estimation & Valuation',
    summary:
      'Itemized Bill of Quantities (BOQ), stage-wise cashflow schedules, bank housing loan estimates, and certified property valuation reports.',
    leadEngineer: 'Er. Kiran Kumar, B.E Civil',
    deliverables: [
      'Comprehensive material & labor quantity takeoff (Cement, Steel, Aggregate, Finishing)',
      'Bank-format construction estimate for home loan sanction & disbursement stages',
      'Fair market valuation of land and existing residential/commercial structures',
      'Stage-by-stage financial milestone chart from footing to terrace slab',
    ],
    technicalStandard: 'Karnataka SR / CPWD Plinth Area & Item-Rate Norms',
    turnaround: '2–4 Working Days',
    outcomeMetric: '±3.2% Cost Accuracy Variance Between Initial BOQ and Final Build',
    rateRange: '₹3,500 – ₹9,500 per Detailed BOQ / Valuation Dossier',
  },
  {
    id: 'structural-details',
    index: '04',
    title: 'Structural Details',
    shortTitle: 'Structural Details',
    summary:
      'M.Tech-led structural analysis, safe foundation design for black cotton soil, column-beam RCC reinforcement schedules, and seismic-compliant slab detailing.',
    leadEngineer: 'Er. Chaitravathi, M.Tech Structure Civil',
    deliverables: [
      'Excavation centerline, isolated/combined footing & plinth beam reinforcement drawings',
      'Column schedule, floor-wise roof beam framing, and two-way/sunken slab RCC details',
      'Staircase, overhead water tank, and cantilever balcony structural calculations',
      'Bar Bending Schedule (BBS) to minimize steel wastage on site',
    ],
    technicalStandard: 'IS 456:2000 (RCC) · IS 1893 (Seismic) · SP 34 Detailing',
    turnaround: '5–8 Working Days per Multi-Story Structure',
    outcomeMetric: '14.5% Average Steel Saving Without Compromising Factor of Safety',
    rateRange: '₹8 – ₹14 / sq.ft. of Structural Built-Up Area',
  },
  {
    id: 'civil-basic-training',
    index: '05',
    title: 'Civil Basic Training',
    shortTitle: 'Civil Basic Training',
    summary:
      'Career-ready practical civil engineering mentorship for diploma, B.E, and M.Tech students covering CAD drafting, structural blueprint reading, quantity surveying, and live site visits.',
    leadEngineer: 'Er. Chaitravathi, M.Tech Structure Civil & Er. Kiran Kumar, B.E Civil',
    deliverables: [
      'Hands-on AutoCAD 2D municipal approval drawing & working plan preparation',
      'Structural RCC drawing interpretation & Bar Bending Schedule (BBS) calculation',
      'Practical quantity estimation, rate analysis, and billing sheet preparation',
      'Guided live site visits to ongoing luxury residential projects in Ballari',
    ],
    technicalStandard: 'Industry-Aligned Practical Site & Consultancy Curriculum',
    turnaround: '4-Week & 8-Week Intensive Practice Batches',
    outcomeMetric: '120+ Civil Engineering Graduates Trained with Live Project Portfolios',
    rateRange: 'Student & Graduate Cohort Enrollment · Certificate of Practical Completion',
  },
  {
    id: 'interior-design',
    index: '06',
    title: 'Interior Design and Execution',
    shortTitle: 'Interior Design & Execution',
    summary:
      'Bespoke residential and commercial interiors combining 3D room visualizations, modular kitchens, false ceiling lighting, acoustic paneling, and turnkey carpentry execution.',
    leadEngineer: 'STTC Interior Studio & Turnkey Execution Team',
    deliverables: [
      'Room-by-room 3D interior renders for living, master suite, pooja room, and modular kitchen',
      'Gypsum/wooden false ceiling layouts and warm architectural cove lighting plans',
      'Custom wardrobe, TV console, and Italian/vitrified flooring layout drawings',
      'Turnkey factory-finished carpentry, electrical, and soft-furnishing execution',
    ],
    technicalStandard: 'BWP Marine Grade Plywood · Precision Modular Joinery',
    turnaround: '35–50 Days Turnkey Interior Execution',
    outcomeMetric: '98% On-Time Handover Across Luxury Villa & Duplex Interiors',
    rateRange: '₹950 – ₹1,650 / sq.ft. Based on Material & Hardware Specification',
  },
];

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'anugraha-sky-villa',
    title: 'The Anugraha G+2 Cantilever Residence',
    category: '3d-elevation',
    categoryLabel: '3D Elevation & Turnkey Execution',
    location: 'Siruguppa Road, Ballari',
    plotArea: '40 × 60 ft (2,400 sq.ft.)',
    builtUpArea: '4,650 sq.ft.',
    configuration: 'G+2 Luxury Triplex · 5 BHK + Home Theater',
    completionYear: '2026',
    imageUrl: IMAGES.heroVilla,
    imageAlt: 'Modern three-story white and wood luxury villa with glass balconies against a blue sky',
    quantifiedOutcome: '15.2% Steel Optimization · Delivered 18 Days Ahead of Schedule',
    architecturalBrief:
      'Designed as a signature multi-level family residence featuring crisp white cantilevered balconies, warm teak-finish soffit cladding, frameless toughened glass railings, and integrated architectural facade lighting.',
    structuralHighlights: [
      '3.2m clear cantilevered balcony slab engineered by Er. Chaitravathi (M.Tech Structure)',
      'Isolated stepped RCC footings designed for safe bearing capacity on Siruguppa Road strata',
      'Full BUDA approval drawings, 3D elevation, and turnkey interior execution by STTC',
    ],
    clientAttribution: {
      quote:
        'Before approaching STTC, we struggled to combine Vastu compliance with a modern 3-story elevation. Er. Kiran Kumar and Er. Chaitravathi delivered the sanction drawings in 6 days and executed the exact 3D facade within our ₹98L budget.',
      clientName: 'Dr. Raghavendra Rao & Family',
      roleAndLocation: 'Homeowners · Siruguppa Road, Ballari',
    },
  },
  {
    id: 'bhuvanagiri-courtyard-duplex',
    title: 'Bhuvanagiri White Pavilion Duplex',
    category: 'structural',
    categoryLabel: 'Structural Detailing & Approval',
    location: 'Bhuvanagiri Colony, Ballari',
    plotArea: '30 × 50 ft (1,500 sq.ft.)',
    builtUpArea: '2,850 sq.ft.',
    configuration: 'G+1 Contemporary Duplex · 4 BHK',
    completionYear: '2025',
    imageUrl: IMAGES.projectVilla,
    imageAlt: 'Contemporary white geometric duplex villa with timber accents and landscaped courtyard',
    quantifiedOutcome: '₹4.4 Lakhs Saved via Precision BOQ & M.Tech Structural Detailing',
    architecturalBrief:
      'A serene white-and-timber architectural residence maximizing natural cross-ventilation for Ballari summers through double-height fenestration, deep sun-breaker overhangs, and a landscaped entrance court.',
    structuralHighlights: [
      'Hidden beam & flat-slab transition over double-height living hall for seamless ceiling lines',
      'Comprehensive Bank Loan BOQ & Valuation accepted on first submission',
      'Thermal cavity wall detailing on west-facing facade reducing indoor heat gain by 4°C',
    ],
    clientAttribution: {
      quote:
        'Er. Chaitravathi’s structural drawings eliminated redundant column bulk in our living room, and Er. Kiran’s itemized BOQ kept our material procurement 100% transparent from foundation to paint.',
      clientName: 'Smt. Rajeshwari & Sri Mallikarjun Patil',
      roleAndLocation: 'Residence Owners · Bhuvanagiri Colony, Ballari',
    },
  },
  {
    id: 'sapphire-bespoke-interiors',
    title: 'Sapphire Suite Bespoke Living & Modular Interiors',
    category: 'interiors',
    categoryLabel: 'Interior Design & Execution',
    location: 'Parvathi Nagar, Ballari',
    plotArea: '35 × 55 ft',
    builtUpArea: '3,100 sq.ft. Interior Scope',
    configuration: '4 BHK Turnkey Luxury Interior',
    completionYear: '2026',
    imageUrl: IMAGES.projectInterior,
    imageAlt: 'Luxury modern residential living room with cobalt blue sofa and warm wooden slat paneling',
    quantifiedOutcome: '42-Day Turnkey Interior Handover · Zero Cost Overrun',
    architecturalBrief:
      'Inspired by a timeless royal blue and warm oak palette, this turnkey residential interior integrates fluted timber wall panelling, Italian marble flooring layouts, recessed cove lighting, and custom modular cabinetry.',
    structuralHighlights: [
      'Complete 3D room walkthroughs approved prior to carpentry fabrication',
      'BWP grade marine plywood with soft-close German hardware across kitchen and wardrobes',
      'Concealed HVAC & acoustic wall treatment in family lounge',
    ],
    clientAttribution: {
      quote:
        'The 3D interior views matched the finished living room down to the exact lamp and blue upholstery texture. STTC handled carpentry, electrical, and false ceiling under one roof.',
      clientName: 'Sri Naveen Kumar Reddy',
      roleAndLocation: 'Industrialist · Parvathi Nagar, Ballari',
    },
  },
  {
    id: 'suraksha-prime-commercial',
    title: 'Apex Blue-Glaze Commercial & Residential Complex',
    category: 'turnkey',
    categoryLabel: 'Structural & Commercial Elevation',
    location: 'Infantry Road Corridor, Ballari',
    plotArea: '50 × 80 ft (4,000 sq.ft.)',
    builtUpArea: '11,200 sq.ft.',
    configuration: 'Cellar + G + 3 Commercial & Apartment Frame',
    completionYear: '2025',
    imageUrl: IMAGES.projectCommercial,
    imageAlt: 'Modern commercial and apartment building with blue structural glazing and white architectural fins',
    quantifiedOutcome: '9.5m Column-Free Commercial Span · 100% Municipal Fire & Sanction Clearance',
    architecturalBrief:
      'A high-visibility mixed-use structure featuring solar-control blue structural glazing on commercial lower levels and private cantilevered residential suites above.',
    structuralHighlights: [
      'Combined raft-footing foundation & retaining wall design for cellar parking',
      'Seismic Zone II compliant ductile detailing per IS 13920 guidelines',
      'Complete municipal approval, structural stability certification, and valuation package',
    ],
    clientAttribution: {
      quote:
        'For a cellar-plus-three-floor commercial complex, structural safety and maximum parking clearance were critical. STTC’s M.Tech structural team gave us 9.5m clear retail bays with rock-solid stability.',
      clientName: 'Vijayanagar Developers Group',
      roleAndLocation: 'Commercial Promoters · Ballari',
    },
  },
];

export const TRAINING_MODULES: TrainingModule[] = [
  {
    code: 'MODULE 01',
    title: 'Municipal Approval & Architectural CAD Drafting',
    duration: 'Weeks 1–2',
    focus: 'Preparing BUDA / Corporation sanction sheets, FSI calculations, and Vastu-compliant working floor plans.',
    topics: [
      'Centerline plans, column grid positioning, and masonry working drawings',
      'Section, elevation projection, and septic/rainwater harvesting mandatory blocks',
      'Reading plot survey sketches and setback regulations for residential & commercial sites',
    ],
  },
  {
    code: 'MODULE 02',
    title: 'Structural Detailing & Bar Bending Schedule (BBS)',
    duration: 'Weeks 3–4',
    focus: 'Mentored directly by Er. Chaitravathi (M.Tech Structure Civil) on RCC blueprints and reinforcement math.',
    topics: [
      'Footing mesh, column lap zones, development length (Ld), and stirrup spacing rules',
      'One-way vs. two-way slab crank bar detailing and hidden/inverted beam layouts',
      'Preparing error-free Bar Bending Schedules (BBS) to cut site steel wastage',
    ],
  },
  {
    code: 'MODULE 03',
    title: 'Quantity Surveying, BOQ Estimation & Bank Valuation',
    duration: 'Weeks 5–6',
    focus: 'Mentored by Er. Kiran Kumar (B.E Civil) on material takeoffs, SR rates, and site execution supervision.',
    topics: [
      'Earthwork, PCC, RCC concrete volume, brickwork, and plastering quantity takeoffs',
      'Thumb-rule verification vs. itemized Excel BOQ and bank loan valuation report formatting',
      'Live site inspection checklists: slump test, cover block verification, and curing protocols',
    ],
  },
];

export const EXECUTION_ROADMAP = [
  {
    step: '01',
    phase: 'Site Survey & Sanction Blueprints',
    duration: 'Week 1–2',
    title: 'Plot Verification, Vastu Floor Planning & Municipal Approval',
    description:
      'We inspect plot dimensions and soil orientation in Ballari, craft Vastu-harmonious 2D floor plans, and prepare complete municipal approval drawings for fast sanction clearance.',
    deliverable: 'Sanction Blueprint + Centerline Layout',
  },
  {
    step: '02',
    phase: 'Structural Engineering & 3D Elevation',
    duration: 'Week 3–4',
    title: 'M.Tech RCC Detailing & Photorealistic Exterior Visualization',
    description:
      'Er. Chaitravathi engineers the footing, column, beam, and slab RCC schedules while our visualization studio crafts 8K 3D exterior elevations with exact facade lighting and material specs.',
    deliverable: 'IS-456 Structural Set + 3D Elevation Dossier',
  },
  {
    step: '03',
    phase: 'BOQ Estimation & Civil Execution',
    duration: 'Month 2–8',
    title: 'Itemized Cost Valuation, Bank Loan Support & Supervised Build',
    description:
      'Er. Kiran Kumar prepares your itemized BOQ and bank valuation report, followed by rigorous stage-by-stage civil execution from excavation and plinth to superstructure casting.',
    deliverable: 'Certified BOQ + Stage-Inspected Superstructure',
  },
  {
    step: '04',
    phase: 'Luxury Interiors & Turnkey Handover',
    duration: 'Month 9–10',
    title: 'Bespoke Interior Execution, Lighting & Final Quality Audit',
    description:
      'We execute custom modular kitchens, wardrobes, false ceilings, and exterior facade finishes so your home matches the approved 3D elevation down to the last detail.',
    deliverable: 'Turnkey Residence + As-Built Structural Dossier',
  },
];
