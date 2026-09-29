import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Check } from 'lucide-react';

export interface EstimateSummaryPayload {
  plotAreaSqFt: number;
  floors: number;
  floorLabel: string;
  packageTier: 'structural' | 'premium' | 'luxury';
  packageLabel: string;
  totalBuiltUpSqFt: number;
  estimatedTotalINR: number;
  selectedConsultancyAddons: string[];
}

interface CostEstimatorProps {
  onApplyEstimateToInquiry: (summary: EstimateSummaryPayload) => void;
}

const FLOOR_OPTIONS = [
  { floors: 1, label: 'Ground Floor Only (G)', coverageFactor: 0.72 },
  { floors: 2, label: 'G + 1 Duplex Residence', coverageFactor: 1.42 },
  { floors: 3, label: 'G + 2 Triplex Luxury Villa', coverageFactor: 2.1 },
  { floors: 4, label: 'G + 3 Multi-Family / Commercial', coverageFactor: 2.75 },
];

const PACKAGE_TIERS = [
  {
    id: 'structural' as const,
    name: 'Core Civil & Structural Shell',
    ratePerSqFt: 1650,
    description: 'IS-456 RCC framed structure, foundation, red-brick/AAC masonry, plastering & basic plumbing/electrical conduits.',
    steelSpec: 'Fe-550D TMT (4.2 kg/sq.ft. avg)',
    flooringSpec: 'Standard Vitrified Tiles',
  },
  {
    id: 'premium' as const,
    name: 'Premium Turnkey Residence',
    ratePerSqFt: 2150,
    description: 'Complete civil build + teak main door, UPVC windows, branded CP fittings, modular kitchen & false ceiling.',
    steelSpec: 'Fe-550D TMT + M.Tech Optimized BBS',
    flooringSpec: 'Large-Format Vitrified & Granite Staircase',
  },
  {
    id: 'luxury' as const,
    name: 'Signature 3D Luxury Villa (Aura Grade)',
    ratePerSqFt: 2750,
    description: 'Cantilevered architectural facade, toughened glass railings, wooden soffits, Italian marble & bespoke interiors.',
    steelSpec: 'Long-Span Cantilever & Seismic RCC Frame',
    flooringSpec: 'Italian Marble, Wooden Deck & Designer Cladding',
  },
];

