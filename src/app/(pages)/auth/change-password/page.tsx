
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
import { formSchema } from "@/schema/changePasswordSchema"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { apiServices } from '@/Services/ApisServices'
export default function ChangePassword() {
    const router = useRouter()
    const [isConfirming, setIsConfirming] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            newPassword: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsConfirming(true)
        const response = await apiServices.ChangePassword(values.email, values.newPassword)
        if (response?.token) {
            toast.success("Successfully")
            setIsConfirming(false)
            setTimeout(() => {
                router.push("/auth/login")
            }, 700);
        } else {
            toast.error("Something went wrong")
            setIsConfirming(false)
        }
    }



    return (
        <div className="min-h-screen relative bg-gradient-to-br from-gray-700 via-slate-800 to-blue-900 bg-cover bg-center m-0 p-0 overflow-hidden">
            {/* Overlay شفاف غامق بسيط يخلي الفورم يبان */}
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-[95%] md:max-w-[40%] bg-white/50 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl p-8 mx-6">
                    <div className="flex flex-col gap-1 mb-10">
                        <h1 className="text-3xl font-bold text-primary text-center">Change Details</h1>
                        <p className="text-muted-foreground text-center">Put Your Email And New Password</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="your-email@example.com"
                                                {...field}
                                                className="bg-white/60 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/50 transition rounded-lg text-gray-900 dark:text-gray-100"
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-xs text-red-500">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">NewPassword</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="*******"
                                                type="password"
                                                {...field}
                                                className="bg-white/60 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/50 transition rounded-lg text-gray-900 dark:text-gray-100"
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-xs text-red-500">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                disabled={isConfirming}
                                className="w-full bg-primary dark:bg-black/90 
                       text-white font-semibold py-2.5 rounded-lg 
                       hover:bg-primary/90 dark:hover:bg-black/80
                       transition flex items-center justify-center gap-2 
                       shadow-lg hover:shadow-xl"
                                type="submit"
                            >
                                {isConfirming && <Loader2 className="animate-spin h-4 w-4" />}
                                Confirm Your Data
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>



    )
}
