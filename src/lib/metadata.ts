import { Metadata } from "next";

interface MetadataParams {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
}

const siteConfig = {
    name: "NextBoiler",
    description:
        "A production-ready Next.js boilerplate with Prisma, NextAuth, TanStack Query, and more.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};

export function constructMetadata({
    title,
    description = siteConfig.description,
    path = "/",
    image = "/og-image.png",
}: MetadataParams = {}): Metadata {
    const fullTitle = title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.name;

    const url = `${siteConfig.url}${path}`;

    return {
        title: fullTitle,
        description,
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
