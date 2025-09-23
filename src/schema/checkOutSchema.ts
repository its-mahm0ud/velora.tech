

import { z } from 'zod'
export const checkoutSchema = z.object({
    address: z.string()
        .nonempty("Address is required")
        .min(5, "Address must be at least 5 characters"),
    phone: z.string()
        .nonempty("Phone is required")
        .regex(/^(\+20|0)/, "Phone number must start with +20 or 0")
        .regex(/^[0-9+]+$/, "Phone number must contain only digits")
        .regex(/^(\+20)?0?[0-9]{10}$/, "Phone number must be 11 digits if starting with 0, or 12 digits if starting with +20"),
    city: z.string()
        .nonempty("City is required")
        .min(2, "City must be at least 2 characters"),
})
