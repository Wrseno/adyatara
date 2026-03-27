import { Metadata } from "next";

interface MetadataParams {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
}

const siteConfig = {
    name: "Adyatara",
    description:
        "Platform storytelling interaktif untuk menjelajahi legenda Nusantara melalui visual novel, kuis budaya, dan koleksi pengetahuan.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};

export function constructMetadata({
    title,
    description = siteConfig.description,
    path = "/",
    image = "/images/adyatara-logo.png",
}: MetadataParams = {}): Metadata {
    const fullTitle = title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.name;

    const url = `${siteConfig.url}${path}`;

    return {
        title: fullTitle,
        description,
        applicationName: siteConfig.name,
        icons: {
            icon: [{ url: "/images/adyatara-logo.png", type: "image/png" }],
            apple: [{ url: "/images/adyatara-logo.png", type: "image/png" }],
            shortcut: ["/images/adyatara-logo.png"],
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: siteConfig.name,
            type: "website",
            images: [
                {
                    url: `${siteConfig.url}${image}`,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [`${siteConfig.url}${image}`],
        },
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: url,
        },
    };
}
