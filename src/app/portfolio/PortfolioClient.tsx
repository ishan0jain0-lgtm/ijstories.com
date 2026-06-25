"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Plus } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  link: string;
  images: string[];
  width?: number;
  height?: number;
  aspectRatio?: string;
}

export default function PortfolioClient({
  initialItems
}: {
  initialItems: PortfolioItem[];
}) {
  const [activeTag, setActiveTag] = useState<string>("all");

  const tags = [
    "all",
    ...Array.from(
      new Set(
        (initialItems || [])
          .flatMap((item) => (item.tag ? item.tag.split(",").map((t) => t.trim()) : []))
          .filter(Boolean)
      )
    )
  ];

  const filteredItems = (initialItems || []).filter((item) => {
    if (activeTag === "all") return true;
    if (!item.tag) return false;
    const itemTags = item.tag.split(",").map((t) => t.trim().toLowerCase());
    return itemTags.includes(activeTag.toLowerCase());
  });

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Showcase Asymmetric Image Gallery */}
      <section id="gallery" className="gallery-section section-dark">
        <div className="container z-10">
          <div className="showcase-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
              Visual Showcase
            </span>
            <h2 className="font-syne text-cream">
              Artistic direction at the intersection of media & strategy
            </h2>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-16 max-w-4xl mx-auto">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-[10px] font-bold px-4 py-2 rounded-xl border transition-all uppercase tracking-wider cursor-pointer ${
                  activeTag === tag
                    ? "bg-[#b34a26] text-white border-[#b34a26]"
                    : "bg-[rgba(255,255,255,0.02)] text-[rgba(217,187,151,0.6)] border-[rgba(217,187,151,0.08)] hover:bg-[rgba(217,187,151,0.05)] hover:text-white"
                }`}
              >
                {tag === "all" ? "All Works" : tag}
              </button>
            ))}
          </div>

          <div className="showcase-masonry-grid">
            {filteredItems.map((item, idx) => (
              <Link 
                href={`/portfolio/${item.id}`}
                key={item.id || `showcase-${idx}`}
                className="block"
              >
                <motion.div 
                  className="gallery-visual-card cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="gallery-image-wrapper"
                    style={{
                      aspectRatio: item.aspectRatio ? item.aspectRatio.replace(":", " / ") : (() => {
                        if (!item.width || !item.height) return "4 / 5";
                        const ratio = item.width / item.height;
                        if (ratio < 0.7) return "0.7 / 1";
                        if (ratio > 1.4) return "1.4 / 1";
                        return `${item.width} / ${item.height}`;
                      })()
                    }}
                  >
                    {item.image ? (() => {
                      const cleanUrl = item.image.startsWith("video:") ? item.image.substring(6) : (item.image.startsWith("photo:") ? item.image.substring(6) : item.image);
                      const isVideo = cleanUrl.toLowerCase().match(/\.(mp4|webm|ogg|mov|m4v)(\?|$)/);
                      return isVideo ? (
                        <video
                          src={getImageUrl(cleanUrl)}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 rounded-2xl"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      ) : (
                        <Image 
                          src={getImageUrl(cleanUrl)} 
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 450px"
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-700 hover:scale-105"
                        />
                      );
                    })() : null}
                  </div>
                  <div className="gallery-caption-bar">
                    <div>
                      <p className="gallery-caption-tag">
                        {item.tag ? item.tag.split(",").map((t) => t.trim()).join(" • ") : ""}
                      </p>
                      <h4 className="gallery-caption-title font-syne">{item.title}</h4>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.images && item.images.length > 0 && (
                        <span className="text-[9px] font-bold text-white bg-[#b34a26] px-1.5 py-0.5 rounded">
                          +{item.images.length}
                        </span>
                      )}
                      <ArrowUpRight size={18} style={{ color: "rgba(217, 187, 151, 0.6)" }} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}

            {/* Gallery Info Column with break-inside avoid */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem", breakInside: "avoid" }}>
              <div className="showcase-text-widget">
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "block", marginBottom: "1rem" }} className="uppercase">
                    Our Philosophy
                  </span>
                  <h3 className="font-syne text-cream" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", lineHeight: "1.2" }}>
                    Why we build brands that feel human.
                  </h3>
                  <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(217, 187, 151, 0.7)" }}>
                    Humans respond to humans, not corporations. We structure your strategy, film aesthetics, and digital touchpoints to capture real hearts.
                  </p>
                </div>
                <div style={{ borderTop: "1px solid rgba(217, 187, 151, 0.05)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)" }}>I.J_Stories Ecosystem</p>
                  <p style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.4)" }}>EST. 2026</p>
                </div>
              </div>

              {/* Dynamic decorative visual widget */}
              <div className="showcase-launch-widget">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--orange)" }}>
                  <Sparkles size={16} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Ready to launch?</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "rgba(217, 187, 151, 0.8)", lineHeight: "1.5" }}>
                  Join our network of elite clients and design a presence that is impossible to ignore.
                </p>
                <a 
                  href="/#contact" 
                  className="btn-widget-launch"
                >
                  Start Project <Plus size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
