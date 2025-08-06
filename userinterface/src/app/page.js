"use client";

import Landing from "@/components/Landing";
import useWalletStore from "@/lib/useWalletStore";

import { useRouter } from "next/navigation";

export default function Home() {
  const { isAdmin } = useWalletStore();
  const router = useRouter();

  // Redirect to admin overview if user is admin
  if (isAdmin) {
    router.push("/admin/overview");
    return null; // Prevent rendering the landing page while redirecting
  }
  return (
   
     

          <div>
            <Landing />
          </div>

      
  );
}
