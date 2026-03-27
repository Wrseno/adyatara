"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

export const LoginForm = () => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setIsPending(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                toast.error("Invalid credentials.");
            } else if (result?.ok) {
                toast.success("Successfully logged in.");
                window.location.href = "/dashboard";
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] tracking-[0.2em] text-gray-300 uppercase font-medium">EMAIL</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="nama@email.com"
                                        type="email"
                                        className="bg-[#0D0907] border border-gray-800 rounded-none px-4 py-6 text-[13px] text-gray-300 placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-[#D96B4A]/50 focus-visible:border-[#D96B4A]/50"
                                    />
                                    {/* Corner brackets */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-gray-600/50 pointer-events-none" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-gray-600/50 pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-gray-600/50 pointer-events-none" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-600/50 pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage className="text-[#D96B4A] text-xs font-light" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] tracking-[0.2em] text-gray-300 uppercase font-medium">PASSWORD</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        className="bg-[#0D0907] border border-gray-800 rounded-none px-4 py-6 pr-12 text-[13px] text-gray-300 placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-[#D96B4A]/50 focus-visible:border-[#D96B4A]/50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                    {/* Corner brackets */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-gray-600/50 pointer-events-none" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-gray-600/50 pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-gray-600/50 pointer-events-none" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-gray-600/50 pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage className="text-[#D96B4A] text-xs font-light" />
                        </FormItem>
                    )}
                />
                
                <div className="flex justify-end mt-2 mb-6">
                    <a href="#" className="text-[#D96B4A] hover:text-[#E86B52] text-[10px] tracking-[0.2em] uppercase font-medium transition-colors">
                        LUPA PASSWORD?
                    </a>
                </div>

                <Button 
                    disabled={isPending} 
                    type="submit" 
                    className="w-full bg-[#E86B52] hover:bg-[#D96B4A] text-white font-semibold py-6 rounded-none tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-2"
                >
                    {isPending ? "MEMPROSES..." : "MASUK"}
                    {!isPending && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>}
                </Button>
            </form>
        </Form>
    );
};
