import { IMaskInput } from "react-imask";

import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type MaskedPhoneInputProps = {
    id: string;
    name: string;
    label: string;
    defaultValue?: string | null;
    required?: boolean;
    className?: string;
};

export function MaskedPhoneInput({
    id,
    name,
    label,
    defaultValue,
    required,
    className,
}: MaskedPhoneInputProps) {
    return (
        <Field className="space-y-2">
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </FieldLabel>
            <IMaskInput
                id={id}
                mask="(00) 00000-0000"
                name={name}
                defaultValue={defaultValue ?? ""}
                required={required}
                className={cn(
                    "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-colors focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:focus:border-sky-700",
                    className,
                )}
            />
        </Field>
    );
}
