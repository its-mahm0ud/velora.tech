
import NextAuth, { DefaultSession } from "next-auth"
import { User } from 'lucide-react';


declare module "next-auth" {
    interface User {
        user: {
            name: string,
            email: string,
            role: string
        },
        token: string
    }


    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User.user
        role: string
        token: string
    }
}