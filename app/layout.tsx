import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loox Car Detailing | Premium Autodetailing Eindhoven",
  description:
    "Premium autodetailing in Eindhoven. Professioneel wassen, polijsten en dieptereiniging van uw interieur. Boek direct online.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale is intentionally omitted so pinch-zoom still works
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
