"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Instagram, Facebook, Phone, Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Lang, content } from "../utils/content";

interface LocationFooterProps {
  lang: Lang;
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
    </svg>
  );
}

export default function LocationFooter({ lang }: LocationFooterProps) {
  const t = content[lang].footer;

  return (
    <footer id="location" className="bg-slate-950 text-white">
      {/* Location section */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24">

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
          <h2 className="text-4xl font-bold text-white tracking-tighter font-heading">
            {t.heading}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* Google Maps embed — sharp edges */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="h-80 overflow-hidden border border-slate-700"
          >
            <iframe
              src="https://maps.google.com/maps?q=Ohmstraat%2C+5621+CW+Eindhoven%2C+Netherlands&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) brightness(0.7) contrast(1.2)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Loox Car Detailing – Ohmstraat Eindhoven"
            />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-slate-700 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-slate-400" />
              </div>
              <div className="pt-0.5">
                <p className="font-bold text-white mb-1 text-base tracking-tight">
                  {t.address}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t.directions}
                </p>
                <a
                  href="https://maps.google.com/maps?q=Ohmstraat,5621+CW+Eindhoven,Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest mt-2 transition-colors"
                >
                  Google Maps
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>

            {/* Opening hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-slate-700 flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-slate-400" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="font-bold text-white mb-3 text-xs uppercase tracking-widest">
                  {t.hours}
                </p>
                <div className="space-y-2 border-l border-slate-700 pl-4">
                  {t.hoursData.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-400">{h.day}</span>
                      <span className="text-white font-bold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col sm:flex-row gap-5 border-t border-slate-800 pt-6">
              <a
                href={`tel:${t.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                <Phone size={14} className="flex-shrink-0" />
                {t.phone}
              </a>
              <a
                href={`mailto:${t.email}`}
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                <Mail size={14} className="flex-shrink-0" />
                {t.email}
              </a>
            </div>

            {/* Social links — sharp squares */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                {t.follow}
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/loox.detailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-white hover:text-white transition-colors duration-200"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-white hover:text-white transition-colors duration-200"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@loox.car.detailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-white hover:text-white transition-colors duration-200"
                >
                  <TikTokIcon size={15} />
                </a>
              </div>
              <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest font-bold">
                @loox.car.detailing · 160+ followers
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600 text-xs font-bold uppercase tracking-widest">
          <p>
            © {new Date().getFullYear()} Loox Car Detailing — {t.rights}
          </p>
          <Image
            src="/loox-logo.png"
            alt="Loox"
            width={72}
            height={24}
            className="h-5 w-auto opacity-15 brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
}
