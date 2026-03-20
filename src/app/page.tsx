import Link from "next/link";
import { ArrowRight, Database, Lock, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "Authentication",
    description:
      "NextAuth.js v5 with Prisma Adapter, JWT sessions, and role-based access control.",
  },
  {
    icon: Database,
    title: "Database Ready",
    description:
      "Prisma ORM with PostgreSQL, Docker setup for local dev, and Supabase-ready config.",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description:
      "shadcn/ui components with Tailwind CSS, dark mode, and responsive design.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "TanStack Query for server state, Zustand for client state, and Server Actions.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center gap-6 px-4 pb-16 pt-24 text-center md:pt-32">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground">
          🚀 Production-Ready Boilerplate
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Build Faster with{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            NextBoiler
          </span>
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          A clean, modular, and production-ready Next.js boilerplate with
          TypeScript, Prisma, NextAuth, TanStack Query, and shadcn/ui.
        </p>

        <div className="flex gap-4">
          <Button size="lg" render={<Link href="/dashboard" />} nativeButton={false}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            GitHub
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transition-colors hover:border-primary/50"
            >
              <CardHeader>
                <feature.icon className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
