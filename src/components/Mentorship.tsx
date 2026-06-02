"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Mentorship() {
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
}
