
import { z } from "zod"
export const formSchema = z.object({
    email: z.string()
        .nonempty("Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must include '@' and a valid domain (e.g. user@example.com)")
        .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email must be lowercase only"),
})