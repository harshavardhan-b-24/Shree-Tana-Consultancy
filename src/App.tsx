/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  Calculator,
  Building2,
  GraduationCap,
  Sofa,
  Menu,
  X,
  FileCheck2,
  UserCheck,
  Send,
} from 'lucide-react';
import {
  COMPANY_INFO,
  CORE_SERVICES,
  PORTFOLIO_PROJECTS,
  TRAINING_MODULES,
  IMAGES,
  ServiceItem,
  ProjectCaseStudy,
} from './data/consultancyData';
import { ResilientImage } from './components/ResilientImage';
import { CostEstimator, EstimateSummaryPayload } from './components/CostEstimator';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string>(CORE_SERVICES[0].id);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('all');
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectCaseStudy | null>(null);
  const [activeTrainingIndex, setActiveTrainingIndex] = useState<number>(0);

  // Inquiry Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedService, setSelectedService] = useState('Approval Drawings and Execution');
  const [plotDimension, setPlotDimension] = useState('30 × 50 ft (1,500 sq.ft.)');
  const [projectLocation, setProjectLocation] = useState('Siruguppa Road, Ballari');
  const [projectNotes, setProjectNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedDossier, setSubmittedDossier] = useState<{
    referenceId: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    plot: string;
    location: string;
    notes: string;
    timestamp: string;
  } | null>(null);

  const contactSectionRef = useRef<HTMLElement | null>(null);
  const serviceDetailRef = useRef<HTMLDivElement | null>(null);

  const activeService: ServiceItem =
    CORE_SERVICES.find((s) => s.id === activeServiceId) || CORE_SERVICES[0];

  const filteredProjects =
    portfolioFilter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === portfolioFilter);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceCard = (id: string) => {
    setActiveServiceId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        serviceDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string, customNote?: string) => {
    setSelectedService(serviceTitle);
    if (customNote) {
      setProjectNotes(customNote);
    }
    setSubmittedDossier(null);
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyEstimateToInquiry = (summary: EstimateSummaryPayload) => {
    setSelectedService('Estimation and Valuation');
    setPlotDimension(
      `${summary.plotAreaSqFt.toLocaleString('en-IN')} sq.ft. Plot (${summary.totalBuiltUpSqFt.toLocaleString('en-IN')} sq.ft. Built-Up)`
    );
    const formattedINR = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(summary.estimatedTotalINR);

    setProjectNotes(
      `Preliminary BOQ Configuration: ${summary.floorLabel} | Package: ${summary.packageLabel} | Est. Budget: ${formattedINR} | Included STTC Deliverables: ${summary.selectedConsultancyAddons.join(', ')}.`
    );
    setSubmittedDossier(null);
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInquireFromModal = (project: ProjectCaseStudy) => {
    setSelectedService(project.categoryLabel);
    setPlotDimension(project.plotArea);
    setProjectLocation(project.location);
    setProjectNotes(
      `Interested in a consultation modeled on "${project.title}" (${project.configuration}, ${project.builtUpArea}).`
    );
    setSubmittedDossier(null);
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = clientName.trim();
    const cleanedPhone = clientPhone.replace(/\D/g, '');
    const trimmedEmail = clientEmail.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your full name so our engineers can address your consultation.');
      return;
    }

    if (cleanedPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for site or office coordination.');
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address (or leave optional email blank).');
      return;
    }

    const refNum = `STTC-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedDossier({
      referenceId: refNum,
      name: trimmedName,
      phone: clientPhone.trim(),
      email: trimmedEmail || 'Not provided',
      service: selectedService,
      plot: plotDimension,
      location: projectLocation,
      notes: projectNotes.trim() || 'Standard technical consultation & site review requested.',
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    });
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'approval-drawings':
        return <FileCheck2 className="w-5 h-5" />;
      case '3d-elevation':
        return <Building2 className="w-5 h-5" />;
      case 'estimation-valuation':
        return <Calculator className="w-5 h-5" />;
      case 'structural-details':
        return <Layers className="w-5 h-5" />;
      case 'civil-basic-training':
        return <GraduationCap className="w-5 h-5" />;
      case 'interior-design':
        return <Sofa className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* STRICT 3-ZONE TOP BAR CONTRACT MATCHING HERO ROYAL BLUE */}
      <header className="sticky top-0 z-40 bg-[#0A2E6E]/95 backdrop-blur-md border-b border-blue-800/80 text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Single text element wordmark with mobile truncation safety */}
          <a
            href="#top"
            className="text-base sm:text-xl font-bold tracking-tight text-white truncate max-w-[195px] sm:max-w-none"
          >
            Shree Tana Technical Consultancy
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-blue-100"
          >
            <a
              href="#services"
              className="hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Portfolio
            </a>
            <a
              href="#estimator"
              className="hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Estimator
            </a>
            <a
              href="#leadership"
              className="hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Leadership
            </a>
            <a
              href="#contact"
              className="hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phones[0]}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-950/70 hover:bg-blue-900 border border-blue-700/80 rounded-lg transition-colors whitespace-nowrap font-mono-tabular"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>8660623069</span>
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-3 sm:px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Book Consultation
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 flex items-center justify-center text-blue-100 hover:text-white rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#082459] border-b border-blue-800 px-4 py-4 space-y-3 text-white">
            <div className="flex flex-col space-y-1 text-sm font-medium text-blue-100">
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="text-left py-2.5 px-2 rounded-lg hover:bg-blue-900/60 hover:text-amber-300"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('portfolio')}
                className="text-left py-2.5 px-2 rounded-lg hover:bg-blue-900/60 hover:text-amber-300"
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('estimator')}
                className="text-left py-2.5 px-2 rounded-lg hover:bg-blue-900/60 hover:text-amber-300"
              >
                Cost Estimator
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('leadership')}
                className="text-left py-2.5 px-2 rounded-lg hover:bg-blue-900/60 hover:text-amber-300"
              >
                Leadership &amp; Training
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="text-left py-2.5 px-2 rounded-lg hover:bg-blue-900/60 hover:text-amber-300"
              >
                Contact Office
              </button>
            </div>
            <div className="pt-3 border-t border-blue-800/80 flex flex-wrap items-center justify-between gap-2 px-2">
              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="text-xs font-mono-tabular font-semibold text-amber-300 py-1"
              >
                Call: +91 86606 23069
              </a>
              <a
                href={`tel:${COMPANY_INFO.phones[1]}`}
                className="text-xs font-mono-tabular font-semibold text-amber-300 py-1"
              >
                +91 94811 08347
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* HERO SECTION — 60% ROYAL BLUE BACKGROUND WITH 40% CRISP WHITE ARCHITECTURAL CARD */}
        <section className="relative bg-gradient-to-b from-[#0A2E6E] via-[#0C357C] to-[#072152] text-white pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-blue-900">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Top Editorial Identity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-12">
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                {/* Brand Emblem & Regional Trust Marker */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-amber-300">
                  <span className="font-bold tracking-wider text-white">STTC</span>
                  <span aria-hidden="true">·</span>
                  <span>Your Vision... Our Technical Support</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-blue-200 font-medium">Siruguppa Road, Ballari</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.14] sm:leading-[1.08]">
                  Architectural Precision &amp; Structural Engineering for{' '}
                  <span className="text-amber-300 italic font-display">Bespoke Luxury Homes.</span>
                </h1>

                <p className="text-sm sm:text-lg text-blue-100 leading-relaxed max-w-2xl">
                  Led by Proprietors{' '}
                  <strong className="font-semibold text-white">
                    Er. Kiran Kumar (B.E Civil)
                  </strong>{' '}
                  and{' '}
                  <strong className="font-semibold text-white">
                    Er. Chaitravathi (M.Tech Structure Civil)
                  </strong>
                  , Shree Tana Technical Consultancy transforms residential and commercial plots in
                  Ballari into enduring architectural landmarks—from municipal approval blueprints
                  and 8K 3D elevations to seismic-safe RCC detailing and turnkey interiors.
                </p>

                {/* Primary & Secondary Action Row — Stacked Full-Width on Mobile, Inline on Tablet/Desktop */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[48px]"
                  >
                    <span>Schedule Site &amp; Blueprint Consultation</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('estimator')}
                    className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-blue-50 text-[#0A2E6E] text-xs sm:text-sm font-semibold rounded-xl transition-colors text-center cursor-pointer min-h-[48px]"
                  >
                    Calculate Project BOQ
                  </button>
                </div>
              </div>

              {/* Right STTC Signature Architectural Card in Crisp White (40% White Balance) */}
              <div className="lg:col-span-5">
                <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-8 border border-blue-200 relative overflow-hidden shadow-md">
                  {/* Top STTC Architectural Skyline Crest */}
                  <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-200">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0A2E6E]">
                          STTC
                        </span>
                        <span className="text-amber-600 text-xs sm:text-sm font-semibold">
                          · Ballari, Karnataka
                        </span>
                      </div>
                      <h2 className="text-base sm:text-xl font-bold text-[#0A2E6E] mt-1 font-sans leading-snug">
                        SHREE TANA TECHNICAL CONSULTANCY
                      </h2>
                      <p className="text-xs text-slate-600 italic mt-0.5">
                        “Build Your Dream With Us”
                      </p>
                    </div>
                    {/* Custom SVG Skyline Emblem inspired by the STTC logo */}
                    <svg
                      className="w-12 h-12 sm:w-14 sm:h-14 shrink-0"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <rect x="14" y="22" width="7" height="24" fill="#1D4ED8" />
                      <rect x="24" y="12" width="8" height="34" fill="#0A2E6E" />
                      <rect x="35" y="17" width="8" height="29" fill="#F59E0B" />
                      <rect x="46" y="26" width="6" height="20" fill="#2563EB" />
                      <path
                        d="M8 46L32 30L56 46"
                        stroke="#F59E0B"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 50L32 37L52 50"
                        stroke="#DC2626"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Proprietors & Contact Details Direct from Banner */}
                  <div className="py-4 sm:py-5 space-y-3 text-xs border-b border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-4">
                      <span className="text-slate-500">Proprietor:</span>
                      <span className="font-semibold text-[#0A2E6E] sm:text-right">
                        Er. Kiran Kumar <span className="text-amber-600">(B.E Civil)</span>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-4">
                      <span className="text-slate-500">Proprietor:</span>
                      <span className="font-semibold text-[#0A2E6E] sm:text-right">
                        Er. Chaitravathi{' '}
                        <span className="text-amber-600">(M.Tech Structure Civil)</span>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-4">
                      <span className="text-slate-500">Gmail ID:</span>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="font-mono-tabular font-semibold text-[#0A2E6E] hover:text-blue-700 underline-offset-2 hover:underline break-all sm:break-normal sm:text-right"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-4">
                      <span className="text-slate-500">Phone:</span>
                      <div className="font-mono-tabular font-semibold text-[#0A2E6E] sm:text-right">
                        <a href="tel:8660623069" className="hover:underline">
                          8660623069
                        </a>
                        {' / '}
                        <a href="tel:9481108347" className="hover:underline">
                          9481108347
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="pt-4 sm:pt-5 flex items-start gap-2.5 sm:gap-3 text-xs text-slate-700">
                    <MapPin className="w-4 h-4 text-[#0A2E6E] shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-medium">
                      No.60/A, Second Cross, Bhuvanagiri Colony, Above Suraksha Clinic, Siruguppa
                      Road, Ballari - 583 103.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dominant Architectural Hero Showcase Frame — Responsive Mobile + Desktop Scrim */}
            <div className="relative rounded-2xl overflow-hidden border border-blue-800/80 bg-[#061C47] w-full">
              <div className="aspect-16/10 sm:aspect-16/9 max-h-[580px] w-full relative">
                <ResilientImage
                  src={IMAGES.heroVilla}
                  alt="Signature G+2 luxury villa 3D exterior elevation designed by Shree Tana Technical Consultancy"
                  fallbackTitle="Shree Tana Technical Consultancy — Signature G+2 Luxury Villa Elevation"
                  className="w-full h-full object-cover"
                />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              </div>

              {/* Caption & Metrics: Stacked cleanly below image on mobile so image is never covered; overlaid on sm+ */}
              <div className="sm:absolute sm:inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10 bg-[#061C47] sm:bg-transparent border-t border-blue-800/80 sm:border-t-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-amber-300 font-medium">
                      <span>Featured Turnkey Residence</span>
                      <span aria-hidden="true">·</span>
                      <span>Siruguppa Road, Ballari</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">4,650 sq.ft. G+2 Triplex</span>
                    </div>
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight font-sans leading-snug">
                      From Municipal Sanction Blueprints to Photorealistic 3D Luxury Execution
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-6 border-t md:border-t-0 md:border-l border-blue-800/80 sm:border-white/20 pt-4 md:pt-0 md:pl-8 text-white shrink-0">
                    <div>
                      <p className="font-mono-tabular text-lg sm:text-2xl font-bold text-amber-400">
                        180+
                      </p>
                      <p className="text-[11px] sm:text-xs text-blue-100 sm:text-slate-200 mt-0.5">
                        Approved Sanctions
                      </p>
                    </div>
                    <div>
                      <p className="font-mono-tabular text-lg sm:text-2xl font-bold text-white">
                        14.5%
                      </p>
                      <p className="text-[11px] sm:text-xs text-blue-100 sm:text-slate-200 mt-0.5">
                        Avg. Steel Saved
                      </p>
                    </div>
                    <div>
                      <p className="font-mono-tabular text-lg sm:text-2xl font-bold text-white">
                        ±3.2%
                      </p>
                      <p className="text-[11px] sm:text-xs text-blue-100 sm:text-slate-200 mt-0.5">
                        BOQ Cost Accuracy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE 6 CORE TECHNICAL CAPABILITIES (40% CRISP WHITE SECTION WITH ROYAL BLUE DOSSIER) */}
        <section id="services" className="py-14 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
              <div>
                <p className="text-xs font-semibold text-[#0A2E6E] tracking-wide mb-2">
                  Six Specialized Civil &amp; Architectural Pillars
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Comprehensive Technical Support Under One Roof
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Select any of our six core consultancy divisions below to inspect deliverables, IS
                code standards, turnaround schedules, and fee structures.
              </p>
            </div>

            {/* 6-Pillar Interactive Service Selector Grid + Deep-Dive Blueprint Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left 6 Services Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {CORE_SERVICES.map((service) => {
                  const isSelected = service.id === activeServiceId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleSelectServiceCard(service.id)}
                      className={`text-left p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0A2E6E] text-white border-[#0A2E6E] shadow-xs'
                          : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                          <span
                            className={`font-mono-tabular text-xs font-semibold ${
                              isSelected ? 'text-amber-400' : 'text-[#0A2E6E]'
                            }`}
                          >
                            {service.index}. Capability
                          </span>
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-blue-50 text-[#0A2E6E]'
                            }`}
                          >
                            {getServiceIcon(service.id)}
                          </div>
                        </div>

                        <h3
                          className={`text-base sm:text-lg font-bold tracking-tight mb-2 ${
                            isSelected ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {service.title}
                        </h3>

                        <p
                          className={`text-xs leading-relaxed ${
                            isSelected ? 'text-blue-100' : 'text-slate-600'
                          }`}
                        >
                          {service.summary}
                        </p>
                      </div>

                      <div
                        className={`mt-4 sm:mt-5 pt-3 border-t flex items-center justify-between text-xs font-medium ${
                          isSelected
                            ? 'border-blue-800 text-amber-300'
                            : 'border-slate-100 text-[#0A2E6E]'
                        }`}
                      >
                        <span>Inspect Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Active Service Technical Dossier (Royal Blue Surface on White Section) */}
              <div
                ref={serviceDetailRef}
                className="lg:col-span-5 bg-[#0A2E6E] text-white border border-blue-900 rounded-2xl overflow-hidden shadow-sm scroll-mt-20"
              >
                <div className="h-44 sm:h-48 relative bg-slate-900">
                  <ResilientImage
                    src={IMAGES.structuralBlueprint}
                    alt="Shree Tana Technical Consultancy structural engineering blueprints and approval drawings"
                    fallbackTitle={activeService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E6E] via-[#0A2E6E]/65 to-transparent p-5 sm:p-6 flex flex-col justify-end text-white">
                    <p className="font-mono-tabular text-xs text-amber-300 font-semibold">
                      Pillar {activeService.index} · Technical Specification Sheet
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5 font-sans">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-blue-100 pb-4 border-b border-blue-800">
                    <span className="font-semibold text-white">Lead:</span>
                    <span>{activeService.leadEngineer}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular text-amber-300 font-medium">
                      {activeService.turnaround}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-amber-300 mb-3">
                      Included Engineering &amp; Design Deliverables
                    </h4>
                    <ul className="space-y-2.5">
                      {activeService.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-blue-100">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-950/70 border border-blue-800 rounded-xl p-4 space-y-2.5 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                      <span className="text-blue-200">Governing Standard</span>
                      <span className="font-semibold text-white sm:text-right">
                        {activeService.technicalStandard}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2 pt-2.5 border-t border-blue-800/80">
                      <span className="text-blue-200">Verified Track Record</span>
                      <span className="font-semibold text-amber-300 sm:text-right">
                        {activeService.outcomeMetric}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2 pt-2.5 border-t border-blue-800/80">
                      <span className="text-blue-200">Indicative Consultancy Rate</span>
                      <span className="font-mono-tabular font-semibold text-white sm:text-right">
                        {activeService.rateRange}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectServiceForInquiry(
                        activeService.title,
                        `Requesting consultation for ${activeService.title} (${activeService.turnaround}).`
                      )
                    }
                    className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
                  >
                    <span className="truncate">Book {activeService.shortTitle} Consultation</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ARCHITECTURAL PORTFOLIO & QUANTIFIED CASE STUDIES */}
        <section
          id="portfolio"
          className="py-14 sm:py-20 lg:py-24 bg-[#0A2E6E] text-white border-t border-blue-900"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
              <div>
                <p className="text-xs font-semibold text-amber-400 tracking-wide mb-2">
                  Executed Residences, Structural Frames &amp; Interiors in Ballari
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Curated Architectural &amp; Structural Portfolio
                </h2>
              </div>

              {/* Interactive Segmented Filter Control — Horizontally Scrollable on Mobile */}
              <div
                role="tablist"
                aria-label="Filter portfolio projects by discipline"
                className="flex items-center gap-1 p-1.5 bg-blue-950/80 border border-blue-800 rounded-xl overflow-x-auto max-w-full"
              >
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: '3d-elevation', label: '3D Elevations' },
                  { id: 'structural', label: 'Structural & Approval' },
                  { id: 'interiors', label: 'Luxury Interiors' },
                  { id: 'turnkey', label: 'Commercial' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={portfolioFilter === tab.id}
                    onClick={() => setPortfolioFilter(tab.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      portfolioFilter === tab.id
                        ? 'bg-white text-[#0A2E6E] shadow-xs'
                        : 'text-blue-200 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Showcase Grid (Crisp White Cards on Royal Blue Section Background) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white text-slate-900 border border-blue-200 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                      <ResilientImage
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 sm:p-5">
                        <p className="text-xs font-mono-tabular text-amber-300 font-medium">
                          {project.quantifiedOutcome}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-8 space-y-3.5 sm:space-y-4">
                      {/* Unboxed Metadata with typographic separators */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#0A2E6E] font-medium">
                        <span>{project.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{project.builtUpArea}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {project.architecturalBrief}
                      </p>

                      {/* Attributable Client Testimonial adjacent to claim */}
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-600 italic leading-relaxed">
                          “{project.clientAttribution.quote}”
                        </p>
                        <p className="text-xs font-semibold text-[#0A2E6E] mt-2">
                          {project.clientAttribution.clientName}{' '}
                          <span className="font-normal text-slate-500">
                            · {project.clientAttribution.roleAndLocation}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 sm:px-8 py-4 bg-blue-50/70 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <span className="font-mono-tabular text-xs font-medium text-slate-700">
                      Plot: {project.plotArea}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProjectModal(project)}
                      className="text-xs font-semibold text-[#0A2E6E] hover:text-blue-800 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer py-1"
                    >
                      <span>Inspect Blueprint &amp; Specs</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE CONSTRUCTION COST & VALUATION ESTIMATOR */}
        <CostEstimator onApplyEstimateToInquiry={handleApplyEstimateToInquiry} />

        {/* SECTION 5: PROPRIETOR LEADERSHIP & CIVIL BASIC TRAINING ACADEMY */}
        <section id="leadership" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-14 sm:space-y-20">
            {/* Proprietors Dual Profile */}
            <div>
              <div className="max-w-2xl mb-8 sm:mb-12">
                <p className="text-xs font-semibold text-[#0A2E6E] tracking-wide mb-2">
                  Proprietors &amp; Principal Engineers
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Dual-Discipline Civil &amp; M.Tech Structural Leadership
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {COMPANY_INFO.proprietors.map((prop) => (
                  <div
                    key={prop.name}
                    className="p-5 sm:p-8 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 pb-4 sm:pb-5 border-b border-slate-100">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#0A2E6E] font-semibold">
                            <span>{prop.role}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-sans">
                            {prop.name}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-amber-600 mt-0.5">
                            {prop.qualification}
                          </p>
                        </div>
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0A2E6E] text-white flex items-center justify-center shrink-0">
                          <UserCheck className="w-5 h-5 text-amber-400" />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed my-4 sm:my-5">
                        {prop.specialization}
                      </p>

                      <div className="space-y-2.5 pt-1 sm:pt-2">
                        <p className="text-xs font-semibold text-slate-900">
                          Key Engineering Benchmarks:
                        </p>
                        {prop.experienceHighlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-slate-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#0A2E6E] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-7 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <span className="text-slate-500">Direct Consultation Available</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectServiceForInquiry(
                            prop.qualification.includes('M.Tech')
                              ? 'Structural Details'
                              : 'Approval Drawings and Execution',
                            `Requesting a direct technical consultation with ${prop.name} (${prop.qualification}).`
                          )
                        }
                        className="font-semibold text-[#0A2E6E] hover:underline inline-flex items-center gap-1 cursor-pointer py-1"
                      >
                        <span>Consult {prop.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar 05 Spotlight: Civil Basic Training Practical Mentorship */}
            <div className="bg-[#0A2E6E] text-white border border-blue-900 rounded-2xl p-5 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>05 · Civil Basic Training Division</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight font-sans">
                    Practical Site &amp; Structural Training for Civil Engineers
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    Bridge the gap between university textbooks and real-world consultancy practice.
                    Diploma, B.E Civil, and M.Tech students train directly on live Ballari residential
                    blueprints, AutoCAD sanction sheets, Bar Bending Schedules (BBS), and site
                    quantity estimation.
                  </p>
                  <div className="pt-1 sm:pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectServiceForInquiry(
                          'Civil Basic Training',
                          `Enrolling for Civil Basic Training Cohort (${TRAINING_MODULES[activeTrainingIndex].title}). Please share upcoming batch timings at the Bhuvanagiri Colony office.`
                        )
                      }
                      className="w-full sm:w-auto px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
                    >
                      <span>Inquire About Next Training Batch</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  {/* Interactive Curriculum Module Selector — Grid on Mobile, Flex on Tablet+ */}
                  <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2">
                    {TRAINING_MODULES.map((mod, idx) => (
                      <button
                        key={mod.code}
                        type="button"
                        onClick={() => setActiveTrainingIndex(idx)}
                        className={`px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-colors text-left sm:text-center cursor-pointer ${
                          activeTrainingIndex === idx
                            ? 'bg-white text-[#0A2E6E] border-white'
                            : 'bg-blue-950/70 text-blue-100 border-blue-800 hover:border-blue-600'
                        }`}
                      >
                        {mod.code}: {mod.duration}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white text-slate-900 border border-blue-200 rounded-xl p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 border-b border-slate-100 pb-3">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {TRAINING_MODULES[activeTrainingIndex].title}
                      </h4>
                      <span className="font-mono-tabular text-xs font-semibold text-[#0A2E6E] shrink-0">
                        {TRAINING_MODULES[activeTrainingIndex].duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {TRAINING_MODULES[activeTrainingIndex].focus}
                    </p>
                    <ul className="space-y-2">
                      {TRAINING_MODULES[activeTrainingIndex].topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#0A2E6E] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: INTERACTIVE LEAD CAPTURE, CONSULTATION BOOKING & BALLARI OFFICE DETAILS */}
        <section
          id="contact"
          ref={contactSectionRef}
          className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0A2E6E] to-[#082459] text-white"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
              {/* Left Column: Complete Office & Visiting Card Coordinates */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <div>
                  <p className="text-xs font-semibold text-amber-400 tracking-wide mb-2">
                    Visit or Contact Our Ballari Office
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    Start Your Project With Technical Certainty
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 mt-3 leading-relaxed">
                    Bring your plot documents or rough sketch to our office on Siruguppa Road, or
                    submit your plot dimensions online for a prompt consultation with{' '}
                    <strong className="font-semibold text-white">Er. Kiran Kumar</strong> and{' '}
                    <strong className="font-semibold text-white">Er. Chaitravathi</strong>.
                  </p>
                </div>

                {/* Official Visiting Card Reference Box */}
                <div className="bg-[#061C47] text-white rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 border border-blue-800">
                  <div className="border-b border-blue-800 pb-4">
                    <p className="text-xs text-amber-400 font-semibold">
                      Official Consultancy Directory
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 font-sans">
                      SHREE TANA TECHNICAL CONSULTANCY
                    </h3>
                    <p className="text-xs text-blue-200 mt-0.5">
                      Your Vision... Our Technical Support
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-white">Ballari Head Office Address</p>
                        <p className="text-blue-100 leading-relaxed mt-0.5">
                          No.60/A, Second Cross, Bhuvanagiri Colony,
                          <br />
                          Above Suraksha Clinic, Siruguppa Road,
                          <br />
                          Ballari - 583 103, Karnataka.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-white">Direct Phone Numbers</p>
                        <div className="mt-1 space-y-1 font-mono-tabular text-sm">
                          <a
                            href="tel:8660623069"
                            className="block text-amber-300 hover:underline font-semibold"
                          >
                            +91 86606 23069
                          </a>
                          <a
                            href="tel:9481108347"
                            className="block text-amber-300 hover:underline font-semibold"
                          >
                            +91 94811 08347
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      <div className="min-w-0">
                        <p className="font-semibold text-white">Official Gmail ID</p>
                        <a
                          href={`mailto:${COMPANY_INFO.email}`}
                          className="font-mono-tabular text-amber-300 hover:underline font-semibold mt-0.5 block break-all"
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-blue-800/80 text-xs text-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span>Consultation Hours</span>
                    <span className="font-mono-tabular text-white font-medium">
                      Mon – Sat · 9:30 AM – 8:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Validated Consultation & Project Brief Form */}
              <div className="lg:col-span-7 bg-white text-slate-900 border border-blue-200 rounded-2xl p-5 sm:p-10 shadow-sm">
                {submittedDossier ? (
                  <div className="space-y-5 sm:space-y-6 py-2 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-mono-tabular font-semibold text-[#0A2E6E]">
                            Consultation Reference: {submittedDossier.referenceId}
                          </p>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            Project Consultation Request Logged
                          </h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono-tabular text-slate-500">
                        {submittedDossier.timestamp}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Thank you, <strong className="text-slate-900">{submittedDossier.name}</strong>.
                      Your technical brief for{' '}
                      <strong className="text-[#0A2E6E]">{submittedDossier.service}</strong> has
                      been prepared for{' '}
                      <strong className="text-slate-900">Er. Kiran Kumar</strong> and{' '}
                      <strong className="text-slate-900">Er. Chaitravathi</strong>.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2.5 text-xs">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                        <span className="text-slate-500">Client Name &amp; Phone:</span>
                        <span className="font-semibold text-slate-900 font-mono-tabular">
                          {submittedDossier.name} · {submittedDossier.phone}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                        <span className="text-slate-500">Selected Service Pillar:</span>
                        <span className="font-semibold text-[#0A2E6E]">
                          {submittedDossier.service}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                        <span className="text-slate-500">Plot Size &amp; Location:</span>
                        <span className="font-semibold text-slate-900">
                          {submittedDossier.plot} · {submittedDossier.location}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-slate-500 block mb-1">Technical Notes / BOQ Spec:</span>
                        <p className="text-slate-800 leading-relaxed">{submittedDossier.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                      <a
                        href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
                          `[${submittedDossier.referenceId}] ${submittedDossier.service} Inquiry - ${submittedDossier.name}`
                        )}&body=${encodeURIComponent(
                          `Hello Er. Kiran Kumar & Er. Chaitravathi,\n\nName: ${submittedDossier.name}\nPhone: ${submittedDossier.phone}\nService Required: ${submittedDossier.service}\nPlot Size: ${submittedDossier.plot}\nLocation: ${submittedDossier.location}\n\nProject Brief:\n${submittedDossier.notes}`
                        )}`}
                        className="px-4 sm:px-5 py-3 bg-[#0A2E6E] hover:bg-blue-900 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <Send className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Send Copy via Gmail ({COMPANY_INFO.email})</span>
                      </a>

                      <a
                        href={`tel:${COMPANY_INFO.phones[0]}`}
                        className="px-4 py-3 bg-blue-50 hover:bg-blue-100 text-[#0A2E6E] text-xs font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 font-mono-tabular min-h-[44px]"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>Call 8660623069 Now</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSubmittedDossier(null)}
                        className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 text-center cursor-pointer min-h-[44px]"
                      >
                        Modify Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="space-y-4 sm:space-y-5" noValidate>
                    <div className="border-b border-slate-100 pb-3.5 sm:pb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        Request Drawings, 3D Elevation, Valuation or Site Visit
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Complete the project brief below. All fields marked with * are required.
                      </p>
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-800"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="client-name"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g., Sri Suresh Babu"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A2E6E] min-h-[44px]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="client-phone"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Mobile Number (10 Digits) *
                        </label>
                        <input
                          id="client-phone"
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="e.g., 98450 12345"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A2E6E] font-mono-tabular min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="service-pillar"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Required Technical Service *
                        </label>
                        <select
                          id="service-pillar"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A2E6E] min-h-[44px]"
                        >
                          {CORE_SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.index}. {s.title}
                            </option>
                          ))}
                          <option value="Complete Turnkey Package (All 6 Services)">
                            Complete Turnkey Package (Blueprints + 3D + Structural + Build)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="client-email"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Email Address (Optional)
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A2E6E] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="plot-dimension"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Plot Dimension / Area
                        </label>
                        <input
                          id="plot-dimension"
                          type="text"
                          value={plotDimension}
                          onChange={(e) => setPlotDimension(e.target.value)}
                          placeholder="e.g., 30 × 50 ft or 2,400 sq.ft."
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A2E6E] min-h-[44px]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="project-location"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Site Location / Colony in Ballari
                        </label>
                        <input
                          id="project-location"
                          type="text"
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                          placeholder="e.g., Bhuvanagiri Colony / Siruguppa Road"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A2E6E] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="project-notes"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Project Requirements / Floor Configuration / Training Query
                      </label>
                      <textarea
                        id="project-notes"
                        rows={3}
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        placeholder="Describe your requirement (e.g., G+2 East-facing Vastu plan, 3D elevation, structural RCC design, bank loan valuation, or Civil Basic Training enrollment)..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A2E6E]"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <p className="text-xs text-slate-500">
                        Direct Review by{' '}
                        <strong className="text-slate-700">Er. Kiran Kumar</strong> &amp;{' '}
                        <strong className="text-slate-700">Er. Chaitravathi</strong>
                      </p>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3.5 bg-[#0A2E6E] hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                      >
                        <span>Confirm Consultation Request</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET ARCHITECTURAL FOOTER */}
      <footer className="bg-[#061C47] text-white border-t border-blue-900">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-blue-900/80">
            <div className="md:col-span-5 space-y-3">
              <p className="text-base sm:text-lg font-bold tracking-tight text-white">
                SHREE TANA TECHNICAL CONSULTANCY (STTC)
              </p>
              <p className="text-xs text-amber-300 italic">
                “Your Vision... Our Technical Support — Build Your Dream With Us”
              </p>
              <p className="text-xs text-blue-200 leading-relaxed max-w-sm">
                No.60/A, Second Cross, Bhuvanagiri Colony, Above Suraksha Clinic, Siruguppa Road,
                Ballari - 583 103, Karnataka.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <p className="font-semibold text-white mb-2">Core Consultancy Divisions</p>
              <ul className="space-y-1.5 text-blue-200">
                <li>01. Approval Drawings and Execution</li>
                <li>02. 3D Elevation &amp; Facade Design</li>
                <li>03. Estimation and Valuation (BOQ &amp; Bank Loans)</li>
                <li>04. Structural Details (M.Tech RCC Design)</li>
                <li>05. Civil Basic Training</li>
                <li>06. Interior Design and Execution</li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <p className="font-semibold text-white mb-2">Proprietors &amp; Contact</p>
              <p className="text-blue-100">
                <strong className="text-white">Er. Kiran Kumar</strong> · B.E Civil
              </p>
              <p className="text-blue-100">
                <strong className="text-white">Er. Chaitravathi</strong> · M.Tech Structure Civil
              </p>
              <p className="pt-2 font-mono-tabular text-amber-300">
                <a href="tel:8660623069" className="hover:underline">
                  8660623069
                </a>{' '}
                ·{' '}
                <a href="tel:9481108347" className="hover:underline">
                  9481108347
                </a>
              </p>
              <p className="font-mono-tabular text-blue-200 break-all">
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Shree Tana Technical Consultancy, Ballari. All rights
              reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#portfolio" className="hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="#estimator" className="hover:text-white transition-colors">
                BOQ Estimator
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Specification Modal */}
      <ProjectModal
        project={selectedProjectModal}
        onClose={() => setSelectedProjectModal(null)}
        onInquireProject={handleInquireFromModal}
      />
    </div>
  );
}
