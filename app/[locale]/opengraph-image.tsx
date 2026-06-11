import { ImageResponse } from "next/og";

import { getResume } from "../../content/resume";
import {
  defaultLocale,
  isLocale,
  localeConfig,
} from "../../lib/i18n/config";

export const alt = "Yan OUEDRAOGO Resume";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const resume = getResume(locale);

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#e4ebf1",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            boxShadow: "0 18px 60px rgba(50, 51, 54, 0.10)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "flex-start",
              display: "flex",
              gap: "42px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "#43F398",
                color: "#111111",
                display: "flex",
                flexDirection: "column",
                fontSize: "30px",
                fontWeight: 700,
                height: "112px",
                justifyContent: "center",
                lineHeight: 1,
                width: "88px",
              }}
            >
              <span>Y</span>
              <span>O</span>
            </div>

            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  color: "#323336",
                  display: "flex",
                  fontSize: "60px",
                  fontWeight: 750,
                  letterSpacing: "0.04em",
                }}
              >
                {resume.profile.name}
              </div>
              <div
                style={{
                  color: "#323336",
                  display: "flex",
                  fontSize: "35px",
                  fontWeight: 520,
                  marginTop: "22px",
                }}
              >
                {resume.profile.headline}
              </div>
              <div
                style={{
                  color: "#707678",
                  display: "flex",
                  fontSize: "25px",
                  lineHeight: 1.45,
                  marginTop: "28px",
                  maxWidth: "850px",
                }}
              >
                {resume.seo.description}
              </div>
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              borderTop: "2px solid #f1f5f7",
              color: "#707678",
              display: "flex",
              fontSize: "23px",
              justifyContent: "space-between",
              paddingTop: "28px",
            }}
          >
            <span>resume.ouedyan.dev</span>
            <span>{localeConfig[locale].label}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
