import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { getCachedDb } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creative Notebook & Stories | I.J_Stories",
  description: "Explore our multidisciplinary notebook containing thoughts, strategic design frameworks, and philosophical brand essays.",
};

export default async function BlogListingPage() {
  const db = await getCachedDb();
  const posts = db.blogPosts || [];

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a] text-[#d9bb97]">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Ambient glow */}
      <div className="orange-glow w-[500px] h-[500px] top-[-100px] right-[-100px]" />
      <div className="orange-glow w-[600px] h-[600px] bottom-[-200px] left-[-200px]" />
      <div className="grid-bg" />

      <Header />

      {/* Nav clearance */}
      <div className="pt-32" />

      <main className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        
        {/* Header Block */}
        <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
          <span className="creative-badge inline-flex items-center gap-1.5 mx-auto">
            <Sparkles size={12} className="animate-pulse" /> Notebook & Essays
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-syne text-cream tracking-tight leading-none mt-2">
            The Stories Grid
          </h1>
          <p className="text-sm sm:text-base text-[rgba(217,187,151,0.6)] font-light leading-relaxed max-w-2xl mx-auto">
            A multidisciplinary canvas of strategic manifestos, cultural ideas, and brand design philosophies written by our core ecosystem network.
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[rgba(217,187,151,0.15)] rounded-2xl max-w-md mx-auto bg-black/10">
            <BookOpen size={36} className="mx-auto text-[rgba(217,187,151,0.2)] mb-3" />
            <p className="text-sm text-[rgba(217,187,151,0.5)]">No essays have entered the grid yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="group border border-[rgba(217,187,151,0.06)] bg-[#121111]/70 rounded-2xl overflow-hidden hover:border-[#b34a26]/40 transition-all flex flex-col justify-between"
                style={{ 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <Link href={`/blog/${post.id}`} className="block overflow-hidden relative aspect-video bg-neutral-900 border-b border-[rgba(217,187,151,0.04)]">
                  <Image
                    src={post.image || "/brand_identity_mockup.png"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-700 group-hover:scale-103"
                  />
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold tracking-wider">
                      <span className="text-[#b34a26] uppercase bg-[rgba(179,74,38,0.1)] px-2.5 py-0.5 rounded-full border border-[rgba(179,74,38,0.2)]">
                        {post.tag}
                      </span>
                      <span className="text-[rgba(217,187,151,0.45)] font-mono">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold font-syne text-cream line-clamp-2 leading-snug group-hover:text-white transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-[rgba(217,187,151,0.6)] font-light leading-relaxed line-clamp-3">
                      {post.snippet}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(217,187,151,0.05)]">
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#b34a26] group-hover:text-[#9a3d1f] transition-all"
                      id={`read-more-${post.id}`}
                    >
                      Read full essay <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
