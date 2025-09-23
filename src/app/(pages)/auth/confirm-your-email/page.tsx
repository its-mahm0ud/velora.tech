"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { formSchema } from "@/schema/confirmYourEmail"
import { apiServices } from "@/Services/ApisServices"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ConfirmYourEmail() {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmiting(true)
        const res = await apiServices.ConfirmeEmail(values.email)
        if (res.statusMsg === 'success') {
            toast.success(res.message)
            setTimeout(() => {
                router.push("/auth/verify-code")
                setIsSubmiting(false)
            }, 1000)
        }else{
            setIsSubmiting(false)
            toast.error("Invaild Your Email")
        }


    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-slate-800 to-blue-900 p-4">
            <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                <div className="flex flex-col gap-2 mb-10 text-center">
                    <h1 className="text-3xl font-bold text-primary dark:text-white">Enter Your Email</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">We will send you OTP</p>
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
                                            className="bg-white/70 dark:bg-gray-800 
                        border border-gray-300 dark:border-gray-600 
                        text-gray-900 dark:text-gray-100 
                        focus:border-primary focus:ring-2 focus:ring-primary/50 
                        transition rounded-lg"
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
                            className="w-full bg-primary dark:bg-black/90 
                text-white font-semibold py-2.5 rounded-lg 
                hover:bg-primary/90 dark:hover:bg-black/80
                transition flex items-center justify-center gap-2 
                shadow-lg hover:shadow-xl"
                            type="submit"
                        >
                            {isSubmiting && <Loader2 className="animate-spin h-4 w-4" />}
                            Send Email
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
