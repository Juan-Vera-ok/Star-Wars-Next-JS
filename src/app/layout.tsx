// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Films Next.js App",
  description: "A Next.js application displaying Star Wars films and their characters. by Juan Ignacio Vera",
  keywords: ["Next.js", "Programming", "IT", "API REST", "Star Wars"],
  authors: [{ name: "Juan Ignacio Vera" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    type: "website",
    url: "https://juanignaciovera-star-wars-next-js-h.vercel.app/",
    title: "Star Wars Films Next.js App",
    description: "A Next.js application displaying Star Wars films and their characters. by Juan Ignacio Vera",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png",
        width: 2560,
        height: 1440,
        alt: "Star Wars Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Star Wars Films Next.js App",
    description: "A Next.js application displaying Star Wars films and their characters. by Juan Ignacio Vera",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}