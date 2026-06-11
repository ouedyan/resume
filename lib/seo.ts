import type { Metadata } from "next";

import type { ResumeContent } from "../content/resume/types";
import {
  alternateLanguagePaths,
  localeConfig,
  localePath,
  localeUrl,
  locales,
  siteUrl,
  type Locale,
} from "./i18n/config";

export type ProfilePageJsonLd = {
  "@context": "https://schema.org";
  "@graph": [
    {
      "@type": "ProfilePage";
      "@id": string;
      url: string;
      name: string;
      description: string;
      inLanguage: string;
      mainEntity: {
        "@id": string;
      };
    },
    {
      "@type": "Person";
      "@id": string;
      name: string;
      url: string;
      mainEntityOfPage: {
        "@id": string;
      };
      email: string;
      telephone: string;
      jobTitle: string;
      address: {
        "@type": "PostalAddress";
        addressLocality: "Ouagadougou";
        addressCountry: "BF";
      };
      worksFor: {
        "@type": "Organization";
        name: string;
        url: string;
      };
      sameAs: string[];
      knowsAbout: string[];
      knowsLanguage: Array<{
        "@type": "Language";
        name: string;
        alternateName: Locale;
      }>;
      hasOccupation: {
        "@type": "Occupation";
        name: string;
        description: string;
        skills: string;
        occupationLocation: {
          "@type": "Country";
          name: "Burkina Faso";
        };
      };
    },
  ];
};

export function buildMetadata(
  locale: Locale,
  resume: ResumeContent,
): Metadata {
  const title = `${resume.profile.name} | ${resume.profile.headline}`;
  const image = {
    alt: `${resume.profile.name} — ${resume.profile.headline}`,
    height: 630,
    url: `/${locale}/opengraph-image`,
    width: 1200,
  };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description: resume.seo.description,
    applicationName: "Yan OUEDRAOGO Resume",
    authors: [
      {
        name: resume.profile.name,
        url: "https://ouedyan.dev",
      },
    ],
    creator: resume.profile.name,
    publisher: resume.profile.name,
    category: "technology",
    alternates: {
      canonical: localePath(locale),
      languages: alternateLanguagePaths,
    },
    formatDetection: {
      address: false,
      email: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicons/favicon.ico" },
        {
          url: "/favicons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/favicons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/favicons/safari-pinned-tab.svg",
          color: "#323336",
        },
      ],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "msapplication-TileColor": "#323336",
      "msapplication-config": "/favicons/browserconfig.xml",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description: resume.seo.description,
      url: localePath(locale),
      siteName: "Yan OUEDRAOGO Resume",
      locale: localeConfig[locale].openGraphLocale,
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => localeConfig[candidate].openGraphLocale),
      type: "profile",
      firstName: "Yan",
      lastName: "OUEDRAOGO",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resume.seo.description,
      images: [image],
    },
  };
}

export function buildProfilePageJsonLd(
  locale: Locale,
  resume: ResumeContent,
): ProfilePageJsonLd {
  const canonicalUrl = localeUrl(locale);
  const profilePageId = `${canonicalUrl}#profile`;
  const personId = `${siteUrl}/#person`;
  const skills = Array.from(
    new Set(resume.skillGroups.flatMap(({ skills: groupSkills }) => groupSkills)),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: canonicalUrl,
        name: `${resume.profile.name} | ${resume.profile.headline}`,
        description: resume.seo.description,
        inLanguage: localeConfig[locale].htmlLang,
        mainEntity: {
          "@id": personId,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: resume.profile.name,
        url: canonicalUrl,
        mainEntityOfPage: {
          "@id": profilePageId,
        },
        email: resume.profile.email,
        telephone: resume.profile.phone,
        jobTitle: resume.profile.currentRole,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ouagadougou",
          addressCountry: "BF",
        },
        worksFor: {
          "@type": "Organization",
          name: resume.profile.currentOrganization.name,
          url: resume.profile.currentOrganization.url,
        },
        sameAs: [
          resume.profile.linkedin.url,
          resume.profile.github.url,
          "https://ouedyan.dev",
        ],
        knowsAbout: skills,
        knowsLanguage: resume.languages.map((language) => ({
          "@type": "Language",
          name: language.name,
          alternateName: language.id,
        })),
        hasOccupation: {
          "@type": "Occupation",
          name: resume.profile.currentRole,
          description: resume.seo.description,
          skills: skills.join(", "),
          occupationLocation: {
            "@type": "Country",
            name: "Burkina Faso",
          },
        },
      },
    ],
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
