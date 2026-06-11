import { notFound } from "next/navigation";

import { ResumePage } from "../../components/resume/resume-page";
import { getResume } from "../../content/resume";
import {
  isLocale,
  locales,
} from "../../lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ResumePage locale={locale} resume={getResume(locale)} />;
}
