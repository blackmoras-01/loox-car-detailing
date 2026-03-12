"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Lang, content } from "../utils/content";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks: Array<[keyof typeof t, string]> = [
    ["about", "intro"],
    ["services", "services"],
    ["gallery", "gallery"],
    ["booking", "booking"],
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "border-b border-slate-900" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <Image
              src="/loox-logo.png"
              alt="Loox Car Detailing"
              width={110}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(([key, id]) => (
              <button
                key={key}
                onClick={() => scrollTo(id)}
                className="text-slate-500 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors duration-200"
              >
                {t[key]}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language toggle — sharp rectangular */}
            <div className="flex items-center border border-slate-300">
              {(["NL", "EN"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-150 ${
                    lang === l
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <button
              onClick={() => scrollTo("booking")}
              className="hidden md:flex items-center bg-black text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors duration-200"
            >
              {t.cta}
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-slate-900 hover:text-black transition-colors p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b-2 border-slate-900 px-5 py-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map(([key, id]) => (
              <button
                key={key}
                onClick={() => scrollTo(id)}
                className="text-slate-700 text-xs font-bold uppercase tracking-widest text-left hover:text-black transition-colors"
              >
                {t[key]}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              {t.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
