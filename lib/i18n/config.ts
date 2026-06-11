import type { YearMonth } from "../../content/resume/types";

export const locales = ["en", "fr", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const siteUrl = "https://resume.ouedyan.dev";

export const localeConfig = {
  en: {
    htmlLang: "en",
    intlLocale: "en-US",
    label: "English",
    openGraphLocale: "en_US",
  },
  fr: {
    htmlLang: "fr",
    intlLocale: "fr-FR",
    label: "Français",
    openGraphLocale: "fr_FR",
  },
  tr: {
    htmlLang: "tr",
    intlLocale: "tr-TR",
    label: "Türkçe",
    openGraphLocale: "tr_TR",
  },
} as const satisfies Record<
  Locale,
  {
    htmlLang: string;
    intlLocale: string;
    label: string;
    openGraphLocale: string;
  }
>;

export function localePath(locale: Locale): `/${Locale}` {
  return `/${locale}`;
}

export function pdfPath(locale: Locale): `/api/pdf/${Locale}` {
  return `/api/pdf/${locale}`;
}

export function localeUrl(locale: Locale): string {
  return new URL(localePath(locale), siteUrl).toString();
}

export const alternateLanguagePaths = {
  en: localePath("en"),
  fr: localePath("fr"),
  tr: localePath("tr"),
  "x-default": localePath(defaultLocale),
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function formatYearMonth(locale: Locale, value: YearMonth): string {
  return new Intl.DateTimeFormat(localeConfig[locale].intlLocale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`));
}

export function formatDateRange(
  locale: Locale,
  startDate: YearMonth,
  endDate: YearMonth | null,
  presentLabel: string,
): string {
  const start = formatYearMonth(locale, startDate);
  const end = endDate ? formatYearMonth(locale, endDate) : presentLabel;

  return `${start} – ${end}`;
}
