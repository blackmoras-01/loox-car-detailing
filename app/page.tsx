"use client";

import { useState } from "react";
import { Lang } from "./utils/content";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import BookingCalendar from "./components/BookingCalendar";
import LocationFooter from "./components/LocationFooter";

export default function Home() {
  const [lang, setLang] = useState<Lang>("NL");

  return (
    <main>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Intro lang={lang} />
      <Services lang={lang} />
      <Gallery lang={lang} />
      <BookingCalendar lang={lang} />
      <LocationFooter lang={lang} />
    </main>
  );
}
