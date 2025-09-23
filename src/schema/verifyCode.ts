import { z } from "zod"
export const formSchema = z.object({
    resetCode: z.string().min(4, "Code must be at least 4 characters"),
})