"use client"

import { logoutUser } from "@/services/auth/auth.client";
import { Button } from "@base-ui/react/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PortalPage() {
    const router = useRouter();

    async function handleLogout() {
        await logoutUser();

        toast.success("Logout realziado com sucesso. Volte sempre!");

        router.replace("/login");
    };
    return (
        <>
            Ola mundo!
            <Button
                onClick={handleLogout}
                className="flex items-center w-[120px] gap-3 px-3 py-2 mt-3 font-medium rounded-lg cursor-pointer transition-colors duration-200 bg-red-500 text-white hover:bg-red-600"
            >
                logout
            </Button>
        </>
    )
}