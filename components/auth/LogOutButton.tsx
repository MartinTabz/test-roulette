"use client";

import { createClient } from "@/utils/supabase/client";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LogOutButton({ className }: { className?: string }) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter()

   const handleLogOut = async () => {
      setIsLoading(true)
      const supabase = createClient();
      await supabase.auth.signOut()
      router.refresh()
   }

	return (
		<button
         onClick={handleLogOut}
			className={`bg-red-600 ${isLoading ? "cursor-not-allowed" : "hover:bg-red-700 cursor-pointer"} w-full flex items-center justify-center gap-2 h-10 rounded-md font-medium text-base text-white hover:bg-red-700 duration-200 ease-out ${className}`}
		>
			{isLoading ? (
				<FiLoader className="text-xl animate-spin" />
			) : (
				<>
					<IoMdLogOut className="text-xl" />
					Odhlásit se
				</>
			)}
		</button>
	);
}
