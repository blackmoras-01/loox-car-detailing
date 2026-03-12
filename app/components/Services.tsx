"use client";

import { motion } from "framer-motion";
import { ArrowRight, Minus } from "lucide-react";
import { Lang, content } from "../utils/content";

interface ServicesProps {
  lang: Lang;
}

const SERVICE_IMAGES = ["/wash.png", "/interior.png"];

export default function Services({ lang }: ServicesProps) {
  const t = content[lang].services;

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            {t.badge}
          </p>
          <h2 className="text-4xl font-bold text-black tracking-tighter font-heading">
            {t.heading}
          </h2>
        </motion.div>

        {/* ── Best Seller: Full Package — dark industrial card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mb-6 overflow-hidden bg-slate-950"
        >
          {/* Background image overlay */}
          <div className="absolute inset-0">
            <img
              src="/detail.png"
              alt="Full detailing"
              className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
            />
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white" />

          <div className="relative z-10 p-8 sm:p-10 grid md:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  ★ {t.bestSellerLabel}
                </span>
                <span className="border border-slate-600 text-slate-400 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  {t.featured.tag}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white tracking-tighter font-heading leading-tight">
                  {t.featured.title}
                </h3>
                <p className="text-slate-400 mt-3 leading-relaxed text-sm">
                  {t.featured.desc}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-white tracking-tighter font-heading">
                  {t.featured.price}
                </p>
                <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">
                  {t.from}
                </p>
              </div>

              <button
                onClick={scrollToBooking}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-colors duration-200 w-fit"
              >
                {t.learnMore}
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Right: feature list — sharp rectangular chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {t.featured.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border border-slate-700 px-4 py-3"
                >
                  <Minus size={12} className="text-slate-500 flex-shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Standard Cards ── */}
        <div className="grid md:grid-cols-2 gap-0 border border-slate-200">
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`bg-white overflow-hidden group ${
                i === 0 ? "border-r border-slate-200" : ""
              }`}
            >
              {/* Image — no border radius */}
              <div className="h-52 overflow-hidden relative">
                <img
                  src={SERVICE_IMAGES[i]}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Tag — sharp rectangular flag */}
                <span className="absolute top-0 left-0 bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                  {card.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-7 border-t border-slate-200">
                <div className="flex items-start justify-between mb-5">
                  <h3 className="text-xl font-bold text-black tracking-tighter font-heading leading-tight">
                    {card.title}
                  </h3>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      {t.from}
                    </p>
                    <p className="text-2xl font-bold text-black tracking-tighter font-heading">
                      {card.price}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                  {card.desc}
                </p>

                <ul className="space-y-2 mb-7">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-slate-700 text-sm"
                    >
                      <Minus size={12} className="text-slate-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToBooking}
                  className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all duration-200 group/btn border-b border-black pb-0.5"
                >
                  {t.learnMore}
                  <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
