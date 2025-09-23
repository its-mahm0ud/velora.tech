
"use client"
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
import { formSchema } from "@/schema/registerschema"
import { apiServices } from "@/Services/ApisServices"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
    const [errorMsg, setErrorMsg] = useState("")
    const [isSubmiting, setIsSubmiting] = useState(false)
    // 2- تهيئة الـ useForm مع الـ zodResolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
    })

    // 3- دالة submit
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmiting(true) // هنا تقدر تبعت البيانات لـ API أو تعمل أي أكشن
        const res = await apiServices.Register(values.name, values.email, values.password, values.rePassword, values.phone)
        if (res.message == 'success') {
            location.href = "/auth/login"
            setIsSubmiting(false)
        } else {
            setErrorMsg(res.message)
            setIsSubmiting(false)
        }
    }

    return (
        <div className="min-h-screen relative bg-[url('/register.png')] bg-cover bg-center m-0 p-0 overflow-hidden">
            {/* Overlay شفاف يخلي الكلام يبان أكتر في الدارك */}
            <div className="absolute inset-0  bg-black/40"></div>

            <div className="relative z-10 flex items-center  min-h-screen px-4">
                <div
                    className="w-full max-w-md 
                 bg-white/90 dark:bg-neutral-900/90 
                 backdrop-blur-xl rounded-2xl shadow-2xl p-8 
                 border border-gray-200 dark:border-neutral-800"
                >
                    <h1 className="text-3xl font-bold text-primary mb-6 text-center dark:text-white">
                        Register Now
                    </h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your Name"
                                                {...field}
                                                className="bg-white dark:bg-neutral-800 
                               border border-gray-300 dark:border-neutral-700 
                               text-gray-900 dark:text-gray-100 
                               focus:border-primary focus:ring-2 focus:ring-primary/50 
                               transition rounded-lg px-3 py-2"
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-xs text-red-500">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />

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
                                                className="bg-white dark:bg-neutral-800 
                               border border-gray-300 dark:border-neutral-700 
                               text-gray-900 dark:text-gray-100 
                               focus:border-primary focus:ring-2 focus:ring-primary/50 
                               transition rounded-lg px-3 py-2"
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
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">Password</FormLabel>
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
                                            <p className="text-xs text-red-500">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="rePassword"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">Confirm Password</FormLabel>
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
                                            <p className="text-xs text-red-500">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+20 10 000 0000"
                                                {...field}
                                                className="bg-white dark:bg-neutral-800 
                               border border-gray-300 dark:border-neutral-700 
                               text-gray-900 dark:text-gray-100 
                               focus:border-primary focus:ring-2 focus:ring-primary/50 
                               transition rounded-lg px-3 py-2"
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
                                disabled={isSubmiting}
                                className="w-full bg-primary dark:bg-black/90 text-white py-2.5 rounded-lg 
                       hover:bg-primary/90 dark:hover:bg-black/80 
                       transition flex items-center justify-center gap-2 
                       shadow-lg hover:shadow-xl"
                                type="submit"
                            >
                                {isSubmiting && <Loader2 className="animate-spin h-4 w-4" />}
                                Submit
                            </Button>

                            {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
                        </form>
                        <div className="flex mt-2 mx-auto w-fit">
                            <p className="me-1">You have an account already?</p>
                            <Link className="text-blue-300" href={"/auth/login"}>Login...</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>


    )
}
