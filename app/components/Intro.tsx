"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Lang, content } from "../utils/content";

interface IntroProps {
  lang: Lang;
}

export default function Intro({ lang }: IntroProps) {
  const t = content[lang].intro;

  return (
    <section id="intro" className="bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left — image, sharp edges */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[400px] sm:h-[480px] order-2 lg:order-1"
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src="/detail.png"
                alt="Loox detailing – precision work"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Sharp corner accent line */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-slate-900 -z-10" />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-6 order-1 lg:order-2"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {t.badge}
            </p>

            <h2 className="text-4xl font-bold text-black leading-tight tracking-tighter font-heading">
              {t.heading}
            </h2>

            <p className="text-slate-600 leading-relaxed text-base">
              {t.body}
            </p>

            <p className="text-black font-bold text-base border-l-2 border-slate-900 pl-4 uppercase tracking-wide text-sm">
              {t.body2}
            </p>

            <div className="flex flex-col gap-3 pt-2">
              {t.checks.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-slate-800 text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
