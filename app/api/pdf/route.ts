import puppeteer from "puppeteer-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;

  try {
    const forwardedHost = request.headers
      .get("x-forwarded-host")
      ?.split(",")[0]
      .trim();
    const host = forwardedHost || request.headers.get("host");
    const forwardedProtocol = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      .trim();
    const protocol = forwardedProtocol || request.nextUrl.protocol.slice(0, -1);
    const baseUrl =
      process.env.RESUME_BASE_URL ||
      (host ? `${protocol}://${host}` : request.nextUrl.origin);

    browser = await puppeteer.launch({
      headless: "shell",
    });

    const page = await browser.newPage();
    await page.goto(new URL("/", baseUrl).toString(), {
      waitUntil: "networkidle2",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return new NextResponse(Uint8Array.from(pdf).buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Yan_OUEDRAOGO_Resume.pdf"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    await browser?.close();
  }
}
