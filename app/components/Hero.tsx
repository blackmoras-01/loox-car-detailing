"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Lang, content } from "../utils/content";

interface HeroProps {
  lang: Lang;
}

export default function Hero({ lang }: HeroProps) {
  const t = content[lang].hero;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-16 bg-white flex items-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center py-14 lg:py-0 min-h-[calc(100vh-4rem)]">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7 lg:py-16"
          >
            {/* Eyebrow label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              {t.badge}
            </motion.p>

            {/* Heading */}
            <div className="flex flex-col gap-0">
              <h1 className="text-[2.75rem] sm:text-5xl lg:text-6xl font-bold text-black leading-[1.05] tracking-tighter font-heading">
                {t.heading1}
              </h1>
              <h1 className="text-[2.75rem] sm:text-5xl lg:text-6xl font-bold text-black leading-[1.05] tracking-tighter font-heading">
                {t.heading2}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base text-slate-600 leading-relaxed max-w-md">
              {t.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("booking")}
                className="bg-black text-white px-8 py-3.5 font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-colors duration-200"
              >
                {t.cta}
              </button>
              <button
                onClick={() => scrollTo("intro")}
                className="flex items-center gap-2 border border-black text-black px-6 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors duration-200"
              >
                {t.scroll}
                <ArrowDown size={14} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-stretch gap-0 pt-2 border-t border-slate-200">
              {t.stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex-1 py-4 ${i > 0 ? "border-l border-slate-200 pl-6" : "pr-6"}`}
                >
                  <p className="font-bold text-black text-2xl tracking-tighter font-heading">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — image, sharp rectangle */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative h-[420px] sm:h-[520px] lg:h-[600px]"
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src="/hero.png"
                alt="Premium car detailing in action"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sharp floating review tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="absolute -bottom-0 -left-0 bg-black text-white px-5 py-4 flex items-center gap-4"
            >
              <div className="flex flex-col">
                <p className="font-bold text-white text-sm leading-tight tracking-tight">
                  Top-rated in Eindhoven
                </p>
                <p className="text-slate-400 text-xs mt-0.5 uppercase tracking-widest font-bold">
                  5.0 · Google Reviews
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-400 flex-shrink-0" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
