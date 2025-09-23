
import { z } from "zod"
export const formSchema = z.object({
    email: z.string()
        .nonempty("Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must include '@' and a valid domain (e.g. user@example.com)")
        .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email must be lowercase only"),
    newPassword: z.string()
        .nonempty("Password is required")
        .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .regex(/^(?=.*\d)/, "Password must contain at least one number")
        .regex(/^(?=.*[@$!%*?&])/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
        .min(5, "Password must be at least 5 characters long"),
})