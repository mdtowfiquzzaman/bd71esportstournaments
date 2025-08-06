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

export const metadata = {
  title: {
    default: 'BD71 Esports',
    template: '%s | BD71 Esports',
  },
  description:
    'BD71 Esports is a competitive PUBG clan dedicated to hosting tournaments, sharing live gameplay, and showcasing top-tier esports talent in Bangladesh.',
  openGraph: {
    title: 'BD71 Esports',
    description:
      'BD71 Esports is a competitive PUBG clan dedicated to hosting tournaments, sharing live gameplay, and showcasing top-tier esports talent in Bangladesh.',
    url: 'https://bd71esportstournaments.vercel.app/',
    siteName: 'BD71 Esports',
    images: [
      {
        url: 'https://bd71esportstournaments.vercel.app/img/og.jpg',
        width: 1200,
        height: 630,
        alt: 'BD71 Esports',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BD71 Esports',
    description:
      'BD71 Esports is a competitive PUBG clan dedicated to hosting tournaments, sharing live gameplay, and showcasing top-tier esports talent in Bangladesh.',
    images: ['https://bd71esportstournaments.vercel.app/img/og.jpg'],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
