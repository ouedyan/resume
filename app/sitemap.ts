import type { MetadataRoute } from "next";

import {
  defaultLocale,
  localeUrl,
  locales,
} from "../lib/i18n/config";

const languages = {
  en: localeUrl("en"),
  fr: localeUrl("fr"),
  tr: localeUrl("tr"),
  "x-default": localeUrl(defaultLocale),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localeUrl(locale),
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: {
      languages,
    },
  }));
}
