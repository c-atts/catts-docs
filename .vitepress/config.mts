import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "C–ATTS | Docs ",
  description:
    "Composite attestations are a new type of attestation combining data from multiple sources to form a unified and verifiable credential.",

  head: [
    ["meta", { property: "og:url", content: "https://docs.catts.run" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "C–ATTS | Docs" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Composite attestations are a new type of attestation combining data from multiple sources to form a unified and verifiable credential.",
      },
    ],
    ["meta", { property: "og:image", content: "/ogimage.png" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "twitter:url", content: "https://catts.run" }],
    ["meta", { name: "twitter:title", content: "C–ATTS | Docs" }],
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
    ["meta", { name: "twitter:image", content: "/ogimage.png" }],
  ],
  themeConfig: {
    nav: [{ text: "App", link: "https://catts.run" }],

    sidebar: [
      {
        items: [
          { text: "Introduction", link: "/" },
          { text: "Recipes", link: "/recipes" },
          { text: "Processor", link: "/processor" },
          { text: "CLI", link: "/cli" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/c-atts" },
      { icon: "twitter", link: "https://twitter.com/c_atts" },
    ],
  },
});
