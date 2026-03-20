import { z } from "zod";

export const profileSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z
        .string()
        .email("Please enter a valid email address"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
