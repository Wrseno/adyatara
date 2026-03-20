import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { ProfileForm } from "./profile-form";

export const metadata = constructMetadata({
    title: "Dashboard",
    description: "Manage your account and profile settings.",
    path: "/dashboard",
});

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                    Welcome back, {session.user.name ?? session.user.email}!
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <ProfileForm user={session.user} />
            </div>
        </div>
    );
}
