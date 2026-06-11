import {
  serializeJsonLd,
  type ProfilePageJsonLd,
} from "../../lib/seo";

export function StructuredData({ data }: { data: ProfilePageJsonLd }) {
  return (
    <script
      id="resume-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
