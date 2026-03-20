"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { profileSchema, type ProfileFormValues } from "@/lib/validations/profile";
import { revalidatePath } from "next/cache";
import type { ApiResponse, UserProfile } from "@/types";

export async function updateProfile(
    values: ProfileFormValues
): Promise<ApiResponse<UserProfile>> {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const validated = profileSchema.safeParse(values);

        if (!validated.success) {
            return {
                success: false,
                error: validated.error.issues[0]?.message ?? "Validation failed",
            };
        }

        const updatedUser = await db.user.update({
            where: { id: session.user.id },
            data: {
                name: validated.data.name,
                email: validated.data.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
            },
        });

        revalidatePath("/dashboard");

        return { success: true, data: updatedUser };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}
