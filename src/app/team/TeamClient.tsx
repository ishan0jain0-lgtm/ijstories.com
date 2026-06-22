"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function TeamClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  return (
    <div className="team-grid">
      {initialMembers.map((member, idx) => (
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
              src={getImageUrl(member.image)}
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
  );
}
