"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [notebookNotesState, setNotebookNotesState] = useState<Array<{ id: string; tag: string; title: string; snippet: string; quote: string }>>([
    {
      id: "note-1",
      tag: "PHILOSOPHY",
      title: "The Human Brand Paradox",
      snippet: "Why do we love some brands and ignore others? Because some feel like sterile corporations, and others feel like human characters. We design for character, not corporations.",
      quote: "“A brand is a living entity, an emotional bank account. From identity to influence, it must beat like a human heart.”"
    },
    {
      id: "note-2",
      tag: "STRATEGY",
      title: "Identity is More Than a Logo",
      snippet: "A logo is an anchor, but an identity is an entire landscape. It is the texture of the linen paper, the subtle pacing of a film, the spacing of text, the quiet confidence of your brand voice.",
      quote: "“Consistency creates trust; authenticity creates devotion. If it is manufactured, humans will sense it instantly.”"
    },
    {
      id: "note-3",
      tag: "COLLABORATION",
      title: "The Ecosystem Advantage",
      snippet: "By operating a lean core alongside an international ecosystem of filmmakers, visual artists, and thinkers, we bypass agency bloat and match elite talent directly with our clients.",
      quote: "“Creativity cannot be mass-produced in silos. We bring the right minds together at the perfect cultural moment.”"
    }
  ]);

  const studioRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mounted ? studioRef : undefined,
    offset: ["start end", "end start"]
  });

  const sectionBg = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    ["#0b0a0a", "#d9bb97", "#d9bb97", "#0b0a0a"]
  );
  
  const sectionText = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    ["#d9bb97", "#0b0a0a", "#0b0a0a", "#d9bb97"]
  );

  useEffect(() => {
    setMounted(true);

    fetch("/api/content")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Content API failed");
      })
      .then(data => {
        if (data.notebookNotes) setNotebookNotesState(data.notebookNotes);
      })
      .catch(err => console.log("Note: Running with default notebook entries fallback.", err));
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Header />

      {/* Spacing for Nav clearance */}
      <div className="pt-24" />

      {/* Philosophy Section */}
      <motion.section 
        id="philosophy"
        ref={studioRef}
        style={{ backgroundColor: sectionBg, color: sectionText }}
        className="philosophy-section relative overflow-hidden"
      >
        <div className="container z-10">
          <div className="philosophy-grid-layout">
            
            {/* Left Header Column */}
            <div className="philosophy-left-title" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 text-[#b34a26]" style={{ color: "#b34a26", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1rem", display: "inline-block" }}>
                  About us
                </span>
                <h2 className="font-syne">
                  We’re not an agency.<br />We’re a creative system.
                </h2>
              </div>
              
              <div className="hidden lg:block" style={{ marginTop: "3rem" }}>
                <div style={{ position: "relative", width: "9rem", aspectRatio: "1/1.2", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(179, 74, 38, 0.25)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
                  <Image 
                    src="/logo.jpg" 
                    alt="I.J_Stories Brand Seal" 
                    fill 
                    sizes="144px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontWeight: 700, opacity: 0.6, marginTop: "1rem" }} className="uppercase font-syne text-[rgba(217,187,151,0.6)]">
                  Official Brand Seal // Established 2026
                </p>
              </div>
            </div>

            {/* Right Paragraph Column */}
            <div className="philosophy-right-content">
              <p className="lead">
                Just stories that are designed from the ground up to connect, hold attention, and stay.
              </p>
              
              <p className="desc">
                Because strong visuals might catch eyes but story and sound make people remember. Every project is approached as a full experience: the idea, the narrative, the visuals, the sound — all crafted with intent.
              </p>

              {/* Ecosystem Statement */}
              <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(217, 187, 151, 0.15)", paddingTop: "2rem" }}>
                <p className="font-syne text-[#d9bb97]" style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.6, color: "var(--cream)" }}>
                  <span style={{ color: "#b34a26", fontWeight: 700 }}>IJ Stories</span> is a collective of filmmakers, photographers, scriptwriters, and sound artists — working together to build stories that don’t just look good, but feel complete.
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Notebook Section */}
      <section id="notebook" className="notebook-section">
        <div className="grid-bg" />
        <div className="orange-glow w-[600px] h-[600px] top-[-200px] left-[-200px]" />

        <div className="container z-10">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
              ค N o t e b o o k L M
            </span>
            <h2 className="font-syne text-cream" style={{ fontSize: "3rem" }}>
              The Creative Notebook
            </h2>
            <p style={{ color: "rgba(217, 187, 151, 0.6)", fontWeight: 300, marginTop: "1rem", fontSize: "1rem" }}>
              A multidisciplinary canvas of thoughts, strategic insights, and brand design manifestos curated by our core network.
            </p>
          </div>

          <div className="notebook-grid-layout">
            {/* Left Nav for Notes */}
            <div className="notebook-notes-list">
              {notebookNotesState.map((note, index) => (
                <button
                  key={note.id || `note-${index}`}
                  className={`notebook-note-btn ${activeNote === index ? "active" : ""}`}
                  onClick={() => setActiveNote(index)}
                >
                  <div className="notebook-note-btn-header">
                    <span className="notebook-note-btn-tag">
                      {note.tag}
                    </span>
                    <span style={{ fontSize: "10px", fontWeight: 700, opacity: 0.6 }}>0{index + 1}</span>
                  </div>
                  <h3 className="notebook-note-btn-title">
                    {note.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Right Display: Notebook paper effect */}
            <div>
              <motion.div 
                key={activeNote}
                className="notebook-style p-8 md:p-12 h-full flex flex-col justify-between"
                style={{ padding: "3rem 2.5rem", minHeight: "26rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Spiral Ring Binder Aesthetic */}
                <div style={{ position: "absolute", top: 0, left: "2.5rem", right: "2.5rem", display: "flex", justifyContent: "space-between", transform: "translateY(-6px)", pointerEvents: "none" }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ width: "10px", height: "16px", borderRadius: "9999px", backgroundColor: "#a8a29e", border: "1px solid #78716c", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
                  ))}
                </div>

                <div className="notebook-lines" style={{ paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(179, 74, 38, 0.15)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em" }} className="uppercase">
                      I.J_Stories // Core Journal
                    </p>
                    <p style={{ fontSize: "10px", fontWeight: 700, color: "#78716c" }}>
                      ENTRY_0{activeNote + 1}
                    </p>
                  </div>

                  <h4 className="font-syne" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--black)", marginBottom: "1.5rem" }}>
                    {notebookNotesState[activeNote]?.title}
                  </h4>

                  <p style={{ color: "#1c1917", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.6, marginBottom: "2rem" }}>
                    {notebookNotesState[activeNote]?.snippet}
                  </p>
                </div>

                <div style={{ backgroundColor: "#edd8c4", borderLeft: "4px solid var(--orange)", padding: "1.25rem", borderRadius: "0 0.5rem 0.5rem 0", marginTop: "auto" }}>
                  <p className="font-syne italic" style={{ fontWeight: 700, color: "var(--black)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {notebookNotesState[activeNote]?.quote}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
