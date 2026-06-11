import Link from "next/link";

import type { ResumeContent } from "../../content/resume/types";
import {
  localeConfig,
  localePath,
  locales,
  type Locale,
} from "../../lib/i18n/config";

export function LanguageSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: ResumeContent["actions"]["switchLanguage"];
}) {
  return (
    <nav aria-label={label} className="resume-language-switcher">
      {locales.map((locale) => {
        const isCurrent = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={localePath(locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? "page" : undefined}
            className="resume-language-link"
          >
            {localeConfig[locale].label}
          </Link>
        );
      })}
    </nav>
  );
}
