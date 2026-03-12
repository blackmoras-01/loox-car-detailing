"use client";

import { motion } from "framer-motion";
import { Lang, content } from "../utils/content";

interface GalleryProps {
  lang: Lang;
}

const galleryItems = [
  { src: "/gallery-1.png", alt: "VW Golf R after detailing", cols: "col-span-2", rows: "row-span-1" },
  { src: "/gallery-2.png", alt: "Mercedes C63 detailing", cols: "col-span-1", rows: "row-span-1" },
  { src: "/wash.png", alt: "Exterior wash treatment", cols: "col-span-1", rows: "row-span-1" },
  { src: "/detail.png", alt: "Premium polish work", cols: "col-span-1", rows: "row-span-1" },
  { src: "/hero.png", alt: "Professional detailing process", cols: "col-span-2", rows: "row-span-1" },
];

export default function Gallery({ lang }: GalleryProps) {
  const t = content[lang].gallery;

  return (
    <section id="gallery" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            {t.badge}
          </p>
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-4xl font-bold text-black tracking-tighter font-heading">
              {t.heading}
            </h2>
            <p className="text-slate-500 text-sm max-w-xs text-right hidden sm:block">
              {t.sub}
            </p>
          </div>
        </motion.div>

        {/* Sharp mosaic grid — gap-px creates 1px dividing lines */}
        <div className="grid grid-cols-3 gap-px bg-slate-900">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`${item.cols} h-64 overflow-hidden group cursor-pointer bg-white`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile sub text */}
        <p className="text-slate-500 text-sm mt-6 sm:hidden">{t.sub}</p>
      </div>
    </section>
  );
}
