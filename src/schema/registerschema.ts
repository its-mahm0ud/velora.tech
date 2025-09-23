import { z } from "zod"
export const formSchema = z.object({
    name: z.string()
        .nonempty("Name is Required")
        .min(2, "Name must be 2 char atleast")
        .max(20, "Name must be 20 char atmost"),
    email: z.string()
        .nonempty("Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must include '@' and a valid domain (e.g. user@example.com)")
        .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email must be lowercase only"),
    password: z.string()
        .nonempty("Password is required")
        .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .regex(/^(?=.*\d)/, "Password must contain at least one number")
        .regex(/^(?=.*[@$!%*?&])/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
        .min(5, "Password must be at least 5 characters long"),
    rePassword: z.string()
        .nonempty("Password is required")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/, "Please enter a valid password"),
    phone: z.string()
        .nonempty("Phone is required")
        .regex(/^(\+20|0)/, "Phone number must start with +20 or 0")
        .regex(/^[0-9+]+$/, "Phone number must contain only digits")
        .regex(/^(\+20)?0?[0-9]{10}$/, "Phone number must be 11 digits if starting with 0, or 12 digits if starting with +20"),

}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "password must be match repassword"
})