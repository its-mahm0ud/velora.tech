
import { apiServices } from "@/Services/ApisServices"

import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Your-Email@Ex.com" },
                password: { label: "Password", type: "password", placeholder: "******" }
            },
            async authorize(credentials) {
                const res = await apiServices.login(credentials?.email ?? "", credentials?.password ?? "")
                console.log(res);

                // If no error and we have user data, return it
                if (res.message == 'success') {
                    return {
                        id: res.user.email,   // أو id من الـ backend لو عندك
                        user: res.user,
                        role: res.user.role,
                        token: res.token
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        // ده عشان نخزن بيانات اليوزر في الـ token (بيتخزن في الكوكيز)
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user
                token.role = user.user.role
                token.token = user.token
            }
            return token
        },

        // ده عشان نجهز الـ session اللي هيرجع للـ frontend =>client
        async session({ session, token }) {
            if (token) {
                session.user = token.user,
                session.token = token.token as string
                session.role = token.role as string
            }
            return session
        },
    },

    // دا عشان ناكسس الداتا من ال client


    secret: process.env.NEXTAUTH_SECRET

}


export const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }