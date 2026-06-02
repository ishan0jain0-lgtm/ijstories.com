"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PortfolioItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  link: string;
  images: string[];
  width?: number;
  height?: number;
}

const defaultFallbackItems: PortfolioItem[] = [
  {
    id: "showcase-1",
    tag: "Visual Identity",
    title: "Minimalist brand book",
    image: "/brand_identity_mockup.png",
    link: "#",
    images: [],
    width: 800,
    height: 600
  },
  {
    id: "showcase-2",
    tag: "Creative Direction",
    title: "Human-centric campaign",
    image: "/creative_direction_portrait.png",
    link: "#",
    images: [],
    width: 600,
    height: 800
  }
];

export default function PortfolioPage() {
  const [showcaseItemsState, setShowcaseItemsState] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Content API failed");
      })
      .then(data => {
        if (data.showcaseItems && data.showcaseItems.length > 0) {
          setShowcaseItemsState(data.showcaseItems);
        } else {
          setShowcaseItemsState(defaultFallbackItems);
        }
      })
      .catch(err => {
        console.log("Note: Running with default portfolio items fallback.", err);
        setShowcaseItemsState(defaultFallbackItems);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Header />

      {/* Spacing for Nav clearance */}
      <div className="pt-24" />

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

          <div className="showcase-masonry-grid">
            {loading ? (
              <>
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="gallery-visual-card animate-pulse border border-[rgba(217,187,151,0.05)] bg-[rgba(255,255,255,0.02)] min-h-[300px]"
                    style={{ 
                      aspectRatio: n === 1 ? "8 / 6" : n === 2 ? "6 / 8" : "8 / 7",
                    }}
                  >
                    <div className="w-full h-full bg-[rgba(217,187,151,0.01)]" />
                  </div>
                ))}
              </>
            ) : (
              showcaseItemsState.map((item, idx) => (
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
                      style={{ aspectRatio: item.width && item.height ? `${item.width} / ${item.height}` : "4 / 5" }}
                    >
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 450px"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="gallery-caption-bar">
                      <div>
                        <p className="gallery-caption-tag">{item.tag}</p>
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
              ))
            )}

            {/* Gallery Info Column */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem" }}>
              <div className="showcase-text-widget">
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", display: "block", marginBottom: "1rem" }} className="uppercase">
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

      <Footer />
    </div>
  );
}
