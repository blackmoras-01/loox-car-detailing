"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Lang, content } from "../utils/content";

interface BookingCalendarProps {
  lang: Lang;
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00",
];

const UNAVAILABLE = new Set(["10:00", "13:00"]);

function buildDates(startOffset = 0) {
  const today = new Date();
  const dates: Date[] = [];
  const day = new Date(today);
  day.setDate(today.getDate() + startOffset);
  while (dates.length < 7) {
    dates.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return dates;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
}

export default function BookingCalendar({ lang }: BookingCalendarProps) {
  const t = content[lang].booking;

  const [weekOffset, setWeekOffset] = useState(0);
  const dates = buildDates(weekOffset * 7);

  const [activeDateIdx, setActiveDateIdx] = useState<number>(0);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [confirmed, setConfirmed] = useState(false);

  const activeDate = dates[activeDateIdx];

  const isFormValid =
    form.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.trim().length > 6;

  const canConfirm = !!activeSlot && isFormValid;

  const handleDateSelect = (idx: number) => {
    setActiveDateIdx(idx);
    setActiveSlot(null);
  };

  const handleField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleBlur = (key: keyof FormState) => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const handleConfirm = () => {
    if (!canConfirm) {
      setTouched({ name: true, email: true, phone: true });
      return;
    }
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setActiveSlot(null);
      setActiveDateIdx(0);
      setForm({ name: "", email: "", phone: "" });
      setTouched({});
    }, 5000);
  };

  const dayLabel = (d: Date) => {
    if (lang === "NL") {
      return ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"][d.getDay()];
    }
    return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][d.getDay()];
  };

  const monthYear = activeDate.toLocaleDateString(
    lang === "NL" ? "nl-NL" : "en-GB",
    { month: "long", year: "numeric" }
  );

  const fullDateLabel = activeDate.toLocaleDateString(
    lang === "NL" ? "nl-NL" : "en-GB",
    { weekday: "long", day: "numeric", month: "long" }
  );

  const inputBase =
    "w-full px-4 py-3 border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-150 bg-white focus:border-slate-900";

  const fieldError = (key: keyof FormState) => {
    if (!touched[key]) return false;
    if (key === "name") return form.name.trim().length < 2;
    if (key === "email") return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (key === "phone") return form.phone.trim().length < 7;
    return false;
  };

  return (
    <section id="booking" className="bg-slate-50 py-24">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            {t.badge}
          </p>
          <h2 className="text-4xl font-bold text-black tracking-tighter font-heading mb-4">
            {t.heading}
          </h2>
          <p className="text-slate-600 max-w-lg">{t.sub}</p>
        </motion.div>

        {/* Calendar card — wireframe border, no shadow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.1 }}
          className="bg-white border-2 border-slate-900"
        >
          {/* Card header bar */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-slate-900" />
              <div>
                <p className="font-bold text-slate-900 text-sm capitalize tracking-tight">
                  {monthYear}
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                  {t.selectDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-0 border border-slate-300">
              <button
                onClick={() => {
                  if (weekOffset > 0) {
                    setWeekOffset((w) => w - 1);
                    setActiveDateIdx(0);
                    setActiveSlot(null);
                  }
                }}
                disabled={weekOffset === 0}
                className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-25 disabled:cursor-not-allowed transition-colors border-r border-slate-300"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => {
                  setWeekOffset((w) => w + 1);
                  setActiveDateIdx(0);
                  setActiveSlot(null);
                }}
                className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="p-7 sm:p-9">
            {/* Date row — sharp square buttons */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 mb-8">
              {dates.map((date, i) => (
                <button
                  key={i}
                  onClick={() => handleDateSelect(i)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center gap-0.5 w-[4rem] h-[4rem] font-medium transition-colors duration-150 ${
                    activeDateIdx === i
                      ? "bg-black text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">
                    {dayLabel(date)}
                  </span>
                  <span className="text-xl font-bold leading-none tracking-tighter">
                    {date.getDate()}
                  </span>
                </button>
              ))}
            </div>

            {/* Time slots */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} className="text-slate-500" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {t.selectTime}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {TIME_SLOTS.map((slot) => {
                  const isUnavailable = UNAVAILABLE.has(slot);
                  const isActive = activeSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      disabled={isUnavailable}
                      onClick={() =>
                        !isUnavailable && setActiveSlot(isActive ? null : slot)
                      }
                      whileTap={!isUnavailable ? { scale: 0.97 } : {}}
                      className={`py-3 text-sm font-bold transition-colors duration-150 ${
                        isUnavailable
                          ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                          : isActive
                          ? "bg-black text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {isUnavailable ? (
                        <span className="line-through opacity-40">{slot}</span>
                      ) : (
                        slot
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-slate-900 mb-7" />

            {/* Contact form fields */}
            <div className="flex flex-col gap-5 mb-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  <User size={11} />
                  {t.form.name}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleField("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder={t.form.namePlaceholder}
                  className={`${inputBase} ${
                    fieldError("name") ? "border-red-500" : ""
                  }`}
                />
                {fieldError("name") && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {lang === "NL" ? "Vul uw naam in" : "Please enter your name"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  <Mail size={11} />
                  {t.form.email}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleField("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder={t.form.emailPlaceholder}
                  className={`${inputBase} ${
                    fieldError("email") ? "border-red-500" : ""
                  }`}
                />
                {fieldError("email") && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {lang === "NL"
                      ? "Vul een geldig e-mailadres in"
                      : "Please enter a valid email"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  <Phone size={11} />
                  {t.form.phone}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleField("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  placeholder={t.form.phonePlaceholder}
                  className={`${inputBase} ${
                    fieldError("phone") ? "border-red-500" : ""
                  }`}
                />
                {fieldError("phone") && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {lang === "NL"
                      ? "Vul een geldig telefoonnummer in"
                      : "Please enter a valid phone number"}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm section */}
            <AnimatePresence mode="wait">
              {confirmed ? (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 bg-black text-white px-6 py-5"
                >
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <span className="font-bold text-sm uppercase tracking-widest">
                    {t.confirmed}
                  </span>
                </motion.div>
              ) : (
                <motion.div key="confirm-form" className="flex flex-col gap-3">
                  {/* Selected summary */}
                  <AnimatePresence>
                    {activeSlot && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-2 border-slate-900 px-5 py-4 flex items-center justify-between mb-2 bg-slate-50">
                          <div>
                            <p className="text-slate-700 font-bold text-xs uppercase tracking-widest capitalize">
                              {fullDateLabel}
                            </p>
                            <p className="text-black text-3xl font-bold tracking-tighter font-heading leading-none mt-1">
                              {activeSlot}
                            </p>
                          </div>
                          <Calendar size={18} className="text-slate-400" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Confirm button */}
                  <button
                    onClick={handleConfirm}
                    className={`w-full py-4 font-bold text-sm uppercase tracking-widest transition-colors duration-150 ${
                      canConfirm
                        ? "bg-black text-white hover:bg-slate-800"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {canConfirm ? t.confirm : t.confirmNote}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
