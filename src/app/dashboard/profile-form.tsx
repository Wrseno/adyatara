"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/shared/form-input";
import { updateProfile } from "@/actions/profile";
import {
    profileSchema,
    type ProfileFormValues,
} from "@/lib/validations/profile";

interface ProfileFormProps {
    user: {
        name: string | null;
        email: string | null;
    };
}

export function ProfileForm({ user }: ProfileFormProps) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name ?? "",
            email: user.email ?? "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    async function onSubmit(values: ProfileFormValues) {
        const result = await updateProfile(values);

        if (result.success) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error(result.error ?? "Something went wrong.");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Update your personal information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FormInput<ProfileFormValues>
                            name="name"
                            label="Name"
                            placeholder="Your name"
                        />
                        <FormInput<ProfileFormValues>
                            name="email"
                            label="Email"
                            placeholder="you@example.com"
                            type="email"
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save Changes
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}
