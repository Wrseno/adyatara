"use client";

import {
    useFormContext,
    type FieldValues,
    type Path,
} from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    description?: string;
    type?: string;
    multiline?: boolean;
    disabled?: boolean;
}

export function FormInput<T extends FieldValues>({
    name,
    label,
    placeholder,
    description,
    type = "text",
    multiline = false,
    disabled = false,
}: FormInputProps<T>) {
    const form = useFormContext<T>();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {multiline ? (
                            <Textarea
                                placeholder={placeholder}
                                disabled={disabled}
                                className="resize-none"
                                {...field}
                            />
                        ) : (
                            <Input
                                type={type}
                                placeholder={placeholder}
                                disabled={disabled}
                                {...field}
                            />
                        )}
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
