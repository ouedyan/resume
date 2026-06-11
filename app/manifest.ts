import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yan OUEDRAOGO — Resume",
    short_name: "Yan Resume",
    description:
      "Multilingual resume of Yan OUEDRAOGO, Senior Full-Stack & Platform Engineer.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#e4ebf1",
    theme_color: "#323336",
    icons: [
      {
        src: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
