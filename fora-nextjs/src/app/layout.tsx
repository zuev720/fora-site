import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/lib/fontawesome";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ООО Фора | Производство соединительных элементов для чистых помещений",
    template: "%s | ООО Фора",
  },
  description: "Производство алюминиевых угловых соединителей и заглушек для чистых помещений. Соответствие GMP и ISO. Доставка по всей России.",
  keywords: ["чистые помещения", "угловые соединители", "заглушки", "GMP", "cleanroom", "алюминиевые профили"],
  authors: [{ name: "ООО Фора" }],
  creator: "ООО Фора",
  publisher: "ООО Фора",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fora-clean.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ООО Фора | Производство соединительных элементов для чистых помещений",
    description: "Производство алюминиевых угловых соединителей и заглушек для чистых помещений. Соответствие GMP и ISO.",
    url: "https://fora-clean.ru",
    siteName: "ООО Фора",
    locale: "ru_RU",
    type: "website",
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
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0056b3" />
      </head>
      <body className={inter.variable} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
