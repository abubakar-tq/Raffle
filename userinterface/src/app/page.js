"use client";
import Image from "next/image";
import Landing from "@/components/Landing";
import useWalletStore from "@/lib/useWalletStore";

export default function Home() {
  const { isAdmin } = useWalletStore();
  return (
    <>
      {
        isAdmin ?
          <div>
            Hello
          </div > :

          <div>
            <Landing />
          </div>

      }
    </>
  );
}
