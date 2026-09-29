import React from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ProjectCaseStudy } from '../data/consultancyData';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onInquireProject: (project: ProjectCaseStudy) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#0A2E6E] text-white shrink-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-blue-200 min-w-0">
            <span className="truncate">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.location}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{project.completionYear}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-100 hover:text-white hover:bg-blue-800/60 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          <div className="lg:col-span-6 bg-slate-100 h-56 sm:h-72 lg:h-auto lg:min-h-full relative">
            <ResilientImage
              src={project.imageUrl}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 sm:p-5 text-white">
              <p className="text-xs text-amber-300 font-medium">Quantified Engineering Outcome</p>
              <p className="text-xs sm:text-sm font-semibold mt-0.5">{project.quantifiedOutcome}</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-5 sm:p-8 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h3
                  id="modal-project-title"
                  className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
                >
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {project.architecturalBrief}
                </p>
              </div>

              {/* Technical Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4 border-y border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Plot Dimensions</span>
                  <span className="font-mono-tabular font-semibold text-slate-900 mt-0.5 block">
                    {project.plotArea}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Built-Up Area</span>
                  <span className="font-mono-tabular font-semibold text-slate-900 mt-0.5 block">
                    {project.builtUpArea}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block">Structural Configuration</span>
                  <span className="font-semibold text-[#0A2E6E] mt-0.5 block">
                    {project.configuration}
                  </span>
                </div>
              </div>

              {/* Structural Highlights */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 mb-2.5">
                  STTC Technical &amp; Structural Deliverables
                </h4>
                <ul className="space-y-2">
                  {project.structuralHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0A2E6E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Testimonial */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  “{project.clientAttribution.quote}”
                </p>
                <p className="text-xs font-semibold text-slate-900 mt-2">
                  {project.clientAttribution.clientName}{' '}
                  <span className="font-normal text-slate-500">
                    · {project.clientAttribution.roleAndLocation}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 sm:border-transparent rounded-lg transition-colors text-center cursor-pointer min-h-[44px]"
              >
                Close Window
              </button>
              <button
                type="button"
                onClick={() => {
                  onInquireProject(project);
                  onClose();
                }}
                className="px-5 py-2.5 bg-[#0A2E6E] hover:bg-blue-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <span>Request Similar Blueprint / Elevation</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
