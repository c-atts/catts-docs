import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "C–ATTS | Docs ",
  description:
    "Composite attestations are a new type of attestation combining data from multiple sources to form a unified and verifiable credential.",

  head: [
    ["meta", { property: "og:url", content: "https://catts.run" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      { property: "og:title", content: "Composite Attestations | C–ATTS" },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Composite attestations are a new type of attestation combining data from multiple sources to form a unified and verifiable credential.",
      },
    ],
    ["meta", { property: "og:image", content: "/og.jpg" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "twitter:url", content: "https://catts.run" }],
    [
      "meta",
      { name: "twitter:title", content: "Composite Attestations | C–ATTS" },
    ],
    ["meta", { name: "twitter:site", content: "@c_atts" }],
    ["meta", { name: "twitter:creator", content: "@kristoferlund" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Composite attestations are a new type of attestation combining data from multiple sources to form a unified and verifiable credential.",
      },
    ],
    ["meta", { name: "twitter:image", content: "/og.jpg" }],
  ],
  themeConfig: {
    nav: [{ text: "App", link: "https://catts.run" }],

    sidebar: [
      {
        items: [
          { text: "Composite Attestations", link: "/" },
          { text: "The C–ATTS flow", link: "/flow" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/c-atts" },
      { icon: "twitter", link: "https://twitter.com/c_atts" },
    ],
  },
});
