import type { Metadata } from "next";
import resumeData from "./resume-data.json";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://resume.ouedyan.dev"),
  title: `${resumeData.profile.name} | ${resumeData.profile.headline}`,
  description: resumeData.profile.summary,
  applicationName: "Yan's Resume",
  authors: [{ name: resumeData.profile.name }],
  creator: resumeData.profile.name,
  openGraph: {
    title: `${resumeData.profile.name} | ${resumeData.profile.headline}`,
    description: resumeData.profile.summary,
    url: "https://resume.ouedyan.dev",
    siteName: "Yan's Resume",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="print:[zoom:0.8]">
      <head>
        {/* Preconnect to assets server */}
        <link
          rel="preconnect"
          href="https://assets.standardresume.co"
          crossOrigin="anonymous"
        />

        {/* Preload Inter font */}
        <link
          rel="preload"
          href="https://assets.standardresume.co/raw/upload/v1613930712/fonts/inter-var-latin_slr2rc.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Font styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* latin-ext */
          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
            src: url(https://assets.standardresume.co/raw/upload/v1613930712/fonts/inter-var-latin-ext_e4rknq.woff2)
              format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }

          /* latin */
          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
            src: url(https://assets.standardresume.co/raw/upload/v1613930712/fonts/inter-var-latin_slr2rc.woff2)
              format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
              U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* italic latin-ext */
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 100 900;
            font-display: swap;
            src: url(https://assets.standardresume.co/raw/upload/v1628265386/fonts/inter-italic-var-latin-ext_nenjsi.woff2)
              format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            font-named-instance: "Italic";
          }

          /* italic latin */
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 100 900;
            font-display: swap;
            src: url(https://assets.standardresume.co/raw/upload/v1628265386/fonts/inter-italic-var-latin_qedl54.woff2)
              format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
              U+2212, U+2215, U+FEFF, U+FFFD;
            font-named-instance: "Italic";
          }
        `,
          }}
        />
      </head>
      <body className="bg-[#f2f7fc] antialiased font-inter text-black print:bg-white">
        {children}
      </body>
    </html>
  );
}
