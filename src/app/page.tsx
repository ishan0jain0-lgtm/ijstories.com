"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  Sparkles, 
  Plus, 
  CornerDownRight, 
  Send,
  CheckCircle,
  Menu,
  X
} from "lucide-react";
import Marquee from "react-fast-marquee";


// ==========================================
// BENTO GRID COMPONENTS (LUXURY BRAND EDIT)
// ==========================================



export const Mentorship = () => {
  const mentors = [
    {
      src: "/creative_direction_portrait.png",
      alt: "Brandon",
      name: "Brandon",
      designation: "3D Motion Artist",
    },
    {
      src: "/brand_identity_mockup.png",
      alt: "Manu",
      name: "Manu",
      designation: "Film Director",
    },
    {
      src: "/abstract_motion_art.png",
      alt: "Dwayne",
      name: "Dwayne",
      designation: "Principal Architect",
    },
    {
      src: "/logo.jpg",
      alt: "Emily",
      name: "Emily",
      designation: "Strategic Planner",
    },
    {
      src: "/creative_direction_portrait.png",
      alt: "James",
      name: "James",
      designation: "Creative Director",
    },
    {
      src: "/brand_identity_mockup.png",
      alt: "Healey",
      name: "Healey",
      designation: "Visual Designer",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center" style={{ overflow: "hidden", width: "100%" }}>
      <Marquee className="py-2" speed={25} pauseOnHover>
        {mentors.map((mentor, i) => (
          <div
            key={mentor.alt + i}
            className="mx-2 flex items-center gap-2 rounded-lg p-2 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(217, 187, 151, 0.08)", minWidth: "160px" }}
          >
            <div style={{ position: "relative", width: "2rem", height: "2rem", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(217, 187, 151, 0.1)" }}>
              <Image
                src={mentor.src}
                alt={mentor.alt}
                fill
                sizes="32px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-cream" style={{ fontSize: "0.75rem" }}>{mentor.name}</span>
              <span className="text-[10px] text-gray-500" style={{ fontSize: "0.6rem", color: "rgba(217, 187, 151, 0.5)" }}>
                {mentor.designation}
              </span>
            </div>
          </div>
        ))}
      </Marquee>
      <Marquee direction="right" className="py-2" speed={15} pauseOnHover>
        {mentors.map((mentor, i) => (
          <div
            key={mentor.alt + "-r-" + i}
            className="mx-2 flex items-center gap-2 rounded-lg p-2 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(217, 187, 151, 0.08)", minWidth: "160px" }}
          >
            <div style={{ position: "relative", width: "2rem", height: "2rem", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(217, 187, 151, 0.1)" }}>
              <Image
                src={mentor.src}
                alt={mentor.alt}
                fill
                sizes="32px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-cream" style={{ fontSize: "0.75rem" }}>{mentor.name}</span>
              <span className="text-[10px] text-gray-500" style={{ fontSize: "0.6rem", color: "rgba(217, 187, 151, 0.5)" }}>
                {mentor.designation}
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dummy cursor setter to safely absorb pointer events without full custom cursor overlays
  const setCursorType = (type: string) => {};
  
  const studioRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mounted ? studioRef : undefined,
    offset: ["start end", "end start"]
  });

  // Background color interpolation for an premium page transition
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
    const animId = requestAnimationFrame(() => {
      setMounted(true);
    });
    
    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);




  const teamMembers = [
    {
      name: "Ishan Jain",
      role: "Founder",
      image: "/team/Ishan Jain - Founder.jpg"
    },
    {
      name: "Rahul",
      role: "Video Editor & Co-Founder",
      image: "/team/ rahul - video editor and cofounder.jpg"
    },
    {
      name: "Jasleen",
      role: "Manager",
      image: "/team/Jasleen - Manager.png"
    },
    {
      name: "Mohinder",
      role: "Editor",
      image: "/team/Mohinder - editor.jpg"
    },
    {
      name: "Ramit",
      role: "D.O.P.",
      image: "/team/Ramit - D.O.P.jpg"
    },
    {
      name: "Archit",
      role: "Script Writer",
      image: "/team/archit - script writing.jpg"
    },
    {
      name: "Gino",
      role: "Music Expert",
      image: "/team/gino-music expert.jpg"
    },
    {
      name: "Gaurav",
      role: "Sound Producer",
      image: "/team/gaurav-soundproducer.jpg"
    },
    {
      name: "Niemisha",
      role: "Branding Designer",
      image: "/team/niemisha - branding.jpg"
    },
    {
      name: "Omkar",
      role: "Web Developer",
      image: "/team/omkar - web dev.jpg"
    },
    {
      name: "Raghav",
      role: "UI/UX Designer",
      image: "/team/raghav - ui:ux.jpg"
    }
  ];

  const notebookNotes = [
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
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  if (!mounted) return <div style={{ background: "#0b0a0a", minHeight: "100vh" }} />;

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Premium SVG Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation Header */}
      <header className="studio-header">
        <div className="container flex-row-center-between">
          <a 
            href="#" 
            className="hover:scale-102 transition-transform duration-300"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType("default")}
          >
            <div style={{ position: "relative", width: "1.8rem", height: "2.16rem", borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(217, 187, 151, 0.15)" }}>
              <Image 
                src="/logo.jpg" 
                alt="I.J_Stories Official Monogram" 
                fill 
                sizes="35px"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
            <span className="font-syne" style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--cream)" }}>
              I.J_Stories
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links-desktop">
            <a 
              href="#philosophy" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Philosophy
            </a>
            <a 
              href="#capabilities" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Capabilities
            </a>
            <a 
              href="#notebook" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Notebook
            </a>
            <a 
              href="#gallery" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Showcase
            </a>
            <a 
              href="#team" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Team
            </a>
          </nav>

          <div className="flex-row-center-gap4">
            <a 
              href="#contact" 
              className="nav-btn-story"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Start a Story <ArrowUpRight size={14} />
            </a>

            {/* Mobile Menu Icon */}
            <button 
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--cream)" }}
              className="md:hidden hover:text-orange transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "var(--black)",
              zIndex: 90,
              paddingTop: "8rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem"
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="font-syne">
              <a 
                href="#philosophy" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Philosophy
              </a>
              <a 
                href="#capabilities" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Capabilities
              </a>
              <a 
                href="#notebook" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Notebook
              </a>
              <a 
                href="#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Showcase
              </a>
              <a 
                href="#team" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Team
              </a>
            </nav>
            <hr style={{ border: "none", borderTop: "1px solid rgba(217, 187, 151, 0.1)" }} />
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(217, 187, 151, 0.2)"
              }}
              className="hover:bg-cream hover:text-black transition-all"
            >
              <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Start a Story</span>
              <ArrowUpRight size={20} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-section section-dark">
        {/* Ambient background video */}
        <video
          src="/backgroundvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0
          }}
        />
        {/* Subtle orange ambient glow */}
        <div className="orange-glow w-[500px] h-[500px] top-[-100px] right-[-100px]" />
        <div className="orange-glow w-[600px] h-[600px] bottom-[-200px] left-[-200px]" />
        
        {/* Grid Overlay */}
        <div className="grid-bg" style={{ zIndex: 1 }} />

        <div className="container z-10 py-12">
          <div className="hero-content-wrapper">
            <div className="hero-text-block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="creative-badge">
                  <Sparkles size={12} className="animate-pulse" /> Creative Ecosystem
                </span>
              </motion.div>
              
              <h1 className="hero-title-main font-syne">
                <motion.span
                  style={{ display: "block", color: "var(--cream)" }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  I.J_Stories
                </motion.span>
                <motion.span
                  style={{ display: "block", color: "var(--orange)" }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Building Brands
                </motion.span>
                <motion.span
                  className="hero-italic-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  that feel human.
                </motion.span>
              </h1>

              <motion.p
                className="hero-description-p"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                From identity to influence. Design. Strategy. Culture. Presence. We forge modern digital landscapes that blend design, storytelling, media, and human connection.
              </motion.p>

              <motion.div
                className="hero-buttons-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a 
                  href="#contact" 
                  className="btn-primary-glow"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Collaborate With Us
                </a>
                <a 
                  href="#philosophy" 
                  className="link-hover-effect"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Our Manifesto <CornerDownRight size={16} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section (Dynamic Background Transition) */}
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
                <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 text-orange" style={{ color: "var(--orange)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1rem", display: "inline-block" }}>
                  Creative Philosophy
                </span>
                <h2 className="font-syne">
                  A multidisciplinary creative ecosystem.
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
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontWeight: 700, opacity: 0.6, marginTop: "1rem" }} className="uppercase font-syne">
                  Official Brand Seal // Established 2026
                </p>
              </div>
            </div>

            {/* Right Paragraph Column */}
            <div className="philosophy-right-content">
              <p className="lead">
                We are a creative studio focused on building modern brands through design, storytelling, strategy, and media. I.J_Stories operates alongside an extended network of creatives, strategists, filmmakers, and visual artists.
              </p>
              
              <p className="desc">
                We believe brand building is an evolutionary process. By merging rigorous visual design systems with genuine stories, we ensure every touchpoint resonates on a human level. We translate high-level strategies into emotional resonance and digital influence.
              </p>

              {/* Core Values grid */}
              <div className="core-values-grid">
                <div className="core-value-item">
                  <h4 className="font-syne" style={{ color: "var(--orange)" }}>01. Human Design</h4>
                  <p>Forging visual spaces with warmth, elegance, and intentional touchpoints.</p>
                </div>
                <div className="core-value-item">
                  <h4 className="font-syne" style={{ color: "var(--orange)" }}>02. Elite Network</h4>
                  <p>Collaborating with global filmmakers, 3D artists, and creative disruptors.</p>
                </div>
                <div className="core-value-item">
                  <h4 className="font-syne" style={{ color: "var(--orange)" }}>03. Real Presence</h4>
                  <p>Positioning brands that dominate search, social systems, and cultural narrative.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Capabilities Section */}
      {/* Elite Creative Hub Section */}
      <section id="capabilities" className="capabilities-section section-dark py-24 relative overflow-hidden">
        <div className="orange-glow w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />
        <div className="grid-bg" />

        <div className="container z-10">
          <div className="capabilities-header-block mb-12">
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
                Elite Creative Collective
              </span>
              <h2 className="font-syne text-cream" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}>
                Elite Creative Hub<span style={{ color: "var(--orange)" }}>.</span>
              </h2>
            </div>
            <p className="capabilities-header-desc" style={{ color: "rgba(217, 187, 151, 0.6)", maxWidth: "32rem", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Work alongside a handpicked collective of visual artists, filmmakers, 3D designers, and digital copywriters operating globally.
            </p>
          </div>

          {/* Mentorship Marquees Showcase */}
          <div className="w-full relative py-8 overflow-hidden rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(217, 187, 151, 0.05)" }}>
            <Mentorship />
          </div>
        </div>
      </section>

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
            {/* Gallery Item 1 */}
            <motion.div 
              className="gallery-visual-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="gallery-image-wrapper">
                <Image 
                  src="/brand_identity_mockup.png" 
                  alt="I.J_Stories Brand identity publication mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 450px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="gallery-caption-bar">
                <div>
                  <p className="gallery-caption-tag">Visual Identity</p>
                  <h4 className="gallery-caption-title font-syne">Minimalist brand book</h4>
                </div>
                <ArrowUpRight size={18} style={{ color: "rgba(217, 187, 151, 0.6)" }} />
              </div>
            </motion.div>

            {/* Gallery Item 2 */}
            <motion.div 
              className="gallery-visual-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="gallery-image-wrapper">
                <Image 
                  src="/creative_direction_portrait.png" 
                  alt="I.J_Stories Creative Studio Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 450px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="gallery-caption-bar">
                <div>
                  <p className="gallery-caption-tag">Creative Direction</p>
                  <h4 className="gallery-caption-title font-syne">Human-centric campaign</h4>
                </div>
                <ArrowUpRight size={18} style={{ color: "rgba(217, 187, 151, 0.6)" }} />
              </div>
            </motion.div>

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
                  href="#contact" 
                  className="btn-widget-launch"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Start Project <Plus size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Interactive Portrait Grid) */}
      <section id="team" className="team-section section-dark py-24 relative overflow-hidden">
        <div className="orange-glow w-[500px] h-[500px] bottom-[-100px] left-[-100px]" />
        <div className="grid-bg" />

        <div className="container z-10">
          <div className="showcase-header" style={{ marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
              The Team
            </span>
            <h2 className="font-syne text-cream">
              Meet the minds shaping your narrative
            </h2>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="team-image-wrapper">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="team-image"
                  />
                  <div className="team-overlay-glow" />
                </div>
                <div className="team-info">
                  <h3 className="team-name font-syne">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notebook Section (Interactive Creative Notebook Grid) */}
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
              {notebookNotes.map((note, index) => (
                <button
                  key={note.id}
                  className={`notebook-note-btn ${activeNote === index ? "active" : ""}`}
                  onClick={() => setActiveNote(index)}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
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
                    {notebookNotes[activeNote].title}
                  </h4>

                  <p style={{ color: "#1c1917", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.6, marginBottom: "2rem" }}>
                    {notebookNotes[activeNote].snippet}
                  </p>
                </div>

                <div style={{ backgroundColor: "#edd8c4", borderLeft: "4px solid var(--orange)", padding: "1.25rem", borderRadius: "0 0.5rem 0.5rem 0", marginTop: "auto" }}>
                  <p className="font-syne italic" style={{ fontWeight: 700, color: "var(--black)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {notebookNotes[activeNote].quote}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Network / Collaborator Section */}
      <section className="collab-section section-dark">
        <div className="container z-10">
          <div className="collab-outer-card">
            {/* Orange glowing flare */}
            <div className="orange-glow w-[300px] h-[300px] top-[-50px] right-[-50px]" />
            
            <div className="collab-text-col">
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
                The Creative Network
              </span>
              <h2 className="font-syne text-cream" style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
                Operating without borders.
              </h2>
              <p style={{ color: "rgba(217, 187, 151, 0.7)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.6 }}>
                I.J_Stories functions as a core multidisciplinary team operating alongside an elite distributed network of filmmakers, strategists, developers, 3D artists, and physical space designers. This allows us to scale fluidly from tight conceptual brand sprints to multi-million dollar global launch campaigns.
              </p>
            </div>

            <div className="collab-grid-col">
              {[
                { label: "Core Hub", value: "Creative Strategy" },
                { label: "Visual Artists", value: "3D & Motion design" },
                { label: "Filmmakers", value: "Cinematography" },
                { label: "Engineers", value: "Next.js & Digital Platforms" }
              ].map((item, idx) => (
                <div key={idx} className="collab-item-node">
                  <p style={{ fontSize: "10px", color: "var(--orange)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">{item.label}</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }} className="font-syne">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-dark">
        <div className="orange-glow w-[500px] h-[500px] bottom-[-200px] right-[-100px]" />
        <div className="grid-bg" />

        <div className="container z-10">
          <div className="contact-grid-layout">
            
            {/* Contact Details */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
                  Let&apos;s Begin
                </span>
                <h2 className="font-syne text-cream" style={{ fontSize: "3.5rem", fontWeight: 800 }}>
                  Let&apos;s build a brand that feels human<span style={{ color: "var(--orange)" }}>.</span>
                </h2>
                <p style={{ color: "rgba(217, 187, 151, 0.7)", fontWeight: 300, lineHeight: 1.6, marginTop: "1.5rem", fontSize: "1rem", maxWidth: "26rem" }}>
                  Have a vision? Need a complete rebrand, dynamic motion strategy, or custom photographic direction? Get in touch. Our ecosystem is ready.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "2rem", marginTop: "2rem", borderTop: "1px solid rgba(217, 187, 151, 0.1)" }}>
                <div>
                  <p style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.4)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Send a Message</p>
                  <a href="mailto:hello@ijstories.com" className="font-syne text-cream hover:text-orange transition-colors" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                    hello@ijstories.com
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.4)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Ecosystem Hub</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--cream)" }}>
                    Mumbai • New York • London • Berlin
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Form */}
            <div>
              <div className="contact-form-card">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="contact-form"
                      onSubmit={handleContactSubmit} 
                      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="contact-row-2col">
                        <div className="form-group-flex">
                          <label htmlFor="name" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                            Your Name
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            required 
                            className="form-input-studio"
                            placeholder="Alex Mercer"
                          />
                        </div>
                        <div className="form-group-flex">
                          <label htmlFor="email" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            required 
                            className="form-input-studio"
                            placeholder="alex@domain.com"
                          />
                        </div>
                      </div>

                      <div className="form-group-flex">
                        <label htmlFor="interest" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                          What can we build together?
                        </label>
                        <select 
                          id="interest" 
                          className="form-input-studio"
                          style={{ appearance: "none", cursor: "pointer" }}
                        >
                          <option value="brand-identity">Brand Identity & Visuals</option>
                          <option value="creative-direction">Creative Direction & Campaigns</option>
                          <option value="photography-3d">Photography, Video & 3D</option>
                          <option value="full-rebrand">Complete Brand Overhaul</option>
                          <option value="other">Other Creative Collaboration</option>
                        </select>
                      </div>

                      <div className="form-group-flex">
                        <label htmlFor="message" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                          Your Vision
                        </label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          required 
                          className="form-input-studio"
                          style={{ resize: "none" }}
                          placeholder="Tell us about your brand philosophy, goals, and visual aesthetic..."
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn-submit-studio"
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        Transmit Vision <Send size={12} />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-message"
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", textAlign: "center" }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "rgba(179, 74, 38, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)", marginBottom: "1.5rem" }}>
                        <CheckCircle size={36} />
                      </div>
                      <h3 className="font-syne text-cream" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Vision Transmitted Successfully</h3>
                      <p style={{ color: "rgba(217, 187, 151, 0.6)", fontWeight: 300, fontSize: "0.85rem", maxWidth: "22rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                        Thank you. Your message has bypassed traditional channels and entered the I.J_Stories creative grid. A director will connect with you soon.
                      </p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        style={{ border: "none", background: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em" }}
                        className="uppercase link-hover-effect"
                      >
                        Send another transmission
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Studio Footer */}
      <footer style={{ padding: "4rem 0", backgroundColor: "#070606", borderTop: "1px solid rgba(217, 187, 151, 0.05)", color: "rgba(217, 187, 151, 0.4)", fontSize: "0.85rem", fontWeight: 300 }}>
        <div className="container">
          <div className="footer-grid-layout">
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ position: "relative", width: "3.2rem", aspectRatio: "1/1.2", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(217, 187, 151, 0.1)" }}>
                <Image 
                  src="/logo.jpg" 
                  alt="I.J_Stories Official Monogram" 
                  fill 
                  sizes="52px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h4 className="font-syne text-cream" style={{ fontSize: "1.25rem", fontWeight: 700 }}>I.J_Stories</h4>
              <p style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                A multidisciplinary creative ecosystem building modern brands that feel human. Designed for global impact.
              </p>
            </div>

            <div>
              <h5 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.1em", marginBottom: "1.25rem" }} className="uppercase">Navigations</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
                <a href="#philosophy" className="hover:text-orange">Our Philosophy</a>
                <a href="#capabilities" className="hover:text-orange">Capabilities</a>
                <a href="#notebook" className="hover:text-orange">Creative Notebook</a>
                <a href="#gallery" className="hover:text-orange">Visual Showcase</a>
              </div>
            </div>

            <div>
              <h5 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.1em", marginBottom: "1.25rem" }} className="uppercase">Core Ecosystem</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
                <p>Identity & Design</p>
                <p>Film & Photography</p>
                <p>3D Spatial Media</p>
                <p>Founder Branding</p>
              </div>
            </div>

            <div>
              <h5 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.1em", marginBottom: "1.25rem" }} className="uppercase">Channels</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange">Twitter (X)</a>
                <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-orange">Behance</a>
              </div>
            </div>

          </div>

          <div className="footer-bottom-flex">
            <p>© {new Date().getFullYear()} I.J_Stories Studio Network. All rights reserved.</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="#" className="hover:text-orange">Privacy Policy</a>
              <a href="#" className="hover:text-orange">Terms of Service</a>
              <p style={{ color: "var(--orange)" }}>Designed for Human Sensation</p>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
}

// ==========================================
// COOKIE CONSENT COMPONENTS (OGILVY INSPIRED)
// ==========================================

const CookieToggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
  return (
    <div 
      onClick={onChange}
      style={{
        width: "2.2rem",
        height: "1.1rem",
        borderRadius: "9999px",
        backgroundColor: checked ? "var(--orange)" : "rgba(217, 187, 151, 0.1)",
        border: "1px solid rgba(217, 187, 151, 0.15)",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        transition: "background-color 0.3s ease"
      }}
    >
      <motion.div 
        layout
        style={{
          width: "0.8rem",
          height: "0.8rem",
          borderRadius: "50%",
          backgroundColor: checked ? "#fff" : "rgba(217, 187, 151, 0.5)",
        }}
        animate={{
          x: checked ? "1.1rem" : "0rem"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [performanceCookies, setPerformanceCookies] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("ijstories-cookie-preference");
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("ijstories-cookie-preference", JSON.stringify({
      necessary: true,
      functional: true,
      performance: true
    }));
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("ijstories-cookie-preference", JSON.stringify({
      necessary: true,
      functional: functionalCookies,
      performance: performanceCookies
    }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "min(380px, 90vw)",
            backgroundColor: "rgba(11, 10, 10, 0.92)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(217, 187, 151, 0.15)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            zIndex: 99999,
            color: "var(--cream)",
          }}
          className="shadow-2xl"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--orange)" }} />
              <h4 className="font-syne" style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                Our use of cookies
              </h4>
            </div>

            {/* Content view toggle */}
            {!showSettings ? (
              <>
                <p style={{ fontSize: "0.75rem", color: "rgba(217, 187, 151, 0.75)", lineHeight: 1.5, fontWeight: 300 }}>
                  I.J_Stories uses cookies, some are necessary for the operation of the website and some are designed to improve your experience. For more information,{" "}
                  <button 
                    onClick={() => setShowSettings(true)}
                    style={{ background: "none", border: "none", color: "var(--orange)", padding: 0, cursor: "pointer", textDecoration: "underline", fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    click here
                  </button>.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button 
                    onClick={() => setShowSettings(true)}
                    style={{
                      flex: 1,
                      padding: "0.55rem",
                      borderRadius: "6px",
                      border: "1px solid rgba(217, 187, 151, 0.15)",
                      backgroundColor: "transparent",
                      color: "var(--cream)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    className="hover:bg-[rgba(217,187,151,0.05)]"
                  >
                    Manage Settings
                  </button>
                  <button 
                    onClick={handleAcceptAll}
                    style={{
                      flex: 1,
                      padding: "0.55rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "var(--orange)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    className="hover:opacity-90"
                  >
                    Accept All
                  </button>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ display: "flex", flexDirection: "column", gap: "1rem", overflow: "hidden" }}
              >
                <hr style={{ border: "none", borderTop: "1px solid rgba(217, 187, 151, 0.1)" }} />
                
                {/* Accordion Lists */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  
                  {/* Necessary cookies */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }}>Necessary cookies</span>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--orange)" }} className="uppercase">Always Active</span>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(217, 187, 151, 0.55)", lineHeight: 1.45, fontWeight: 300 }}>
                      Are essential to move around I.J_Stories and use its core functionality and enhanced features. Without these cookies, services you have asked for cannot be provided.
                    </p>
                  </div>

                  {/* Functional cookies */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }}>Functional cookies</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.65rem", color: "rgba(217, 187, 151, 0.5)", textTransform: "uppercase" }}>{functionalCookies ? "On" : "Off"}</span>
                        <CookieToggle checked={functionalCookies} onChange={() => setFunctionalCookies(!functionalCookies)} />
                      </div>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(217, 187, 151, 0.55)", lineHeight: 1.45, fontWeight: 300 }}>
                      Allow I.J_Stories to remember choices you make to give you better functionality and personal features.
                    </p>
                  </div>

                  {/* Performance cookies */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }}>Performance cookies</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.65rem", color: "rgba(217, 187, 151, 0.5)", textTransform: "uppercase" }}>{performanceCookies ? "On" : "Off"}</span>
                        <CookieToggle checked={performanceCookies} onChange={() => setPerformanceCookies(!performanceCookies)} />
                      </div>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(217, 187, 151, 0.55)", lineHeight: 1.45, fontWeight: 300 }}>
                      Help improve the performance of I.J_Stories by collecting and reporting information about how you use the website.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button 
                    onClick={() => setShowSettings(false)}
                    style={{
                      padding: "0.55rem 1rem",
                      borderRadius: "6px",
                      border: "1px solid rgba(217, 187, 151, 0.15)",
                      backgroundColor: "transparent",
                      color: "var(--cream)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                    className="hover:bg-[rgba(217,187,151,0.05)]"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSavePreferences}
                    style={{
                      flex: 1,
                      padding: "0.55rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "var(--orange)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                    className="hover:opacity-90"
                  >
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
