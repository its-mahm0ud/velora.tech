"use server"
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
export default async function getDecodedToken() {
    const cookiesStore = (await cookies())
    const enCodeToken = cookiesStore.get("next-auth.session-token")?.value || cookiesStore.get("__Secure-next-auth.session-token")?.value
    const deCodeToken = await decode({
        token: enCodeToken,
        secret: process.env.AUTH_SECRET!
    })

    return deCodeToken!.token

}
