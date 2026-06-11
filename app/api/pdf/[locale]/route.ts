import { NextRequest, NextResponse } from "next/server";

import { isLocale } from "../../../../lib/i18n/config";
import {
  buildResumePageUrl,
  pdfCacheControl,
  pdfFilename,
  resolveResumeBaseUrl,
} from "../../../../lib/pdf";
import { launchPdfBrowser } from "../../../../lib/pdf-browser";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ locale: string }> },
) {
  const { locale } = await context.params;

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Unsupported locale" }, { status: 404 });
  }

  let browser: Awaited<ReturnType<typeof launchPdfBrowser>> | undefined;

  try {
    const baseUrl = resolveResumeBaseUrl({
      configuredBaseUrl: process.env.RESUME_BASE_URL,
      environment: process.env.NODE_ENV,
      requestOrigin: request.nextUrl.origin,
    });

    browser = await launchPdfBrowser();

    const page = await browser.newPage();
    await page.goto(buildResumePageUrl(locale, baseUrl), {
      timeout: 45_000,
      waitUntil: "networkidle0",
    });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMediaType("print");

    const pdf = await page.pdf({
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
    });

    return new NextResponse(Uint8Array.from(pdf).buffer, {
      headers: {
        "Cache-Control": pdfCacheControl,
        "Content-Disposition": `attachment; filename="${pdfFilename(locale)}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Failed to generate resume PDF", error);

    return NextResponse.json(
      { error: "Failed to generate resume PDF" },
      { status: 500 },
    );
  } finally {
    await browser?.close();
  }
}
