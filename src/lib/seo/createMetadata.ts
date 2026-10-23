import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiengioi.example.com";

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  imageAlt: string;
}

export function createMetadata({ title, description, path, imageAlt }: MetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      title,
      description,
      url,
      siteName: "Tiên Giới Kỹ Thuật Số",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
