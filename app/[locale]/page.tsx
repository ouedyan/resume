import { notFound } from "next/navigation";

import { ResumePage } from "../../components/resume/resume-page";
import { StructuredData } from "../../components/resume/structured-data";
import { getResume } from "../../content/resume";
import {
  isLocale,
  locales,
} from "../../lib/i18n/config";
import { buildProfilePageJsonLd } from "../../lib/seo";

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

  const resume = getResume(locale);

  return (
    <>
      <StructuredData data={buildProfilePageJsonLd(locale, resume)} />
      <ResumePage locale={locale} resume={resume} />
    </>
  );
}
