"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Image as ImageIcon, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  link: string;
  images: string[];
}

export default function ProjectDetailsClient({
  project
}: {
  project: PortfolioItem | null;
}) {
  const [activeTab, setActiveTab] = useState<"all" | "photo" | "video">("all");
  const [lightboxImageIdx, setLightboxImageIdx] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-24 space-y-4">
        <ImageIcon size={48} className="text-[rgba(217,187,151,0.2)]" />
        <h3 className="text-xl font-bold font-syne text-white">Project Not Found</h3>
        <p className="text-sm text-[rgba(217,187,151,0.5)]">The requested portfolio showcase could not be located.</p>
        <Link href="/portfolio" className="text-[#b34a26] hover:underline font-semibold flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Portfolio
        </Link>
      </div>
    );
  }

  // Cover image is default 'photo'. Other items are parsed.
  const mediaList: { url: string; type: "photo" | "video" }[] = [];
  const seenUrls = new Set<string>();

  if (project.image) {
    const resolvedCover = getImageUrl(project.image);
    seenUrls.add(resolvedCover);
    const isCoverVideo = project.image.startsWith("video:") || !!project.image.toLowerCase().match(/\.(mp4|webm|ogg|mov|m4v)(\?|$)/);
    mediaList.push({ url: resolvedCover, type: isCoverVideo ? ("video" as const) : ("photo" as const) });
  }

  (project.images || []).forEach((imgUrlWithTag) => {
    const isVideoPrefixed = imgUrlWithTag.startsWith("video:");
    const isPhotoPrefixed = imgUrlWithTag.startsWith("photo:");
    const rawUrl = isVideoPrefixed ? imgUrlWithTag.substring(6) : (isPhotoPrefixed ? imgUrlWithTag.substring(6) : imgUrlWithTag);
    const url = getImageUrl(rawUrl);
    const isVideo = isVideoPrefixed || !!rawUrl.toLowerCase().match(/\.(mp4|webm|ogg|mov|m4v)(\?|$)/);
    const type = isVideo ? ("video" as const) : ("photo" as const);
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      mediaList.push({ url, type });
    }
  });

  const filteredMedia = mediaList.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className="relative">
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* Navigation & Header */}
        <div className="space-y-6 mb-10">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)] hover:text-white transition-all bg-[rgba(255,255,255,0.02)] border border-[rgba(217,187,151,0.08)] px-4 py-2 rounded-xl backdrop-blur-md">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tag ? project.tag.split(",").map((t) => (
                <span key={t} className="text-xs font-bold uppercase tracking-wider text-[#b34a26] bg-[rgba(179,74,38,0.1)] px-3 py-1 rounded-full border border-[rgba(179,74,38,0.2)]">
                  {t.trim()}
                </span>
              )) : null}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight leading-tight mt-2 max-w-4xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Media Tabs Filter */}
        <div className="flex gap-2.5 mb-8 border-b border-[rgba(217,187,151,0.08)] pb-4">
          {(["all", "photo", "video"] as const).map((tab) => {
            const count = mediaList.filter(item => tab === "all" || item.type === tab).length;
            if (count === 0) return null;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setLightboxImageIdx(null);
                }}
                className={`text-[10px] font-bold px-4 py-2 rounded-xl border transition-all uppercase tracking-wider ${
                  activeTab === tab
                    ? "bg-[#b34a26] text-white border-[#b34a26]"
                    : "bg-[rgba(255,255,255,0.02)] text-[rgba(217,187,151,0.6)] border-[rgba(217,187,151,0.08)] hover:bg-[rgba(217,187,151,0.05)] hover:text-white"
                }`}
              >
                {tab === "all" ? "All" : tab === "photo" ? "Photos" : "Videos"} ({count})
              </button>
            );
          })}
        </div>

        {/* Gallery */}
        <div>
          {filteredMedia.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-[rgba(217,187,151,0.15)] rounded-2xl">
              <ImageIcon size={32} className="mx-auto text-[rgba(217,187,151,0.3)] mb-3" />
              <p className="text-sm text-[rgba(217,187,151,0.5)]">No matching assets found in this filter.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {filteredMedia.map((item, idx) => (
                <motion.div
                  key={item.url + "-" + idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setLightboxImageIdx(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[rgba(217,187,151,0.08)] bg-black/20 hover:border-[#b34a26]/40 transition-all break-inside-avoid mb-6"
                >
                  {item.type === "video" ? (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <Play size={16} className="fill-white translate-x-[1px]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={`Asset ${idx + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500 rounded-2xl"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/75 px-3 py-1.5 rounded-lg border border-[rgba(217,187,151,0.1)] flex items-center gap-1.5 shadow-lg">
                      Expand {item.type === "video" ? "Video" : "Image"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Project Link */}
        {project.link && project.link !== "#" && (
          <div className="mt-16 text-center border-t border-[rgba(217,187,151,0.08)] pt-12">
            <h4 className="text-sm font-bold text-white mb-4">Want to see more of this project?</h4>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b34a26] hover:bg-[#9a3d1f] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#b34a26]/20"
            >
              Launch Live Case Study <ArrowLeft className="rotate-180" size={14} />
            </a>
          </div>
        )}
      </main>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImageIdx !== null && filteredMedia[lightboxImageIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
            onClick={() => setLightboxImageIdx(null)}
          >
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
              <div className="text-left">
                <div className="flex flex-wrap gap-1.5">
                  {project.tag ? project.tag.split(",").map((t) => (
                    <span key={t} className="text-[10px] text-[#b34a26] uppercase font-bold tracking-widest bg-[rgba(179,74,38,0.08)] px-1.5 py-0.5 rounded border border-[rgba(179,74,38,0.15)]">
                      {t.trim()}
                    </span>
                  )) : null}
                </div>
                <p className="text-sm font-bold text-white mt-1">{project.title}</p>
              </div>
              <button
                onClick={() => setLightboxImageIdx(null)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                {filteredMedia[lightboxImageIdx].type === "video" ? (
                  <video
                    src={filteredMedia[lightboxImageIdx].url}
                    className="w-full h-full max-h-[80vh] object-contain rounded-lg"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={filteredMedia[lightboxImageIdx].url}
                    alt="Expanded Asset"
                    className="w-full h-full max-h-[80vh] object-contain rounded-lg"
                  />
                )}
              </div>

              {filteredMedia.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxImageIdx((prev) => (prev === null || prev === 0 ? filteredMedia.length - 1 : prev - 1))}
                    className="absolute left-4 p-3 rounded-full bg-black/60 border border-white/10 text-[#d9bb97] hover:text-white transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setLightboxImageIdx((prev) => (prev === null || prev === filteredMedia.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 p-3 rounded-full bg-black/60 border border-white/10 text-[#d9bb97] hover:text-white transition-all backdrop-blur-sm"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {filteredMedia.length > 1 && (
              <div className="absolute bottom-6 inset-x-0 text-center">
                <span className="text-[10px] font-mono tracking-widest text-[rgba(217,187,151,0.5)]">
                  {lightboxImageIdx + 1} / {filteredMedia.length}
                </span>
                <div className="flex justify-center gap-1.5 mt-3">
                  {filteredMedia.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImageIdx(i);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        lightboxImageIdx === i ? "bg-[#b34a26] w-3" : "bg-neutral-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
