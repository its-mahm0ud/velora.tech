
"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { formSchema } from "@/schema/loginschema"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function LoginPage() {
    const [errorMsg, setErrorMsg] = useState(false)
    const router = useRouter()
    const [isSubmiting, setIsSubmiting] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmiting(true)
        const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
        if (response?.ok) {
            toast.success("Successfully")
            console.log(response);
            setIsSubmiting(false)
            setTimeout(() => {
                router.push("/")
            }, 700);
        } else {
            setErrorMsg(true)
            toast.error("Something went wrong")
            setIsSubmiting(false)
        }
    }
    return (
        <div className="min-h-screen relative bg-[url('/register.png')] bg-cover bg-center m-0 p-0 overflow-hidden">
            {/* Overlay شفاف يخلي الكلام يبان أكتر في الدارك */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex items-center  min-h-screen px-4">
                <div
                    className="w-full max-w-md 
                 bg-white/90 dark:bg-neutral-900/90 
                 backdrop-blur-xl rounded-2xl shadow-2xl p-8 
                 border border-gray-200 dark:border-neutral-800"
                >
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-primary mb-6 text-center dark:text-white">
                        Login
                    </h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="your-email@example.com"
                                                {...field}
                                                className="bg-white dark:bg-neutral-800 
                               border border-gray-300 dark:border-neutral-700 
                               text-gray-900 dark:text-gray-100 
                               focus:border-primary focus:ring-2 focus:ring-primary/50 
                               transition rounded-lg px-3 py-2"
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-xs text-red-500">
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="*******"
                                                type="password"
                                                {...field}
                                                className="bg-white dark:bg-neutral-800 
                               border border-gray-300 dark:border-neutral-700 
                               text-gray-900 dark:text-gray-100 
                               focus:border-primary focus:ring-2 focus:ring-primary/50 
                               transition rounded-lg px-3 py-2"
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-xs text-red-500">
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <div className='w-full flex flex-col'>
                                <p className='text-sm ms-auto text-blue-300 mb-2'><Link href={"/auth/confirm-your-email"}>Forget Password?</Link></p>
                                {/* Submit Button */}
                                <Button
                                    disabled={isSubmiting}
                                    className="w-full bg-primary dark:bg-black/90 
                       text-white font-semibold py-2.5 rounded-lg 
                       hover:bg-primary/90 dark:hover:bg-black/80
                       transition flex items-center justify-center gap-2 
                       shadow-lg hover:shadow-xl"
                                    type="submit"
                                >
                                    {isSubmiting && <Loader2 className="animate-spin h-4 w-4" />}
                                    Login
                                </Button>
                            </div>

                            {errorMsg && (
                                <p className="text-center text-sm text-red-500">
                                    Incorrect email or password
                                </p>
                            )}
                        </form>
                        <div className="flex mt-2 mx-auto w-fit">
                            <p className="me-1">You dont have an account?</p>
                            <Link className="text-blue-300" href={"/auth/register"}>Register...</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>




    )
}