const CONSULTANCY_SERVICES_CHECKLIST = [
  { id: 'approval', label: 'Municipal Approval Drawings', flatFee: 18000 },
  { id: 'elevation', label: '8K 3D Exterior Elevation', flatFee: 15000 },
  { id: 'structural', label: 'M.Tech Structural RCC Details', flatFee: 24000 },
  { id: 'valuation', label: 'Bank Loan BOQ & Valuation', flatFee: 6500 },
  { id: 'interiors', label: '3D Interior Design Package', flatFee: 35000 },
];

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimateToInquiry }) => {
  const [plotAreaSqFt, setPlotAreaSqFt] = useState<number>(1500); // e.g. 30x50
  const [selectedFloors, setSelectedFloors] = useState<number>(2);
  const [packageTier, setPackageTier] = useState<'structural' | 'premium' | 'luxury'>('premium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'approval',
    'elevation',
    'structural',
    'valuation',
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const floorObj = FLOOR_OPTIONS.find((f) => f.floors === selectedFloors) || FLOOR_OPTIONS[1];
    const pkgObj = PACKAGE_TIERS.find((p) => p.id === packageTier) || PACKAGE_TIERS[1];

    const builtUpSqFt = Math.round(plotAreaSqFt * floorObj.coverageFactor);
    const civilAndFinishingCost = builtUpSqFt * pkgObj.ratePerSqFt;

    const consultancyCost = CONSULTANCY_SERVICES_CHECKLIST.filter((item) =>
      selectedAddons.includes(item.id)
    ).reduce((acc, item) => acc + item.flatFee, 0);

    const foundationAndExcavation = Math.round(civilAndFinishingCost * 0.16);
    const rccSuperstructure = Math.round(civilAndFinishingCost * 0.38);
    const brickworkAndPlaster = Math.round(civilAndFinishingCost * 0.18);
    const flooringWoodworkAndFacade =
      civilAndFinishingCost - (foundationAndExcavation + rccSuperstructure + brickworkAndPlaster);

    const totalCost = civilAndFinishingCost + consultancyCost;
    const estimatedSteelSavings = Math.round(rccSuperstructure * 0.085); // M.Tech structural optimization saving

    return {
      floorObj,
      pkgObj,
      builtUpSqFt,
      civilAndFinishingCost,
      consultancyCost,
      foundationAndExcavation,
      rccSuperstructure,
      brickworkAndPlaster,
      flooringWoodworkAndFacade,
      totalCost,
      estimatedSteelSavings,
    };
  }, [plotAreaSqFt, selectedFloors, packageTier, selectedAddons]);

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatLakhs = (amount: number) => {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} Lakhs`;
  };

  const handleLockEstimate = () => {
    const addonNames = CONSULTANCY_SERVICES_CHECKLIST.filter((a) =>
      selectedAddons.includes(a.id)
    ).map((a) => a.label);

    onApplyEstimateToInquiry({
      plotAreaSqFt,
      floors: selectedFloors,
      floorLabel: calculation.floorObj.label,
      packageTier,
      packageLabel: calculation.pkgObj.name,
      totalBuiltUpSqFt: calculation.builtUpSqFt,
      estimatedTotalINR: calculation.totalCost,
      selectedConsultancyAddons: addonNames,
    });
  };

  return (
    <section
      id="estimator"
      className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#082459] to-[#0A2E6E] text-white border-y border-blue-900"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <p className="text-xs font-semibold text-amber-400 tracking-wide mb-2">
              03 · Estimation and Valuation Interactive Tool
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Ballari Construction Cost &amp; BOQ Estimator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
            Calibrated to current Ballari Schedule of Rates (SR) and market material benchmarks by{' '}
            <strong className="font-semibold text-white">Er. Kiran Kumar (B.E Civil)</strong> and{' '}
            <strong className="font-semibold text-white">Er. Chaitravathi (M.Tech Structure)</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Configuration Column (40% Crisp White Surface) */}
          <div className="lg:col-span-7 bg-white text-slate-900 border border-blue-200 rounded-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 shadow-sm">
            {/* 1. Plot Dimension Preset & Slider */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <label
                  htmlFor="plot-area-slider"
                  className="text-xs sm:text-sm font-semibold text-slate-900"
                >
                  1. Select Plot Area (sq.ft.)
                </label>
                <span className="font-mono-tabular text-sm sm:text-base font-semibold text-[#0A2E6E] shrink-0">
                  {plotAreaSqFt.toLocaleString('en-IN')} sq.ft.
                </span>
              </div>

              <input
                id="plot-area-slider"
                type="range"
                min={600}
                max={5000}
                step={50}
                value={plotAreaSqFt}
                onChange={(e) => setPlotAreaSqFt(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A2E6E]"
              />

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 mt-3.5">
                {[
                  { label: '20×30 (600 sq.ft)', value: 600 },
                  { label: '30×40 (1,200 sq.ft)', value: 1200 },
                  { label: '30×50 (1,500 sq.ft)', value: 1500 },
                  { label: '40×60 (2,400 sq.ft)', value: 2400 },
                  { label: '50×80 (4,000 sq.ft)', value: 4000 },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setPlotAreaSqFt(preset.value)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap text-center ${
                      plotAreaSqFt === preset.value
                        ? 'bg-[#0A2E6E] text-white border-[#0A2E6E]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Number of Floors */}
            <div className="pt-5 sm:pt-6 border-t border-slate-100">
              <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-3">
                2. Building Elevation &amp; Floor Configuration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {FLOOR_OPTIONS.map((option) => {
                  const active = selectedFloors === option.floors;
                  return (
                    <button
                      key={option.floors}
                      type="button"
                      onClick={() => setSelectedFloors(option.floors)}
                      className={`text-left p-3.5 rounded-xl border transition-all min-h-[48px] ${
                        active
                          ? 'bg-blue-50/70 border-[#0A2E6E] text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {option.label}
                        </span>
                        <span className="font-mono-tabular text-xs text-[#0A2E6E] font-medium shrink-0">
                          ~{Math.round(plotAreaSqFt * option.coverageFactor).toLocaleString('en-IN')} sq.ft
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Construction Specification Tier */}
            <div className="pt-5 sm:pt-6 border-t border-slate-100">
              <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-3">
                3. Specification &amp; Architectural Finish Package
              </label>
              <div className="space-y-3">
                {PACKAGE_TIERS.map((tier) => {
                  const active = packageTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setPackageTier(tier.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all ${
                        active
                          ? 'bg-blue-50/60 border-[#0A2E6E]'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1.5">
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          {tier.name}
                        </span>
                        <span className="font-mono-tabular text-xs font-semibold text-[#0A2E6E] whitespace-nowrap">
                          ₹{tier.ratePerSqFt.toLocaleString('en-IN')} / sq.ft.
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2">
                        {tier.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                        <span>{tier.steelSpec}</span>
                        <span aria-hidden="true">·</span>
                        <span>{tier.flooringSpec}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. STTC Technical Consultancy Deliverables */}
            <div className="pt-5 sm:pt-6 border-t border-slate-100">
              <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-3">
                4. Include STTC Technical Consultancy Packages
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CONSULTANCY_SERVICES_CHECKLIST.map((item) => {
                  const checked = selectedAddons.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAddon(item.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left transition-colors min-h-[46px] ${
                        checked
                          ? 'bg-[#0A2E6E] text-white border-[#0A2E6E]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                            checked ? 'bg-amber-400 text-slate-950' : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium truncate">{item.label}</span>
                      </div>
                      <span
                        className={`font-mono-tabular text-xs ml-2 shrink-0 ${
                          checked ? 'text-amber-300' : 'text-slate-500'
                        }`}
                      >
                        {formatINR(item.flatFee)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live BOQ Output Dossier */}
          <div className="lg:col-span-5 bg-[#061C47] text-white rounded-2xl p-5 sm:p-8 border border-blue-700/80 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-blue-800/80">
                <div>
                  <p className="text-xs text-amber-400 font-medium tracking-wide">
                    Shree Tana Technical Consultancy · Preliminary BOQ
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Estimated Project Valuation
                  </h3>
                </div>
                <Calculator className="w-6 h-6 text-amber-400 shrink-0" />
              </div>

              {/* Total Headline Metric */}
              <div className="py-5 sm:py-6 border-b border-blue-800/80">
                <p className="text-xs text-blue-200 mb-1">
                  Estimated Total Outlay ({calculation.builtUpSqFt.toLocaleString('en-IN')} sq.ft. Built-Up Area)
                </p>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="font-mono-tabular text-2xl sm:text-4xl font-bold text-white tracking-tight">
                    {formatLakhs(calculation.totalCost)}
                  </span>
                  <span className="font-mono-tabular text-xs text-blue-200">
                    ({formatINR(calculation.totalCost)})
                  </span>
                </div>
                <p className="text-xs text-amber-300 mt-2 leading-relaxed">
                  Includes est. {formatINR(calculation.estimatedSteelSavings)} structural steel optimization via M.Tech RCC detailing
                </p>
              </div>

              {/* Stage-wise Itemized Breakdown */}
              <div className="py-5 sm:py-6 space-y-3 text-xs border-b border-blue-800/80">
                <p className="text-xs font-semibold text-blue-200">
                  Stage-by-Stage Allocation Breakdown
                </p>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-blue-100">01. Excavation, Footing &amp; Plinth RCC (16%)</span>
                  <span className="font-mono-tabular font-semibold text-white shrink-0">
                    {formatINR(calculation.foundationAndExcavation)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-blue-100">02. Columns, Beams &amp; Roof Slabs (38%)</span>
                  <span className="font-mono-tabular font-semibold text-white shrink-0">
                    {formatINR(calculation.rccSuperstructure)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-blue-100">03. Brickwork, Internal &amp; External Plaster (18%)</span>
                  <span className="font-mono-tabular font-semibold text-white shrink-0">
                    {formatINR(calculation.brickworkAndPlaster)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-blue-100">04. Flooring, 3D Facade, Joinery &amp; MEP (28%)</span>
                  <span className="font-mono-tabular font-semibold text-white shrink-0">
                    {formatINR(calculation.flooringWoodworkAndFacade)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 pt-2 border-t border-blue-800/60">
                  <span className="text-amber-300 font-medium">
                    05. Selected STTC Engineering &amp; Drawings ({selectedAddons.length} items)
                  </span>
                  <span className="font-mono-tabular font-semibold text-amber-300 shrink-0">
                    {formatINR(calculation.consultancyCost)}
                  </span>
                </div>
              </div>

              {/* Key Material Quantities */}
              <div className="py-4 sm:py-5 grid grid-cols-3 gap-2 sm:gap-3 border-b border-blue-800/80 text-center">
                <div className="bg-blue-950/60 rounded-lg p-2.5 sm:p-3">
                  <p className="text-[11px] sm:text-xs text-blue-200">Est. Cement</p>
                  <p className="font-mono-tabular text-xs sm:text-sm font-bold text-white mt-1">
                    {Math.round(calculation.builtUpSqFt * 0.42).toLocaleString('en-IN')} Bags
                  </p>
                </div>
                <div className="bg-blue-950/60 rounded-lg p-2.5 sm:p-3">
                  <p className="text-[11px] sm:text-xs text-blue-200">Est. TMT Steel</p>
                  <p className="font-mono-tabular text-xs sm:text-sm font-bold text-white mt-1">
                    {(calculation.builtUpSqFt * 0.0039).toFixed(1)} MT
                  </p>
                </div>
                <div className="bg-blue-950/60 rounded-lg p-2.5 sm:p-3">
                  <p className="text-[11px] sm:text-xs text-blue-200">Est. Timeline</p>
                  <p className="font-mono-tabular text-xs sm:text-sm font-bold text-white mt-1">
                    {5 + selectedFloors * 2} Months
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 sm:pt-6">
              <button
                type="button"
                onClick={handleLockEstimate}
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span className="truncate">Request Certified BOQ &amp; Bank Valuation</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <p className="text-xs text-blue-200 text-center mt-3 leading-relaxed">
                Transfers your {plotAreaSqFt} sq.ft. ({calculation.floorObj.label}) parameters to our consultation desk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
