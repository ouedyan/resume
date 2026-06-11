import { localePath, siteUrl, type Locale } from "./i18n/config";

export const pdfCacheControl =
  "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

export function pdfFilename(locale: Locale): string {
  return `Yan_OUEDRAOGO_Resume_${locale}.pdf`;
}

function normalizeHttpUrl(value: string): string {
  const url = new URL(value);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("The resume base URL must use http or https.");
  }

  if (url.username || url.password) {
    throw new Error("The resume base URL must not contain credentials.");
  }

  url.pathname = "/";
  url.search = "";
  url.hash = "";

  return url.origin;
}

function isLoopbackOrigin(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" &&
      ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

export function resolveResumeBaseUrl({
  configuredBaseUrl,
  environment,
  requestOrigin,
}: {
  configuredBaseUrl?: string;
  environment: string;
  requestOrigin?: string;
}): string {
  if (configuredBaseUrl) {
    return normalizeHttpUrl(configuredBaseUrl);
  }

  if (environment !== "production" && requestOrigin && isLoopbackOrigin(requestOrigin)) {
    return normalizeHttpUrl(requestOrigin);
  }

  return siteUrl;
}

export function buildResumePageUrl(
  locale: Locale,
  baseUrl: string,
): string {
  return new URL(localePath(locale), normalizeHttpUrl(baseUrl)).toString();
}
