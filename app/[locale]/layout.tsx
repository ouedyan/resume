import localFont from "next/font/local";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getResume } from "../../content/resume";
import {
  defaultLocale,
  isLocale,
  localeConfig,
  siteUrl,
} from "../../lib/i18n/config";
import { buildMetadata } from "../../lib/seo";
import "../globals.css";

const inter = localFont({
  src: [
    {
      path: "../fonts/InterVariable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../fonts/InterVariable-Italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  variable: "--font-inter",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {
      metadataBase: new URL(siteUrl),
    };
  }

  return buildMetadata(locale, getResume(locale));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const documentLocale = isLocale(locale) ? locale : defaultLocale;

  return (
    <html
      lang={localeConfig[documentLocale].htmlLang}
      className={`${inter.variable} print:[zoom:0.76]`}
    >
      <body className="bg-resume-background-main font-inter text-black antialiased print:bg-white">
        {children}
      </body>
    </html>
  );
}
