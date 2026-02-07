'use client';

import { useState } from 'react';

interface Career {
  title: string;
  salary: string;
  time: string;
  education: string;
  overview: string;
  steps: string[];
  skills: string[];
  resources: { label: string; url: string }[];
}

const NO_COLLEGE: Career[] = [
  {
    title: 'Electrician',
    salary: '~$60,000',
    time: '4–5 years',
    education: 'Apprenticeship + state license',
    overview: 'Install, maintain, and repair electrical systems in homes, businesses, and industrial settings. Strong demand and recession-resistant.',
    steps: ['Complete high school or GED', 'Apply to an electrical apprenticeship (IBEW or non-union)', 'Complete 4–5 years of on-the-job training + classroom hours', 'Pass your state journeyman exam', 'Optional: pursue master electrician license'],
    skills: ['Math & physics basics', 'Blueprint reading', 'NEC code knowledge', 'Problem solving'],
    resources: [
      { label: 'IBEW Apprenticeship Finder', url: 'https://www.ibew.org' },
      { label: 'Electrician Schools Near You', url: 'https://www.trade-schools.net/trades/electrician' },
    ],
  },
  {
    title: 'Plumber',
    salary: '~$59,000',
    time: '4–5 years',
    education: 'Apprenticeship + state license',
    overview: 'Install and repair piping systems for water, gas, and drainage. One of the most in-demand trades with strong self-employment potential.',
    steps: ['Complete high school or GED', 'Enter a plumbing apprenticeship program', 'Complete 4–5 years of supervised training', 'Pass journeyman plumber exam', 'Optional: get master plumber license to run your own business'],
    skills: ['Mechanical aptitude', 'Building codes', 'Customer service', 'Physical fitness'],
    resources: [
      { label: 'UA Plumbers Union', url: 'https://www.ua.org' },
      { label: 'Plumbing Programs', url: 'https://www.trade-schools.net/trades/plumber' },
    ],
  },
  {
    title: 'HVAC Technician',
    salary: '~$58,000',
    time: '6 months – 2 years',
    education: 'Certificate or associate degree',
    overview: 'Install and service heating, ventilation, and air conditioning systems. Fast entry with strong demand year-round.',
    steps: ['Complete HVAC certificate program (6–12 months)', 'Get EPA Section 608 certification', 'Start as an apprentice or entry-level tech', 'Build experience and get state license', 'Optional: specialize in commercial HVAC for higher pay'],
    skills: ['Mechanical systems', 'Refrigerant handling', 'Electrical basics', 'Customer communication'],
    resources: [
      { label: 'HVAC Excellence', url: 'https://www.hvacexcellence.org' },
      { label: 'HVAC Training Programs', url: 'https://www.trade-schools.net/trades/hvac' },
    ],
  },
  {
    title: 'Commercial Pilot',
    salary: '~$100,000',
    time: '2–3 years',
    education: 'Flight training + FAA certifications',
    overview: 'Fly aircraft for airlines, cargo companies, or private clients. High earning potential with structured career progression.',
    steps: ['Get a private pilot license (PPL)', 'Earn instrument rating and commercial pilot license (CPL)', 'Build flight hours (1,500 required for airlines)', 'Get ATP certificate for airline employment', 'Apply to regional airlines'],
    skills: ['Decision making under pressure', 'Navigation & weather analysis', 'Communication', 'Physical health standards'],
    resources: [
      { label: 'FAA Pilot Certification', url: 'https://www.faa.gov/pilots/become' },
      { label: 'ATP Flight School', url: 'https://atpflightschool.com' },
    ],
  },
  {
    title: 'Real Estate Agent',
    salary: '~$61,000',
    time: '3–6 months',
    education: 'State licensing course + exam',
    overview: 'Help people buy, sell, and rent properties. Commission-based with unlimited earning potential for self-starters.',
    steps: ['Complete state-required pre-licensing course (60–180 hours)', 'Pass state real estate exam', 'Join a brokerage for mentorship', 'Build client base through networking and marketing', 'Optional: get broker license after 2–3 years'],
    skills: ['Sales & negotiation', 'Market analysis', 'Networking', 'Self-discipline'],
    resources: [
      { label: 'Kaplan Real Estate Education', url: 'https://www.kapre.com' },
      { label: 'NAR Career Guide', url: 'https://www.nar.realtor/careers' },
    ],
  },
  {
    title: 'Web Developer (Self-Taught)',
    salary: '~$65,000',
    time: '1–2 years',
    education: 'Bootcamp or self-study portfolio',
    overview: 'Build websites and web applications. One of the most accessible tech careers with strong remote work options.',
    steps: ['Learn HTML, CSS, JavaScript fundamentals (free resources)', 'Complete a coding bootcamp or structured curriculum', 'Build 3–5 portfolio projects', 'Contribute to open source or freelance for experience', 'Apply to junior developer positions'],
    skills: ['HTML/CSS/JavaScript', 'React or similar framework', 'Git version control', 'Problem solving'],
    resources: [
      { label: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
      { label: 'The Odin Project', url: 'https://www.theodinproject.com' },
    ],
  },
];

const COLLEGE: Career[] = [
  {
    title: 'Software Engineer',
    salary: '~$120,000',
    time: '4 years',
    education: 'BS Computer Science',
    overview: 'Design, develop, and maintain software systems. Highest median salary among common degrees with strong growth outlook.',
    steps: ['Earn BS in Computer Science or Software Engineering', 'Complete internships during school', 'Build portfolio with personal and class projects', 'Practice coding interviews (LeetCode, HackerRank)', 'Apply to software companies'],
    skills: ['Data structures & algorithms', 'System design', 'Multiple programming languages', 'Teamwork & communication'],
    resources: [
      { label: 'CS Degree Programs', url: 'https://www.usnews.com/best-colleges/rankings/computer-science' },
      { label: 'LeetCode Practice', url: 'https://leetcode.com' },
    ],
  },
  {
  title: 'Civil Engineer',
  salary: '~$95,000',
  time: '4 years',
  education: 'BS Civil Engineering',
  overview: 'Design and analyze infrastructure systems such as roads, bridges, and buildings. Versatile degree applicable across construction, transportation, and public works.',
  steps: [
    'Earn BS in Civil Engineering (ABET accredited)',
    'Complete co-ops or internships',
    'Pass FE exam to become Engineer in Training',
    'Gain 4 years experience',
    'Optional: pass PE exam for professional license'
  ],
  skills: [
    'Structural analysis','AutoCAD / Civil 3D', 'Materials science','Project management'],
  resources: [
    { label: 'ASCE Career Resources', url: 'https://www.asce.org/career-growth' },
    { label: 'ABET Accredited Programs', url: 'https://www.abet.org' }
  ],
},

  {
    title: 'Industrial Engineer',
    salary: '~$95,000',
    time: '4 years',
    education: 'BS Industrial Engineering',
    overview: 'Optimize complex systems and processes to eliminate waste. Works across manufacturing, healthcare, logistics, and tech.',
    steps: ['Earn BS in Industrial Engineering or IE Technology', 'Learn Six Sigma and lean manufacturing', 'Complete internships in manufacturing or logistics', 'Pass FE exam', 'Optional: get Six Sigma Green/Black Belt certification'],
    skills: ['Process optimization', 'Statistics & data analysis', 'Supply chain management', 'Systems thinking'],
    resources: [
      { label: 'IISE - Institute of Industrial Engineers', url: 'https://www.iise.org' },
      { label: 'Six Sigma Certification', url: 'https://www.asq.org/cert/six-sigma-green-belt' },
    ],
  },
  {
    title: 'Registered Nurse (RN)',
    salary: '~$85,000–$110,000',
    time: '2–4 years',
    education: 'BSN or ADN + NCLEX',
    overview: 'Provide patient care with high job security and nationwide demand.',
    steps: [
      'Earn BSN or ADN',
      'Pass NCLEX-RN exam',
      'Gain hospital experience',
      'Optional: specialize or pursue NP'
    ],
    skills: ['Patient care', 'Clinical judgment', 'Communication'],
    resources: [{ label: 'American Nurses Association', url: 'https://www.nursingworld.org' }]
  },

  {
    title: 'Accountant',
    salary: '~$77,000',
    time: '4 years',
    education: 'BS Accounting',
    overview: 'Manage financial records, taxes, and audits for businesses and individuals. Stable demand in every industry.',
    steps: ['Earn BS in Accounting (150 credit hours for CPA)', 'Pass the CPA exam (4 sections)', 'Start at public accounting firm or corporate finance', 'Build specialization (tax, audit, forensic)', 'Advance to senior accountant or controller'],
    skills: ['Financial reporting (GAAP)', 'Tax law', 'Excel & accounting software', 'Attention to detail'],
    resources: [
      { label: 'AICPA CPA Exam Guide', url: 'https://www.aicpa-cima.com/career/cpa-exam' },
      { label: 'Becker CPA Review', url: 'https://www.becker.com/cpa-review' },
    ],
  },
  {
    title: 'Teacher',
    salary: '~$63,000',
    time: '4 years',
    education: 'BS Education + state certification',
    overview: 'Educate students in K-12 settings. Meaningful work with job stability, benefits, summers, and pension in most states.',
    steps: ['Earn BS in Education or subject area + teaching cert', 'Complete student teaching semester', 'Pass Praxis or state certification exams', 'Apply to school districts', 'Optional: earn MS for salary advancement'],
    skills: ['Communication & patience', 'Classroom management', 'Curriculum design', 'Subject expertise'],
    resources: [
      { label: 'Teach.org', url: 'https://www.teach.org' },
      { label: 'State Certification Requirements', url: 'https://www.teaching-certification.com' },
    ],
  },
];

const MILITARY: Career[] = [
{
  title: 'Military → Engineering Pipeline (Security Clearance)',
  salary: '~$100,000–$160,000+',
  time: '4–6 years',
  education: 'Military technical training + clearance',
  overview: 'Serve in a technical military role and earn a Secret or Top Secret clearance. This clearance directly qualifies you for federal engineering jobs and defense contractor roles after service.',
  steps: [
    'Enlist or commission into a technical or engineering MOS',
    'Earn Secret or Top Secret security clearance',
    'Gain hands-on engineering or systems experience',
    'Use Tuition Assistance or GI Bill for engineering degree',
    'Exit into guaranteed government or contractor engineering roles'
  ],
  skills: [
    'Systems engineering',
    'Security clearance',
    'Technical documentation',
    'Project execution'
  ],
  resources: [
    { label: 'ClearanceJobs', url: 'https://www.clearancejobs.com' },
    { label: 'Defense Contractor Careers', url: 'https://www.lockheedmartinjobs.com' }
  ],
},
{
  title: 'Military Pilot Pipeline',
  salary: '~$90,000–$150,000+',
  time: '6–10 years',
  education: 'Officer commissioning + flight training',
  overview: 'Become a military pilot through ROTC, OCS, or a service academy. Military pilots transition directly into commercial airlines and high-paying aviation roles.',
  steps: [
    'Earn a bachelor’s degree and commission as an officer',
    'Pass flight physical and aviation aptitude tests',
    'Complete military flight school (1–2 years)',
    'Serve as operational pilot (jets, cargo, helicopters)',
    'Transition to airlines or government aviation roles'
  ],
  skills: [
    'Aviation systems',
    'Decision making under pressure',
    'Navigation & situational awareness',
    'Leadership'
  ],
  resources: [
    { label: 'Air Force Pilot Careers', url: 'https://www.airforce.com/careers/aviation-and-flight' },
    { label: 'Navy Pilot Program', url: 'https://www.navy.com/careers/aviation' }
  ],
},

  {
    title: 'Military (Enlisted)',
    salary: '~$40,000–$70,000+',
    time: 'Immediate (after basic training)',
    education: 'High school diploma + ASVAB score',
    overview: 'Serve in the armed forces with guaranteed pay, housing, healthcare, and education benefits. 200+ career specialties available.',
    steps: ['Meet with a recruiter from your preferred branch', 'Take the ASVAB and qualify for your desired MOS/rating', 'Complete basic training (8–13 weeks)', 'Attend job-specific training school', 'Serve initial contract (typically 4 years)'],
    skills: ['Discipline & leadership', 'Technical skills (varies by MOS)', 'Physical fitness', 'Teamwork under pressure'],
    resources: [
      { label: 'Military.com Career Guide', url: 'https://www.military.com/join-armed-forces' },
      { label: 'Today\'s Military', url: 'https://www.todaysmilitary.com' },
    ],
  },
  {
    title: 'Military Officer',
    salary: '~$60,000–$120,000+',
    time: '4 years (ROTC/Academy)',
    education: 'Bachelor\'s degree + commissioning',
    overview: 'Lead troops, manage operations, and earn competitive pay with full benefits. Multiple commissioning paths available.',
    steps: ['Earn bachelor\'s degree through ROTC, service academy, or OCS', 'Complete officer training program', 'Commission as 2nd Lieutenant / Ensign', 'Attend branch-specific training', 'Lead units and advance through ranks'],
    skills: ['Leadership & decision making', 'Strategic planning', 'Communication', 'Physical fitness'],
    resources: [
      { label: 'ROTC Programs', url: 'https://www.todaysmilitary.com/education-training/rotc-programs' },
      { label: 'Service Academies', url: 'https://www.todaysmilitary.com/education-training/service-academies' },
    ],
  },
  {
    title: 'Cyber Operations Specialist',
    salary: '~$100,000+',
    time: '4–6 years',
    education: 'Military cyber training',
    overview: 'Defend government networks with clearance-backed experience.',
    steps: ['Cyber MOS', 'Certifications'],
    skills: ['Cybersecurity'],
    resources: [{ label: 'Military Cyber Careers', url: 'https://www.todaysmilitary.com' }]
  },
  

  {
    title: 'Military → Civilian Tech',
    salary: '~$80,000–$130,000',
    time: '4–6 years (service + transition)',
    education: 'Military tech training + GI Bill',
    overview: 'Use military tech training and GI Bill benefits to transition into high-paying civilian roles in cybersecurity, IT, and engineering.',
    steps: ['Enlist in a technical MOS (IT, cyber, engineering)', 'Earn military certifications (CompTIA, Cisco, etc.)', 'Use Tuition Assistance for college courses during service', 'Apply GI Bill for degree or bootcamp after service', 'Leverage veteran hiring programs at top companies'],
    skills: ['Cybersecurity / IT systems', 'Security clearance (valuable)', 'Project management', 'Adaptability'],
    resources: [
      { label: 'VET TEC Program', url: 'https://www.va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program' },
      { label: 'Hire Heroes USA', url: 'https://www.hireheroesusa.org' },
    ],
  },
  {
    title: 'Intelligence Analyst',
    salary: '~$90,000+',
    time: '4–6 years',
    education: 'Military intel school',
    overview: 'Analyze classified intelligence for national security.',
    steps: ['Intel MOS', 'Clearance'],
    skills: ['Analysis'],
    resources: [{ label: 'Military.com', url: 'https://www.military.com' }]
  }
  
  








  









];

interface Props {
  income: number;
  onContinue: () => void;
}

type Category = 'no-college' | 'college' | 'military';

export default function CareerRecommendation({ income, onContinue }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('no-college');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'no-college', label: 'No College', icon: '🔧' },
    { id: 'college', label: 'College Required', icon: '🎓' },
    { id: 'military', label: 'Military', icon: '🎖️' },
  ];

  const careers = activeCategory === 'no-college' ? NO_COLLEGE : activeCategory === 'college' ? COLLEGE : MILITARY;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-[#00D632]">Phase 3: Career Pathways</p>
          <h2 className="text-3xl font-bold">Realistic paths to higher income</h2>
          <p className="text-gray-500">
            Your current income: <span className="font-semibold text-gray-900">${income.toLocaleString()}/mo</span>.
            These careers can get you to $55K+ within 5 years.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 justify-center">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => { setActiveCategory(c.id); setExpandedCard(null); }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === c.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Career cards */}
        <div className="space-y-3">
          {careers.map(career => {
            const isExpanded = expandedCard === career.title;
            return (
              <div
                key={career.title}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-gray-300"
              >
                {/* Card header */}
                <div className="p-5 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{career.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-sm text-[#00D632] font-semibold">{career.salary}</span>
                      <span className="text-sm text-gray-400">|</span>
                      <span className="text-sm text-gray-500">{career.time}</span>
                      <span className="text-sm text-gray-400">|</span>
                      <span className="text-sm text-gray-500">{career.education}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : career.title)}
                    className="px-4 py-2 text-sm font-medium rounded-full transition-all bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    {isExpanded ? 'Close' : 'Learn More'}
                  </button>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 pb-5 space-y-4">
                    {/* Overview */}
                    <div className="pt-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{career.overview}</p>
                    </div>

                    {/* Steps */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">How to get started:</h4>
                      <ol className="space-y-1.5">
                        {career.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-5 h-5 rounded-full bg-[#00D632]/10 text-[#00D632] text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Resources:</h4>
                      <div className="space-y-2">
                        {career.resources.map(r => (
                          <a
                            key={r.label}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#00D632] hover:underline"
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M5.5 2.5H3a1 1 0 00-1 1v7.5a1 1 0 001 1h7.5a1 1 0 001-1V8.5M8 2h4v4M6 8l5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {r.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue */}
        <div className="text-center space-y-3 pt-4">
          <p className="text-gray-500 text-sm">Explore as many paths as you want. When you're ready:</p>
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold text-lg rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Choose Your Life Path
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
