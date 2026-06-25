"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

interface SlideData {
  title: string;
  tag?: string;
  button: string;
  src: string;
  href?: string;
  aspectRatio?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  handleSlideClick: (index: number) => void;
  itemsPerView: number;
}

const Slide = ({ slide, index, handleSlideClick, itemsPerView }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, tag, href, aspectRatio } = slide;
  
  // Convert aspect ratio from "W:H" to CSS "W/H"
  const cssAspectRatio = aspectRatio ? aspectRatio.replace(":", " / ") : "4 / 3";

  // Flex basis calculation to fit exactly itemsPerView with a gap of 1.5rem (24px)
  const flexBasisStyle = {
    flex: `0 0 calc(${100 / itemsPerView}% - ${(1.5 * (itemsPerView - 1)) / itemsPerView}rem)`,
    aspectRatio: cssAspectRatio,
  };

  const cardContent = (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#1D1F2F] border border-[rgba(217,187,151,0.08)] group/card transition-all duration-300">
      {/* 3D tilt image container */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-150 ease-out"
        style={{
          transform: isHovered
            ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0) scale(1.05)"
            : "none",
        }}
      >
        {src.toLowerCase().match(/\.(mp4|webm|ogg|mov|m4v)(\?|$)/) ? (
          <video
            src={src}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity duration-500"
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-all duration-700 ease-in-out"
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="lazy"
          />
        )}
        {/* Rich dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 group-hover/card:from-black/95" />
      </div>

      {/* Card Text Content & Action */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-left">
        {tag && (
          <span className="text-[9px] font-bold tracking-widest text-[var(--orange)] uppercase mb-2 block">
            {tag}
          </span>
        )}
        <h3 className="font-syne text-base md:text-lg font-bold text-white leading-tight mb-2 transition-transform duration-300 group-hover/card:-translate-y-1">
          {title}
        </h3>
        
        {/* Animated explore button */}
        <div className="overflow-hidden h-8 transition-all duration-300 opacity-80 group-hover/card:opacity-100">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold text-cream border-b border-[rgba(217,187,151,0.3)] pb-0.5 transition-all duration-300 group-hover/card:border-[var(--orange)] group-hover/card:text-[var(--orange)] transform translate-y-2 group-hover/card:translate-y-0">
            {button} <IconArrowNarrowRight size={12} className="transition-transform duration-300 group-hover/card:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d] flex shrink-0" style={flexBasisStyle}>
      <li
        ref={slideRef}
        className="w-full h-full list-none relative transition-all duration-500 ease-out z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform: isHovered
            ? "scale(1.02) rotateX(4deg) rotateY(-2deg)"
            : "scale(1) rotateX(0deg) rotateY(0deg)",
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          transformOrigin: "center bottom",
        }}
      >
        {href ? (
          <Link href={href} className="block w-full h-full">
            {cardContent}
          </Link>
        ) : (
          <div className="w-full h-full cursor-pointer">
            {cardContent}
          </div>
        )}
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  disabled?: boolean;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  disabled,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-11 h-11 flex items-center justify-center bg-black/40 border border-[rgba(217,187,151,0.15)] rounded-full focus:outline-none hover:border-[var(--orange)] hover:bg-[#b34a26]/10 active:scale-95 transition duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[rgba(217,187,151,0.15)] disabled:hover:bg-transparent`}
      title={title}
      onClick={handleClick}
      disabled={disabled}
    >
      <IconArrowNarrowRight className={`text-cream hover:text-[var(--orange)] transition-colors duration-300 ${
        type === "previous" ? "rotate-180" : ""
      }`} />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const id = useId();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, slides.length - itemsPerView);

  // If itemsPerView changes, adjust current index to be within bounds
  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [itemsPerView, maxIndex, current]);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const handleSlideClick = (index: number) => {
    // We can focus or do nothing on click since we have links
  };

  return (
    <div
      className="relative w-full mx-auto px-4 md:px-12"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <div className="relative w-full overflow-hidden py-4">
        <ul
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            gap: "1.5rem",
            transform: `translateX(calc(-${current} * (100% + 1.5rem) / ${itemsPerView}))`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              handleSlideClick={handleSlideClick}
              itemsPerView={itemsPerView}
            />
          ))}
        </ul>
      </div>

      <div className="flex justify-center gap-4 w-full mt-8 z-20">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
          disabled={slides.length <= itemsPerView}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
          disabled={slides.length <= itemsPerView}
        />
      </div>
    </div>
  );
}
