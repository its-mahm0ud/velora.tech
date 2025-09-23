"use server"
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
export default async function getDecodedToken() {
    const enCodeToken = (await cookies()).get("next-auth.session-token")?.value
    const deCodeToken = await decode({
        token: enCodeToken,
        secret: process.env.AUTH_SECRET!
    })
    console.log("tokennnnnnnn", deCodeToken?.token);

    return deCodeToken!.token

}
