"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function TeamPage() {
  const [teamMembersState, setTeamMembersState] = useState<TeamMember[]>([
    { name: "Ishan Jain", role: "Founder", image: "/team/Ishan Jain - Founder.jpg" },
    { name: "Rahul", role: "Video Editor & Co-Founder", image: "/team/ rahul - video editor and cofounder.jpg" },
    { name: "Jasleen", role: "Manager", image: "/team/Jasleen - Manager.png" }
  ]);

  useEffect(() => {
    fetch("/api/content")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Content API failed");
      })
      .then(data => {
        if (data.teamMembers) setTeamMembersState(data.teamMembers);
      })
      .catch(err => console.log("Note: Running with default team members fallback.", err));
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Header />

      {/* Spacing for Nav clearance */}
      <div className="pt-24" />

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
            {teamMembersState.map((member, idx) => (
              <motion.div
                key={member.name + "-" + idx}
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

      <Footer />
    </div>
  );
}
