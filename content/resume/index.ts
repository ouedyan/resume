import type { Locale } from "../../lib/i18n/config";
import { englishResume } from "./en";
import { frenchResume } from "./fr";
import { turkishResume } from "./tr";
import type { ResumeContent } from "./types";

const resumes = {
  en: englishResume,
  fr: frenchResume,
  tr: turkishResume,
} satisfies Record<Locale, ResumeContent>;

export function getResume(locale: Locale): ResumeContent {
  return resumes[locale];
}
