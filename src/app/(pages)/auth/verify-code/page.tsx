"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/Components/ui/form"
import { Button } from "@/Components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { formSchema } from "@/schema/verifyCode"
import OtpInput from "react-otp-input"
import { apiServices } from "@/Services/ApisServices"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function VerifyCode() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { resetCode: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const res = await apiServices.VerifyCodeConfirm(values.resetCode)
    if (res.status === 'Success') {
      toast.success(res.status)
      setTimeout(() => {
        setIsSubmitting(false)
        router.push("/auth/change-password")
      }, 1000);
    } else {
      setIsSubmitting(false)
      toast.error(res.message)
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-gray-700 via-slate-800 to-blue-900 p-4">

      <div className="w-full max-w-md bg-white/10 dark:bg-black/40 
        backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">

        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Verify Your Code
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm">
          Enter the 4-digit code we sent to your email
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
              control={form.control}
              name="resetCode"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-gray-200 mb-2">Reset Code</FormLabel>
                  <FormControl>
                    <OtpInput
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      numInputs={6}
                      inputType="number"
                      shouldAutoFocus
                      containerStyle="flex justify-center gap-3"
                      renderInput={(props) => <input {...props} />}   // ✅ كده الخطأ هيتحل
                      inputStyle={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #4B5563", // gray-600
                        backgroundColor: "rgba(255,255,255,0.8)",
                        color: "#111827", // gray-900
                        fontSize: "1.25rem",
                        textAlign: "center",
                      }}
                    />

                  </FormControl>
                  {fieldState.error && (
                    <p className="text-xs text-red-500 mt-2">{fieldState.error.message}</p>
                  )}
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-primary dark:bg-black/90 
                text-white font-semibold py-2.5 rounded-lg 
                hover:bg-primary/90 dark:hover:bg-black/80
                transition flex items-center justify-center gap-2 
                shadow-lg hover:shadow-xl"
            >
              {isSubmitting && <Loader2 className="animate-spin h-4 w-4" />}
              Verify Code
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
