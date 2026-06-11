import localFont from "next/font/local";
import type { ReactNode } from "react";

import {
  defaultLocale,
  isLocale,
  localeConfig,
} from "../../lib/i18n/config";
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
      className={`${inter.variable} print:[zoom:0.8]`}
    >
      <body className="bg-resume-background-main font-inter text-black antialiased print:bg-white">
        {children}
      </body>
    </html>
  );
}
