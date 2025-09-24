// "use client"
// import ActionToCheckOut from '@/Components/ActionToCheckOut'
// import { Button } from '@/Components/ui'
// import { Input } from '@/Components/ui/input'
// import { Label } from '@/Components/ui/label'
// import React, { useState } from 'react'
// import toast from "react-hot-toast";

// export default function detailsForCheckOut() {
//     const [address, setAddress] = useState("")
//     const [phone, setPhone] = useState("")
//     const [city, setCity] = useState("")
//     const [isCheckingOut, setIsCheckingOut] = useState(false)

//     return (
//         // {main }
//         <div className="md:p-36 py-10 flex">
//             <form className="mx-auto w-full md:max-w-3xl space-y-6 p-8 border rounded-2xl shadow-sm bg-card text-card-foreground">
//                 {/* Address */}
//                 <div className="space-y-2">
//                     <Label htmlFor="address">Address</Label>
//                     <Input
//                         id="address"
//                         name="address"
//                         placeholder="Enter your address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                     />
//                 </div>

//                 {/* Phone */}
//                 <div className="space-y-2">
//                     <Label htmlFor="phone">Phone</Label>
//                     <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         placeholder="Enter your phone number"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                     />
//                 </div>

//                 {/* City */}
//                 <div className="space-y-2">
//                     <Label htmlFor="city">City</Label>
//                     <Input
//                         id="city"
//                         name="city"
//                         placeholder="Enter your city"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <Button
//                     type="button"
//                     onClick={() => setIsCheckingOut(!isCheckingOut)}
//                     className="w-full"
//                 >
//                     Pay
//                 </Button>

//                 {isCheckingOut && (
//                     <ActionToCheckOut
//                         address={address}
//                         phone={phone}
//                         city={city}
//                         isCheckingOut={isCheckingOut}
//                     />
//                 )}
//             </form>
//         </div>

//     )
// }

"use client"
import ActionToCheckOut from '@/Components/ActionToCheckOut'
import { Button } from '@/Components/ui'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/schema/checkOutSchema'


type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function DetailsForCheckOut() {
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema)
    })

    function onSubmit(data: CheckoutFormData) {
        setIsCheckingOut(!isCheckingOut)
        setAddress(data.address)
        setPhone(data.phone)
        setCity(data.city)
    }

    return (
        <div className="md:pb-36 py-10 flex">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto w-full md:max-w-3xl space-y-6 p-8 border rounded-2xl shadow-sm bg-card text-card-foreground"
            >
                {/* Address */}
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        placeholder="Enter your address"
                        {...register("address")}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        {...register("phone")}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                {/* City */}
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        placeholder="Enter your city"
                        {...register("city")}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Pay
                </Button>

                {isCheckingOut && (
                    <ActionToCheckOut
                        address={address}
                        phone={phone}
                        city={city}
                        isCheckingOut={isCheckingOut}
                    />
                )}
            </form>
        </div>
    )
}
