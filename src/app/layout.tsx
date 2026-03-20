import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Irgi Adit Pratama | Founder & Software Engineer",
    template: "%s | Irgi Adit Pratama",
  },
  description:
    "Irgi Adit Pratama — Founder of SolvinMe and Software Engineer specializing in scalable systems, database architecture, and AI-driven products. Building infrastructure that lets startups grow from day zero.",
  keywords: [
    "Irgi Adit Pratama",
    "Founder SolvinMe",
    "Software Engineer",
    "Scalable Systems",
    "Database Architecture",
    "Product Engineer",
    "AI Integration",
    "Fullstack Developer",
    "Next.js",
    "Startup Engineer",
    "Indonesia",
  ],
  authors: [{ name: "Irgi Adit Pratama", url: "https://github.com/irgiadit7" }],
  creator: "Irgi Adit Pratama",
  publisher: "Irgi Adit Pratama",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portofolio-irgi.vercel.app/"),
  openGraph: {
    title: "Irgi Adit Pratama | Founder & Software Engineer",
    description:
      "Founder of SolvinMe and Software Engineer specializing in scalable systems and database architecture. Building products that solve real startup problems from day zero.",
    url: "/",
    siteName: "Irgi Adit Pratama",
    images: [
      {
        url: "/assets/nasa-unsplash.webp",
        width: 1200,
        height: 630,
        alt: "Irgi Adit Pratama — Founder & Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irgi Adit Pratama | Founder & Software Engineer",
    description:
      "Founder of SolvinMe. Software Engineer specializing in scalable systems and database architecture.",
    images: ["/assets/nasa-unsplash.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        {children}
      </body>
    </html>
  );
}